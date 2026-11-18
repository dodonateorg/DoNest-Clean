import directDonationsImg from '../assets/images/direct_donations_africa_1795014842426.jpg';
import attestationCertificateImg from '../assets/images/volunteer_impact_certificate_1795014841892.jpg';
import { ARTICLE_SEO_LIST, ArticleSeoMeta } from '../utils/seo';

export interface ArticleBulletItem {
  label?: string;
  text: string;
}

export interface ArticleDestinationCard {
  country: string;
  subtitle?: string;
  flag: string;
  intro: string;
  topNeeds?: string;
  needsLabel?: string;
  howToConnect?: string;
}

export interface ArticleStepCard {
  stepNumber: string;
  title: string;
  description: string;
}

export interface ArticleContentSection {
  id: string;
  heading: string;
  paragraphs?: string[];
  bullets?: ArticleBulletItem[];
  destinations?: ArticleDestinationCard[];
  steps?: ArticleStepCard[];
}

export interface Article extends ArticleSeoMeta {
  coverImage: string;
  introParagraphs: string[];
  sections: ArticleContentSection[];
  ctaHeading: string;
  ctaParagraphs: string[];
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
}

const getMeta = (slug: string): ArticleSeoMeta => {
  const found = ARTICLE_SEO_LIST.find(a => a.slug === slug);
  if (!found) {
    throw new Error(`Missing SEO metadata for article slug: ${slug}`);
  }
  return found;
};

