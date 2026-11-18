import { NGO, VolunteerPosting } from '../types';

export interface ArticleSeoMeta {
  slug: string;
  customPath?: string;
  headline: string;
  seoTitle: string;
  description: string;
  keywords: string;
  ogImagePath: string;
  ogImageAlt: string;
  publishedDate: string;
  modifiedDate: string;
  readingTime: string;
  category: string;
  author: string;
  tags: string[];
}

export function getArticlePath(article: Pick<ArticleSeoMeta, 'slug' | 'customPath'>): string {
  return article.customPath || `/articles/${article.slug}`;
}

export const DEFAULT_OG_IMAGE = 'https://iili.io/nVoR9ZG.png';
export const DEFAULT_LOGO_IMAGE = 'https://iili.io/CjM0PPs.png';

export function slugifyText(text: string): string {
  return (text || '')
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 72);
}

export function getVolunteerOpportunitySlug(post: Pick<VolunteerPosting, 'id' | 'title'>): string {
  const titleSlug = slugifyText(post.title) || 'volunteer-opportunity';
  return `${titleSlug}--${post.id}`;
}

export function getVolunteerOpportunityPath(
  ngo: Pick<NGO, 'username'>,
  post: Pick<VolunteerPosting, 'id' | 'title'>
): string {
  return `/${ngo.username}/volunteer/${getVolunteerOpportunitySlug(post)}`;
}

export function findVolunteerPostBySlug(
  ngo: NGO | undefined,
  postSlug: string
): VolunteerPosting | undefined {
  if (!ngo || !postSlug) return undefined;
  const activePosts = (ngo.volunteerPostings || []).filter(p => p.status !== 'deleted');
  const decoded = decodeURIComponent(postSlug).trim();

  // 1. Exact ID match
  const byExactId = activePosts.find(p => p.id === decoded);
  if (byExactId) return byExactId;

  // 2. Trailing --{id} match
  const separatorIdx = decoded.lastIndexOf('--');
  if (separatorIdx !== -1) {
    const idPart = decoded.slice(separatorIdx + 2);
    const bySplitId = activePosts.find(p => p.id === idPart);
    if (bySplitId) return bySplitId;
  }

  // 3. Fallback slugified title match
  return activePosts.find(p => slugifyText(p.title) === decoded);
}

