// Performance and SEO optimization script for Leo Loves Travel
// This script can be run to validate and optimize SEO elements

export const performSEOAudit = () => {
  const seoIssues: string[] = [];

  // Check for missing alt tags on images
  const images = document.querySelectorAll('img');
  images.forEach((img, index) => {
    if (!img.alt || img.alt.trim() === '') {
      seoIssues.push(`Image ${index + 1} missing alt text: ${img.src}`);
    }
  });

  // Check for multiple H1 tags
  const h1Tags = document.querySelectorAll('h1');
  if (h1Tags.length > 1) {
    seoIssues.push(`Multiple H1 tags found: ${h1Tags.length}. Should have only one H1 per page.`);
  }

  // Check for meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription || !metaDescription.getAttribute('content')) {
    seoIssues.push('Missing meta description');
  } else {
    const description = metaDescription.getAttribute('content') || '';
    if (description.length < 120 || description.length > 160) {
      seoIssues.push(`Meta description length issue: ${description.length} characters. Recommended: 120-160 characters.`);
    }
  }

  // Check for meta title
  const title = document.title;
  if (!title) {
    seoIssues.push('Missing page title');
  } else if (title.length < 30 || title.length > 60) {
    seoIssues.push(`Title length issue: ${title.length} characters. Recommended: 30-60 characters.`);
  }

  // Check for canonical URL
  const canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    seoIssues.push('Missing canonical URL');
  }

  // Check for Open Graph tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  const ogImage = document.querySelector('meta[property="og:image"]');
  
  if (!ogTitle) seoIssues.push('Missing Open Graph title');
  if (!ogDescription) seoIssues.push('Missing Open Graph description');
  if (!ogImage) seoIssues.push('Missing Open Graph image');

  // Check for structured data
  const structuredData = document.querySelectorAll('script[type="application/ld+json"]');
  if (structuredData.length === 0) {
    seoIssues.push('No structured data found');
  }

  return {
    issues: seoIssues,
    passed: seoIssues.length === 0,
    score: Math.max(0, 100 - (seoIssues.length * 10))
  };
};

// Vietnam Travel Keywords for international tourists
export const vietnamTravelKeywords = [
  'Vietnam travel',
  'Vietnam tours',
  'Vietnam vacation',
  'Vietnam holidays',
  'Vietnam travel packages',
  'Vietnam tour operator',
  'Vietnam travel agency',
  'Vietnam cultural tours',
  'Vietnam adventure tours',
  'Vietnam luxury travel',
  'Vietnam budget travel',
  'Vietnam group tours',
  'Vietnam private tours',
  'Vietnam family tours',
  'Vietnam honeymoon packages',
  'Southeast Asia travel',
  'Indochina tours',
  'Vietnam backpacking',
  'Vietnam motorcycle tours',
  'Vietnam food tours',
  'Vietnam photography tours',
  'Vietnam eco tours',
  'Vietnam trekking',
  'Vietnam beaches',
  'Hanoi tours',
  'Ho Chi Minh City tours',
  'Halong Bay cruise',
  'Hoi An ancient town',
  'Sapa trekking',
  'Mekong Delta tours',
  'Vietnam War history tours',
  'Hue imperial city',
  'Da Nang tours',
  'Phu Quoc island',
  'Nha Trang beaches'
];

// Image SEO optimization
export const optimizeImageSEO = (element: HTMLImageElement, altText: string, title?: string) => {
  if (!element.alt) {
    element.alt = altText;
  }
  if (title && !element.title) {
    element.title = title;
  }
  // Add loading optimization
  if (!element.loading) {
    element.loading = 'lazy';
  }
};

