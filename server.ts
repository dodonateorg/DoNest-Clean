import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { PostHog } from 'posthog-node';
import { CAMEROON_NGOS } from './src/data/ngos';
import { NGO } from './src/types';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize PostHog Server Client
const posthogKey = process.env.POSTHOG_PROJECT_TOKEN || process.env.VITE_POSTHOG_KEY || '';
const posthogHost = process.env.POSTHOG_HOST || 'https://t.dodonate.org';
const posthogClient = posthogKey ? new PostHog(posthogKey, { host: posthogHost }) : null;

if (posthogClient) {
  console.log('📈 PostHog server client initialized successfully.');
}

// Endpoint for backend event tracking (e.g. signup emails, webhooks)
app.post('/api/track-signup', async (req, res) => {
  try {
    const { id, email, full_name, role } = req.body;

    if (posthogClient && id) {
      // Identify traits
      posthogClient.identify({
        distinctId: id,
        properties: { email, full_name, role },
      });

      // Capture event
      posthogClient.capture({
        distinctId: id,
        event: 'user_signed_up',
        properties: { email, full_name, role, domain: 'nest.dodonate.org' },
      });

      await posthogClient.flush();
    }

    return res.json({ success: true });
  } catch (err: any) {
    console.error('[PostHog Backend Error]:', err);
    return res.status(500).json({ error: err.message });
  }
});

// Initialize Supabase Client
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';
const isSupabaseConfigured = !!(supabaseUrl && supabaseKey);

let supabaseClient: any = null;
if (isSupabaseConfigured) {
  try {
    supabaseClient = createClient(supabaseUrl, supabaseKey);
    console.log('🔌 Supabase client initialized successfully.');
  } catch (err) {
    console.error('❌ Failed to initialize Supabase client:', err);
  }
} else {
  console.log('⚠️ Supabase environment variables missing. Falling back to local/in-memory data.');
}

// In-memory fallback database pre-populated with our pre-existing Cameroon NGOs
let localNgosDb: NGO[] = [...CAMEROON_NGOS];

// Store volunteer applications in-memory when Supabase is offline
interface VolunteerApplication {
  id: string;
  postingId: string;
  ngoUsername: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}
let localApplicationsDb: VolunteerApplication[] = [];