export const ARTICLE_SEO_LIST: ArticleSeoMeta[] = [
  {
    slug: 'find-volunteer-opportunities-in-africa',
    headline:
      'The Ultimate Guide to Finding and Easily Applying for Volunteer Opportunities in Africa (Cameroon, Nigeria, Kenya & Beyond)',
    seoTitle: 'Find Volunteer Opportunities in Africa (Cameroon, Nigeria, Kenya) | DoNest',
    description:
      'Discover how to find and easily apply for verified volunteer opportunities in Africa—Cameroon, Nigeria, Kenya & beyond—and earn an official Attestation of Service.',
    keywords:
      'find volunteer opportunities in Africa, volunteer opportunities in Africa, volunteer in Cameroon, volunteer in Nigeria, volunteer in Kenya, African volunteer hub, NGO volunteer application Africa, verified attestation of service, DoNest, donest.org',
    ogImagePath: 'https://iili.io/o3jg9Wu.png',
    ogImageAlt:
      'The Ultimate Guide to Finding and Easily Applying for Volunteer Opportunities in Africa on DoNest',
    publishedDate: '2026-08-01T09:00:00Z',
    modifiedDate: '2026-08-18T09:00:00Z',
    readingTime: '6 min read',
    category: 'Volunteer Guide',
    author: 'DoNest Editorial Team',
    tags: [
      'Volunteer in Africa',
      'Cameroon',
      'Nigeria',
      'Kenya',
      'Attestation of Service',
      'Nonprofits'
    ]
  },
  {
    slug: 'ngo-volunteer-opportunities-in-cameroon',
    customPath: '/ngo-volunteer-opportunities-in-cameroon',
    headline:
      'NGO Volunteer Opportunities in Cameroon: How to Find & Easily Apply to Verified Local Projects',
    seoTitle: 'NGO Volunteer Opportunities in Cameroon (2026) | Douala, Yaoundé & Buea – DoNest',
    description:
      'Discover verified NGO volunteer opportunities in Cameroon without agency fees. Apply directly to teach, mentor, or support orphanages in Douala, Yaoundé, Buea, and Bamenda and earn an official Attestation of Service.',
    keywords:
      'NGO volunteer opportunities in Cameroon, volunteer in Douala, volunteer in Yaoundé, volunteer in Buea, volunteer in Bamenda, Limbe Kumba volunteering, Cameroon orphanages volunteer, attestation of service Cameroon, DoNest Cameroon',
    ogImagePath: 'https://iili.io/o3jg9Wu.png',
    ogImageAlt:
      'NGO Volunteer Opportunities in Cameroon (2026) across Douala, Yaoundé, Buea, Limbe & Bamenda on DoNest',
    publishedDate: '2026-08-18T09:00:00Z',
    modifiedDate: '2026-08-18T09:00:00Z',
    readingTime: '6 min read',
    category: 'Cameroon Guide',
    author: 'DoNest Editorial Team',
    tags: [
      'Cameroon',
      'Douala',
      'Yaoundé',
      'Buea',
      'Bamenda',
      'Limbe',
      'Attestation of Service'
    ]
  },
  {
    slug: 'ngo-volunteer-opportunities-in-ghana',
    customPath: '/ngo-volunteer-opportunities-in-ghana',
    headline:
      'NGO Volunteer Opportunities in Ghana: How to Find & Apply to Verified Grassroots Projects',
    seoTitle: 'NGO Volunteer Opportunities in Ghana (2026) | Accra, Kumasi & Tamale – DoNest',
    description:
      'Find verified NGO volunteer opportunities in Ghana without agency fees. Apply directly to teach, mentor youth, or support orphanages in Accra, Kumasi, Tamale, and Cape Coast and earn an official Attestation of Service.',
    keywords:
      'NGO volunteer opportunities in Ghana, volunteer in Ghana, volunteer in Accra, volunteer in Kumasi, volunteer in Tamale, volunteer in Cape Coast, Takoradi volunteering, Ghana orphanages volunteer, attestation of service Ghana, DoNest Ghana',
    ogImagePath: 'https://iili.io/o3jg9Wu.png',
    ogImageAlt:
      'NGO Volunteer Opportunities in Ghana (2026) across Accra, Kumasi, Tamale, Cape Coast & Takoradi on DoNest',
    publishedDate: '2026-08-19T09:00:00Z',
    modifiedDate: '2026-08-19T09:00:00Z',
    readingTime: '6 min read',
    category: 'Ghana Guide',
    author: 'DoNest Editorial Team',
    tags: [
      'Ghana',
      'Accra',
      'Kumasi',
      'Tamale',
      'Cape Coast',
      'Takoradi',
      'Attestation of Service'
    ]
  },
  {
    slug: 'direct-physical-item-donations-africa-orphanages',
    headline: 'How Direct Physical Item Donations Transform African Orphanages & Nonprofits',
    seoTitle: 'Donate Clothes, Books & Food to African Orphanages | DoNest',
    description:
      'Learn how direct physical donations—clothing, textbooks, food staples, and hygiene supplies—reach verified African children’s homes and nonprofits without middlemen.',
    keywords:
      'donate clothes Africa, donate books orphanages Africa, physical donations nonprofits Africa, support African children homes, direct charity giving Africa, DoNest',
    ogImagePath: '/src/assets/images/direct_donations_africa_1795014842426.jpg',
    ogImageAlt:
      'Volunteers organizing donated clothes, books, and essential food supplies for verified orphanages in Africa',
    publishedDate: '2026-08-06T09:00:00Z',
    modifiedDate: '2026-08-16T09:00:00Z',
    readingTime: '5 min read',
    category: 'Direct Giving',
    author: 'DoNest Editorial Team',
    tags: ['Physical Donations', 'Orphanages', 'Africa', 'Community Impact']
  },
  {
    slug: 'verified-volunteer-attestation-service-africa-careers',
    headline:
      'Why Verified Volunteer Attestations Unlock Scholarships & Global Careers Across Africa',
    seoTitle: 'Verified Volunteer Attestation of Service for Careers & Scholarships | DoNest',
    description:
      'Discover how signed Attestations of Service from African nonprofits strengthen university admissions, scholarship applications, LinkedIn profiles, and CVs.',
    keywords:
      'volunteer attestation of service Africa, verified volunteer certificate Africa, scholarship volunteering Africa, NGO mentorship certificate Africa, DoNest volunteer hub',
    ogImagePath: '/src/assets/images/volunteer_impact_certificate_1795014841892.jpg',
    ogImageAlt:
      'Young African volunteer receiving a verified Attestation of Service alongside a nonprofit leader',
    publishedDate: '2026-08-11T09:00:00Z',
    modifiedDate: '2026-08-18T09:00:00Z',
    readingTime: '5 min read',
    category: 'Career & Impact',
    author: 'DoNest Editorial Team',
    tags: ['Career Impact', 'Attestation of Service', 'Scholarships', 'Youth Leadership']
  }
];