// Enhanced Page Configurations with comprehensive SEO metadata
export const pageConfigs = {
  home: {
    title: 'Leo Loves Travel - Premier Vietnam Travel Agency | Authentic Vietnam Tours & Experiences 2025',
    description: 'Leo Loves Travel - Your trusted Vietnam travel agency specializing in authentic Vietnamese experiences. Discover Vietnam through expertly crafted tours from Hanoi to Ho Chi Minh City, Halong Bay to Hoi An. Professional guides, cultural immersion, and unforgettable adventures await.',
    keywords: 'Leo Loves Travel, vietnam travel, vietnam tours, vietnam travel agency, hanoi tours, ho chi minh city tours, halong bay cruise, hoi an tours, sapa trekking, mekong delta tours, vietnam cultural tours, vietnam adventure tours, vietnam travel packages, authentic vietnam experiences',
    structuredData: {
      '@type': 'TravelAgency',
      name: 'Leo Loves Travel',
      description: 'Premier Vietnam travel agency offering authentic cultural experiences',
      areaServed: 'Vietnam',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Vietnam Tours & Experiences',
        itemListElement: [
          { '@type': 'TouristTrip', name: 'Halong Bay Cruise', description: 'UNESCO World Heritage site cruise experience' },
          { '@type': 'TouristTrip', name: 'Sapa Trekking', description: 'Mountain trekking and ethnic culture immersion' },
          { '@type': 'TouristTrip', name: 'Hoi An Cultural Tour', description: 'Ancient town exploration and lantern festival' }
        ]
      }
    }
  },
  packageTours: {
    title: 'Vietnam Package Tours 2025 | Best Vietnam Tour Packages | Leo Loves Travel',
    description: 'Discover the best Vietnam package tours for 2025. From Halong Bay cruises to Sapa trekking adventures, explore curated Vietnam tour packages with expert local guides and authentic experiences.',
    keywords: 'vietnam package tours, vietnam tour packages, best vietnam tours, vietnam travel packages, halong bay tours, sapa tours, hoi an tours, mekong delta tours, vietnam group tours, vietnam private tours',
    structuredData: {
      '@type': 'TouristTrip',
      name: 'Vietnam Package Tours',
      description: 'Comprehensive Vietnam tour packages covering all major destinations',
      itinerary: {
        '@type': 'ItemList',
        itemListElement: [
          { '@type': 'TouristDestination', name: 'Hanoi', description: 'Capital city cultural exploration' },
          { '@type': 'TouristDestination', name: 'Halong Bay', description: 'UNESCO World Heritage limestone karsts cruise' },
          { '@type': 'TouristDestination', name: 'Hoi An', description: 'Ancient trading port and lantern town' },
          { '@type': 'TouristDestination', name: 'Ho Chi Minh City', description: 'Modern metropolis with rich history' }
        ]
      }
    }
  },
  about: {
    title: 'About Leo Loves Travel | Vietnam Travel Experts | Our Story & Mission',
    description: 'Learn about Leo Loves Travel, Vietnam\'s premier travel agency. Founded by passionate travel experts, we specialize in authentic Vietnamese experiences for international travelers seeking cultural immersion.',
    keywords: 'about leo loves travel, vietnam travel agency, vietnam tour company, travel company vietnam, vietnam travel experts, authentic vietnam experiences, vietnam tour guides',
    structuredData: {
      '@type': 'AboutPage',
      mainEntity: {
        '@type': 'TravelAgency',
        name: 'Leo Loves Travel',
        foundingDate: '2025',
        founder: { '@type': 'Person', name: 'Leo' },
        description: 'Vietnam travel agency specializing in authentic cultural experiences'
      }
    }
  },
  contact: {
    title: 'Contact Leo Loves Travel | Vietnam Travel Agency | Get in Touch Today',
    description: 'Contact Leo Loves Travel for personalized Vietnam tour planning. Expert travel consultants ready to help plan your perfect Vietnam adventure. Phone: +84-865-843-276.',
    keywords: 'contact leo loves travel, vietnam travel agency contact, vietnam tour planning, vietnam travel consultation, plan vietnam trip',
    structuredData: {
      '@type': 'ContactPage',
      mainEntity: {
        '@type': 'TravelAgency',
        name: 'Leo Loves Travel',
        telephone: '+84-865-843-276',
        email: 'info@leolovestravel.com',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Ho Chi Minh City',
          addressCountry: 'Vietnam'
        }
      }
    }
  },
  travelServices: {
    title: 'Vietnam Travel Services | Complete Travel Support | Leo Loves Travel',
    description: 'Comprehensive Vietnam travel services including visa assistance, transportation, accommodation booking, travel insurance, and 24/7 support for your Vietnam adventure.',
    keywords: 'vietnam travel services, vietnam visa assistance, vietnam transportation, vietnam accommodation, vietnam travel insurance, vietnam travel support',
    structuredData: {
      '@type': 'Service',
      name: 'Vietnam Travel Services',
      provider: { '@type': 'TravelAgency', name: 'Leo Loves Travel' },
      serviceType: 'Travel Services',
      areaServed: 'Vietnam'
    }
  },
  teamBuilding: {
    title: 'Vietnam Team Building Tours | Corporate Travel Vietnam | Leo Loves Travel',
    description: 'Professional team building experiences in Vietnam. Corporate retreats, team bonding activities, and business travel solutions designed to strengthen your team while exploring Vietnam.',
    keywords: 'vietnam team building, corporate travel vietnam, business travel vietnam, team building tours, corporate retreats vietnam, vietnam incentive travel',
    structuredData: {
      '@type': 'Service',
      name: 'Team Building Tours Vietnam',
      serviceType: 'Corporate Travel',
      audience: { '@type': 'BusinessAudience', audienceType: 'Corporate Teams' }
    }
  },
  events: {
    title: 'Vietnam Events & Conferences | Corporate Event Planning | Leo Loves Travel',
    description: 'Expert planning and execution of business meetings, conferences, and special events in Vietnam\'s premier venues. Professional event management for corporate gatherings.',
    keywords: 'vietnam events, vietnam conferences, corporate events vietnam, business meetings vietnam, event planning vietnam, vietnam venues',
    structuredData: {
      '@type': 'Service',
      name: 'Events & Conferences Vietnam',
      serviceType: 'Event Planning',
      audience: { '@type': 'BusinessAudience', audienceType: 'Corporate Clients' }
    }
  },
  romanticTravel: {
    title: 'Vietnam Romantic Travel | Honeymoon Packages Vietnam | Leo Loves Travel',
    description: 'Romantic Vietnam experiences perfect for couples. Honeymoon packages, anniversary celebrations, and intimate getaways featuring Vietnam\'s most romantic destinations.',
    keywords: 'vietnam romantic travel, vietnam honeymoon, couples travel vietnam, romantic vietnam tours, vietnam anniversary trips, romantic getaways vietnam',
    structuredData: {
      '@type': 'TouristTrip',
      name: 'Romantic Vietnam Travel',
      audience: { '@type': 'PeopleAudience', audienceType: 'Couples' },
      description: 'Romantic experiences for couples in Vietnam'
    }
  },
  medicalTravel: {
    title: 'Vietnam Medical Travel | Healthcare Tourism Vietnam | Leo Loves Travel',
    description: 'Comprehensive medical travel services in Vietnam. Healthcare tourism combining world-class medical care with cultural exploration and recovery in beautiful Vietnamese settings.',
    keywords: 'vietnam medical travel, healthcare tourism vietnam, medical tourism vietnam, vietnam hospitals, vietnam healthcare, medical vacation vietnam',
    structuredData: {
      '@type': 'MedicalBusiness',
      name: 'Vietnam Medical Travel Services',
      medicalSpecialty: 'Medical Tourism',
      areaServed: 'Vietnam'
    }
  },
  helpCenter: {
    title: 'Help Center | Vietnam Travel Support | Leo Loves Travel FAQ',
    description: 'Get answers to your Vietnam travel questions. Comprehensive help center with FAQs, travel tips, booking support, and 24/7 customer service for your Vietnam journey.',
    keywords: 'vietnam travel help, vietnam travel faq, vietnam travel support, vietnam travel tips, vietnam travel questions, leo loves travel support',
    structuredData: {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is the best time to visit Vietnam?',
          acceptedAnswer: { '@type': 'Answer', text: 'Vietnam can be visited year-round, with different regions having optimal seasons. Northern Vietnam is best from September to November and March to May.' }
        }
      ]
    }
  },
  blog: {
    title: 'Vietnam Travel Blog | Travel Tips & Guides | Leo Loves Travel',
    description: 'Expert Vietnam travel blog with insider tips, destination guides, cultural insights, and travel inspiration. Discover hidden gems and local secrets from Vietnam travel experts.',
    keywords: 'vietnam travel blog, vietnam travel tips, vietnam travel guide, vietnam destinations, vietnam culture, vietnam travel advice, vietnam travel inspiration',
    structuredData: {
      '@type': 'Blog',
      name: 'Leo Loves Travel Blog',
      description: 'Vietnam travel insights and destination guides',
      publisher: { '@type': 'TravelAgency', name: 'Leo Loves Travel' }
    }
  },
  interactiveMap: {
    title: 'Vietnam Interactive Map | Explore Vietnam Destinations | Leo Loves Travel',
    description: 'Explore Vietnam with our interactive map. Discover destinations, tour routes, attractions, and hidden gems across Vietnam from Hanoi to Ho Chi Minh City.',
    keywords: 'vietnam map, interactive vietnam map, vietnam destinations map, vietnam attractions map, vietnam tour routes, explore vietnam map',
    structuredData: {
      '@type': 'Map',
      name: 'Vietnam Interactive Travel Map',
      mapType: 'VenueMap',
      about: { '@type': 'Country', name: 'Vietnam' }
    }
  }
};