// Helper: Fetch all NGOs and compile their sub-items (physical needs, postings, cash wishlist)
async function fetchAllNgosFromSupabase(): Promise<NGO[]> {
  if (!supabaseClient) throw new Error('Supabase client not initialized');

  // Fetch from the real profiles table - ONLY show NGOs with account_status as LIVE
  const { data: profiles, error: profilesError } = await supabaseClient
    .from('profiles')
    .select('*')
    .eq('role', 'NGO')
    .eq('account_status', 'LIVE');
  if (profilesError) throw profilesError;

  // Fetch from the real essential_needs table
  let essentialNeeds: any[] = [];
  try {
    const { data: needs, error: needsError } = await supabaseClient
      .from('essential_needs')
      .select('*')
      .neq('status', 'deleted');
    if (!needsError && needs) {
      essentialNeeds = needs;
    }
  } catch (err) {
    console.warn('⚠️ Fetching from essential_needs failed:', err);
  }

  // Fetch from the real volunteer_requests table
  let volunteerRequests: any[] = [];
  try {
    const { data: requests, error: requestsError } = await supabaseClient
      .from('volunteer_requests')
      .select('*')
      .neq('status', 'deleted');
    if (!requestsError && requests) {
      volunteerRequests = requests;
    }
  } catch (err) {
    console.warn('⚠️ Fetching from volunteer_requests failed:', err);
  }

  // Build structure compliant with NGO interface
  return (profiles || []).map((profile: any) => {
    // Determine unique slug for username
    const username = profile.custom_slug || profile.email?.split('@')[0] || profile.id;

    // Map needs
    const ngoNeeds = essentialNeeds
      .filter((n: any) => n.ngo_id === profile.id || n.ngo_name === profile.email)
      .map((n: any) => {
        let mappedCategory: 'Education' | 'Food' | 'Clothing' | 'Hygiene' | 'Other' | 'Books' | 'Shoes' = 'Other';
        const dbCat = n.category || '';
        const cat = dbCat.toLowerCase();
        if (cat.includes('food') || cat.includes('eat') || cat.includes('meal')) {
          mappedCategory = 'Food';
        } else if (cat.includes('cloth') || cat.includes('wear') || cat.includes('clothing')) {
          mappedCategory = 'Clothing';
        } else if (cat.includes('book') || cat.includes('educ') || cat.includes('school') || cat.includes('education')) {
          mappedCategory = 'Education';
        } else if (cat.includes('hyg') || cat.includes('hygiene') || cat.includes('soap') || cat.includes('toilet')) {
          mappedCategory = 'Hygiene';
        } else if (cat.includes('shoe') || cat.includes('bag') || cat.includes('shoes')) {
          mappedCategory = 'Shoes';
        } else if (cat.includes('book') || cat.includes('books')) {
          mappedCategory = 'Books';
        } else {
          const formatted = dbCat.charAt(0).toUpperCase() + dbCat.slice(1).toLowerCase();
          if (['Education', 'Food', 'Clothing', 'Hygiene', 'Other', 'Books', 'Shoes'].includes(formatted)) {
            mappedCategory = formatted as any;
          } else {
            mappedCategory = 'Other';
          }
        }

        return {
          id: n.id,
          category: mappedCategory,
          item: n.item_name || n.category || 'Essential Item',
          targetQuantity: 1,
          currentQuantity: 0,
          unit: 'Units',
          urgency: n.urgency === 'Urgent' || n.urgency === 'High' ? 'High' : (n.urgency === 'Low' ? 'Low' : 'Medium'),
          details: n.description || 'Direct donation support',
          status: n.status
        };
      });

    // Map volunteer postings
    const ngoPostings = volunteerRequests
      .filter((r: any) => r.ngo_id === profile.id || r.ngo_name === profile.email)
      .map((r: any) => ({
        id: r.id,
        title: r.title,
        details: r.description || '',
        startDate: r.created_at ? new Date(r.created_at).toLocaleDateString() : 'Active',
        endDate: r.duration_days ? `${r.duration_days} Days` : 'Ongoing',
        initialInterestCount: r.likes_count || 0,
        // Include raw properties
        duration_days: r.duration_days,
        start_time: r.start_time,
        end_time: r.end_time,
        location: r.location,
        volunteers_needed: r.volunteers_needed,
        volunteers_joined: r.volunteers_joined,
        category: r.category,
        status: r.status,
        ngo_id: r.ngo_id
      }));

    // Extract city helper
    const extractCity = (loc: string | null): 'Douala' | 'Yaoundé' | 'Buea' | 'Bamenda' | 'Kumba' | 'Limbe' => {
      if (!loc) return 'Yaoundé';
      const l = loc.toLowerCase();
      if (l.includes('douala')) return 'Douala';
      if (l.includes('yaounde') || l.includes('yaoundé')) return 'Yaoundé';
      if (l.includes('buea')) return 'Buea';
      if (l.includes('bamenda')) return 'Bamenda';
      if (l.includes('kumba')) return 'Kumba';
      if (l.includes('limbe')) return 'Limbe';
      return 'Yaoundé'; // default fallback
    };

    return {
      username,
      name: profile.ngo_name || profile.full_name || profile.email || 'Orphanage',
      logo: profile.avatar_url || '🏡',
      city: extractCity(profile.location),
      address: profile.location || 'Cameroon',
      phone: profile.phone_number || '',
      whatsappMessage: 'Hi, I would like to support your orphanage!',
      description: profile.bio || 'Advancing local youth & education across communities.',
      establishedYear: profile.created_at ? new Date(profile.created_at).getFullYear() : 2020,
      physicalNeeds: ngoNeeds,
      volunteerPostings: ngoPostings,
      cashWishlist: [], // Wishlist feature is removed as requested
      volunteerRequestsCount: profile.volunteer_requests_count || 0,
      needsCount: profile.needs_count || 0,
      website: profile.website_url || profile.website || '',
      account_status: profile.account_status || 'LIVE'
    };
  });
}