export function findArticleMetaBySlug(slug: string): ArticleSeoMeta | undefined {
  const clean = (slug || '').replace(/^\/+|\/+$/g, '').toLowerCase();
  return ARTICLE_SEO_LIST.find(a => a.slug.toLowerCase() === clean);
}

export function getRoutingKeyFromPathname(pathname: string): string {
  const path = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;

  if (path === '/' || path === '') return '';
  if (path === '/volunteers') return 'solutions/volunteer-opportunities';
  if (path === '/solution/volunteer-network') return 'solutions/volunteer-network';
  if (path === '/solution/donations') return 'solutions/donations';
  if (path === '/solution/csr') return 'solutions/csr';
  if (path === '/usecase/for-ngos') return 'usecases/for-ngos';
  if (path === '/usecase/for-donors') return 'usecases/for-donors';
  if (path === '/usecase/for-companies') return 'usecases/for-companies';
  if (path === '/for-you' || path === '/usecase/for-you') return 'usecases/for-you';
  if (path === '/about-us') return 'company/about-us';
  if (path === '/contact-us') return 'company/contact-us';
  if (path === '/impact-stories') return 'company/impact-stories';
  if (path === '/legal/terms') return 'legal/terms';
  if (path === '/legal/privacy') return 'legal/privacy';
  if (path === '/legal/safety') return 'legal/safety';

  // Articles index & direct article routes
  if (path === '/articles') return 'articles';
  if (path === '/find-volunteer-opportunities-in-africa') {
    return 'articles/find-volunteer-opportunities-in-africa';
  }
  if (path === '/ngo-volunteer-opportunities-in-cameroon') {
    return 'articles/ngo-volunteer-opportunities-in-cameroon';
  }
  if (path === '/ngo-volunteer-opportunities-in-ghana') {
    return 'articles/ngo-volunteer-opportunities-in-ghana';
  }
  if (path.startsWith('/articles/')) {
    const articleSlug = path.slice('/articles/'.length);
    if (articleSlug && !articleSlug.includes('/')) {
      return `articles/${articleSlug}`;
    }
  }

  // Individual Volunteer Opportunity route: /{username}/volunteer/{postSlug}
  const clean = path.startsWith('/') ? path.slice(1) : path;
  const segments = clean.split('/').filter(Boolean);
  if (segments.length === 3 && segments[1] === 'volunteer') {
    return `${segments[0]}/volunteer/${segments[2]}`;
  }

  // NGO profile route: /{username}
  if (segments.length === 1) {
    return segments[0];
  }

  return '';
}

export interface PageSeoResult {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  ogType: 'website' | 'article';
  ogImage: string;
  ogImageAlt: string;
  robots: string;
  articleMeta?: {
    publishedTime: string;
    modifiedTime: string;
    section: string;
    tags: string[];
  };
  jsonLd: Record<string, any>;
}

const getAbsoluteImageUrl = (rawUrl: string | undefined, origin: string): string => {
  if (!rawUrl) return DEFAULT_OG_IMAGE;
  if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) return rawUrl;
  if (rawUrl.startsWith('/')) return `${origin}${rawUrl}`;
  return DEFAULT_OG_IMAGE;
};

const getCleanLocation = (ngo: NGO): string => {
  return (ngo.location || ngo.address || ngo.city || 'Africa').trim();
};

