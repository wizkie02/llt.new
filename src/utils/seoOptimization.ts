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
    score: Math.max(0, 100 - (seoIssues.length * 5))
  };
};

// Vietnam travel-specific keywords for SEO
export const vietnamTravelKeywords = {
  primary: [
    'vietnam travel',
    'vietnam tours',
    'vietnam vacation',
    'vietnam holiday',
    'visit vietnam'
  ],
  destinations: [
    'hanoi tours',
    'ho chi minh city tours',
    'halong bay cruise',
    'hoi an tours',
    'sapa trekking',
    'mekong delta tours',
    'phu quoc island',
    'da nang vietnam',
    'nha trang beaches',
    'dalat highlands'
  ],
  experiences: [
    'vietnam cultural tours',
    'vietnam food tours',
    'vietnam adventure tours',
    'vietnam luxury travel',
    'vietnam budget travel',
    'vietnam photography tours',
    'vietnam eco tours',
    'vietnam historical sites'
  ],
  practical: [
    'vietnam travel guide',
    'vietnam itinerary',
    'vietnam travel tips',
    'best time visit vietnam',
    'vietnam visa',
    'vietnam weather'
  ]
};

// Image SEO optimization utilities
export const optimizeImageSEO = (context: string): string => {
  const contextMap: Record<string, string> = {
    'halong-bay': 'Ha Long Bay UNESCO World Heritage Site cruise boat limestone karsts Vietnam',
    'hoi-an': 'Hoi An Ancient Town lanterns yellow buildings Vietnam UNESCO',
    'hanoi': 'Hanoi Old Quarter Temple of Literature Vietnam capital city',
    'ho-chi-minh': 'Ho Chi Minh City Saigon Vietnam largest city urban skyline',
    'sapa': 'Sapa rice terraces mountains ethnic minorities northern Vietnam',
    'mekong': 'Mekong Delta floating markets fruit gardens southern Vietnam',
    'phu-quoc': 'Phu Quoc Island beaches white sand tropical paradise Vietnam',
    'da-nang': 'Da Nang Dragon Bridge marble mountains central Vietnam',
    'nha-trang': 'Nha Trang beaches coastal city diving snorkeling Vietnam',
    'dalat': 'Da Lat flower city pine forests highland resort Vietnam'
  };

  return contextMap[context] || `Beautiful Vietnam travel destination - ${context}`;
};

// Page-specific SEO configurations
export const pageConfigs = {
  homepage: {
    title: 'Vietnam Travel Tours 2025 | Best Vietnam Travel Agency | Leo Loves Travel',
    description: 'Discover authentic Vietnam travel experiences with Leo Loves Travel. Expert Vietnam tours, travel guides, and local cultural immersion. From Hanoi to Ho Chi Minh City, Halong Bay to Hoi An - your trusted Vietnam travel companion.',
    keywords: 'vietnam travel, vietnam tours, vietnam travel guide, vietnam vacation, vietnam holiday'
  },
  packageTours: {
    title: 'Vietnam Package Tours 2025 | Best Vietnam Tour Packages | Leo Loves Travel',
    description: 'Discover amazing Vietnam tour packages for every budget and interest. From luxury Halong Bay cruises to budget backpacking adventures. Authentic cultural experiences, expert local guides, and unforgettable memories await.',
    keywords: 'vietnam tour packages, vietnam tours, halong bay tours, hanoi tours, ho chi minh city tours'
  },
  about: {
    title: 'About Leo Loves Travel | Leading Vietnam Travel Agency | Our Story',
    description: 'Learn about Leo Loves Travel, Vietnam\'s premier travel agency. Founded by passionate travel experts, we specialize in authentic Vietnamese experiences for international travelers.',
    keywords: 'about leo loves travel, vietnam travel agency, vietnam tour company, travel company vietnam'
  },
  contact: {
    title: 'Contact Leo Loves Travel | Vietnam Travel Agency | Get in Touch',
    description: 'Contact Leo Loves Travel for personalized Vietnam tour planning. Expert travel consultants ready to help plan your perfect Vietnam adventure.',
    keywords: 'contact leo loves travel, vietnam travel agency contact, vietnam tour planning'
  },
  services: {
    title: 'Vietnam Travel Services | Complete Travel Support | Leo Loves Travel',
    description: 'Comprehensive Vietnam travel services including visa assistance, transportation, accommodation booking, travel insurance, and 24/7 support.',
    keywords: 'vietnam travel services, vietnam visa assistance, vietnam transportation, vietnam accommodation'
  }
};

export default {
  performSEOAudit,
  vietnamTravelKeywords,
  optimizeImageSEO,
  pageConfigs
};