// REST API Endpoints
app.get('/api/config', (req, res) => {
  res.json({
    supabaseEnabled: isSupabaseConfigured,
    supabaseUrl: isSupabaseConfigured ? supabaseUrl : null,
    supabaseKey: isSupabaseConfigured ? supabaseKey : null
  });
});

// GET /api/ngos
app.get('/api/ngos', async (req, res) => {
  if (isSupabaseConfigured && supabaseClient) {
    try {
      const dbNgos = await fetchAllNgosFromSupabase();
      // Filter strictly for LIVE account_status
      const liveNgos = dbNgos.filter(n => n.account_status === 'LIVE');
      localNgosDb = liveNgos;
      return res.json(liveNgos);
    } catch (err: any) {
      console.warn('⚠️ Supabase tables fetch failed. Falling back to local data. Error:', err.message);
      // Fallback to local memory db filtered for LIVE status
      const liveFallback = localNgosDb.filter(n => !n.account_status || n.account_status === 'LIVE');
      return res.json(liveFallback);
    }
  }
  const liveFallback = localNgosDb.filter(n => !n.account_status || n.account_status === 'LIVE');
  return res.json(liveFallback);
});

// POST /api/ngos/sync - Sync current state back
app.post('/api/ngos/sync', async (req, res) => {
  const updatedNgos: NGO[] = req.body;
  localNgosDb = updatedNgos;

  if (isSupabaseConfigured && supabaseClient) {
    try {
      // Loop and update current quantities or amounts in Supabase to keep them updated
      for (const ngo of updatedNgos) {
        // 1. Update physical needs
        for (const need of ngo.physicalNeeds) {
          const { error } = await supabaseClient
            .from('physical_needs')
            .update({ current_quantity: need.currentQuantity })
            .eq('id', need.id);
          if (error) console.error(`Error updating need ${need.id}:`, error.message);
        }

        // 2. Update cash wishlist items
        for (const cash of ngo.cashWishlist) {
          const { error } = await supabaseClient
            .from('cash_wishlist')
            .update({ current_amount: cash.currentAmount })
            .eq('id', cash.id);
          if (error) console.error(`Error updating cash item ${cash.id}:`, error.message);
        }

        // 3. Update volunteer postings interest counts
        for (const post of ngo.volunteerPostings) {
          const { error } = await supabaseClient
            .from('volunteer_postings')
            .update({ initial_interest_count: post.initialInterestCount })
            .eq('id', post.id);
          if (error) console.error(`Error updating volunteer posting ${post.id}:`, error.message);
        }
      }
      return res.json({ success: true, syncedWithSupabase: true });
    } catch (err: any) {
      console.error('❌ Supabase sync failed:', err.message);
      return res.json({ success: true, syncedWithSupabase: false, error: err.message });
    }
  }

  return res.json({ success: true, syncedWithSupabase: false });
});