export function buildPageSeo({
  pathname,
  origin,
  ngos
}: {
  pathname: string;
  origin: string;
  ngos: NGO[];
}): PageSeoResult {
  const cleanOrigin = origin.replace(/\/+$/, '');
  const cleanPath =
    pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname || '/';
  const routeKey = getRoutingKeyFromPathname(cleanPath);
  const liveNgos = (ngos || []).filter(n => !n.account_status || n.account_status === 'LIVE');

  let title = 'DoNest - Find Volunteer Opportunities & Support Nonprofits in Africa';
  let description =
    "Find volunteer opportunities and support Nonprofits with their needs. DoNest is Africa's premier volunteer hub connecting millions of people to verified nonprofits and children's homes in need.";
  let keywords =
    'find volunteer opportunities Africa, volunteer opportunities Africa, support nonprofits Africa, donate physical items Africa, African charities, children homes Africa, DoNest, DoDonate';
  let canonicalUrl = `${cleanOrigin}${cleanPath === '/' ? '' : cleanPath}` || cleanOrigin;
  let ogType: 'website' | 'article' = 'website';
  let ogImage = DEFAULT_OG_IMAGE;
  let ogImageAlt = 'DoNest - Find Volunteer Opportunities & Support Nonprofits in Africa';
  const robots = 'index, follow, max-image-preview:large, max-snippet:-1';
  let articleMeta: PageSeoResult['articleMeta'];

  const orgPublisher = {
    '@type': 'NonProfit',
    name: 'DoNest',
    alternateName: 'DoDonate Inc.',
    url: cleanOrigin,
    logo: {
      '@type': 'ImageObject',
      url: DEFAULT_LOGO_IMAGE
    },
    sameAs: [
      'https://facebook.com/mydodonate',
      'https://instagram.com/mydodonate',
      'https://x.com/mydodonate',
      'https://tiktok.com/@mydodonate',
      'https://linkedin.com/company/mydodonate',
      'https://dodonate.org'
    ]
  };

  let jsonLd: Record<string, any> = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        ...orgPublisher,
        image: DEFAULT_OG_IMAGE,
        description,
        areaServed: 'Africa',
        telephone: '+237671991540',
        email: 'support@dodonate.org'
      },
      {
        '@type': 'WebSite',
        name: 'DoNest',
        url: cleanOrigin,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${cleanOrigin}/?q={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      }
    ]
  };

  // 1. Check Articles Index (/articles)
  if (routeKey === 'articles') {
    title = 'Volunteer Guides & Nonprofit Articles for Africa | DoNest';
    description =
      'Explore actionable guides on finding volunteer opportunities in Africa, supporting nonprofits and orphanages with physical donations, and earning verified Attestations of Service.';
    keywords =
      'Africa volunteer blog, find volunteer opportunities in Africa guide, African NGO articles, direct charity giving Africa, volunteer attestation guide, DoNest articles';
    canonicalUrl = `${cleanOrigin}/articles`;
    ogImage = getAbsoluteImageUrl(ARTICLE_SEO_LIST[0].ogImagePath, cleanOrigin);
    ogImageAlt = ARTICLE_SEO_LIST[0].ogImageAlt;

    jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Blog',
          name: 'DoNest Africa Volunteer & Nonprofit Articles',
          description,
          url: canonicalUrl,
          publisher: orgPublisher
        },
        {
          '@type': 'ItemList',
          itemListElement: ARTICLE_SEO_LIST.map((a, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: a.headline,
            url: `${cleanOrigin}${getArticlePath(a)}`
          }))
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: cleanOrigin },
            { '@type': 'ListItem', position: 2, name: 'Articles', item: canonicalUrl }
          ]
        }
      ]
    };
    return {
      title,
      description,
      keywords,
      canonicalUrl,
      ogType,
      ogImage,
      ogImageAlt,
      robots,
      jsonLd
    };
  }

  // 2. Check Individual Article Page (/articles/:slug)
  if (routeKey.startsWith('articles/')) {
    const slug = routeKey.slice('articles/'.length);
    const article = findArticleMetaBySlug(slug);
    if (article) {
      title = article.seoTitle;
      description = article.description;
      keywords = article.keywords;
      canonicalUrl = `${cleanOrigin}${getArticlePath(article)}`;
      ogType = 'article';
      ogImage = getAbsoluteImageUrl(article.ogImagePath, cleanOrigin);
      ogImageAlt = article.ogImageAlt;
      articleMeta = {
        publishedTime: article.publishedDate,
        modifiedTime: article.modifiedDate,
        section: article.category,
        tags: article.tags
      };

      const graph: any[] = [
        {
          '@type': 'BlogPosting',
          headline: article.headline,
          description: article.description,
          image: [ogImage],
          datePublished: article.publishedDate,
          dateModified: article.modifiedDate,
          author: {
            '@type': 'Organization',
            name: article.author,
            url: cleanOrigin
          },
          publisher: orgPublisher,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': canonicalUrl
          },
          keywords: article.keywords,
          articleSection: article.category
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: cleanOrigin },
            { '@type': 'ListItem', position: 2, name: 'Articles', item: `${cleanOrigin}/articles` },
            { '@type': 'ListItem', position: 3, name: article.headline, item: canonicalUrl }
          ]
        }
      ];

      if (article.slug === 'find-volunteer-opportunities-in-africa') {
        graph.push({
          '@type': 'HowTo',
          name: 'How to Easily Apply to Volunteer Opportunities in Africa on DoNest',
          description:
            'Four simple stages to find verified volunteer opportunities in Cameroon, Nigeria, Kenya & beyond and receive a signed Attestation of Service.',
          image: ogImage,
          step: [
            {
              '@type': 'HowToStep',
              position: 1,
              name: 'Find Your Opportunity',
              text: 'Visit the DoNest Volunteer Hub and search by city, cause, or required skill set (e.g., tutor, coach, mentor).'
            },
            {
              '@type': 'HowToStep',
              position: 2,
              name: 'Select & Apply',
              text: 'Open any active volunteer listing, fill out the quick application form, and submit it directly to the host organization.'
            },
            {
              '@type': 'HowToStep',
              position: 3,
              name: 'Volunteer With Purpose',
              text: 'Show up, engage with the community, and carry out your meaningful service activities without administrative hassle.'
            },
            {
              '@type': 'HowToStep',
              position: 4,
              name: 'Receive Your Verified Attestation',
              text: 'Receive your signed Virtual Impact Certificate and Attestation of Service confirming your volunteer hours for CV, LinkedIn, school, or scholarships.'
            }
          ]
        });
      } else if (article.slug === 'ngo-volunteer-opportunities-in-cameroon') {
        graph.push({
          '@type': 'HowTo',
          name: 'How to Apply for a Volunteer Role in Cameroon in 4 Steps',
          description:
            'Apply directly to verified NGOs and orphanages in Douala, Yaoundé, Buea, Limbe, Bamenda, and Kumba and earn an official Attestation of Service.',
          image: ogImage,
          step: [
            {
              '@type': 'HowToStep',
              position: 1,
              name: 'Explore Open Roles',
              text: 'Head over to the DoNest Volunteer Hub and browse active listings across Cameroon by city or skill category.'
            },
            {
              '@type': 'HowToStep',
              position: 2,
              name: 'Review Project Details',
              text: 'Click "Learn More" on any opportunity to view the organization’s mission, location, schedule, and specific requirements.'
            },
            {
              '@type': 'HowToStep',
              position: 3,
              name: 'Submit Your Quick Application',
              text: 'Complete the simple online form—no complicated paperwork required.'
            },
            {
              '@type': 'HowToStep',
              position: 4,
              name: 'Show Up & Earn Your Attestation',
              text: 'Coordinate with the nonprofit director, complete your volunteer hours, and download your verified Attestation of Service.'
            }
          ]
        });
      } else if (article.slug === 'ngo-volunteer-opportunities-in-ghana') {
        graph.push({
          '@type': 'HowTo',
          name: 'How to Apply for an NGO Volunteer Role in Ghana in 4 Steps',
          description:
            'Apply directly to verified nonprofits and orphanages in Accra, Kumasi, Tamale, Cape Coast, and Takoradi and earn an official Attestation of Service.',
          image: ogImage,
          step: [
            {
              '@type': 'HowToStep',
              position: 1,
              name: 'Explore Open Listings in Ghana',
              text: 'Visit the DoNest Volunteer Hub and search open roles or filter nonprofits across Accra, Kumasi, Tamale, and Cape Coast.'
            },
            {
              '@type': 'HowToStep',
              position: 2,
              name: 'Review Project Details & Commitment',
              text: 'Read the host organization profile, location, weekly schedule, and specific skills needed.'
            },
            {
              '@type': 'HowToStep',
              position: 3,
              name: 'Submit Your Direct Application',
              text: 'Enter your contact details and submit your application straight to the local NGO coordinator with zero middleman fees.'
            },
            {
              '@type': 'HowToStep',
              position: 4,
              name: 'Serve & Receive Your Attestation',
              text: 'Complete your community service hours and receive your signed Virtual Impact Certificate and Attestation of Service.'
            }
          ]
        });
      }

      jsonLd = { '@context': 'https://schema.org', '@graph': graph };

      return {
        title,
        description,
        keywords,
        canonicalUrl,
        ogType,
        ogImage,
        ogImageAlt,
        robots,
        articleMeta,
        jsonLd
      };
    }
  }

  // 3. Check Individual Volunteer Opportunity Page (/:username/volunteer/:postSlug)
  const volSegments = routeKey.split('/');
  if (volSegments.length === 3 && volSegments[1] === 'volunteer') {
    const ngo = liveNgos.find(n => n.username === volSegments[0]);
    const post = findVolunteerPostBySlug(ngo, volSegments[2]);
    if (ngo && post) {
      const oppLocation = (post.location || getCleanLocation(ngo)).trim();
      const oppSlug = getVolunteerOpportunitySlug(post);
      canonicalUrl = `${cleanOrigin}/${ngo.username}/volunteer/${oppSlug}`;
      title = `${post.title} – Volunteer Opportunity for ${ngo.name} | DoNest`;
      const rawDetail = (post.details || '').replace(/\s+/g, ' ').trim();
      const snippet = rawDetail.length > 95 ? `${rawDetail.slice(0, 95)}...` : rawDetail;
      description = `Apply as a ${post.title} for ${ngo.name} (${oppLocation}). ${snippet} Attestation of Service eligible via DoNest Africa.`;
      keywords = `${post.title}, volunteer opportunity ${oppLocation}, find volunteer opportunities for ${ngo.name}, ${ngo.name} volunteer, ${post.category || 'community volunteering'}, volunteer in Africa, attestation of service, DoNest`;
      ogImage =
        ngo.logo && (ngo.logo.startsWith('http://') || ngo.logo.startsWith('https://'))
          ? ngo.logo
          : DEFAULT_OG_IMAGE;
      ogImageAlt = `${post.title} volunteer opportunity at ${ngo.name}`;

      jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Event',
            name: `${post.title} at ${ngo.name}`,
            description: post.details || description,
            url: canonicalUrl,
            eventStatus: 'https://schema.org/EventScheduled',
            eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
            isAccessibleForFree: true,
            startDate: post.startDate || new Date().toISOString().slice(0, 10),
            endDate: post.endDate || 'Ongoing',
            location: {
              '@type': 'Place',
              name: ngo.name,
              address: {
                '@type': 'PostalAddress',
                streetAddress: oppLocation,
                addressLocality: ngo.city || oppLocation
              }
            },
            organizer: {
              '@type': 'NonProfit',
              name: ngo.name,
              url: `${cleanOrigin}/${ngo.username}`,
              telephone: ngo.phone || undefined
            },
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
              url: canonicalUrl
            }
          },
          {
            '@type': 'VolunteerAction',
            name: post.title,
            description: post.details || description,
            url: canonicalUrl,
            location: {
              '@type': 'Place',
              name: oppLocation
            },
            recipient: {
              '@type': 'NonProfit',
              name: ngo.name,
              url: `${cleanOrigin}/${ngo.username}`
            }
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: cleanOrigin },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Volunteer Opportunities',
                item: `${cleanOrigin}/volunteers`
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: ngo.name,
                item: `${cleanOrigin}/${ngo.username}`
              },
              { '@type': 'ListItem', position: 4, name: post.title, item: canonicalUrl }
            ]
          }
        ]
      };

      return {
        title,
        description,
        keywords,
        canonicalUrl,
        ogType,
        ogImage,
        ogImageAlt,
        robots,
        jsonLd
      };
    }
  }

  // 4. Check Active NGO Profile Page (/:username)
  const activeNgo = liveNgos.find(n => n.username === routeKey);
  if (activeNgo) {
    const loc = getCleanLocation(activeNgo);
    const activePosts = (activeNgo.volunteerPostings || []).filter(p => p.status !== 'deleted');
    const activeNeeds = (activeNgo.physicalNeeds || []).filter(n => n.status !== 'deleted');
    const topNeeds = activeNeeds
      .map(n => n.item)
      .slice(0, 3)
      .join(', ');
    const topVols = activePosts
      .map(p => p.title)
      .slice(0, 3)
      .join(', ');

    title = `Find Volunteer Opportunities for ${activeNgo.name} (${loc}) | DoNest`;
    description = `Find volunteer opportunities for ${activeNgo.name} in ${loc}${
      topVols ? ` including ${topVols}` : ''
    }${topNeeds ? `, and support vital physical needs (${topNeeds})` : ''}. Connect directly on DoNest.`;
    keywords = `find volunteer opportunities for ${activeNgo.name}, volunteer at ${activeNgo.name}, ${activeNgo.name}, ${loc} nonprofit, ${loc} orphanage, donate to ${activeNgo.name}, volunteer ${loc}, African charity needs, DoNest`;
    canonicalUrl = `${cleanOrigin}/${activeNgo.username}`;
    ogImage =
      activeNgo.logo &&
      (activeNgo.logo.startsWith('http://') || activeNgo.logo.startsWith('https://'))
        ? activeNgo.logo
        : DEFAULT_OG_IMAGE;
    ogImageAlt = `Find volunteer opportunities and support ${activeNgo.name} on DoNest`;

    const graph: any[] = [
      {
        '@type': 'NonProfit',
        name: activeNgo.name,
        description: activeNgo.description || description,
        url: canonicalUrl,
        image: ogImage,
        address: {
          '@type': 'PostalAddress',
          streetAddress: loc,
          addressLocality: activeNgo.city || loc
        },
        areaServed: loc,
        telephone: activeNgo.phone || undefined,
        sameAs: activeNgo.website ? [activeNgo.website] : undefined
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: cleanOrigin },
          { '@type': 'ListItem', position: 2, name: activeNgo.name, item: canonicalUrl }
        ]
      }
    ];

    if (activePosts.length > 0) {
      graph.push({
        '@type': 'ItemList',
        name: `Volunteer Opportunities at ${activeNgo.name}`,
        numberOfItems: activePosts.length,
        itemListElement: activePosts.map((post, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: post.title,
          url: `${cleanOrigin}${getVolunteerOpportunityPath(activeNgo, post)}`
        }))
      });
    }

    jsonLd = { '@context': 'https://schema.org', '@graph': graph };
    return {
      title,
      description,
      keywords,
      canonicalUrl,
      ogType,
      ogImage,
      ogImageAlt,
      robots,
      jsonLd
    };
  }

  // 5. Solutions, UseCases, Company & Legal Pages
  if (routeKey === 'solutions/volunteer-opportunities') {
    title = 'Find Live Volunteer Opportunities Across Africa | DoNest Volunteer Hub';
    description =
      'Browse live volunteer opportunities in nonprofits and children’s homes across Africa—Cameroon, Nigeria, Kenya & beyond. Apply fast and earn an official Attestation of Service.';
    keywords =
      'volunteer opportunities Africa, NGO volunteer openings Africa, weekend volunteering Africa, teaching coding volunteering, DoNest volunteer hub';
    canonicalUrl = `${cleanOrigin}/volunteers`;

    const allLiveOpps = liveNgos.flatMap(ngo =>
      (ngo.volunteerPostings || [])
        .filter(p => p.status !== 'deleted')
        .map(post => ({
          name: `${post.title} at ${ngo.name}`,
          url: `${cleanOrigin}${getVolunteerOpportunityPath(ngo, post)}`
        }))
    );

    jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          name: title,
          description,
          url: canonicalUrl,
          publisher: orgPublisher
        },
        {
          '@type': 'ItemList',
          name: 'Live Volunteer Opportunities Across Africa',
          numberOfItems: allLiveOpps.length,
          itemListElement: allLiveOpps.slice(0, 50).map((opp, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: opp.name,
            url: opp.url
          }))
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: cleanOrigin },
            { '@type': 'ListItem', position: 2, name: 'Volunteer Opportunities', item: canonicalUrl }
          ]
        }
      ]
    };
  } else if (routeKey === 'solutions/donations') {
    title = 'Direct Physical Item Donations for African Nonprofits | DoNest';
    description =
      "Bypass middlemen and donate clothing, shoes, non-perishable food, textbooks, and hygiene kits directly to verified children's homes and nonprofits across Africa.";
    keywords =
      'physical donations Africa, donate clothes Africa, food donation Africa, orphanage supplies, direct giving Africa';
    canonicalUrl = `${cleanOrigin}/solution/donations`;
  } else if (routeKey === 'solutions/volunteer-network') {
    title = 'Pan-African Community Volunteer Hub – Tutor, Coach & Mentor | DoNest';
    description =
      "Join Africa's biggest volunteer hub for nonprofits, orphanages and children's homes. Offer tutoring, coaching, IT skills, or health outreach and earn an Attestation of Service.";
    keywords =
      'volunteer hub Africa, teaching volunteer Africa, sports coaching Africa, volunteer attestation, DoNest volunteer hub';
    canonicalUrl = `${cleanOrigin}/solution/volunteer-network`;
  } else if (routeKey === 'solutions/csr') {
    title = 'Corporate Social Responsibility (CSR) & Community Giving | DoNest Africa';
    description =
      'Empower African communities through strategic corporate giving, food drives, and team volunteer days with transparent audit logs and verified receipts.';
    keywords =
      'corporate CSR Africa, business giving Africa, corporate volunteering Africa, audited NGO donations Africa';
    canonicalUrl = `${cleanOrigin}/solution/csr`;
  } else if (routeKey === 'usecases/for-ngos') {
    title = "Register Your Non-Profit or Children's Center in Africa | DoNest";
    description =
      'Access a free public profile to showcase your physical item needs, list SEO-ready volunteer opportunities, and connect with donors across Africa.';
    keywords = 'register orphanage Africa, list NGO Africa, nonprofit profile Africa, charity registration Africa';
    canonicalUrl = `${cleanOrigin}/usecase/for-ngos`;
  } else if (routeKey === 'usecases/for-donors') {
    title = 'Citizen Donor Guide: Donating Goods & Time Safely in Africa | DoNest';
    description =
      'Turn extra clothes, shoes, books, and food into real local change across Africa. Step-by-step guide for personal drop-offs and verified handovers.';
    keywords = 'donor guide Africa, donate used clothes, family charity dropoff, direct handover Africa';
    canonicalUrl = `${cleanOrigin}/usecase/for-donors`;
  } else if (routeKey === 'usecases/for-companies') {
    title = 'Corporate Impact & Goodwill Partner Guide | DoNest Africa';
    description =
      "Build shared corporate value, elevate employee morale, and earn verified impact badging through direct physical support for African children's homes and nonprofits.";
    keywords = 'company CSR guide Africa, corporate goodwill Africa, business volunteer days, employee engagement';
    canonicalUrl = `${cleanOrigin}/usecase/for-companies`;
  } else if (routeKey === 'company/about-us') {
    title = 'About DoNest & DoDonate Inc. – Pan-African Direct Giving Mission';
    description =
      'Connecting millions of people to nonprofits in need. We are building the biggest volunteer hub across Africa for verified orphanages and community nonprofits.';
    keywords = 'about DoNest, DoDonate Inc, pan African charity, volunteer hub Africa, direct giving mission';
    canonicalUrl = `${cleanOrigin}/about-us`;
  } else if (routeKey === 'company/contact-us') {
    title = 'Contact DoNest Operations & Support | Pan-African Hub';
    description =
      'Get in touch with our operations team via WhatsApp (+237 671991540) or email (support@dodonate.org).';
    keywords = 'contact DoNest, DoDonate phone number, Africa NGO contact, African charity support';
    canonicalUrl = `${cleanOrigin}/contact-us`;
  } else if (routeKey === 'company/impact-stories') {
    title = 'Impact Stories & Delivery Verification Logs | DoNest Africa';
    description =
      'Read verified impact stories of physical item deliveries, volunteer placements, and community support across African orphanages and nonprofits.';
    keywords = 'DoNest impact stories Africa, orphanage delivery photos, volunteer success Africa';
    canonicalUrl = `${cleanOrigin}/impact-stories`;
  } else if (routeKey === 'legal/terms') {
    title = 'Terms of Use & Platform Policy | DoNest Africa';
    description =
      'Terms of service and platform usage guidelines for donors, volunteers, and registered non-profit organizations on DoNest Africa.';
    canonicalUrl = `${cleanOrigin}/legal/terms`;
  } else if (routeKey === 'legal/privacy') {
    title = 'Privacy Policy & Data Security | DoNest Africa';
    description =
      'Learn how DoNest protects personal data, volunteer contact information, and donor records across Africa in accordance with international security standards.';
    canonicalUrl = `${cleanOrigin}/legal/privacy`;
  } else if (routeKey === 'legal/safety') {
    title = 'Safety & Non-Profit Verification Standards | DoNest Africa';
    description =
      'Read our strict 4-step verification framework ensuring every listed orphanage and nonprofit in Africa is verified and operating with transparency.';
    canonicalUrl = `${cleanOrigin}/legal/safety`;
  }

  return {
    title,
    description,
    keywords,
    canonicalUrl,
    ogType,
    ogImage,
    ogImageAlt,
    robots,
    articleMeta,
    jsonLd
  };
}