export const ARTICLES: Article[] = [
  {
    ...getMeta('find-volunteer-opportunities-in-africa'),
    coverImage: 'https://iili.io/o3jg9Wu.png',
    introParagraphs: [
      'For passionate changemakers, students, and professionals looking to give back, finding meaningful and legitimate ways to contribute across the African continent can often feel overwhelming. Traditional international placement agencies frequently charge exorbitant fees, while local grassroots organizations struggle to connect with willing hands.',
      "Enter DoNest (donest.org)—a pan-African community discovery and volunteer hub designed to bridge this gap. Whether you want to tutor students in Douala, mentor tech entrepreneurs in Lagos, or support children's programs in Nairobi, DoNest makes it effortless to discover and easily apply to volunteer opportunities right where your skills are needed most."
    ],
    sections: [
      {
        id: 'shifting-toward-local-empowerment',
        heading: 'Why Volunteering in Africa is Shifting Toward Local Empowerment',
        paragraphs: [
          'For decades, volunteering abroad was synonymous with expensive Western intermediary agencies and opaque projects. Today, a new wave of community-led development is transforming how impact is made:'
        ],
        bullets: [
          {
            label: 'Direct Community Integration',
            text: "Instead of filler tasks, modern volunteers work directly with local orphanages, youth groups, and NGOs that understand their own communities' needs."
          },
          {
            label: 'Skill-Based Giving',
            text: 'African economies are booming tech, education, and entrepreneurial hubs. Organizations are looking for real skills—ranging from digital literacy and math tutoring to marketing, project management, and healthcare support.'
          },
          {
            label: 'Tangible Accountability',
            text: 'Platforms like DoNest ensure that your time and effort directly support verified local initiatives with complete transparency.'
          }
        ]
      },
      {
        id: 'top-destinations-africa',
        heading: 'Top Destinations for Volunteering in Africa',
        paragraphs: [
          'If you are planning your next community outreach or career-boosting service trip, these three vibrant regions offer immense opportunities:'
        ],
        destinations: [
          {
            country: 'Cameroon',
            subtitle: 'Community Education & Youth Mentorship',
            flag: '🇨🇲',
            intro:
              'From bustling urban centers like Douala and Yaoundé to university towns like Buea, Cameroon has a massive network of grassroots organizations and orphanages.',
            topNeeds:
              'English/French literacy, vocational training, youth sports coaching, and IT/computer skills training.',
            howToConnect:
              "Use DoNest's location search to find active care homes and community projects in the Littoral and Southwest regions looking for weekend mentors."
          },
          {
            country: 'Nigeria',
            subtitle: 'Tech Innovation & Social Impact',
            flag: '🇳🇬',
            intro:
              "As West Africa's economic powerhouse—centered in Lagos and Abuja—Nigeria offers unique prospects for professionals and students.",
            topNeeds:
              'Corporate social responsibility (CSR) initiatives, digital skills mentorship for underserved youth, and community health education.',
            howToConnect:
              'Match your professional expertise with structured local NGOs that need short-term or ongoing volunteer support.'
          },
          {
            country: 'Kenya',
            subtitle: 'Wildlife Conservation & Community Outreach',
            flag: '🇰🇪',
            intro:
              'Renowned for its vibrant community projects across Nairobi, Mombasa, and Nakuru, Kenya blends wildlife conservation with robust educational outreach.',
            topNeeds:
              "Childcare support, women's education programs, and environmental sustainability projects.",
            howToConnect:
              'Browse local community hubs on DoNest to find verified organizations requesting hands-on assistance.'
          }
        ]
      },
      {
        id: 'how-to-apply-on-donest',
        heading: 'How to Easily Apply to Volunteer Opportunities on DoNest',
        paragraphs: [
          'Gone are the days of endless email threads and unresponsive forms. DoNest (donest.org) has streamlined the entire process into four simple stages:'
        ],
        steps: [
          {
            stepNumber: '01',
            title: 'Find Your Opportunity',
            description:
              'Visit the DoNest Volunteer Hub and search by city, cause, or required skill set (e.g., tutor, coach, mentor).'
          },
          {
            stepNumber: '02',
            title: 'Select & Apply',
            description:
              'Open any active listing, fill out the quick application form, and submit it directly to the host organization.'
          },
          {
            stepNumber: '03',
            title: 'Volunteer With Purpose',
            description:
              'Show up, engage with the community, and carry out your meaningful service activities without administrative hassle.'
          },
          {
            stepNumber: '04',
            title: 'Receive Your Verified Attestation',
            description:
              'Every hour you give is officially recognized. DoNest generates signed Virtual Impact Certificates and Attestations of Service that you can proudly add to your CV, LinkedIn profile, school requirements, or scholarship applications.'
          }
        ]
      }
    ],
    ctaHeading: 'Start Your Impact Journey Today',
    ctaParagraphs: [
      "You don't need a massive travel budget or months of bureaucratic paperwork to make a difference. Whether you want to donate your weekend hours in Cameroon, Nigeria, Kenya, or anywhere else across the continent, DoNest gives you the tools to connect, serve, and grow.",
      'Ready to get started? Head over to DoNest today, explore open roles in your city, and take the first step toward creating lasting community impact!'
    ],
    primaryCtaLabel: 'Explore Live Volunteer Opportunities',
    primaryCtaHref: '/volunteers',
    secondaryCtaLabel: 'Browse African Nonprofits Directory',
    secondaryCtaHref: '/'
  },
  {
    ...getMeta('ngo-volunteer-opportunities-in-cameroon'),
    coverImage: 'https://iili.io/o3jg9Wu.png',
    introParagraphs: [
      'Whether you are a university student in Buea looking to build your CV, a young professional in Douala hoping to give back on weekends, or an international changemaker seeking genuine grassroots impact, finding legitimate NGO volunteer opportunities in Cameroon can be surprisingly difficult.',
      'Many international placement sites charge hundreds of dollars in middleman fees, while local orphanages and community associations often lack the online visibility to advertise their urgent needs.',
      "With DoNest, the human and community hub engineered by DoDonate Inc., connecting directly with field-verified nonprofits and children's homes across Cameroon is completely free, transparent, and takes less than a minute."
    ],
    sections: [
      {
        id: 'top-cities-volunteering-cameroon',
        heading: 'Top Cities for Volunteering in Cameroon',
        paragraphs: [
          'Cameroon’s bilingual heritage and diverse regional needs offer a wide range of hands-on ways to serve. On DoNest, you can search opportunities directly by city or town:'
        ],
        destinations: [
          {
            country: 'Douala (Littoral Region)',
            flag: '🇨🇲',
            intro:
              "As Cameroon's economic capital, Douala is home to dozens of urban children's homes, youth skill centers, and community health initiatives.",
            needsLabel: 'Most Needed Roles',
            topNeeds:
              'Weekend math and science tutoring, basic IT/computer literacy classes, sports coaching, and organizing physical supply drives (school shoes, textbooks, and food staples).'
          },
          {
            country: 'Yaoundé (Centre Region)',
            flag: '🇨🇲',
            intro:
              'In the administrative capital, grassroots nonprofits focus heavily on youth empowerment, vocational training, and women-led community cooperatives.',
            needsLabel: 'Most Needed Roles',
            topNeeds:
              'French/English language mentorship, grant writing and digital communications support, and healthcare awareness outreach.'
          },
          {
            country: 'Buea & Limbe (South-West Region)',
            flag: '🇨🇲',
            intro:
              'Known as the "Silicon Mountain" tech hub and a major university center, Buea and Limbe have a vibrant culture of student-led and youth-driven philanthropy.',
            needsLabel: 'Most Needed Roles',
            topNeeds:
              'Coding and digital skills workshops for secondary students, mentorship with university associations, and direct hands-on support at local care homes.'
          },
          {
            country: 'Bamenda & Kumba',
            flag: '🇨🇲',
            intro:
              'Grassroots organizations and humanitarian nonprofits in these cities actively welcome dedicated local volunteers and interns to assist with sustainable agriculture, educational support, and social welfare programs.'
          }
        ]
      },
      {
        id: 'types-of-volunteer-roles-donest',
        heading: 'Types of NGO Volunteer Roles Available on DoNest',
        paragraphs: [
          'You do not need to be a medical doctor or have a massive budget to make a difference. Verified nonprofits and care homes in Cameroon regularly look for everyday skills:'
        ],
        bullets: [
          {
            label: 'Education & Academic Tutoring',
            text: 'Help children at local care homes catch up on homework, reading, mathematics, and exam preparation.'
          },
          {
            label: 'Digital & Tech Mentorship',
            text: 'Teach basic computer literacy, graphic design, or coding to underserved youth.'
          },
          {
            label: 'Sports, Arts & Recreation',
            text: 'Lead weekend football training, storytelling sessions, painting, or music workshops.'
          },
          {
            label: 'Nonprofit Operations & Media',
            text: 'Help small grassroots NGOs take clean photos, manage their social media presence, or draft project proposals.'
          },
          {
            label: 'Physical Wishlist Coordination',
            text: 'Assist care homes with sorting and delivering donated clothes, books, mattresses, and food supplies.'
          }
        ]
      },
      {
        id: 'why-volunteer-donest-vs-agencies',
        heading: 'Why Volunteer Through DoNest Instead of Traditional Agencies?',
        bullets: [
          {
            label: 'Zero Middleman Fees',
            text: 'Unlike foreign volunteer brokers that charge hefty placement fees, DoNest is 100% free for volunteers and local NGOs.'
          },
          {
            label: 'Verified Organizations',
            text: 'Explore authentic orphanages and community associations with transparent locations, needs, and direct contact channels.'
          },
          {
            label: 'Official Attestation of Service',
            text: 'Every completed volunteer contribution through DoNest qualifies for a signed Virtual Impact Certificate and Attestation of Service—valuable proof of civic impact for scholarships, university applications, and LinkedIn profiles.'
          },
          {
            label: 'Direct Communication',
            text: 'Connect straight with NGO directors and volunteer coordinators without bureaucratic delays.'
          }
        ]
      },
      {
        id: 'how-to-apply-cameroon-4-steps',
        heading: 'How to Apply for a Volunteer Role in Cameroon in 4 Steps',
        steps: [
          {
            stepNumber: '01',
            title: 'Explore Open Listings',
            description:
              'Visit donest.org/volunteers to browse active roles or filter nonprofits by country and city on the DoNest home directory.'
          },
          {
            stepNumber: '02',
            title: 'Review Requirements',
            description:
              'Check the organization’s profile, time commitment (weekend, short-term, or ongoing), and specific skills requested.'
          },
          {
            stepNumber: '03',
            title: 'Submit Your Application',
            description:
              'Click apply, enter your details and contact number, and submit directly to the host NGO coordinator.'
          },
          {
            stepNumber: '04',
            title: 'Serve & Earn Recognition',
            description:
              'Complete your service hours in the community and receive your verified Attestation of Service.'
          }
        ]
      }
    ],
    ctaHeading: 'Ready to Make an Impact in Your Community?',
    ctaParagraphs: [
      'Explore verified volunteer opportunities in Cameroon on DoNest today or browse local orphanages and nonprofits that need your time and support right now.'
    ],
    primaryCtaLabel: 'Explore Volunteer Roles in Cameroon',
    primaryCtaHref: '/volunteers',
    secondaryCtaLabel: 'Browse Verified Nonprofits',
    secondaryCtaHref: '/'
  },
  {
    ...getMeta('direct-physical-item-donations-africa-orphanages'),
    coverImage: directDonationsImg,
    introParagraphs: [
      'Every household and business eventually accumulates useful items that sit untouched—warm clothing children have outgrown, primary school textbooks, backpacks, sturdy shoes, or surplus kitchen staples. Instead of letting valuable supplies gather dust or go to waste, direct physical giving places them straight into the hands of African nonprofits and orphanages that need them today.',
      'Across Cameroon, Nigeria, Kenya, Ghana, and beyond, grassroots care homes update their physical need checklists on DoNest in real time so supporters know exactly what to bring or arrange for pickup.'
    ],
    sections: [
      {
        id: 'why-direct-item-giving-matters',
        heading: 'Why Direct Physical Giving Eliminates Friction',
        paragraphs: [
          'Traditional charity supply chains often involve long shipping timelines, customs bottlenecks, and administrative overhead. Local direct donations solve these challenges immediately:'
        ],
        bullets: [
          {
            label: 'Real-Time Needs Visibility',
            text: 'Verified orphanages list high-urgency essentials—from 50kg sacks of rice and dry beans to mosquito nets and primary math workbooks.'
          },
          {
            label: 'Zero Intermediary Fees',
            text: 'You contact the nonprofit coordinator directly via WhatsApp or telephone to coordinate drop-off or convenient pickup.'
          },
          {
            label: 'Dignified Community Connection',
            text: 'Delivering supplies in person or partnering with your workplace team builds lasting local relationships and visible accountability.'
          }
        ]
      },
      {
        id: 'most-requested-items',
        heading: 'Most Requested Physical Items Across African Children’s Homes',
        bullets: [
          {
            label: 'Education & Books',
            text: 'Exercise books, storybooks, primary math & English textbooks, pens, geometry sets, and sturdy school backpacks.'
          },
          {
            label: 'Nutritious Food Staples',
            text: 'Rice, maize flour, beans, cooking oil, powdered milk, and non-perishable pantry groceries.'
          },
          {
            label: 'Clothing, Shoes & Hygiene',
            text: 'Clean children’s clothes, school shoes, athletic sneakers, soap, sanitary pads, and treated bednets.'
          }
        ]
      }
    ],
    ctaHeading: 'Turn Unused Items Into Immediate Impact',
    ctaParagraphs: [
      'Search by country, town, or needed item on the DoNest homepage to discover verified nonprofits and children’s centers near you ready to receive your direct donation.'
    ],
    primaryCtaLabel: 'Find a Nonprofit Near You',
    primaryCtaHref: '/',
    secondaryCtaLabel: 'Read the Volunteer Hub Guide',
    secondaryCtaHref: '/articles/find-volunteer-opportunities-in-africa'
  },
  {
    ...getMeta('verified-volunteer-attestation-service-africa-careers'),
    coverImage: attestationCertificateImg,
    introParagraphs: [
      'Volunteering transforms local communities—and when properly documented, it transforms your academic and professional trajectory too. Across Africa, students applying for competitive international scholarships, university fellowships, and first-time tech or healthcare roles are increasingly evaluated on verified civic leadership.',
      'That is why every eligible volunteer opportunity on DoNest offers an official, signed Attestation of Service recognizing your contribution hours.'
    ],
    sections: [
      {
        id: 'what-attestation-proves',
        heading: 'What a Verified Attestation of Service Proves to Employers & Admissions Panels',
        bullets: [
          {
            label: 'Documented Hours & Dates',
            text: 'Confirms exact duration and sustained commitment—especially impactful once you complete 20+ service hours.'
          },
          {
            label: 'Applied Leadership & Real Skills',
            text: 'Demonstrates practical teaching, IT coaching, event logistics, infant care, or project execution alongside verified NGO leaders.'
          },
          {
            label: 'Instant Credibility on LinkedIn & CVs',
            text: 'Provides traceable reference validation from registered host nonprofits instead of unverified claims.'
          }
        ]
      },
      {
        id: 'maximizing-your-service',
        heading: 'Tips to Maximize Your Volunteer Impact',
        steps: [
          {
            stepNumber: '01',
            title: 'Match Your Career Goals',
            description:
              'Aspiring engineers can lead coding clubs; education majors can tutor math and literacy; health students can support hygiene workshops.'
          },
          {
            stepNumber: '02',
            title: 'Stay Consistent',
            description:
              'Commit to recurring weekend or weekly sessions so students and partner organizations can rely on your mentorship.'
          },
          {
            stepNumber: '03',
            title: 'Request Your Certificate Promptly',
            description:
              'Upon completing your service milestone with the host organization, receive your signed Attestation of Service ready for scholarship and job portals.'
          }
        ]
      }
    ],
    ctaHeading: 'Find an Attestation-Eligible Role Today',
    ctaParagraphs: [
      'Browse active volunteer opportunities across Africa—all free to join and backed by transparent host organizations.'
    ],
    primaryCtaLabel: 'Browse Open Volunteer Roles',
    primaryCtaHref: '/volunteers',
    secondaryCtaLabel: 'Explore Nonprofit Partners',
    secondaryCtaHref: '/'
  }
];

export function findArticleBySlug(slug: string): Article | undefined {
  const clean = (slug || '').replace(/^\/+|\/+$/g, '').toLowerCase();
  return ARTICLES.find(a => a.slug.toLowerCase() === clean);
}