// POST /api/volunteer/interest - Upvote or downvote interest count
app.post('/api/volunteer/interest', async (req, res) => {
  const { postingId, change } = req.body; // change: +1 or -1

  // Update in-memory first
  localNgosDb = localNgosDb.map(ngo => ({
    ...ngo,
    volunteerPostings: ngo.volunteerPostings.map(post => {
      if (post.id === postingId) {
        return {
          ...post,
          initialInterestCount: Math.max(0, post.initialInterestCount + change)
        };
      }
      return post;
    })
  }));

  if (isSupabaseConfigured && supabaseClient) {
    try {
      // 1. Get current count from volunteer_requests
      const { data, error: selectError } = await supabaseClient
        .from('volunteer_requests')
        .select('likes_count')
        .eq('id', postingId)
        .single();

      if (!selectError && data) {
        const newCount = Math.max(0, (data.likes_count || 0) + change);
        // 2. Update volunteer_requests
        await supabaseClient
          .from('volunteer_requests')
          .update({ likes_count: newCount })
          .eq('id', postingId);
      }
      return res.json({ success: true, syncedWithSupabase: true });
    } catch (err: any) {
      console.error('❌ Interest sync to Supabase failed:', err.message);
    }
  }

  return res.json({ success: true, syncedWithSupabase: false });
});

// POST /api/volunteer/apply - Store applications
app.post('/api/volunteer/apply', async (req, res) => {
  const { postingId, ngoUsername, name, email, phone, location, message } = req.body;
  const newApp: VolunteerApplication = {
    id: `app_${Date.now()}`,
    postingId,
    ngoUsername,
    name,
    email,
    phone,
    message,
    createdAt: new Date().toISOString()
  };

  localApplicationsDb.push(newApp);

  // Update in-memory fallback
  localNgosDb = localNgosDb.map(ngo => ({
    ...ngo,
    volunteerPostings: ngo.volunteerPostings.map(post => {
      if (post.id === postingId) {
        const currentJoined = post.volunteers_joined || 0;
        const needed = post.volunteers_needed || 3;
        const newJoined = currentJoined + 1;
        const shouldDelete = newJoined >= needed;
        return {
          ...post,
          volunteers_joined: newJoined,
          status: shouldDelete ? 'deleted' : post.status
        };
      }
      return post;
    })
  }));

  if (isSupabaseConfigured && supabaseClient) {
    try {
      // 1. Insert into volunteer_applications
      const { error: insertError } = await supabaseClient
        .from('volunteer_applications')
        .insert([{
          id: newApp.id,
          posting_id: postingId,
          ngo_username: ngoUsername,
          applicant_name: name,
          applicant_email: email,
          applicant_phone: phone,
          message: message,
          created_at: newApp.createdAt
        }]);

      if (insertError) throw insertError;

      // 2. Fetch current volunteers counts from volunteer_requests
      const { data: requestRow, error: fetchError } = await supabaseClient
        .from('volunteer_requests')
        .select('volunteers_joined, volunteers_needed')
        .eq('id', postingId)
        .single();

      if (!fetchError && requestRow) {
        const currentJoined = requestRow.volunteers_joined || 0;
        const needed = requestRow.volunteers_needed || 3;
        const newJoined = currentJoined + 1;

        const updateData: any = { volunteers_joined: newJoined };
        if (newJoined >= needed) {
          updateData.status = 'deleted';
        }

        // 3. Update the volunteer_requests row in Supabase
        const { error: updateError } = await supabaseClient
          .from('volunteer_requests')
          .update(updateData)
          .eq('id', postingId);

        if (updateError) {
          console.error('⚠️ Failed to update volunteer_requests statistics:', updateError.message);
        }
      }

      return res.json({ success: true, syncedWithSupabase: true, application: newApp });
    } catch (err: any) {
      console.error('❌ Supabase volunteer application save failed:', err.message);
      return res.json({ success: true, syncedWithSupabase: false, application: newApp, error: err.message });
    }
  }

  return res.json({ success: true, syncedWithSupabase: false, application: newApp });
});

