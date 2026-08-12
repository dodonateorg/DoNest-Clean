import { NGO } from '../types';

export const CAMEROON_NGOS: NGO[] = [
  {
    username: 'saint-rita-orphanage',
    name: 'Saint Rita Orphanage Home',
    logo: '🏡',
    city: 'Yaoundé',
    address: 'Mvan District, Yaoundé, Cameroon',
    phone: '+237677123456',
    whatsappMessage: 'Hello Saint Rita Orphanage, I found you on DoNest and would like to support your physical needs!',
    description: 'Providing a safe nest, nutritious food, and sound education for over 45 vulnerable children in Yaoundé since 2012.',
    establishedYear: 2012,
    account_status: 'LIVE',
    website: 'https://saintritahome.org',
    physicalNeeds: [
      {
        id: 'sr-need-1',
        category: 'Food',
        item: 'Bags of Jasmine Rice (50kg)',
        targetQuantity: 10,
        currentQuantity: 3,
        unit: 'bags',
        urgency: 'High',
        details: 'Daily meals consume about 5kg of rice. High urgency as current store is nearly empty.'
      },
      {
        id: 'sr-need-2',
        category: 'Clothing',
        item: 'Warm sweaters for children aged 4-12',
        targetQuantity: 40,
        currentQuantity: 15,
        unit: 'pieces',
        urgency: 'Medium',
        details: 'For chilly Yaoundé evenings during the rainy season.'
      },
      {
        id: 'sr-need-3',
        category: 'Books',
        item: 'Primary school exercise books (MATH & ENGLISH)',
        targetQuantity: 150,
        currentQuantity: 60,
        unit: 'books',
        urgency: 'High',
        details: 'Needed urgently for the upcoming school term revision sessions.'
      },
      {
        id: 'sr-need-4',
        category: 'Shoes',
        item: 'Black school shoes (Sizes 28-36)',
        targetQuantity: 30,
        currentQuantity: 8,
        unit: 'pairs',
        urgency: 'Medium'
      }
    ],
    volunteerPostings: [
      {
        id: 'sr-vol-1',
        title: 'Weekend Math Tutor',
        details: 'Help children aged 8-13 catch up with essential arithmetic. Materials and outline provided.',
        startDate: '2026-08-01',
        endDate: '2026-12-15',
        initialInterestCount: 24
      },
      {
        id: 'sr-vol-2',
        title: 'Kitchen Volunteer Assistance',
        details: 'Assist our chefs in preparing nutritional dinners on busy Saturday afternoons.',
        startDate: '2026-07-25',
        endDate: '2026-09-30',
        initialInterestCount: 12
      }
    ],
    cashWishlist: [
      {
        id: 'sr-cash-1',
        title: 'Sponsor 150 school books',
        description: 'Provide curriculum textbook packages for our nursery children.',
        targetAmount: 250000, // 250,000 FCFA
        currentAmount: 180000,
        currency: 'FCFA'
      },
      {
        id: 'sr-cash-2',
        title: 'Repair Orphanage Kitchen Roof',
        description: 'Fixing the leak before the peak heavy downpours in August.',
        targetAmount: 450000,
        currentAmount: 120000,
        currency: 'FCFA'
      }
    ]
  },
  {
    username: 'hope-nest-buea',
    name: 'Hope Nest Foundation',
    logo: '🌱',
    city: 'Buea',
    address: 'Molyko Hill, Buea, Cameroon',
    phone: '+237675987654',
    whatsappMessage: 'Hello Hope Nest Buea, I found you on DoNest and would like to help with items or volunteering!',
    description: 'Nurturing the hopes of orphaned youth in the South West region. We focus heavily on digital literacy and vocational training.',
    establishedYear: 2018,
    account_status: 'LIVE',
    website: 'https://hopenestbuea.org',
    physicalNeeds: [
      {
        id: 'hn-need-1',
        category: 'Books',
        item: 'Introductory computer science manuals',
        targetQuantity: 20,
        currentQuantity: 5,
        unit: 'manuals',
        urgency: 'High',
        details: 'For our newly established solar-powered computer workspace.'
      },
      {
        id: 'hn-need-2',
        category: 'Food',
        item: 'Powdered Milk tin cans (900g)',
        targetQuantity: 25,
        currentQuantity: 18,
        unit: 'cans',
        urgency: 'Low'
      },
      {
        id: 'hn-need-3',
        category: 'Shoes',
        item: 'Rainboots for farm training',
        targetQuantity: 15,
        currentQuantity: 2,
        unit: 'pairs',
        urgency: 'High',
        details: 'To protect teenagers working on the potato and vegetable plot from soil infections.'
      }
    ],
    volunteerPostings: [
      {
        id: 'hn-vol-1',
        title: 'Basic Coding Instructor',
        details: 'Teach elementary Scratch or Python logic twice a week to children in our learning hub.',
        startDate: '2026-08-10',
        endDate: '2026-11-20',
        initialInterestCount: 45
      },
      {
        id: 'hn-vol-2',
        title: 'Farming Workshop Mentor',
        details: 'Guide students on sustainable agricultural practices in our backyard garden.',
        startDate: '2026-07-20',
        endDate: '2026-08-30',
        initialInterestCount: 9
      }
    ],
    cashWishlist: [
      {
        id: 'hn-cash-1',
        title: 'Purchase 2 Refurbished Laptops',
        description: 'Buying standard laptops for student coding labs.',
        targetAmount: 300000,
        currentAmount: 150000,
        currency: 'FCFA'
      }
    ]
  },
  {
    username: 'limbe-hope-haven',
    name: 'Limbe Hope Haven Orphanage',
    logo: '🌊',
    city: 'Limbe',
    address: 'Down Beach Road, Limbe, Cameroon',
    phone: '+237699345678',
    whatsappMessage: 'Hello Limbe Hope Haven, I want to support your physical needs or community volunteers!',
    description: 'A cozy coastal sanctuary offering full-time shelter, mental health counseling, and creative arts integration for 30 orphaned children.',
    establishedYear: 2015,
    account_status: 'LIVE',
    website: 'https://limbehopehaven.org',
    physicalNeeds: [
      {
        id: 'lh-need-1',
        category: 'Food',
        item: 'Vegetable Oil gallons (5L)',
        targetQuantity: 12,
        currentQuantity: 10,
        unit: 'gallons',
        urgency: 'Low'
      },
      {
        id: 'lh-need-2',
        category: 'Clothing',
        item: 'Lightweight summer t-shirts',
        targetQuantity: 50,
        currentQuantity: 12,
        unit: 'items',
        urgency: 'High',
        details: 'Limbe is hot and humid. Breathable cotton clothing is highly needed.'
      },
      {
        id: 'lh-need-3',
        category: 'Shoes',
        item: 'Outdoor rubber sandals',
        targetQuantity: 30,
        currentQuantity: 22,
        unit: 'pairs',
        urgency: 'Medium'
      }
    ],
    volunteerPostings: [
      {
        id: 'lh-vol-1',
        title: 'Creative Art & Crafts Facilitator',
        details: 'Coordinate weekend painting and clay sessions to help children express themselves and heal.',
        startDate: '2026-08-05',
        endDate: '2026-10-30',
        initialInterestCount: 31
      }
    ],
    cashWishlist: [
      {
        id: 'lh-cash-1',
        title: 'Art supplies bundle',
        description: 'Sponsor non-toxic acrylic paints, canvases, brushes, and sketching paper.',
        targetAmount: 85000,
        currentAmount: 80000,
        currency: 'FCFA'
      }
    ]
  },
  {
    username: 'douala-grace-home',
    name: 'Douala Grace & Mercies Home',
    logo: '🏢',
    city: 'Douala',
    address: 'Bonabéri, Douala, Cameroon',
    phone: '+237677889900',
    whatsappMessage: 'Hello Grace & Mercies Home, I found you on DoNest and want to donate physical items!',
    description: 'Serving the bustling city of Douala by rescuing street children and providing them with secure shelter, clinical care, and reuniting them with family when possible.',
    establishedYear: 2010,
    account_status: 'LIVE',
    website: 'https://doualagracehome.org',
    physicalNeeds: [
      {
        id: 'dg-need-1',
        category: 'Food',
        item: 'Sacks of dry Beans (25kg)',
        targetQuantity: 8,
        currentQuantity: 2,
        unit: 'sacks',
        urgency: 'High',
        details: 'Essential source of protein for growing children. Current inventory will only last one more week.'
      },
      {
        id: 'dg-need-2',
        category: 'Shoes',
        item: 'Athletic sneakers / Sports shoes',
        targetQuantity: 45,
        currentQuantity: 14,
        unit: 'pairs',
        urgency: 'Medium',
        details: 'For soccer training and physical exercise sessions.'
      },
      {
        id: 'dg-need-3',
        category: 'Clothing',
        item: 'Bed sheets and mosquito nets',
        targetQuantity: 60,
        currentQuantity: 50,
        unit: 'sets',
        urgency: 'Medium'
      }
    ],
    volunteerPostings: [
      {
        id: 'dg-vol-1',
        title: 'Weekly Sports Coach / Fitness Lead',
        details: 'Organize soccer games and athletic drills every Wednesday afternoon to build physical resilience.',
        startDate: '2026-07-28',
        endDate: '2026-11-30',
        initialInterestCount: 19
      },
      {
        id: 'dg-vol-2',
        title: 'First-Aid / Nurse Educator',
        details: 'Spend a Saturday teaching children and staff basic hygiene, hand-washing, and first-aid response.',
        startDate: '2026-08-12',
        endDate: '2026-08-13',
        initialInterestCount: 8
      }
    ],
    cashWishlist: [
      {
        id: 'dg-cash-1',
        title: 'Sponsor 30 Malaria Bednets',
        description: 'Provide treated mosquito nets to fully protect the boys and girls dormitories.',
        targetAmount: 120000,
        currentAmount: 95000,
        currency: 'FCFA'
      }
    ]
  },
  {
    username: 'bamenda-rising-star',
    name: 'Bamenda Rising Star Orphanage',
    logo: '⭐',
    city: 'Bamenda',
    address: 'Nkwen District, Bamenda, Cameroon',
    phone: '+237679456123',
    whatsappMessage: 'Hello Bamenda Rising Star, I want to donate items or volunteer to help the children!',
    description: 'Providing a resilient haven of hope and educational tools for children in the highlands of Bamenda, with safe community support systems.',
    establishedYear: 2014,
    account_status: 'LIVE',
    website: 'https://bamendarisingstar.org',
    physicalNeeds: [
      {
        id: 'br-need-1',
        category: 'Food',
        item: 'Maize Flour sacks (50kg)',
        targetQuantity: 15,
        currentQuantity: 4,
        unit: 'sacks',
        urgency: 'High',
        details: 'Used for cooking "Fufu Corn," a fundamental staple for daily lunch.'
      },
      {
        id: 'br-need-2',
        category: 'Books',
        item: 'Novels and storybooks (English)',
        targetQuantity: 100,
        currentQuantity: 72,
        unit: 'books',
        urgency: 'Low',
        details: 'To enrich our reading club library.'
      }
    ],
    volunteerPostings: [
      {
        id: 'br-vol-1',
        title: 'Storytelling & Reading Club Host',
        details: 'Host virtual or physical storytelling sessions to foster reading habits and critical thinking.',
        startDate: '2026-08-01',
        endDate: '2026-10-31',
        initialInterestCount: 15
      }
    ],
    cashWishlist: [
      {
        id: 'br-cash-1',
        title: 'Sponsor 200 School Uniforms',
        description: 'Sponsor tailored uniforms for our newly enrolled primary pupils.',
        targetAmount: 500000,
        currentAmount: 220000,
        currency: 'FCFA'
      }
    ]
  },
  {
    username: 'kumba-mercy-haven',
    name: 'Kumba Mercy Haven Center',
    logo: '🧡',
    city: 'Kumba',
    address: 'Fiango, Kumba, Cameroon',
    phone: '+237681234567',
    whatsappMessage: 'Hello Kumba Mercy Haven, I found you on DoNest and would love to support!',
    description: 'Dedicated to sheltering, feeding, and educating orphaned and displaced children in the Meme department. We operate with a strong community approach.',
    establishedYear: 2016,
    account_status: 'LIVE',
    website: 'https://kumbamercyhaven.org',
    physicalNeeds: [
      {
        id: 'km-need-1',
        category: 'Food',
        item: 'Cooking Salt & Seasoning Cubes',
        targetQuantity: 5,
        currentQuantity: 1,
        unit: 'cartons',
        urgency: 'High'
      },
      {
        id: 'km-need-2',
        category: 'Clothing',
        item: 'Baby clothes (Ages 0-3)',
        targetQuantity: 50,
        currentQuantity: 15,
        unit: 'sets',
        urgency: 'High',
        details: 'Recent arrival of three abandoned infants has made this a critical gap.'
      },
      {
        id: 'km-need-3',
        category: 'Shoes',
        item: 'Infant soft booties',
        targetQuantity: 15,
        currentQuantity: 2,
        unit: 'pairs',
        urgency: 'Medium'
      }
    ],
    volunteerPostings: [
      {
        id: 'km-vol-1',
        title: 'Infant Care Assistant',
        details: 'Support our experienced nannies in feeding, bathing, and soothing infants.',
        startDate: '2026-07-22',
        endDate: '2026-09-30',
        initialInterestCount: 18
      }
    ],
    cashWishlist: [
      {
        id: 'km-cash-1',
        title: 'Infant Formula & Diapers Sponsor',
        description: 'Sponsor continuous supply of specialized infant formula and eco-friendly diapers.',
        targetAmount: 350000,
        currentAmount: 280000,
        currency: 'FCFA'
      }
    ]
  }
];
