import React, { useState, useEffect, useRef } from 'react';
import { CAMEROON_NGOS } from './data/ngos';
import { NGO, PhysicalNeed, VolunteerPosting, CashWishlistItem } from './types';
import Logo from './components/Logo';
import { VolunteerCardIllustration } from './components/VolunteerCardIllustration';
import { ExpandableText } from './components/ExpandableText';
import DoDonateEngine from './components/DoDonateEngine';
import NgoCard from './components/NgoCard';
import SearchHero from './components/SearchHero';
import { 
  Search, 
  MapPin, 
  Heart, 
  Phone, 
  ArrowRight, 
  MessageCircle, 
  Sparkles, 
  Check, 
  Plus, 
  Gift, 
  ChevronLeft, 
  Info, 
  Coins, 
  X,
  Globe,
  BookOpen,
  DollarSign,
  TrendingUp,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Menu,
  ChevronDown,
  ChevronUp,
  LayoutGrid,
  Award,
  Building2,
  ExternalLink,
  Users,
  Facebook,
  Instagram,
  Twitter,
  Music,
  Youtube,
  Package,
  Calendar,
  BellRing
} from 'lucide-react';
import { 
  DonationsPage, 
  VolunteerNetworkPage, 
  VolunteerOpportunitiesPage,
  CsrPage, 
  WishlistPage,
  ForNgosPage, 
  ForDonorsPage, 
  ForCompaniesPage, 
  AboutUsPage, 
  ImpactStoriesPage, 
  ContactUsPage,
  TermsPage,
  PrivacyPage,
  SafetyPage
} from './components/ServicePages';

const getCategoryIllustration = (category: string) => {
  const cat = (category || '').toLowerCase();
  if (cat.includes('food') || cat.includes('nourriture')) {
    return {
      emoji: '🍲',
      bg: 'bg-amber-50 border-amber-100 text-amber-600',
      title: 'Food / Nutrition'
    };
  }
  if (cat.includes('cloth') || cat.includes('vêtement') || cat.includes('wear')) {
    return {
      emoji: '👕',
      bg: 'bg-blue-50 border-blue-100 text-blue-600',
      title: 'Clothing / Wearables'
    };
  }
  if (cat.includes('educ') || cat.includes('book') || cat.includes('school') || cat.includes('livre') || cat.includes('learning')) {
    return {
      emoji: '📚',
      bg: 'bg-purple-50 border-purple-100 text-purple-600',
      title: 'Education / Learning'
    };
  }
  if (cat.includes('hyg') || cat.includes('soap') || cat.includes('clean') || cat.includes('toilet') || cat.includes('prop')) {
    return {
      emoji: '🧼',
      bg: 'bg-teal-50 border-teal-100 text-teal-600',
      title: 'Hygiene / Sanitation'
    };
  }
  if (cat.includes('shoe') || cat.includes('chaussure')) {
    return {
      emoji: '👟',
      bg: 'bg-orange-50 border-orange-100 text-orange-600',
      title: 'Shoes / Footwear'
    };
  }
  return {
    emoji: '📦',
    bg: 'bg-slate-50 border-slate-100 text-slate-600',
    title: 'Essential Item'
  };
};

const getCleanWebsiteUrl = (url: string | undefined): string => {
  if (!url) return '';
  let clean = url.trim();
  while (clean.startsWith('/')) {
    clean = clean.slice(1);
  }
  if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
    clean = `https://${clean}`;
  }
  return clean;
};

const getRoutingKeyFromPathname = (pathname: string): string => {
  // Strip trailing slash if present
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
  
  // For NGO profiles /{username}
  const potentialUsername = path.startsWith('/') ? path.slice(1) : path;
  if (potentialUsername && !potentialUsername.includes('/')) {
    return potentialUsername;
  }
  
  return '';
};

function NgoMissionBio({ description, lang }: { description: string; lang: 'EN' | 'FR' }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 250;

  if (!description) return null;

  if (description.length <= maxLength) {
    return (
      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
        {description}
      </p>
    );
  }

  const displayText = isExpanded ? description : `${description.slice(0, maxLength)}...`;

  return (
    <div className="space-y-2">
      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
        {displayText}
      </p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#00C853] hover:text-emerald-700 cursor-pointer transition-colors focus:outline-hidden"
      >
        {isExpanded ? (
          <>
            <span>{lang === 'EN' ? 'See Less' : 'Voir Moins'}</span>
            <ChevronUp className="w-3.5 h-3.5 stroke-[2.5]" />
          </>
        ) : (
          <>
            <span>{lang === 'EN' ? 'See More' : 'Voir Plus'}</span>
            <ChevronDown className="w-3.5 h-3.5 stroke-[2.5]" />
          </>
        )}
      </button>
    </div>
  );
}