// Seed data route - allows users to populate their Supabase instance with existing Cameroon NGOs data instantly!
app.post('/api/db/seed', async (req, res) => {
  if (!isSupabaseConfigured || !supabaseClient) {
    return res.status(400).json({ error: 'Supabase must be configured to seed tables.' });
  }

  try {
    console.log('🌱 Seeding Supabase database with pre-existing NGOs...');

    // 1. Seed NGOs
    const ngosToInsert = CAMEROON_NGOS.map(n => ({
      username: n.username,
      name: n.name,
      logo: n.logo,
      city: n.city,
      address: n.address,
      phone: n.phone,
      whatsapp_message: n.whatsappMessage,
      description: n.description,
      established_year: n.establishedYear
    }));
    const { error: ngoError } = await supabaseClient.from('ngos').upsert(ngosToInsert);
    if (ngoError) throw ngoError;

    // 2. Seed physical needs
    const needsToInsert: any[] = [];
    // 3. Seed postings
    const postingsToInsert: any[] = [];
    // 4. Seed cash wishlist
    const cashToInsert: any[] = [];

    CAMEROON_NGOS.forEach(n => {
      n.physicalNeeds.forEach(need => {
        needsToInsert.push({
          id: need.id,
          ngo_username: n.username,
          category: need.category,
          item: need.item,
          target_quantity: need.targetQuantity,
          current_quantity: need.currentQuantity,
          unit: need.unit,
          urgency: need.urgency,
          details: need.details || ''
        });
      });

      n.volunteerPostings.forEach(post => {
        postingsToInsert.push({
          id: post.id,
          ngo_username: n.username,
          title: post.title,
          details: post.details,
          start_date: post.startDate,
          end_date: post.endDate,
          initial_interest_count: post.initialInterestCount
        });
      });

      n.cashWishlist.forEach(cash => {
        cashToInsert.push({
          id: cash.id,
          ngo_username: n.username,
          title: cash.title,
          description: cash.description,
          target_amount: cash.targetAmount,
          current_amount: cash.currentAmount,
          currency: cash.currency
        });
      });
    });

    if (needsToInsert.length > 0) {
      const { error: err } = await supabaseClient.from('physical_needs').upsert(needsToInsert);
      if (err) throw err;
    }

    if (postingsToInsert.length > 0) {
      const { error: err } = await supabaseClient.from('volunteer_postings').upsert(postingsToInsert);
      if (err) throw err;
    }

    if (cashToInsert.length > 0) {
      const { error: err } = await supabaseClient.from('cash_wishlist').upsert(cashToInsert);
      if (err) throw err;
    }

    return res.json({ success: true, message: 'Supabase seeded successfully with all existing Cameroon NGOs data!' });
  } catch (err: any) {
    console.error('❌ Seeding error:', err);
    return res.status(500).json({ error: err.message, hint: 'Ensure your Supabase schema matches the required tables.' });
  }
});

// Lightweight, type-safe keep-alive health check endpoint
app.get('/api/health', (req, res) => {
  try {
    const timestamp = new Date().toISOString();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    return res.status(200).json({
      status: 'awake',
      timestamp: timestamp
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Dynamic SEO robots.txt allowing all chat bots and crawlers
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /
Sitemap: ${req.protocol}://${req.get('host')}/sitemap.xml
`);
});

// Dynamic sitemap.xml featuring DoNest main solutions and all local orphanage URLs
app.get('/sitemap.xml', (req, res) => {
  const host = req.get('host');
  const protocol = req.protocol;
  const baseUrl = `${protocol}://${host}`;

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/solution/donations</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/solution/volunteer-network</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/solution/csr</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/usecase/for-ngos</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${baseUrl}/usecase/for-donors</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${baseUrl}/usecase/for-companies</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${baseUrl}/about-us</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${baseUrl}/impact-stories</loc>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact-us</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${baseUrl}/volunteers</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
`;

  // Dynamic discovery of each NGO profile
  localNgosDb.forEach(ngo => {
    xml += `  <url>
    <loc>${baseUrl}/${ngo.username}</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>\n`;
  });

  xml += `</urlset>`;

  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

// Vite middleware & Client SPA static rendering configuration
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 DoNest server running on http://localhost:${PORT}`);
  });
}

start();

// Graceful Shutdown
process.on('SIGTERM', async () => {
  if (posthogClient) {
    await posthogClient.shutdown();
  }
});