// Internal linking opportunities for SEO
export const internalLinkingMap = {
  homepage: [
    { text: 'Vietnam Package Tours', url: '/package-tours', rel: 'tours' },
    { text: 'About Our Vietnam Experts', url: '/about', rel: 'company' },
    { text: 'Contact Our Travel Consultants', url: '/contact', rel: 'contact' },
    { text: 'Travel Services', url: '/travel-services', rel: 'services' }
  ],
  tours: [
    { text: 'Halong Bay Cruise Tours', url: '/tour/2', rel: 'destination' },
    { text: 'Sapa Trekking Adventures', url: '/tour/3', rel: 'destination' },
    { text: 'Hoi An Cultural Tours', url: '/tour/4', rel: 'destination' },
    { text: 'Mekong Delta Exploration', url: '/tour/5', rel: 'destination' }
  ],
  services: [
    { text: 'Team Building Vietnam', url: '/team-building', rel: 'service' },
    { text: 'Corporate Events Vietnam', url: '/events', rel: 'service' },
    { text: 'Romantic Travel Vietnam', url: '/romantic-travel', rel: 'service' },
    { text: 'Medical Travel Vietnam', url: '/medical-travel', rel: 'service' }
  ]
};

// SEO Best Practices Checklist
export const seoChecklist = {
  technical: [
    'Optimize page loading speed',
    'Implement responsive design',
    'Use semantic HTML5 elements',
    'Optimize images with alt text',
    'Implement structured data',
    'Add canonical URLs',
    'Configure XML sitemap',
    'Implement breadcrumb navigation'
  ],
  content: [
    'Write compelling meta titles (30-60 chars)',
    'Create descriptive meta descriptions (120-160 chars)',
    'Use heading hierarchy (H1, H2, H3)',
    'Include target keywords naturally',
    'Create valuable, original content',
    'Optimize for user intent',
    'Add internal linking',
    'Include location-based keywords'
  ],
  social: [
    'Configure Open Graph tags',
    'Set up Twitter Card tags',
    'Add social sharing buttons',
    'Create shareable content',
    'Optimize for social previews'
  ]
};

export default {
  performSEOAudit,
  vietnamTravelKeywords,
  optimizeImageSEO,
  pageConfigs,
  internalLinkingMap,
  seoChecklist
};