export default function App() {
  // Navigation Routing Hash State
  const [currentHash, setCurrentHash] = useState<string>('');

  // Hamburger Menu States
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isUseCasesOpen, setIsUseCasesOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);

  const navigate = (routeKey: string) => {
    let targetPath = '/';
    if (routeKey === 'solutions/volunteer-opportunities') {
      targetPath = '/volunteers';
    } else if (routeKey === 'solutions/volunteer-network') {
      targetPath = '/solution/volunteer-network';
    } else if (routeKey === 'solutions/donations') {
      targetPath = '/solution/donations';
    } else if (routeKey === 'solutions/csr') {
      targetPath = '/solution/csr';
    } else if (routeKey === 'usecases/for-ngos') {
      targetPath = '/usecase/for-ngos';
    } else if (routeKey === 'usecases/for-donors') {
      targetPath = '/usecase/for-donors';
    } else if (routeKey === 'usecases/for-companies') {
      targetPath = '/usecase/for-companies';
    } else if (routeKey === 'company/about-us') {
      targetPath = '/about-us';
    } else if (routeKey === 'company/contact-us') {
      targetPath = '/contact-us';
    } else if (routeKey === 'company/impact-stories') {
      targetPath = '/impact-stories';
    } else if (routeKey === 'legal/terms') {
      targetPath = '/legal/terms';
    } else if (routeKey === 'legal/privacy') {
      targetPath = '/legal/privacy';
    } else if (routeKey === 'legal/safety') {
      targetPath = '/legal/safety';
    } else if (routeKey) {
      targetPath = `/${routeKey}`;
    }
    
    window.history.pushState(null, '', targetPath);
    window.dispatchEvent(new Event('popstate'));
    setIsMenuOpen(false);
  };

  const menuRef = useRef<HTMLDivElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  // Loaded NGOs with local updates applied
  const [ngos, setNgos] = useState<NGO[]>([]);

  // Filtering and Searching states
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Active funding modal
  const [fundingTarget, setFundingTarget] = useState<{ ngo: NGO; item: CashWishlistItem } | null>(null);

  // Active volunteer application modal
  const [activeApplyPost, setActiveApplyPost] = useState<{ ngo: NGO; post: VolunteerPosting } | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantLocation, setApplicantLocation] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantMessage, setApplicantMessage] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Stay Connected modal states (CRM lead capture)
  const [isStayConnectedOpen, setIsStayConnectedOpen] = useState(false);
  const [stayConnectedForm, setStayConnectedForm] = useState({ name: '', email: '', phone: '' });
  const [stayConnectedStatus, setStayConnectedStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [stayConnectedError, setStayConnectedError] = useState('');

  // Active tab on the NGO profile detail page (Section A vs Section B)
  const [activeProfileTab, setActiveProfileTab] = useState<'needs' | 'volunteer'>('needs');

  // User's committed physical items helper
  const [committedDonationInputs, setCommittedDonationInputs] = useState<{ [needId: string]: number }>({});
  
  // App languages ("EN" or "FR" representing bilingual Cameroon)
  const [lang, setLang] = useState<'EN' | 'FR'>(() => {
    try {
      const saved = localStorage.getItem('donest_lang');
      if (saved === 'EN' || saved === 'FR') return saved;
      // Auto-detect browser language
      const browserLang = (navigator.language || (navigator as any).userLanguage || '').toLowerCase();
      if (browserLang.startsWith('fr')) return 'FR';
    } catch (e) {
      // Fallback
    }
    return 'EN';
  });

  const changeLanguage = (newLang: 'EN' | 'FR') => {
    setLang(newLang);
    try {
      localStorage.setItem('donest_lang', newLang);
    } catch (e) {}
  };

  const [supabaseConfig, setSupabaseConfig] = useState<{ enabled: boolean; url: string; key: string } | null>(null);

  // Fetch Supabase configuration on mount
  useEffect(() => {
    fetch('/api/config')
      .then(res => res.json())
      .then(config => {
        if (config.supabaseEnabled && config.supabaseUrl && config.supabaseKey) {
          setSupabaseConfig({
            enabled: true,
            url: config.supabaseUrl,
            key: config.supabaseKey
          });
        }
      })
      .catch(err => console.warn('Could not load Supabase config:', err));
  }, []);

  // Configure real-time subscription
  useEffect(() => {
    if (!supabaseConfig) return;

    import('@supabase/supabase-js').then(({ createClient }) => {
      const client = createClient(supabaseConfig.url, supabaseConfig.key);

      // Channel for volunteer requests updates
      const volunteerChannel = client
        .channel('volunteer-requests-realtime')
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'volunteer_requests'
          },
          (payload: any) => {
            const updatedRow = payload.new;
            if (updatedRow) {
              setNgos(prevNgos => prevNgos.map(n => {
                const updatedPostings = n.volunteerPostings.map(post => {
                  if (post.id === updatedRow.id) {
                    return {
                      ...post,
                      initialInterestCount: updatedRow.likes_count || 0,
                      volunteers_joined: updatedRow.volunteers_joined || 0,
                      volunteers_needed: updatedRow.volunteers_needed || 3,
                      status: updatedRow.status
                    };
                  }
                  return post;
                });
                return {
                  ...n,
                  volunteerPostings: updatedPostings
                };
              }));
            }
          }
        )
        .subscribe();

      // Channel for essential needs updates
      const needsChannel = client
        .channel('essential-needs-realtime')
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'essential_needs'
          },
          (payload: any) => {
            const updatedRow = payload.new;
            if (updatedRow) {
              setNgos(prevNgos => prevNgos.map(n => {
                const updatedNeeds = n.physicalNeeds.map(need => {
                  if (need.id === updatedRow.id) {
                    return {
                      ...need,
                      details: updatedRow.description || need.details,
                      status: updatedRow.status
                    };
                  }
                  return need;
                });
                return {
                  ...n,
                  physicalNeeds: updatedNeeds
                };
              }));
            }
          }
        )
        .subscribe();

      return () => {
        client.removeChannel(volunteerChannel);
        client.removeChannel(needsChannel);
      };
    });
  }, [supabaseConfig]);

  // Load state and listen to popstate clean URL routing
  useEffect(() => {
    // Fetch NGOs from the backend API
    const loadNgos = async () => {
      try {
        const response = await fetch('/api/ngos');
        const data = await response.json();
        if (data && Array.isArray(data)) {
          setNgos(data);
          localStorage.setItem('donest_ngos_db_v1', JSON.stringify(data));
        }
      } catch (err) {
        console.warn('Backend fetch failed, falling back to local storage:', err);
        const storedNgos = localStorage.getItem('donest_ngos_db_v1');
        if (storedNgos) {
          try {
            setNgos(JSON.parse(storedNgos));
          } catch (e) {
            setNgos(CAMEROON_NGOS);
          }
        } else {
          setNgos(CAMEROON_NGOS);
          localStorage.setItem('donest_ngos_db_v1', JSON.stringify(CAMEROON_NGOS));
        }
      }
    };

    loadNgos();

    const handlePathChange = () => {
      // Use pathname first, fallback to hash if there is any
      let pathKey = getRoutingKeyFromPathname(window.location.pathname);
      if (!pathKey && window.location.hash) {
        pathKey = window.location.hash.replace('#', '');
        if (pathKey) {
          // Normalize hash target paths to clean paths
          let targetPath = `/${pathKey}`;
          if (pathKey === 'solutions/volunteer-opportunities') {
            targetPath = '/volunteers';
          } else if (pathKey === 'solutions/volunteer-network') {
            targetPath = '/solution/volunteer-network';
          } else if (pathKey === 'solutions/donations') {
            targetPath = '/solution/donations';
          } else if (pathKey === 'solutions/csr') {
            targetPath = '/solution/csr';
          } else if (pathKey === 'usecases/for-ngos') {
            targetPath = '/usecase/for-ngos';
          } else if (pathKey === 'usecases/for-donors') {
            targetPath = '/usecase/for-donors';
          } else if (pathKey === 'usecases/for-companies') {
            targetPath = '/usecase/for-companies';
          } else if (pathKey === 'company/about-us') {
            targetPath = '/about-us';
          } else if (pathKey === 'company/contact-us') {
            targetPath = '/contact-us';
          } else if (pathKey === 'company/impact-stories') {
            targetPath = '/impact-stories';
          } else if (pathKey === 'legal/terms') {
            targetPath = '/legal/terms';
          } else if (pathKey === 'legal/privacy') {
            targetPath = '/legal/privacy';
          } else if (pathKey === 'legal/safety') {
            targetPath = '/legal/safety';
          }
          window.history.replaceState(null, '', targetPath);
        }
      }
      setCurrentHash(pathKey);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePathChange);
    // Trigger initial check
    handlePathChange();

    // Intercept clicks on links for local client-side routing
    const handleLocalLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && (href.startsWith('/') || href.startsWith('#'))) {
          // Skip absolute external URLs (e.g. https://wa.me) or mailto
          if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
            return;
          }
          
          e.preventDefault();
          
          let routeKey = '';
          if (href.startsWith('#')) {
            routeKey = href.slice(1);
          } else {
            if (href === '/') {
              routeKey = '';
            } else if (href === '/volunteers') {
              routeKey = 'solutions/volunteer-opportunities';
            } else if (href === '/solution/volunteer-network') {
              routeKey = 'solutions/volunteer-network';
            } else if (href === '/solution/donations') {
              routeKey = 'solutions/donations';
            } else if (href === '/solution/csr') {
              routeKey = 'solutions/csr';
            } else if (href === '/usecase/for-ngos') {
              routeKey = 'usecases/for-ngos';
            } else if (href === '/usecase/for-donors') {
              routeKey = 'usecases/for-donors';
            } else if (href === '/usecase/for-companies') {
              routeKey = 'usecases/for-companies';
            } else if (href === '/about-us') {
              routeKey = 'company/about-us';
            } else if (href === '/contact-us') {
              routeKey = 'company/contact-us';
            } else if (href === '/impact-stories') {
              routeKey = 'company/impact-stories';
            } else if (href === '/legal/terms') {
              routeKey = 'legal/terms';
            } else if (href === '/legal/privacy') {
              routeKey = 'legal/privacy';
            } else if (href === '/legal/safety') {
              routeKey = 'legal/safety';
            } else {
              // It's /{username}
              routeKey = href.slice(1);
            }
          }
          
          let targetPath = href;
          // Normalize hash target paths to clean paths
          if (href.startsWith('#')) {
            const hashKey = href.slice(1);
            if (hashKey === 'solutions/volunteer-opportunities') {
              targetPath = '/volunteers';
            } else if (hashKey === 'solutions/volunteer-network') {
              targetPath = '/solution/volunteer-network';
            } else if (hashKey === 'solutions/donations') {
              targetPath = '/solution/donations';
            } else if (hashKey === 'solutions/csr') {
              targetPath = '/solution/csr';
            } else if (hashKey === 'usecases/for-ngos') {
              targetPath = '/usecase/for-ngos';
            } else if (hashKey === 'usecases/for-donors') {
              targetPath = '/usecase/for-donors';
            } else if (hashKey === 'usecases/for-companies') {
              targetPath = '/usecase/for-companies';
            } else if (hashKey === 'company/about-us') {
              targetPath = '/about-us';
            } else if (hashKey === 'company/contact-us') {
              targetPath = '/contact-us';
            } else if (hashKey === 'company/impact-stories') {
              targetPath = '/impact-stories';
            } else if (hashKey === 'legal/terms') {
              targetPath = '/legal/terms';
            } else if (hashKey === 'legal/privacy') {
              targetPath = '/legal/privacy';
            } else if (hashKey === 'legal/safety') {
              targetPath = '/legal/safety';
            } else if (hashKey) {
              targetPath = `/${hashKey}`;
            } else {
              targetPath = '/';
            }
          }

          window.history.pushState(null, '', targetPath);
          window.dispatchEvent(new Event('popstate'));
          setIsMenuOpen(false);
        }
      }
    };

    document.addEventListener('click', handleLocalLinkClick, true);

    return () => {
      window.removeEventListener('popstate', handlePathChange);
      document.removeEventListener('click', handleLocalLinkClick, true);
    };
  }, []);

  // Auto-expand hamburger menu categories if current hash matches them
  useEffect(() => {
    if (currentHash.startsWith('solutions/')) setIsSolutionsOpen(true);
    if (currentHash.startsWith('usecases/')) setIsUseCasesOpen(true);
    if (currentHash.startsWith('company/')) setIsCompanyOpen(true);
  }, [currentHash]);

  // Keep hamburger categories closed when menu is toggled closed
  useEffect(() => {
    if (!isMenuOpen) {
      setIsSolutionsOpen(false);
      setIsUseCasesOpen(false);
      setIsCompanyOpen(false);
    }
  }, [isMenuOpen]);

  // Click outside to close hamburger menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Auto-reset NGO profile active tab to physical needs on page navigation
  useEffect(() => {
    setActiveProfileTab('needs');
  }, [currentHash]);

  // Dynamic Comprehensive Client-Side SEO & Schema.org Engine Hook
  useEffect(() => {
    const activeNgo = ngos.find(n => n.username === currentHash);
    let title = 'DoNest - Support Orphanages & Find Volunteer Opportunities in Cameroon';
    let description = 'DoNest is Cameroon\'s premier platform connecting donors directly to verified orphanages and children\'s homes. Support local centers with physical items or apply for live volunteer openings in Buea, Douala, Yaoundé, and Limbe.';
    let keywords = 'Cameroon orphanages, volunteer opportunities Buea, physical donations Douala, Yaounde charity, children homes Limbe, DoNest, DoDonate';
    let canonicalUrl = `${window.location.origin}${window.location.pathname}`;
    let ogImage = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1200';
    let jsonLdType = 'WebSite';

    if (activeNgo) {
      title = `${activeNgo.name} (${activeNgo.city}) - Physical Needs & Volunteer Openings | DoNest Cameroon`;
      description = `Directly support ${activeNgo.name} in ${activeNgo.city}, Cameroon. See current physical item needs (${activeNgo.physicalNeeds.map(n => n.item).slice(0, 3).join(', ')}) or apply for volunteer roles today.`;
      keywords = `${activeNgo.name}, ${activeNgo.city} orphanage, donate to ${activeNgo.name}, volunteer ${activeNgo.city}, Cameroon NGO needs, children home ${activeNgo.city}`;
      ogImage = activeNgo.logo && activeNgo.logo.startsWith('http') ? activeNgo.logo : ogImage;
      jsonLdType = 'NGO';
    } else if (currentHash === 'solutions/donations') {
      title = 'Direct Physical Item Donations for Cameroonian Orphanages | DoNest';
      description = 'Bypass middlemen and donate clothing, shoes, non-perishable food, textbooks, and hygiene kits directly to verified children\'s homes across Cameroon.';
      keywords = 'physical donations Cameroon, donate clothes Buea, food donation Douala, orphanage supplies Yaounde, direct giving Cameroon';
    } else if (currentHash === 'solutions/volunteer-network') {
      title = 'Community Volunteer Hub Cameroon - Tutor, Coach & Mentor | DoNest';
      description = 'Join Cameroon\'s premier volunteer hub for orphanages and children\'s homes. Offer tutoring, sports coaching, IT skills, or medical checkups and receive an official Attestation of Service.';
      keywords = 'volunteer hub Cameroon, teaching volunteer Buea, sports coaching Douala, volunteer attestation, DoNest volunteer hub';
    } else if (currentHash === 'solutions/volunteer-opportunities') {
      title = 'Live Volunteer Postings & Openings in Cameroon Orphanages | DoNest';
      description = 'Browse live volunteer positions across Buea, Douala, Yaoundé, and Limbe. Connect directly via WhatsApp to coordinate schedules.';
      keywords = 'volunteer jobs Cameroon, NGO openings Buea, weekend volunteering Yaounde, volunteer positions Douala';
    } else if (currentHash === 'solutions/csr') {
      title = 'Corporate Social Responsibility (CSR) & Community Giving | DoNest Cameroon';
      description = 'Empower local communities through strategic corporate giving, food drives, and team volunteer days with transparent audit logs and receipts.';
      keywords = 'corporate CSR Cameroon, business giving Buea, corporate volunteering Douala, audited NGO donations';
    } else if (currentHash === 'solutions/wishlist') {
      title = 'Urgent Item Wishlist - Verified Cameroonian Children\'s Homes | DoNest';
      description = 'View high-priority physical item wishlists from verified Cameroonian orphanages in urgent need of school books, food supplies, and bedding.';
      keywords = 'urgent orphanage wishlist, high priority needs Cameroon, donate food Buea, books Yaounde';
    } else if (currentHash === 'usecases/for-ngos') {
      title = 'Register Your Orphanage or Children\'s Center | DoNest Cameroon';
      description = 'Access a free public profile to showcase your physical item needs, educational volunteer openings, and connect with corporate sponsors across Cameroon.';
      keywords = 'register orphanage Cameroon, list NGO Buea, nonprofit profile Yaounde, charity registration';
    } else if (currentHash === 'usecases/for-donors') {
      title = 'Citizen Donor Guide: Donating Goods & Time Safely | DoNest Cameroon';
      description = 'Turn extra clothes, shoes, books, and food into real local change. Step-by-step guide for personal drop-offs and verified handovers.';
      keywords = 'donor guide Cameroon, donate used clothes Buea, family charity dropoff, direct handover';
    } else if (currentHash === 'usecases/for-companies') {
      title = 'Corporate Impact & Goodwill Partner Guide | DoNest Cameroon';
      description = 'Build shared corporate value, elevate employee morale, and earn verified impact badging through direct physical support for Cameroonian children\'s homes.';
      keywords = 'company CSR guide, corporate goodwill Cameroon, business volunteer days, employee engagement';
    } else if (currentHash === 'company/about-us') {
      title = 'About DoNest & DoDonate Inc. - Direct Giving Mission in Cameroon';
      description = 'Meet the Cameroon-based team establishing direct, transparent digital spaces to match eager volunteers and generous physical item donors with verified orphanages.';
      keywords = 'about DoNest, DoDonate Inc, Buea Cameroon charity, direct giving mission, transparent non-profit';
    } else if (currentHash === 'company/contact-us') {
      title = 'Contact DoNest Operations & Field Support | Buea & Yaoundé Cameroon';
      description = 'Get in touch with our Cameroon field team via WhatsApp (+237 671991540) or email (support@dodonate.org). Visit our offices in Buea and Yaoundé.';
      keywords = 'contact DoNest, DoDonate phone number, Buea NGO contact, Cameroon charity support';
    } else if (currentHash === 'company/impact-stories') {
      title = 'Impact Stories & Delivery Verification Logs | DoNest Cameroon';
      description = 'Read verified impact stories of physical item deliveries, volunteer placements, and community support across Cameroonian orphanages.';
      keywords = 'DoNest impact stories, orphanage delivery photos, volunteer success Cameroon';
    } else if (currentHash === 'legal/terms') {
      title = 'Terms of Use & Platform Policy | DoNest Cameroon';
      description = 'Terms of service and platform usage guidelines for donors, volunteers, and registered non-profit organizations on DoNest.';
    } else if (currentHash === 'legal/privacy') {
      title = 'Privacy Policy & Data Security | DoNest Cameroon';
      description = 'Learn how DoNest protects personal data, volunteer contact information, and donor records in accordance with international security standards.';
    } else if (currentHash === 'legal/safety') {
      title = 'Safety & Non-Profit Verification Standards | DoNest Cameroon';
      description = 'Read our strict 4-step verification framework ensuring every listed orphanage is legal, inspected, and operating with complete transparency.';
    }

    // Update document title
    document.title = title;

    // Meta Tag Helper
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attributeName = isProperty ? 'property' : 'name';
      let tag = document.querySelector(`meta[${attributeName}="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attributeName, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    
    // Open Graph Social Meta Tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:url', canonicalUrl, true);
    updateMetaTag('og:image', ogImage, true);

    // Twitter Card Tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);

    // Canonical Tag
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // Dynamic Schema.org JSON-LD Script
    let jsonLdScript = document.querySelector('script[id="json-ld-schema"]');
    if (jsonLdScript) {
      const schemaData = activeNgo ? {
        "@context": "https://schema.org",
        "@type": "NonProfit",
        "name": activeNgo.name,
        "description": activeNgo.description,
        "url": `${window.location.origin}/${activeNgo.username}`,
        "image": activeNgo.logo,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": activeNgo.city,
          "addressCountry": "Cameroon"
        },
        "telephone": activeNgo.phone,
        "email": activeNgo.email,
        "founder": activeNgo.coordinator
      } : {
        "@context": "https://schema.org",
        "@type": jsonLdType,
        "name": "DoNest",
        "alternateName": "DoDonate Inc.",
        "url": "https://donest.org",
        "logo": "https://iili.io/CjM0PPs.png",
        "description": description,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Buea",
          "addressRegion": "South-West Region",
          "addressCountry": "Cameroon"
        },
        "telephone": "+237671991540",
        "email": "support@dodonate.org"
      };
      jsonLdScript.textContent = JSON.stringify(schemaData);
    }
  }, [currentHash, ngos, lang]);

  // Sync state changes to local storage and backend helper
  const syncNgosState = async (updatedNgos: NGO[]) => {
    setNgos(updatedNgos);
    localStorage.setItem('donest_ngos_db_v1', JSON.stringify(updatedNgos));
    try {
      await fetch('/api/ngos/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedNgos)
      });
    } catch (err) {
      console.warn('Backend sync failed, state preserved locally:', err);
    }
  };

  // 1. VolunteerHub Heart Interaction Button (Section B)
  const handleInterestClick = (ngoUsername: string, postingId: string) => {
    const key = `voted_volunteer_${postingId}`;
    const alreadyVoted = localStorage.getItem(key);
    const change = alreadyVoted ? -1 : 1;

    // Call API route to save to DB / server memory
    fetch('/api/volunteer/interest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postingId, change })
    })
    .then(res => res.json())
    .then(data => {
      console.log('✅ Interest updated in DB:', data);
    })
    .catch(err => {
      console.error('❌ Failed to update interest in DB:', err);
    });

    const updated = ngos.map(n => {
      if (n.username === ngoUsername) {
        return {
          ...n,
          volunteerPostings: n.volunteerPostings.map(post => {
            if (post.id === postingId) {
              if (alreadyVoted) {
                // Remove interest (toggle off)
                localStorage.removeItem(key);
                return {
                  ...post,
                  initialInterestCount: Math.max(0, post.initialInterestCount - 1)
                };
              } else {
                // Add interest
                localStorage.setItem(key, 'true');
                return {
                  ...post,
                  initialInterestCount: post.initialInterestCount + 1
                };
              }
            }
            return post;
          })
        };
      }
      return n;
    });
    syncNgosState(updated);
  };

  const hasInterested = (postingId: string): boolean => {
    return localStorage.getItem(`voted_volunteer_${postingId}`) === 'true';
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeApplyPost) return;

    setIsSubmitting(true);
    
    // Construct the WhatsApp URL
    const cleanPhone = activeApplyPost.ngo.phone.replace(/[^0-9]/g, '');
    const whatsappMsg = `Hi I am ${applicantName} I live in ${applicantLocation} ${applicantMessage}`;
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappMsg)}`;

    try {
      await fetch('/api/volunteer/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postingId: activeApplyPost.post.id,
          ngoUsername: activeApplyPost.ngo.username,
          name: applicantName,
          email: applicantEmail,
          phone: applicantPhone,
          location: applicantLocation,
          message: applicantMessage
        })
      });

      // Show success and open WhatsApp
      setSubmitSuccess(true);
      window.open(whatsappUrl, '_blank');
    } catch (err) {
      console.error('❌ Failed to submit volunteer application:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Stay Connected handlers (CRM Lead Capture)
  const handleOpenStayConnected = () => {
    setIsStayConnectedOpen(true);
    setStayConnectedStatus('idle');
    setStayConnectedError('');
    setStayConnectedForm({ name: '', email: '', phone: '' });
  };

  const handleCloseStayConnected = () => {
    setIsStayConnectedOpen(false);
    setStayConnectedStatus('idle');
    setStayConnectedError('');
  };

  const handleStayConnectedSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeNgo) return;
    if (!stayConnectedForm.name.trim()) {
      setStayConnectedError(lang === 'EN' ? 'Please enter your full name.' : 'Veuillez entrer votre nom complet.');
      return;
    }
    if (!stayConnectedForm.phone.trim()) {
      setStayConnectedError(lang === 'EN' ? 'Please enter your phone number.' : 'Veuillez entrer votre numéro de téléphone.');
      return;
    }

    setStayConnectedStatus('submitting');
    setStayConnectedError('');

    try {
      const res = await fetch('/api/crm/stay-connected', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ngo_id: activeNgo.id || activeNgo.username,
          ngo_slug: activeNgo.custom_slug || activeNgo.username,
          ngo_name: activeNgo.name,
          full_name: stayConnectedForm.name.trim(),
          email: stayConnectedForm.email.trim(),
          phone: stayConnectedForm.phone.trim()
        })
      });

      const data = await res.json();
      if (!res.ok && data?.error) {
        throw new Error(data.error);
      }

      setStayConnectedStatus('success');
    } catch (err: any) {
      console.error('Stay connected submission error:', err);
      setStayConnectedError(err.message || 'Something went wrong. Please try again.');
      setStayConnectedStatus('error');
    }
  };

  // 2. Physical Checklist Interactive Donations (Section A)
  const handleCommitPhysicalDonation = (ngoUsername: string, needId: string) => {
    const qtyToDonate = committedDonationInputs[needId] || 1;
    if (qtyToDonate <= 0) return;

    const updated = ngos.map(n => {
      if (n.username === ngoUsername) {
        return {
          ...n,
          physicalNeeds: n.physicalNeeds.map(need => {
            if (need.id === needId) {
              const maxAllowed = need.targetQuantity - need.currentQuantity;
              const actualDonation = Math.min(qtyToDonate, maxAllowed);
              return {
                ...need,
                currentQuantity: need.currentQuantity + actualDonation
              };
            }
            return need;
          })
        };
      }
      return n;
    });

    syncNgosState(updated);
    
    // Reset individual input count
    setCommittedDonationInputs(prev => ({
      ...prev,
      [needId]: 0
    }));

    // Trigger local feedback
    alert(
      lang === 'EN' 
        ? `Thank you! Your commitment of ${qtyToDonate} items has been logged. Please contact the orphanage coordinator via WhatsApp/Call to arrange the delivery drop-off.`
        : `Merci ! Votre engagement de ${qtyToDonate} articles a été enregistré. Veuillez contacter le coordinateur de l'orphelinat par WhatsApp/Appel pour organiser le dépôt.`
    );
  };

  // 3. Cash Wishlist Bridge callback (Section C)
  const handleFundingSuccess = (amountFunded: number) => {
    if (!fundingTarget) return;

    const { ngo, item } = fundingTarget;
    const updated = ngos.map(n => {
      if (n.username === ngo.username) {
        return {
          ...n,
          cashWishlist: n.cashWishlist.map(c => {
            if (c.id === item.id) {
              return {
                ...c,
                currentAmount: Math.min(c.targetAmount, c.currentAmount + amountFunded)
              };
            }
            return c;
          })
        };
      }
      return n;
    });

    syncNgosState(updated);
    setFundingTarget(null);
  };

  // Reset demo databases to original
  const handleResetData = () => {
    if (window.confirm(lang === 'EN' ? 'Reset directory data back to original default mock values?' : 'Réinitialiser les données du répertoire aux valeurs d\'origine ?')) {
      localStorage.removeItem('donest_ngos_db_v1');
      // Clear votes keys
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('voted_volunteer_')) {
          localStorage.removeItem(key);
        }
      }
      setNgos(CAMEROON_NGOS);
      alert(lang === 'EN' ? 'Data restored!' : 'Données restaurées !');
    }
  };

  // Filtered NGOs logic (Only show NGOs with account_status as LIVE)
  const filteredNgos = ngos.filter(ngo => {
    const isLive = !ngo.account_status || ngo.account_status === 'LIVE';
    if (!isLive) return false;

    const matchesCity = selectedCity === 'All' || ngo.city === selectedCity;
    
    const matchesQuery = searchQuery === '' || 
      ngo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ngo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ngo.physicalNeeds.some(n => n.item.toLowerCase().includes(searchQuery.toLowerCase())) ||
      ngo.city.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' ||
      ngo.physicalNeeds.some(n => n.category === selectedCategory);

    return matchesCity && matchesQuery && matchesCategory;
  });

  // Find the selected NGO profile (Only LIVE profiles accessible)
  const activeNgo = ngos.find(n => n.username === currentHash && (!n.account_status || n.account_status === 'LIVE'));

  const SERVICE_HASHES = [
    'solutions/donations',
    'solutions/volunteer-network',
    'solutions/volunteer-opportunities',
    'solutions/csr',
    'solutions/wishlist',
    'usecases/for-ngos',
    'usecases/for-donors',
    'usecases/for-companies',
    'company/about-us',
    'company/impact-stories',
    'company/contact-us',
    'legal/terms',
    'legal/privacy',
    'legal/safety'
  ];
  const isServicePage = SERVICE_HASHES.includes(currentHash);

  // List of unique cities requested
  const CITIES = ['Douala', 'Yaoundé', 'Buea', 'Bamenda', 'Kumba', 'Limbe'];

  // Categories helper
  const CATEGORIES = ['Education', 'Food', 'Clothing', 'Hygiene', 'Other'];

  return (
    <div className="min-h-screen pb-0 bg-[#FAF9F3] text-brand-dark selection:bg-brand-yellow selection:text-black">
      
      {/* Top Header Bar styled strictly and elegantly */}
      <header className="sticky top-0 z-45 bg-[#FAF9F3]/90 backdrop-blur-md border-b-2 border-gray-100 px-4 py-3.5 sm:px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between relative">
          
          {/* Logo element with brand-aligned capsule look */}
          <div 
            onClick={() => {
              navigate('');
              setIsMenuOpen(false);
            }} 
            className="cursor-pointer hover:opacity-90 transition-opacity"
          >
            <Logo />
          </div>

          {/* Action buttons: Language Toggle and Menu Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Bilingual Language Toggle (EN / FR) */}
            <div className="flex items-center bg-white border border-gray-200 rounded-xl p-1 shadow-3xs">
              <button
                type="button"
                onClick={() => changeLanguage('EN')}
                className={`px-2.5 py-1 text-xs font-black rounded-lg transition-all cursor-pointer ${
                  lang === 'EN'
                    ? 'bg-[#00C853] text-white shadow-2xs'
                    : 'text-gray-500 hover:text-brand-dark hover:bg-gray-50'
                }`}
                title="Switch to English"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => changeLanguage('FR')}
                className={`px-2.5 py-1 text-xs font-black rounded-lg transition-all cursor-pointer ${
                  lang === 'FR'
                    ? 'bg-[#00C853] text-white shadow-2xs'
                    : 'text-gray-500 hover:text-brand-dark hover:bg-gray-50'
                }`}
                title="Passer en Français"
              >
                FR
              </button>
            </div>

            <button
              ref={toggleBtnRef}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2.5 rounded-xl hover:bg-gray-100 transition-colors border border-gray-200 flex items-center justify-center cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5 text-brand-dark" /> : <Menu className="w-5 h-5 text-brand-dark" />}
            </button>
          </div>

          {/* HAMBURGER MENU DROPLIST CARD (Smooth dropdown box containing the links) */}
          <div 
            ref={menuRef}
            className={`absolute top-[58px] right-0 w-[calc(100vw-32px)] sm:w-96 bg-white border-2 border-gray-100 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 transition-all duration-300 ease-in-out origin-top-right z-50 ${
              isMenuOpen 
                ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' 
                : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'
            }`}
          >
            
            {/* 1. Tip Us Box - Pink Theme - Thinner layout */}
            <a 
              href="https://dodonate.org/tip" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 w-full bg-rose-50/50 hover:bg-rose-50 border border-rose-100 px-4 py-2 rounded-2xl transition-all"
            >
              <div className="p-1.5 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center">
                <Gift className="w-3.5 h-3.5" />
              </div>
              <span className="font-display font-extrabold text-xs text-rose-600 uppercase tracking-wide flex-1">
                {lang === 'EN' ? 'Tip Us' : 'Nous Soutenir'}
              </span>
              <span className="text-[9px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded-md font-bold uppercase tracking-wide font-mono">
                dodonate.org/tip
              </span>
            </a>

            {/* 2. Search Orphanages Box - Amber Theme - Thinner layout */}
            <button
              onClick={() => {
                navigate('');
                setIsMenuOpen(false);
                setTimeout(() => {
                  const el = document.getElementById('filter-panel');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 200);
              }}
              className="flex items-center gap-3 w-full bg-amber-50/40 hover:bg-amber-50 border border-amber-100 px-4 py-2 rounded-2xl transition-all text-left cursor-pointer"
            >
              <div className="p-1.5 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                <Search className="w-3.5 h-3.5" />
              </div>
              <span className="font-display font-extrabold text-xs text-amber-700 uppercase tracking-wide">
                {lang === 'EN' ? 'Search Orphanages' : 'Rechercher des Orphelinats'}
              </span>
            </button>

            {/* 3. Solutions Dropdown */}
            <div className="border border-gray-100 rounded-2xl overflow-hidden">
              <button
                onClick={() => {
                  const nextVal = !isSolutionsOpen;
                  setIsSolutionsOpen(nextVal);
                  if (nextVal) {
                    setIsUseCasesOpen(false);
                    setIsCompanyOpen(false);
                  }
                }}
                className={`flex items-center justify-between w-full p-4 transition-colors cursor-pointer ${
                  currentHash.startsWith('solutions/') 
                    ? 'bg-[#00C853]/5 text-[#00C853] font-bold border-l-4 border-[#00C853]' 
                    : 'hover:bg-slate-50 text-brand-dark'
                }`}
              >
                <div className="flex items-center gap-3">
                  <LayoutGrid className={`w-4 h-4 ${currentHash.startsWith('solutions/') ? 'text-[#00C853]' : 'text-gray-500'}`} />
                  <span className="font-display font-bold text-sm">
                    {lang === 'EN' ? 'Solutions' : 'Solutions'}
                  </span>
                </div>
                {isSolutionsOpen ? (
                  <ChevronUp className={`w-4 h-4 ${currentHash.startsWith('solutions/') ? 'text-[#00C853]' : 'text-gray-400'}`} />
                ) : (
                  <ChevronDown className={`w-4 h-4 ${currentHash.startsWith('solutions/') ? 'text-[#00C853]' : 'text-gray-400'}`} />
                )}
              </button>
              
              {isSolutionsOpen && (
                <div className="bg-slate-50/50 p-3 space-y-2 border-t border-gray-100 animate-slide-down">
                  <a 
                    href="/solution/donations"
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-semibold transition-all ${
                      currentHash === 'solutions/donations'
                        ? 'bg-[#00C853]/10 text-[#00C853] font-bold border-l-4 border-[#00C853]'
                        : 'text-gray-600 hover:bg-white hover:text-brand-dark'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${currentHash === 'solutions/donations' ? 'bg-[#00C853]' : 'bg-gray-300'}`}></span>
                    <span>{lang === 'EN' ? 'Donations' : 'Dons Matériels'}</span>
                  </a>
                  <a 
                    href="/solution/volunteer-network"
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-semibold transition-all ${
                      currentHash === 'solutions/volunteer-network'
                        ? 'bg-[#00C853]/10 text-[#00C853] font-bold border-l-4 border-[#00C853]'
                        : 'text-gray-600 hover:bg-white hover:text-brand-dark'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${currentHash === 'solutions/volunteer-network' ? 'bg-[#00C853]' : 'bg-gray-300'}`}></span>
                    <span>{lang === 'EN' ? 'Volunteer Hub' : 'Hub de Bénévolat'}</span>
                  </a>
                  <div 
                    className="flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-gray-400 bg-slate-50/50 opacity-40 cursor-not-allowed select-none pointer-events-none"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                      <span>{lang === 'EN' ? 'CSR For Companies' : 'RSE pour Entreprises'}</span>
                    </div>
                    <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-md font-bold uppercase tracking-wider">
                      {lang === 'EN' ? 'Coming Soon' : 'Bientôt'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Use Cases Dropdown */}
            <div className="border border-gray-100 rounded-2xl overflow-hidden">
              <button
                onClick={() => {
                  const nextVal = !isUseCasesOpen;
                  setIsUseCasesOpen(nextVal);
                  if (nextVal) {
                    setIsSolutionsOpen(false);
                    setIsCompanyOpen(false);
                  }
                }}
                className={`flex items-center justify-between w-full p-4 transition-colors cursor-pointer ${
                  currentHash.startsWith('usecases/') 
                    ? 'bg-[#00C853]/5 text-[#00C853] font-bold border-l-4 border-[#00C853]' 
                    : 'hover:bg-slate-50 text-brand-dark'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Users className={`w-4 h-4 ${currentHash.startsWith('usecases/') ? 'text-[#00C853]' : 'text-gray-500'}`} />
                  <span className="font-display font-bold text-sm">
                    {lang === 'EN' ? 'Use Cases' : 'Cas d\'usage'}
                  </span>
                </div>
                {isUseCasesOpen ? (
                  <ChevronUp className={`w-4 h-4 ${currentHash.startsWith('usecases/') ? 'text-[#00C853]' : 'text-gray-400'}`} />
                ) : (
                  <ChevronDown className={`w-4 h-4 ${currentHash.startsWith('usecases/') ? 'text-[#00C853]' : 'text-gray-400'}`} />
                )}
              </button>

              {isUseCasesOpen && (
                <div className="bg-slate-50/50 p-3 space-y-2 border-t border-gray-100 animate-slide-down">
                  <a 
                    href="/usecase/for-ngos"
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-semibold transition-all ${
                      currentHash === 'usecases/for-ngos'
                        ? 'bg-[#00C853]/10 text-[#00C853] font-bold border-l-4 border-[#00C853]'
                        : 'text-gray-600 hover:bg-white hover:text-brand-dark'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${currentHash === 'usecases/for-ngos' ? 'bg-[#00C853]' : 'bg-gray-300'}`}></span>
                    <span>{lang === 'EN' ? 'For NGOs' : 'Pour les ONG'}</span>
                  </a>
                  <a 
                    href="/usecase/for-donors"
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-semibold transition-all ${
                      currentHash === 'usecases/for-donors'
                        ? 'bg-[#00C853]/10 text-[#00C853] font-bold border-l-4 border-[#00C853]'
                        : 'text-gray-600 hover:bg-white hover:text-brand-dark'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${currentHash === 'usecases/for-donors' ? 'bg-[#00C853]' : 'bg-gray-300'}`}></span>
                    <span>{lang === 'EN' ? 'For Donors' : 'Pour les Donateurs'}</span>
                  </a>
                  <a 
                    href="/usecase/for-companies"
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-semibold transition-all ${
                      currentHash === 'usecases/for-companies'
                        ? 'bg-[#00C853]/10 text-[#00C853] font-bold border-l-4 border-[#00C853]'
                        : 'text-gray-600 hover:bg-white hover:text-brand-dark'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${currentHash === 'usecases/for-companies' ? 'bg-[#00C853]' : 'bg-gray-300'}`}></span>
                    <span>{lang === 'EN' ? 'For Companies' : 'Pour les Entreprises'}</span>
                  </a>
                </div>
              )}
            </div>

            {/* 5. Company Dropdown */}
            <div className="border border-gray-100 rounded-2xl overflow-hidden">
              <button
                onClick={() => {
                  const nextVal = !isCompanyOpen;
                  setIsCompanyOpen(nextVal);
                  if (nextVal) {
                    setIsSolutionsOpen(false);
                    setIsUseCasesOpen(false);
                  }
                }}
                className={`flex items-center justify-between w-full p-4 transition-colors cursor-pointer ${
                  currentHash.startsWith('company/') 
                    ? 'bg-[#00C853]/5 text-[#00C853] font-bold border-l-4 border-[#00C853]' 
                    : 'hover:bg-slate-50 text-brand-dark'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Building2 className={`w-4 h-4 ${currentHash.startsWith('company/') ? 'text-[#00C853]' : 'text-gray-500'}`} />
                  <span className="font-display font-bold text-sm">
                    {lang === 'EN' ? 'Company' : 'Entreprise'}
                  </span>
                </div>
                {isCompanyOpen ? (
                  <ChevronUp className={`w-4 h-4 ${currentHash.startsWith('company/') ? 'text-[#00C853]' : 'text-gray-400'}`} />
                ) : (
                  <ChevronDown className={`w-4 h-4 ${currentHash.startsWith('company/') ? 'text-[#00C853]' : 'text-gray-400'}`} />
                )}
              </button>

              {isCompanyOpen && (
                <div className="bg-slate-50/50 p-3 space-y-2 border-t border-gray-100 animate-slide-down">
                  <a 
                    href="/about-us"
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-semibold transition-all ${
                      currentHash === 'company/about-us'
                        ? 'bg-[#00C853]/10 text-[#00C853] font-bold border-l-4 border-[#00C853]'
                        : 'text-gray-600 hover:bg-white hover:text-brand-dark'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${currentHash === 'company/about-us' ? 'bg-[#00C853]' : 'bg-gray-300'}`}></span>
                    <span>{lang === 'EN' ? 'About Us' : 'À Propos'}</span>
                  </a>
                  <div 
                    className="flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-gray-400 bg-slate-50/50 opacity-40 cursor-not-allowed select-none pointer-events-none"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                      <span>{lang === 'EN' ? 'Impact Stories' : 'Témoignages'}</span>
                    </div>
                    <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-md font-bold uppercase tracking-wider">
                      {lang === 'EN' ? 'Coming Soon' : 'Bientôt'}
                    </span>
                  </div>
                  <a 
                    href="/contact-us"
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-semibold transition-all ${
                      currentHash === 'company/contact-us'
                        ? 'bg-[#00C853]/10 text-[#00C853] font-bold border-l-4 border-[#00C853]'
                        : 'text-gray-600 hover:bg-white hover:text-brand-dark'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${currentHash === 'company/contact-us' ? 'bg-[#00C853]' : 'bg-gray-300'}`}></span>
                    <span>{lang === 'EN' ? 'Contact Us' : 'Contactez-nous'}</span>
                  </a>
                </div>
              )}
            </div>

            {/* Action Call for NGOs */}
            <div className="pt-4 border-t border-gray-100">
              <a 
                href="https://dodonate.org"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="w-full relative group overflow-hidden bg-[#00C853] hover:bg-[#00b04a] text-white py-3.5 rounded-full text-center text-sm font-black transition-all hover:scale-[1.02] active:scale-[0.98] duration-300 shadow-md flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-white animate-pulse" />
                <span>{lang === 'EN' ? 'List Organization' : 'Inscrire votre ONG'}</span>
              </a>
            </div>

          </div>
        </div>
      </header>

      {/* Primary body frame */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 mt-4">
        
        {/* VIEW 1: DYNAMIC SEARCH DIRECTORY */}
        {(!currentHash || (!activeNgo && !isServicePage)) && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Search Hero component */}
            <SearchHero lang={lang} />

            {/* Unified Information & Action Segment with tighter layout gaps */}
            <div className="space-y-4">
              
              {/* Explanatory Card - WE CALL YOU TO HELP */}
              <div className="bg-white border-2 border-emerald-100 rounded-[32px] p-6 sm:p-8 shadow-3xs space-y-6 relative overflow-hidden animate-fade-in">
                {/* Decorative ambient gradient */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-50 rounded-full blur-3xl opacity-70 pointer-events-none" />
                
                <div className="space-y-3 relative">
                  <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-black text-emerald-700 tracking-wide uppercase font-display">
                    <Heart className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600 stroke-none animate-pulse" />
                    <span>{lang === 'EN' ? 'WE CALL YOU TO HELP!' : 'APPEL À LA SOLIDARITÉ !'}</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-medium">
                    {lang === 'EN' 
                      ? 'A lot of people around the world throw away clothes, shoes, books, bags and more when they no longer have use for them - so we created this platform so that instead of wasting something good and valuable you can simply donate it to orphanages and people in need around you.'
                      : "Tant de personnes jettent des vêtements, des chaussures, des livres, des sacs et bien plus lorsqu'elles n'en ont plus l'utilité. Nous avons créé cette plateforme pour qu'au lieu de gaspiller des objets de valeur, vous puissiez simplement les donner aux orphelinats et aux personnes dans le besoin autour de vous."}
                  </p>
                </div>

                {/* Subtle divider line */}
                <div className="h-px bg-emerald-50/80 w-full" />

                {/* Steps Grid */}
                <div className="space-y-4">
                  <h3 className="font-display font-extrabold text-[#0B1527] text-sm sm:text-base tracking-tight flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white text-[10px] font-black">✓</span>
                    {lang === 'EN' ? 'Donate in 3 Simple Steps' : 'Donner en 3 étapes simples'}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Step 1 */}
                    <div className="bg-emerald-50/10 border border-emerald-100/20 rounded-2xl p-4 flex flex-col justify-between hover:border-emerald-200 transition-all duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[10px] font-bold text-emerald-600 uppercase tracking-wider">{lang === 'EN' ? 'Step 01' : 'Étape 01'}</span>
                        <div className="w-7 h-7 rounded-full bg-emerald-100/30 flex items-center justify-center">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                        </div>
                      </div>
                      <p className="text-gray-700 text-xs sm:text-sm font-semibold leading-snug">
                        {lang === 'EN' ? 'Find an orphanage near you' : 'Trouvez un orphelinat proche de chez vous'}
                      </p>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-emerald-50/10 border border-emerald-100/20 rounded-2xl p-4 flex flex-col justify-between hover:border-emerald-200 transition-all duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[10px] font-bold text-emerald-600 uppercase tracking-wider">{lang === 'EN' ? 'Step 02' : 'Étape 02'}</span>
                        <div className="w-7 h-7 rounded-full bg-emerald-100/30 flex items-center justify-center">
                          <Phone className="w-3.5 h-3.5 text-emerald-600" />
                        </div>
                      </div>
                      <p className="text-gray-700 text-xs sm:text-sm font-semibold leading-snug">
                        {lang === 'EN' ? 'Contact them about your donation.' : 'Contactez-les à propos de votre don.'}
                      </p>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-emerald-50/10 border border-emerald-100/20 rounded-2xl p-4 flex flex-col justify-between hover:border-emerald-200 transition-all duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[10px] font-bold text-emerald-600 uppercase tracking-wider">{lang === 'EN' ? 'Step 03' : 'Étape 03'}</span>
                        <div className="w-7 h-7 rounded-full bg-emerald-100/30 flex items-center justify-center">
                          <Gift className="w-3.5 h-3.5 text-emerald-600" />
                        </div>
                      </div>
                      <p className="text-gray-700 text-xs sm:text-sm font-semibold leading-snug">
                        {lang === 'EN' 
                          ? 'The orphanage will come pick up your donation or you can visit them yourself and donate.' 
                          : "L'orphelinat viendra récupérer votre don ou vous pourrez le déposer en personne lors d'une visite."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Volunteer Network Redesigned High-Contrast Tab Card */}
              <a 
                href="/volunteers"
                className="bg-white border-2 border-gray-100 hover:border-rose-150 rounded-[32px] p-6 sm:p-7 flex items-center justify-between gap-5 sm:gap-6 shadow-3xs hover:shadow-md transition-all duration-300 cursor-pointer group animate-fade-in block"
              >
                <div className="flex items-center gap-4 sm:gap-5">
                  {/* Left Side: Soft Pastel Circle with Pink Icon */}
                  <div className="w-14 h-14 rounded-full bg-rose-50/70 border border-rose-100/30 flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-rose-500 animate-pulse" />
                  </div>
                  
                  {/* Middle Content */}
                  <div className="space-y-0.5">
                    <h3 className="font-display font-black text-[#0B1527] text-lg sm:text-xl tracking-tight leading-tight">
                      {lang === 'EN' ? 'Volunteer Hub' : 'Hub de Bénévolat'}
                    </h3>
                    <p className="text-gray-500 font-medium text-xs sm:text-sm leading-relaxed max-w-2xl">
                      {lang === 'EN' 
                        ? 'Explore live volunteer requests made by local NGOs and orphanages. Teach computer coding, tutor math, or support kitchens with your skills.'
                        : 'Découvrez les demandes de bénévolat actives des ONG locales. Partagez vos compétences en enseignement, mentorat ou aide culinaire.'}
                    </p>
                  </div>
                </div>

                {/* Right Side: Elegant Pink Arrow Right Icon with continuous horizontal bounce */}
                <div className="w-10 h-10 rounded-full bg-rose-50/50 flex items-center justify-center shrink-0 transition-transform group-hover:bg-rose-500 group-hover:text-white group-hover:scale-105 duration-300">
                  <ArrowRight className="w-5 h-5 text-rose-500 group-hover:text-white animate-bounce-x" />
                </div>
              </a>

              {/* Touch Scroll Indicator to Filter Panel */}
              <div className="flex flex-col items-center justify-center pt-3 pb-1 animate-fade-in">
                <button
                  onClick={() => {
                    document.getElementById('filter-panel')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group flex flex-col items-center gap-1 text-xs font-black text-gray-500 hover:text-brand-green transition-all duration-300 uppercase tracking-widest cursor-pointer"
                >
                  <span className="text-[10px] tracking-widest font-black text-gray-400 group-hover:text-brand-green">
                    {lang === 'EN' ? 'Find Orphanages' : 'Trouver des Orphelinats'}
                  </span>
                  <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-brand-green group-hover:translate-y-1 transition-all duration-300 animate-bounce" />
                </button>
              </div>

            </div>

            {/* Multi-Filter Bar Card */}
            <div id="filter-panel" className="bg-white border-2 border-gray-100 rounded-3xl p-6 shadow-xs space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                
                <h2 className="font-display font-bold text-lg text-brand-dark flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#FFE600]"></span>
                  {lang === 'EN' ? 'Filter Orphanages Directory' : 'Filtrer les Orphelinats'}
                </h2>

                {/* Categories filtering links */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-bold text-gray-400 mr-1.5 uppercase tracking-wider">
                    {lang === 'EN' ? 'Needs Category:' : 'Besoins:'}
                  </span>
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className={`px-3 py-1.5 text-xs font-black rounded-xl transition-all ${
                      selectedCategory === 'All'
                        ? 'bg-brand-green text-white'
                        : 'bg-slate-50 text-gray-600 hover:bg-slate-100'
                    }`}
                  >
                    {lang === 'EN' ? 'All' : 'Tout'}
                  </button>
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-brand-green text-white shadow-3xs'
                          : 'bg-slate-50 text-gray-600 hover:bg-slate-100'
                      }`}
                    >
                      {cat === 'Education' && (lang === 'EN' ? '📚 Education' : '📚 Éducation')}
                      {cat === 'Food' && (lang === 'EN' ? '🍲 Food' : '🍲 Nourriture')}
                      {cat === 'Clothing' && (lang === 'EN' ? '👕 Clothing' : '👕 Vêtements')}
                      {cat === 'Hygiene' && (lang === 'EN' ? '🧼 Hygiene' : '🧼 Hygiène')}
                      {cat === 'Other' && (lang === 'EN' ? '📦 Other' : '📦 Autre')}
                    </button>
                  ))}
                </div>

              </div>

              {/* Grid with Search Input and City Dropdown */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
                
                {/* Text search */}
                <div className="md:col-span-8 relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Search className="w-4 h-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder={
                      lang === 'EN' 
                        ? "Search by name, item type (e.g., 'rice', 'sweater', 'school uniform')..." 
                        : "Rechercher par nom, type d'article (ex. 'riz', 'uniforme')..."
                    }
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border-2 border-transparent focus:border-brand-green focus:bg-white rounded-2xl text-sm focus:outline-none transition-all placeholder:text-gray-400 font-medium"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 text-xs font-bold"
                    >
                      {lang === 'EN' ? 'Clear' : 'Effacer'}
                    </button>
                  )}
                </div>

                {/* Stylized City Dropdown selector */}
                <div className="md:col-span-4 relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <MapPin className="w-4 h-4 text-[#00C853]" />
                  </div>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full pl-10 pr-8 py-3 bg-slate-50 border-2 border-transparent focus:border-brand-green focus:bg-white rounded-2xl text-sm focus:outline-none transition-all font-bold text-gray-800 appearance-none cursor-pointer"
                  >
                    <option value="All">
                      📍 {lang === 'EN' ? 'All Cameroon Cities' : 'Toutes les villes'}
                    </option>
                    {CITIES.map(city => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  {/* Custom arrow for dropdown */}
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

              </div>

              {/* Filtering summary stats */}
              {(selectedCity !== 'All' || searchQuery !== '' || selectedCategory !== 'All') && (
                <div className="flex items-center justify-between pt-1.5 text-xs">
                  <div className="text-gray-500 font-medium">
                    {lang === 'EN' ? 'Found' : 'Trouvé'}{' '}
                    <strong className="text-brand-dark">{filteredNgos.length}</strong>{' '}
                    {lang === 'EN' ? 'orphanage matching your criteria:' : 'orphelinat correspondant :'}
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCity('All');
                      setSearchQuery('');
                      setSelectedCategory('All');
                    }}
                    className="text-brand-green font-bold hover:underline"
                  >
                    {lang === 'EN' ? 'Clear All Filters' : 'Réinitialiser les filtres'}
                  </button>
                </div>
              )}
            </div>

            {/* NGO Directory responsive grid */}
            {filteredNgos.length > 0 ? (
              <div id="ngo-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNgos.map(ngo => (
                  <NgoCard
                    key={ngo.username}
                    ngo={ngo}
                    onClick={() => navigate(ngo.username)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center max-w-md mx-auto space-y-4">
                <div className="text-4xl">🔍</div>
                <h3 className="font-display font-bold text-lg text-brand-dark">
                  {lang === 'EN' ? 'No orphanages found' : 'Aucun orphelinat trouvé'}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {lang === 'EN' 
                    ? "Try adjusting your city selector or widening your text search fields to find active charity entries."
                    : "Essayez d'ajuster vos filtres de recherche pour trouver des associations actives."}
                </p>
                <button
                  onClick={() => {
                    setSelectedCity('All');
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="bg-brand-dark text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-brand-dark/95 transition-colors"
                >
                  {lang === 'EN' ? 'Reset Search filters' : 'Effacer les filtres'}
                </button>
              </div>
            )}

            {/* Quick Education Section / Info Block */}
            <div className="bg-brand-dark text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl mt-12">
              {/* Background gradient blur */}
              <div className="absolute right-0 top-0 w-64 h-64 bg-brand-green opacity-15 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">
                <div className="space-y-3 max-w-xl">
                  <div className="inline-flex items-center gap-1 bg-brand-green text-white text-[10px] font-black tracking-widest px-2.5 py-1 rounded-full uppercase">
                    💡 {lang === 'EN' ? 'HOW DONEST WORKS' : 'COMMENT ÇA MARCHE'}
                  </div>
                  <h3 className="font-display font-black text-xl sm:text-2xl tracking-tight leading-tight">
                    {lang === 'EN' 
                      ? 'Help Cameroonian Orphanages Close Vital Physical Gaps Directly'
                      : 'Aidez directement les orphelinats à combler leurs besoins physiques'}
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                    {lang === 'EN'
                      ? 'Local orphanages upload the items they need (sacks of rice, dresses, shoes, school textbooks). If you have them at home you can message them via direct WhatsApp or call so they come pick it up or you can go drop it off.'
                      : 'Les orphelinats publient les articles dont ils ont besoin (sacs de riz, robes, chaussures, manuels scolaires). Si vous en avez chez vous, vous pouvez leur envoyer un message direct via WhatsApp ou les appeler pour qu\'ils viennent les récupérer, ou vous pouvez aller les déposer.'}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 w-full sm:w-auto">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                    <span className="block text-2xl font-black text-brand-yellow font-mono">100%</span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      {lang === 'EN' ? 'Gift Integrity' : 'Intégrité des dons'}
                    </span>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                    <span className="block text-2xl font-black text-brand-green font-mono">2,400+</span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      {lang === 'EN' ? 'Items Delivered' : 'Articles Livrés'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* VIEW 3: SERVICE PAGES */}
        {isServicePage && (
          <div className="space-y-8 animate-fade-in">
            {currentHash === 'solutions/donations' && (
              <DonationsPage 
                onBack={() => navigate('')} 
                lang={lang}
                onGoToFilter={() => {
                  navigate('');
                  setTimeout(() => {
                    document.getElementById('filter-panel')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }} 
              />
            )}
            {currentHash === 'solutions/volunteer-network' && (
              <VolunteerNetworkPage 
                onBack={() => navigate('')} 
                lang={lang}
              />
            )}
            {currentHash === 'solutions/volunteer-opportunities' && (
              <VolunteerOpportunitiesPage 
                onBack={() => navigate('')} 
                ngos={ngos}
                onInterestClick={handleInterestClick}
                hasInterested={hasInterested}
                lang={lang}
              />
            )}
            {currentHash === 'solutions/csr' && <CsrPage onBack={() => navigate('')} />}
            {currentHash === 'usecases/for-ngos' && <ForNgosPage onBack={() => navigate('')} />}
            {currentHash === 'usecases/for-donors' && <ForDonorsPage onBack={() => navigate('')} />}
            {currentHash === 'usecases/for-companies' && <ForCompaniesPage onBack={() => navigate('')} />}
            {currentHash === 'company/about-us' && <AboutUsPage onBack={() => navigate('')} />}
            {currentHash === 'company/impact-stories' && <ImpactStoriesPage onBack={() => navigate('')} />}
            {currentHash === 'company/contact-us' && <ContactUsPage onBack={() => navigate('')} />}
            {currentHash === 'legal/terms' && <TermsPage onBack={() => navigate('')} />}
            {currentHash === 'legal/privacy' && <PrivacyPage onBack={() => navigate('')} />}
            {currentHash === 'legal/safety' && <SafetyPage onBack={() => navigate('')} />}
          </div>
        )}

        {/* VIEW 2: UNIQUE NGO PROFILE SPACE */}
        {currentHash && activeNgo && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Back Navigation bar */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate('')}
                className="inline-flex items-center justify-center w-10 h-10 bg-white border border-gray-200 hover:border-brand-dark rounded-xl text-gray-600 hover:text-brand-dark transition-all shadow-3xs cursor-pointer"
                title={lang === 'EN' ? 'Back' : 'Retour'}
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
              </button>
              
              <a
                href={`https://dodonate.org/donate/${activeNgo.custom_slug || activeNgo.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#00C853] hover:bg-[#009624] text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-xs hover:shadow-md transition-all active:scale-95 uppercase tracking-wider"
              >
                <span>💸 Donate Money</span>
              </a>
            </div>

            {/* Profile Header Block */}
            <div className="bg-white border-2 border-gray-100 rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
              <div className="absolute right-0 bottom-0 w-32 h-32 bg-[#FFE600] opacity-5 rounded-tl-full pointer-events-none"></div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                
                {/* Left side: branding, details */}
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-slate-50 border border-gray-100 flex items-center justify-center text-4xl shadow-xs shrink-0 overflow-hidden">
                    {activeNgo.logo && (activeNgo.logo.startsWith('http') || activeNgo.logo.startsWith('/') || activeNgo.logo.startsWith('data:')) ? (
                      <img src={activeNgo.logo} alt={activeNgo.name} className="w-full h-full object-cover rounded-3xl" referrerPolicy="no-referrer" />
                    ) : (
                      activeNgo.logo || '🏡'
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-[#00C853]/10 text-[#00C853] px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {activeNgo.city}
                      </span>
                      <span className="text-gray-400 text-xs font-medium">
                        {lang === 'EN' ? 'Listed In' : 'Inscrit en'} {activeNgo.establishedYear}
                      </span>
                    </div>
                    
                    <h1 className="font-display font-black text-2xl sm:text-3xl text-brand-dark tracking-tight leading-none">
                      {activeNgo.name}
                    </h1>
                    
                    <p className="text-gray-500 text-xs sm:text-sm font-medium">
                      📍 {activeNgo.address}
                    </p>
                  </div>
                </div>

                {/* Right side: Dual-button direct contact layout requested */}
                <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0 min-w-[200px]">
                  
                  {/* [🟩 Contact via WhatsApp] (Direct anchor using https://wa.me/ phone parameters) */}
                  <a
                    href={`https://wa.me/${activeNgo.phone.replace('+', '')}?text=${encodeURIComponent(activeNgo.whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold text-sm px-5 py-3 rounded-2xl shadow-xs hover:shadow-md transform hover:-translate-y-0.5 transition-all text-center"
                  >
                    <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                    <span>Contact via WhatsApp</span>
                  </a>

                  {/* [🔔 Stay Connected] (Replaces Call Direct: opens popup form for CRM lead capture) */}
                  <button
                    onClick={handleOpenStayConnected}
                    className="flex items-center justify-center gap-2 bg-brand-dark hover:bg-brand-dark/95 text-white font-extrabold text-sm px-5 py-3 rounded-2xl shadow-xs hover:shadow-md transform hover:-translate-y-0.5 transition-all text-center cursor-pointer group"
                  >
                    <BellRing className="w-4 h-4 text-brand-yellow group-hover:rotate-12 transition-transform" />
                    <span>Stay Connected</span>
                  </button>

                  {/* [🌐 Visit Website] */}
                  {activeNgo.website && (
                    <a
                      href={getCleanWebsiteUrl(activeNgo.website)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm px-5 py-3 rounded-2xl shadow-xs hover:shadow-md transform hover:-translate-y-0.5 transition-all text-center"
                    >
                      <Globe className="w-4 h-4 text-white" />
                      <span>Visit Website</span>
                    </a>
                  )}

                </div>

              </div>

              {/* Extended about paragraph */}
              <div className="mt-6 pt-6 border-t border-gray-100 max-w-3xl">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                  {lang === 'EN' ? 'Our Mission & Impact' : 'Notre Mission & Impact'}
                </h4>
                <NgoMissionBio description={activeNgo.description} lang={lang} />
              </div>

            </div>

            {/* Tab Selection Switcher: Floating rounded smooth box standalone tabs with a gap */}
            <div className="flex flex-wrap items-center gap-4 justify-center sm:justify-start">
              <button
                id="tab-needs-btn"
                onClick={() => setActiveProfileTab('needs')}
                className={`px-6 py-4 rounded-2xl font-display font-black text-sm uppercase tracking-wider transition-all duration-300 flex items-center gap-2.5 cursor-pointer shadow-xs hover:shadow-md transform active:scale-95 border-2 ${
                  activeProfileTab === 'needs'
                    ? 'bg-brand-dark border-brand-dark text-white'
                    : 'bg-white border-gray-100 hover:border-gray-200 text-gray-500 hover:text-brand-dark'
                }`}
              >
                <Gift className="w-5 h-5 text-brand-green" />
                <span>Section A: Physical Needs</span>
              </button>

              <button
                id="tab-volunteer-btn"
                onClick={() => setActiveProfileTab('volunteer')}
                className={`px-6 py-4 rounded-2xl font-display font-black text-sm uppercase tracking-wider transition-all duration-300 flex items-center gap-2.5 cursor-pointer shadow-xs hover:shadow-md transform active:scale-95 border-2 ${
                  activeProfileTab === 'volunteer'
                    ? 'bg-brand-dark border-brand-dark text-white'
                    : 'bg-white border-gray-100 hover:border-gray-200 text-gray-500 hover:text-brand-dark'
                }`}
              >
                <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                <span>Section B: Volunteer Hub</span>
              </button>
            </div>

            {/* A clean visual separator gap */}
            <div className="h-4"></div>

            {/* Tab 1: Section A - Physical Needs List */}
            {activeProfileTab === 'needs' && (
              <div id="section-a-pane" className="w-full space-y-6 animate-fade-in">
                <div className="bg-white border-2 border-gray-100 rounded-3xl p-6 sm:p-8 shadow-xs">
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="space-y-1">
                      <h2 className="font-display font-black text-2xl text-brand-dark flex items-center gap-2.5">
                        <Gift className="w-6 h-6 text-brand-green" />
                        Section A: Physical Needs
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-500 font-medium">
                        {lang === 'EN' 
                          ? 'Specific items needed at our center. Select amount and commit to donate!'
                          : 'Besoins matériels précis. Choisissez la quantité et engagez-vous !'}
                      </p>
                    </div>
                  </div>

                  {/* Physical items list looping through categories */}
                  <div className="space-y-4">
                    {activeNgo.physicalNeeds.filter(need => need.status !== 'deleted').map(need => {
                      const ill = getCategoryIllustration(need.category);

                      return (
                        <div 
                          key={need.id}
                          className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 hover:shadow-sm hover:border-gray-200 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                        >
                          <div className="flex items-start gap-4">
                            {/* Illustration */}
                            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl border shadow-3xs shrink-0 ${ill.bg}`}>
                              {ill.emoji}
                            </div>
                            
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                {/* Category label */}
                                <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                                  {ill.title}
                                </span>
                                
                                {/* Urgency tag */}
                                {need.urgency === 'High' ? (
                                  <span className="bg-rose-50 text-rose-600 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                                    High Urgency
                                  </span>
                                ) : (
                                  <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded-lg text-[10px] font-bold">
                                    {need.urgency} Urgency
                                  </span>
                                )}
                              </div>

                              <h4 className="font-display font-black text-sm sm:text-base text-brand-dark">
                                {need.item}
                              </h4>
                              
                              <p className="text-gray-500 text-xs font-semibold leading-relaxed max-w-md">
                                {need.details || 'Direct donation support'}
                              </p>
                            </div>
                          </div>

                          {/* Donate Item Button - opens WhatsApp */}
                          <a
                            href={`https://wa.me/${activeNgo.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                              `Hello ${activeNgo.name}, I would like to support your orphanage by delivering "${need.item}" (${need.category}).`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto shrink-0 bg-[#00C853] hover:bg-[#009624] text-white text-xs font-black py-3 px-5 rounded-xl transition-all shadow-3xs hover:shadow-2xs active:scale-95 flex items-center justify-center gap-1.5 text-center cursor-pointer uppercase tracking-wider"
                          >
                            <Package className="w-4 h-4 text-white shrink-0" />
                            <span>Donate Item</span>
                          </a>
                        </div>
                      );
                    })}
                  </div>

                </div>
              </div>
            )}

            {/* Tab 2: Section B - Volunteer Hub */}
            {activeProfileTab === 'volunteer' && (
              <div id="section-b-pane" className="w-full space-y-6 animate-fade-in">
                
                {/* Section B: Volunteer Hub Community Tab */}
                <div className="bg-white border-2 border-gray-100 rounded-3xl p-6 sm:p-8 shadow-xs">
                  <div className="space-y-1">
                    <h2 className="font-display font-black text-2xl text-brand-dark flex items-center gap-2.5">
                      <Heart className="w-6 h-6 text-red-500 fill-red-500 animate-pulse" />
                      Section B: Volunteer Hub
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium">
                      {lang === 'EN' 
                        ? 'Support local staff. Express interest to increment community count live!'
                        : 'Soutenez notre personnel. Indiquez votre intérêt pour augmenter le compteur !'}
                    </p>
                  </div>
                </div>

                {/* Standalone separate volunteer request cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {activeNgo.volunteerPostings.filter(post => post.status !== 'deleted').map((post, postIndex) => {
                    const userLiked = hasInterested(post.id);
                    
                    return (
                      <div 
                        key={post.id}
                        id={`post-${post.id}`}
                        onClick={() => {
                          setActiveApplyPost({ ngo: activeNgo, post });
                          setApplicantMessage(`I am highly interested in volunteering for "${post.title}" and would love to help out!`);
                        }}
                        className="bg-white border-2 border-gray-100 hover:border-emerald-300 p-6 sm:p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5 relative overflow-hidden cursor-pointer group shadow-xs"
                      >
                        <div className="space-y-4">
                          {/* Top Illustration Banner */}
                          <div className="h-36 w-full overflow-hidden relative rounded-2xl shrink-0 border border-gray-100">
                            <VolunteerCardIllustration index={postIndex} title={post.title} city={activeNgo.city} />
                          </div>

                          {/* Badge / Header info */}
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider inline-flex items-center gap-1 shadow-3xs">
                              🏅 Attestation Eligible
                            </span>
                            
                            <div className="flex items-center gap-1.5 bg-slate-50 border border-gray-100 text-gray-500 px-2.5 py-1 rounded-xl text-[10px] font-bold">
                              <MapPin className="w-3 h-3 text-emerald-500" />
                              {activeNgo.city}
                            </div>
                          </div>

                          {/* Posting content */}
                          <div className="space-y-1.5">
                            <h4 className="font-display font-black text-base text-brand-dark leading-snug group-hover:text-emerald-600 transition-colors">
                              {post.title}
                            </h4>
                            <ExpandableText text={post.details} limit={50} className="text-gray-500 text-xs font-semibold leading-relaxed" />
                          </div>

                          {/* Duration & Volunteer Details */}
                          <div className="bg-slate-50 border border-gray-100 rounded-2xl p-3 space-y-1.5 text-[10px] text-gray-500 font-bold font-mono">
                            <div className="flex items-center justify-between">
                              <span>🕒 DURATION: {post.duration_days || 1} Days</span>
                              <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-black">LIVE</span>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200/50 pt-1.5 mt-1.5">
                              <span>👥 PROGRESS: {post.volunteers_joined || 0} / {post.volunteers_needed || 3} Joined</span>
                              <span className="text-amber-600 font-black">ACTIVE</span>
                            </div>
                          </div>
                        </div>

                        {/* Bottom controls */}
                        <div className="pt-4 flex items-center gap-2 mt-4 border-t border-gray-100 w-full" onClick={(e) => e.stopPropagation()}>
                          {/* Upvote Button */}
                          <button
                            onClick={() => handleInterestClick(activeNgo.username, post.id)}
                            className={`inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-extrabold transition-all transform active:scale-95 cursor-pointer shrink-0 ${
                              userLiked 
                                ? 'bg-rose-500 text-white shadow-xs shadow-rose-500/10' 
                                : 'bg-white border border-gray-200 text-gray-700 hover:border-rose-400 hover:bg-rose-50/25'
                            }`}
                            title={lang === 'EN' ? 'Upvote community interest' : "Indiquer l'intérêt"}
                          >
                            <Heart className={`w-3.5 h-3.5 ${userLiked ? 'fill-white stroke-none animate-pulse' : 'text-gray-400'}`} />
                            <span>{post.initialInterestCount}</span>
                          </button>

                          {/* Learn More button - Long and green */}
                          <button
                            onClick={() => {
                              setActiveApplyPost({ ngo: activeNgo, post });
                              setApplicantMessage(`I am highly interested in volunteering for "${post.title}" and would love to help out!`);
                            }}
                            className="flex-1 bg-[#00C853] hover:bg-[#009624] text-white py-2.5 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 shadow-3xs hover:shadow-xs cursor-pointer transition-colors"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-white fill-white" />
                            <span>Learn More</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        )}

      </main>

      {/* Dynamic Drawer / Modal simulator representing the DoDonate Payment Engine */}
      {fundingTarget && (
        <DoDonateEngine
          ngo={fundingTarget.ngo}
          item={fundingTarget.item}
          onClose={() => setFundingTarget(null)}
          onSuccess={handleFundingSuccess}
        />
      )}

      {/* Volunteer Apply Modal */}
      {activeApplyPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 relative max-h-[90vh] overflow-y-auto space-y-6">
            
            {/* Close Button */}
            <button 
              onClick={() => setActiveApplyPost(null)}
              className="absolute top-4 right-4 bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-gray-800 p-2 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Success screen overlay */}
            {submitSuccess ? (
              <div className="py-8 text-center space-y-6 animate-scale-up">
                <div className="w-16 h-16 bg-[#00C853] text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-display font-black text-xl text-brand-dark">Application Submitted! 🎉</h4>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                    Your details have been registered. WhatsApp has been opened with a prefilled message. Please hit <strong className="text-emerald-600">"Send"</strong> in the WhatsApp chat to complete your connection!
                  </p>
                </div>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setActiveApplyPost(null);
                      setSubmitSuccess(false);
                      setApplicantName('');
                      setApplicantEmail('');
                      setApplicantPhone('');
                      setApplicantLocation('');
                      setApplicantMessage('');
                    }}
                    className="w-full bg-[#0A1120] hover:bg-[#111A2E] text-white py-3.5 px-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-md cursor-pointer text-center"
                  >
                    AWESOME, CLOSE
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6 pt-2">
                {/* Header */}
                <div className="space-y-3">
                  <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1 shadow-3xs">
                    🏅 Attestation Eligible
                  </span>
                  
                  <h3 className="font-display font-black text-2xl text-brand-dark leading-tight">
                    {activeApplyPost.post.title}
                  </h3>
                  
                  {/* Metadata Row */}
                  <div className="grid grid-cols-3 gap-2 text-center pt-1">
                    <div className="bg-slate-50 border border-gray-100 rounded-xl p-2.5 flex flex-col items-center justify-center">
                      <Clock className="w-4 h-4 text-emerald-600 mb-1" />
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Duration</span>
                      <span className="text-xs font-bold text-gray-800 mt-0.5">{activeApplyPost.post.duration_days || 1} Days</span>
                    </div>

                    <div className="bg-slate-50 border border-gray-100 rounded-xl p-2.5 flex flex-col items-center justify-center">
                      <MapPin className="w-4 h-4 text-emerald-600 mb-1" />
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Location</span>
                      <span className="text-xs font-bold text-gray-800 mt-0.5 truncate max-w-full">{activeApplyPost.post.location || activeApplyPost.ngo.city}</span>
                    </div>

                    <div className="bg-slate-50 border border-gray-100 rounded-xl p-2.5 flex flex-col items-center justify-center">
                      <Users className="w-4 h-4 text-emerald-600 mb-1" />
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Volunteers</span>
                      <span className="text-xs font-bold text-gray-800 mt-0.5">{activeApplyPost.post.volunteers_joined || 0} / {activeApplyPost.post.volunteers_needed || 3}</span>
                    </div>
                  </div>
                </div>

                {/* Activity Overview */}
                <div className="space-y-2 bg-slate-50/50 border border-gray-100 p-4 rounded-2xl">
                  <h4 className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Activity Overview</h4>
                  <ExpandableText text={activeApplyPost.post.details} limit={50} className="text-gray-700 text-xs font-medium leading-relaxed" />
                </div>

                <hr className="border-gray-100" />

                {/* Sign up form */}
                <form onSubmit={handleApplySubmit} className="space-y-4">
                  <h4 className="text-xs text-brand-dark font-black uppercase tracking-wider">Complete Your Sign-Up Form</h4>
                  
                  {/* Full name */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="e.g. Marie Johnson"
                      className="w-full bg-slate-50 border border-gray-200 focus:border-emerald-500 focus:bg-white rounded-xl px-4 py-3 text-xs font-medium focus:outline-none text-[#0A1120]"
                    />
                  </div>

                  {/* Phone & Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={applicantPhone}
                        onChange={(e) => setApplicantPhone(e.target.value)}
                        placeholder="e.g. +237 677..."
                        className="w-full bg-slate-50 border border-gray-200 focus:border-emerald-500 focus:bg-white rounded-xl px-4 py-3 text-xs font-medium focus:outline-none text-[#0A1120]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Your Location / City *</label>
                      <input
                        type="text"
                        required
                        value={applicantLocation}
                        onChange={(e) => setApplicantLocation(e.target.value)}
                        placeholder="e.g. Douala"
                        className="w-full bg-slate-50 border border-gray-200 focus:border-emerald-500 focus:bg-white rounded-xl px-4 py-3 text-xs font-medium focus:outline-none text-[#0A1120]"
                      />
                    </div>
                  </div>

                  {/* Email address */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Email Address</label>
                    <input
                      type="email"
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      placeholder="e.g. marie@gmail.com"
                      className="w-full bg-slate-50 border border-gray-200 focus:border-emerald-500 focus:bg-white rounded-xl px-4 py-3 text-xs font-medium focus:outline-none text-[#0A1120]"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Introduce Yourself / Message *</label>
                    <textarea
                      required
                      value={applicantMessage}
                      onChange={(e) => setApplicantMessage(e.target.value)}
                      rows={3}
                      placeholder="e.g. I can help tutor children and coordinate activities on weekends."
                      className="w-full bg-slate-50 border border-gray-200 focus:border-emerald-500 focus:bg-white rounded-xl p-4 text-xs font-medium focus:outline-none text-[#0A1120]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#00C853] hover:bg-[#009624] text-white py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-xs hover:shadow-md cursor-pointer text-center flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <MessageCircle className="w-4 h-4 text-white fill-white" />
                        <span>Send to WhatsApp</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 🔔 Stay Connected Modal (CRM Lead Capture & Deduplication Flow) */}
      {isStayConnectedOpen && activeNgo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 relative max-h-[90vh] overflow-y-auto space-y-6">
            
            {/* Close Button */}
            <button 
              onClick={handleCloseStayConnected}
              className="absolute top-4 right-4 bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-gray-800 p-2 rounded-full transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* SCREEN 1: SUCCESS MODAL */}
            {stayConnectedStatus === 'success' ? (
              <div className="py-4 text-center space-y-6 animate-scale-up">
                <div className="w-16 h-16 bg-gradient-to-tr from-[#00C853] to-emerald-400 text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-[#00C853]/25">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-display font-black text-2xl text-[#0B1527]">
                    {lang === 'EN' ? "You're Connected!" : "Vous êtes connecté !"}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">
                    {lang === 'EN' ? (
                      <>Thank you, <strong className="text-[#0B1527]">{stayConnectedForm.name}</strong>! You will now receive timely updates and urgent alerts from <strong className="text-[#00C853]">{activeNgo.name}</strong>.</>
                    ) : (
                      <>Merci, <strong className="text-[#0B1527]">{stayConnectedForm.name}</strong> ! Vous recevrez des alertes urgentes et des nouvelles de <strong className="text-[#00C853]">{activeNgo.name}</strong>.</>
                    )}
                  </p>
                </div>

                {/* Stylish Impact Donation Box */}
                <div className="bg-gradient-to-br from-emerald-50 via-green-50/60 to-amber-50/70 border border-emerald-100 rounded-2xl p-5 space-y-3.5 shadow-xs text-center">
                  <p className="text-xs sm:text-sm font-bold text-gray-700 leading-snug">
                    {lang === 'EN' ? (
                      <>Create more impact by donating to <span className="text-[#00C853] font-black">{activeNgo.name}</span> today.</>
                    ) : (
                      <>Créez plus d'impact en faisant un don à <span className="text-[#00C853] font-black">{activeNgo.name}</span> aujourd'hui.</>
                    )}
                  </p>
                  
                  <a
                    href={`https://dodonate.org/donate/${activeNgo.custom_slug || activeNgo.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#00C853] hover:bg-[#009624] text-white font-display font-black text-sm px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-95 uppercase tracking-wider"
                  >
                    <Heart className="w-4 h-4 fill-white text-[#00C853]" />
                    <span>{lang === 'EN' ? 'Donate Now' : 'Faire un don'}</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleCloseStayConnected}
                    className="w-full text-xs font-bold text-gray-400 hover:text-gray-700 transition-colors py-2 cursor-pointer"
                  >
                    {lang === 'EN' ? 'Close' : 'Fermer'}
                  </button>
                </div>
              </div>
            ) : (
              /* SCREEN 2: POP-UP FORM */
              <div className="space-y-5 animate-fade-in">
                {/* Header with Orphanage Branding */}
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-[#0B1527] flex items-center justify-center text-xl shrink-0">
                    <BellRing className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-lg sm:text-xl text-[#0B1527] leading-tight">
                      {lang === 'EN' ? 'Stay Connected' : 'Restez Connecté'}
                    </h3>
                    <p className="text-xs text-gray-500 font-medium truncate max-w-[260px]">
                      {activeNgo.name}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-gray-500 leading-relaxed">
                  {lang === 'EN'
                    ? `Leave your details to receive weekly alerts about urgent physical needs and impact updates from ${activeNgo.name}.`
                    : `Laissez vos coordonnées pour recevoir des alertes sur les besoins urgents et l'impact de ${activeNgo.name}.`}
                </p>

                {stayConnectedError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
                    ⚠️ {stayConnectedError}
                  </div>
                )}

                <form onSubmit={handleStayConnectedSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-500 flex items-center justify-between">
                      <span>{lang === 'EN' ? 'Full Name' : 'Nom Complet'}</span>
                      <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={stayConnectedForm.name}
                      onChange={(e) => setStayConnectedForm({ ...stayConnectedForm, name: e.target.value })}
                      placeholder={lang === 'EN' ? 'e.g. Marie Claire' : 'ex. Marie Claire'}
                      className="w-full bg-slate-50 border border-gray-200 focus:border-[#00C853] focus:bg-white rounded-xl px-4 py-3 text-xs font-medium focus:outline-none text-[#0A1120] transition-colors"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-500 flex items-center justify-between">
                      <span>{lang === 'EN' ? 'Phone Number' : 'Numéro de Téléphone'}</span>
                      <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={stayConnectedForm.phone}
                      onChange={(e) => setStayConnectedForm({ ...stayConnectedForm, phone: e.target.value })}
                      placeholder="e.g. +237 677 123 456"
                      className="w-full bg-slate-50 border border-gray-200 focus:border-[#00C853] focus:bg-white rounded-xl px-4 py-3 text-xs font-medium focus:outline-none text-[#0A1120] transition-colors"
                    />
                  </div>

                  {/* Email (Optional) */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                      <span>{lang === 'EN' ? 'Email Address' : 'Adresse Email'}</span>
                      <span className="text-[9px] text-gray-400 font-normal lowercase">(optional)</span>
                    </label>
                    <input
                      type="email"
                      value={stayConnectedForm.email}
                      onChange={(e) => setStayConnectedForm({ ...stayConnectedForm, email: e.target.value })}
                      placeholder="e.g. marie@gmail.com"
                      className="w-full bg-slate-50 border border-gray-200 focus:border-[#00C853] focus:bg-white rounded-xl px-4 py-3 text-xs font-medium focus:outline-none text-[#0A1120] transition-colors"
                    />
                  </div>

                  {/* Form Actions */}
                  <div className="flex items-center gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={handleCloseStayConnected}
                      className="px-4 py-3 border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-xl text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      {lang === 'EN' ? 'Cancel' : 'Annuler'}
                    </button>
                    <button
                      type="submit"
                      disabled={stayConnectedStatus === 'submitting'}
                      className="flex-1 bg-[#00C853] hover:bg-[#009624] text-white py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-xs hover:shadow-md cursor-pointer text-center flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {stayConnectedStatus === 'submitting' ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>{lang === 'EN' ? 'Connecting...' : 'Connexion...'}</span>
                        </>
                      ) : (
                        <>
                          <BellRing className="w-4 h-4" />
                          <span>{lang === 'EN' ? 'Stay Connected' : 'Restez Connecté'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Beautiful Structured Grid Footer styled exactly like the screenshot */}
      <footer className="bg-white border-t-2 border-gray-100 py-12 mt-16 px-4 sm:px-6 select-none">
        <div className="max-w-6xl mx-auto space-y-10">
          
          {/* Top Brand Logo and Description Intro Area */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Logo />
            </div>
            <p className="text-[#0B1527] font-display font-bold text-base leading-relaxed max-w-3xl">
              DoNest connects nonprofits with generous citizens, making it easy to donate essential items, volunteer your time, and support causes that strengthen communities.
            </p>
            <p className="text-xs font-bold text-gray-400 font-display">
              DoNest is a DoDonate Inc. Product.
            </p>
          </div>

          <hr className="border-gray-100" />

          {/* Grid Layout for Footer Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            
            {/* Column 1: Solutions with Green Underline */}
            <div className="space-y-4">
              <h3 className="font-display font-black text-xs uppercase tracking-widest text-[#00C853] pb-1 border-b-4 border-[#00C853] w-max">
                Solutions
              </h3>
              <ul className="space-y-4">
                <li>
                  <a href="/solution/donations" className="group flex flex-col items-start w-max">
                    <span className="font-display font-black text-[#0B1527] text-base leading-tight group-hover:text-[#00C853] transition-colors">
                      Donations
                    </span>
                    <div className="w-6 h-[3.5px] bg-[#FFE600] mt-1 transition-all group-hover:bg-[#00C853] group-hover:w-10"></div>
                  </a>
                </li>
                <li>
                  <a href="/solution/volunteer-network" className="group flex flex-col items-start w-max">
                    <span className="font-display font-black text-[#0B1527] text-base leading-tight group-hover:text-[#00C853] transition-colors">
                      Volunteer Hub
                    </span>
                    <div className="w-6 h-[3.5px] bg-[#FFE600] mt-1 transition-all group-hover:bg-[#00C853] group-hover:w-10"></div>
                  </a>
                </li>
                <li>
                  <div className="flex items-center gap-2 opacity-40 cursor-not-allowed select-none pointer-events-none py-1">
                    <span className="font-display font-black text-gray-400 text-base leading-tight">
                      CSR For Companies
                    </span>
                    <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-md font-bold uppercase tracking-wider">Soon</span>
                  </div>
                </li>
              </ul>
            </div>
            
            {/* Column 2: Support with Green Underline */}
            <div className="space-y-4">
              <h3 className="font-display font-black text-xs uppercase tracking-widest text-[#00C853] pb-1 border-b-4 border-[#00C853] w-max">
                Support
              </h3>
              <ul className="space-y-4">
                <li>
                  <a href="/usecase/for-ngos" className="group flex flex-col items-start w-max">
                    <span className="font-display font-black text-[#0B1527] text-base leading-tight group-hover:text-[#00C853] transition-colors">
                      For NGOs
                    </span>
                    <div className="w-6 h-[3.5px] bg-[#FFE600] mt-1 transition-all group-hover:bg-[#00C853] group-hover:w-10"></div>
                  </a>
                </li>
                <li>
                  <a href="/usecase/for-donors" className="group flex flex-col items-start w-max">
                    <span className="font-display font-black text-[#0B1527] text-base leading-tight group-hover:text-[#00C853] transition-colors">
                      For Donors
                    </span>
                    <div className="w-6 h-[3.5px] bg-[#FFE600] mt-1 transition-all group-hover:bg-[#00C853] group-hover:w-10"></div>
                  </a>
                </li>
                <li>
                  <a href="/usecase/for-companies" className="group flex flex-col items-start w-max">
                    <span className="font-display font-black text-[#0B1527] text-base leading-tight group-hover:text-[#00C853] transition-colors">
                      For Companies
                    </span>
                    <div className="w-6 h-[3.5px] bg-[#FFE600] mt-1 transition-all group-hover:bg-[#00C853] group-hover:w-10"></div>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Company with Green Underline */}
            <div className="space-y-4">
              <h3 className="font-display font-black text-xs uppercase tracking-widest text-[#00C853] pb-1 border-b-4 border-[#00C853] w-max">
                Company
              </h3>
              <ul className="space-y-4">
                <li>
                  <a href="/about-us" className="group flex flex-col items-start w-max">
                    <span className="font-display font-black text-[#0B1527] text-base leading-tight group-hover:text-[#00C853] transition-colors">
                      About Us
                    </span>
                    <div className="w-6 h-[3.5px] bg-[#FFE600] mt-1 transition-all group-hover:bg-[#00C853] group-hover:w-10"></div>
                  </a>
                </li>
                <li>
                  <div className="flex items-center gap-2 opacity-40 cursor-not-allowed select-none pointer-events-none py-1">
                    <span className="font-display font-black text-gray-400 text-base leading-tight">
                      Impact Stories
                    </span>
                    <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-md font-bold uppercase tracking-wider">Soon</span>
                  </div>
                </li>
                <li>
                  <a href="/contact-us" className="group flex flex-col items-start w-max">
                    <span className="font-display font-black text-[#0B1527] text-base leading-tight group-hover:text-[#00C853] transition-colors">
                      Contact Us
                    </span>
                    <div className="w-6 h-[3.5px] bg-[#FFE600] mt-1 transition-all group-hover:bg-[#00C853] group-hover:w-10"></div>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Legal with Green Underline */}
            <div className="space-y-4">
              <h3 className="font-display font-black text-xs uppercase tracking-widest text-[#00C853] pb-1 border-b-4 border-[#00C853] w-max">
                Legal
              </h3>
              <ul className="space-y-4">
                <li>
                  <a href="/legal/terms" className="group flex flex-col items-start w-max">
                    <span className="font-display font-black text-[#0B1527] text-base leading-tight group-hover:text-[#00C853] transition-colors">
                      Terms Of Use
                    </span>
                    <div className="w-6 h-[3.5px] bg-[#FFE600] mt-1 transition-all group-hover:bg-[#00C853] group-hover:w-10"></div>
                  </a>
                </li>
                <li>
                  <a href="/legal/privacy" className="group flex flex-col items-start w-max">
                    <span className="font-display font-black text-[#0B1527] text-base leading-tight group-hover:text-[#00C853] transition-colors">
                      Privacy Policy
                    </span>
                    <div className="w-6 h-[3.5px] bg-[#FFE600] mt-1 transition-all group-hover:bg-[#00C853] group-hover:w-10"></div>
                  </a>
                </li>
                <li>
                  <a href="/legal/safety" className="group flex flex-col items-start w-max">
                    <span className="font-display font-black text-[#0B1527] text-base leading-tight group-hover:text-[#00C853] transition-colors">
                      Safety Policy
                    </span>
                    <div className="w-6 h-[3.5px] bg-[#FFE600] mt-1 transition-all group-hover:bg-[#00C853] group-hover:w-10"></div>
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Replaced Systems Operational with the stylized Donate to Campaigns Button */}
          <div className="pt-2">
            <a 
              href="https://dodonate.org/explore" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#00C853] hover:bg-[#00b04a] text-white rounded-full font-black text-sm uppercase tracking-wider transition-all transform hover:scale-[1.03] active:scale-[0.97] shadow-lg shadow-[#00C853]/25"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Donate To Campaigns</span>
            </a>
          </div>

          <hr className="border-gray-100" />

          {/* Contact & Socials Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
            
            {/* Contact details */}
            <div className="space-y-5">
              <h3 className="font-display font-black text-xs uppercase tracking-widest text-[#00C853] pb-1 border-b-4 border-[#00C853] w-max mb-2">
                Contact & Socials
              </h3>
              
              <div className="space-y-3.5 font-display font-black text-[#0B1527] text-sm">
                <div className="flex items-center gap-3">
                  <span className="text-lg">📍</span>
                  <span>Buea, South-West Region, Cameroon</span>
                </div>
                <div className="flex items-center gap-3 hover:text-[#00C853] transition-colors">
                  <span className="text-lg">📞</span>
                  <a href="tel:+237671991540">+237 671991540</a>
                </div>
                <div className="flex items-center gap-3 hover:text-[#00C853] transition-colors">
                  <span className="text-lg">✉️</span>
                  <a href="mailto:support@dodonate.org">support@dodonate.org</a>
                </div>
              </div>
            </div>

            {/* Support button and Social capsule */}
            <div className="space-y-6 flex flex-col items-start md:items-end justify-between">
              
              <a 
                href="https://wa.me/237671991540" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#E8F8EE] border border-[#00C853] text-[#00C853] font-display font-black text-sm rounded-2xl hover:bg-[#D4F3DE] transition-all hover:scale-[1.02] active:scale-[0.98] text-center"
              >
                <span>WhatsApp Support</span>
              </a>

              <div className="space-y-2 w-full max-w-[300px]">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest font-display">
                  FOLLOW DODONATE:
                </h4>
                
                {/* Social Capsule Card with a cute decorative red dot */}
                <div className="relative">
                  <div className="bg-white border-2 border-gray-100 rounded-full px-5 py-3 flex items-center justify-between gap-4 shadow-sm">
                    <a 
                      href="https://facebook.com/dodonateorg" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-[#00C853] transition-colors p-1"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-5 h-5 stroke-[2.2]" />
                    </a>
                    <a 
                      href="https://instagram.com/dodonate_org" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-[#00C853] transition-colors p-1"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5 stroke-[2.2]" />
                    </a>
                    <a 
                      href="https://twitter.com/dodonate_org" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-[#00C853] transition-colors p-1"
                      aria-label="Twitter/X"
                    >
                      <Twitter className="w-5 h-5 stroke-[2.2]" />
                    </a>
                    <a 
                      href="https://TikTok.com/dodonate" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-[#00C853] transition-colors p-1"
                      aria-label="TikTok"
                    >
                      <Music className="w-5 h-5 stroke-[2.2]" />
                    </a>
                    <a 
                      href="https://youtube.com/dodonate_org" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-[#00C853] transition-colors p-1"
                      aria-label="YouTube"
                    >
                      <Youtube className="w-5 h-5 stroke-[2.2]" />
                    </a>
                  </div>
                  {/* Small decorative red dot badge representing live presence */}
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                  </span>
                </div>
              </div>

            </div>

          </div>

          <hr className="border-gray-100" />

          {/* Product credits info */}
          <div className="pt-4 flex flex-col items-center justify-center text-center space-y-3">
            
            <div className="space-y-1.5">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest font-display">
                DoNest is a product of DoDonate Inc.
              </p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                © 2026 DODONATE INC. ALL RIGHTS RESERVED.
              </p>
            </div>

          </div>

        </div>
      </footer>

    </div>
  );
}
