import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  articleData?: {
    author?: string;
    publishedTime?: string;
    modifiedTime?: string;
    section?: string;
    tags?: string[];
  };
  location?: {
    country?: string;
    region?: string;
    city?: string;
  };
}

const SEO = ({
  title = 'Leo Loves Travel - Premier Vietnam Travel Agency | Authentic Vietnam Tours & Experiences 2025',
  description = 'Leo Loves Travel - Your trusted Vietnam travel agency specializing in authentic Vietnamese experiences. Discover Vietnam through expertly crafted tours from Hanoi to Ho Chi Minh City, Halong Bay to Hoi An. Professional guides, cultural immersion, and unforgettable adventures await.',
  keywords = 'Leo Loves Travel, leolovestravel, leo love travel, leo loves travel website, leolovestravelvn, leo loves travel vietnam, LLT, leolovetravel, leo-loves-travel, leolovestravel.com, leolovesravel, leoloestravel, leo love travell, leo loves travell, leolovertravel, leo loves travels, vietnam travel, vietnam tours, vietnam travel agency, vietnam travel guide, vietnam vacation, vietnam holiday, hanoi tours, ho chi minh city tours, halong bay cruise, hoi an tours, sapa trekking, mekong delta tours, vietnam cultural tours, vietnam adventure tours, vietnam beach holidays, vietnam backpacking, vietnam luxury travel, vietnam budget travel, southeast asia travel, vietnam tourism, visit vietnam',
  image = 'https://leolovestravel.com/og-image.jpg',
  url = 'https://leolovestravel.com',
  type = 'website',
  articleData,
  location,
}: SEOProps) => {  // Enhanced keywords for Vietnam tourism targeting international travelers with brand name variations to catch common typos
  const enhancedKeywords = [
    // Core brand name variations and common typos
    'Leo Loves Travel',
    'leolovestravel',
    'leo love travel', 
    'leo loves travel website',
    'leolovestravelvn',
    'leo loves travel vietnam',
    'LLT Vietnam Tours',
    'leolovetravel',
    'leo-loves-travel',
    'leolovestravel.com',
    'leolovesravel', // common typo - missing 't'
    'leoloestravel', // common typo - 'v' instead of 'v'
    'leo love travell', // common typo - double 'l'
    'leo loves travell', // common typo - double 'l'
    'leolovertravel', // common typo - 'r' instead of 's'
    'leo loves travels', // common typo - plural
    'leolovestraval', // common typo - 'a' instead of 'e'
    'leo-love-travel',
    'leolovs travel', // common typo - missing 'e'
    'leolove travel',
    // Official keywords
    keywords,
    // Vietnam travel keywords for international tourists
    'vietnam travel 2025',
    'best vietnam tours',
    'vietnam private tours',
    'vietnam group tours',
    'vietnam travel packages',
    'vietnam holiday packages',
    'custom vietnam tours',
    'luxury vietnam travel',
    'budget vietnam tours',
    'vietnam cultural immersion',
    'authentic vietnam experiences',
    'vietnam adventure travel',
    'vietnam eco tours',
    'vietnam photography tours',
    'vietnam food tours',
    'vietnam motorbike tours',
    'vietnam trekking tours',
    'vietnam beach vacations',
    'vietnam family holidays',
    'vietnam honeymoon packages',
    'vietnam solo travel',
    'vietnam backpacking tours',
    'best time visit vietnam',
    'vietnam travel itinerary',
    'vietnam travel guide 2025',
    'vietnam tourist attractions',
    'things to do vietnam',
    // Destination-specific keywords
    'hanoi city tours',
    'ho chi minh city tours',
    'halong bay overnight cruise',
    'halong bay day tours',
    'hoi an ancient town tours',
    'sapa trekking adventures',
    'sapa rice terraces',
    'mekong delta boat tours',
    'phu quoc island tours',
    'nha trang beach holidays',
    'da nang city tours',
    'hue imperial city tours',
    'can tho floating markets',
    'ninh binh day trips',
    'mai chau valley tours',
    'cat ba island tours',
    'dalat flower city tours',
    'mui ne sand dunes tours',
    'con dao island tours',
    // Multi-destination tours
    'north vietnam tours',
    'central vietnam tours', 
    'south vietnam tours',
    'vietnam highlights tour',
    'vietnam grand tour',
    'vietnam coast to coast',
    'vietnam north to south'
  ].join(', ');

  return (
    <Helmet>      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={enhancedKeywords} />
      <meta name="author" content="Leo Loves Travel" />
      <meta name="publisher" content="Leo Loves Travel" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      
      {/* Brand Identity Meta Tags */}
      <meta name="application-name" content="Leo Loves Travel" />
      <meta name="generator" content="Leo Loves Travel Vietnam Tours" />
      <meta name="subject" content="Vietnam Travel and Tourism" />
      <meta name="copyright" content="Leo Loves Travel 2025" />
      <meta name="abstract" content="Leo Loves Travel is the premier Vietnam travel agency offering authentic cultural experiences and expert-guided tours throughout Vietnam." />
      <meta name="topic" content="Vietnam Travel Tours" />
      <meta name="summary" content="Leo Loves Travel - Your trusted Vietnam travel companion for authentic experiences across Vietnam" />
      <meta name="classification" content="Travel Agency, Tourism, Vietnam Tours" />
      <meta name="designer" content="Leo Loves Travel" />
      <meta name="reply-to" content="info@leolovestravel.com" />
      <meta name="owner" content="Leo Loves Travel" />
      <meta name="url" content={url} />
      <meta name="identifier-URL" content={url} />
      <meta name="category" content="Travel, Tourism, Vietnam" />
      <meta name="coverage" content="Worldwide" />
      <meta name="distribution" content="Global" />
      <meta name="rating" content="General" />
      
      {/* Business Info */}
      <meta name="business:contact_data:street_address" content="Ho Chi Minh City, Vietnam" />
      <meta name="business:contact_data:locality" content="Ho Chi Minh City" />
      <meta name="business:contact_data:region" content="Ho Chi Minh City" />
      <meta name="business:contact_data:postal_code" content="700000" />
      <meta name="business:contact_data:country_name" content="Vietnam" />
      
      {/* Language and Region */}
      <meta name="language" content="en-US" />
      <meta name="geo.region" content="VN" />
      <meta name="geo.country" content="Vietnam" />
      <meta name="geo.placename" content="Vietnam" />
      {location?.city && <meta name="geo.placename" content={location.city} />}
        {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Leo Loves Travel - Vietnam Travel Tours Official Website" />
      <meta property="og:site_name" content="Leo Loves Travel" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="vi_VN" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content="Leo Loves Travel - Vietnam Travel Agency" />
      <meta name="twitter:site" content="@leolovestravel" />
      <meta name="twitter:creator" content="@leolovestravel" />
      
      {/* Additional Social Meta */}
      <meta property="fb:app_id" content="your_facebook_app_id" />
      <meta property="article:publisher" content="https://www.facebook.com/leolovestravel" />
      <meta property="og:see_also" content="https://www.instagram.com/leolovestravel" />
      <meta property="og:see_also" content="https://www.youtube.com/@leolovestravel" />
      <meta property="og:see_also" content="https://www.facebook.com/leolovestravel" />
      
      {/* Article specific meta tags */}
      {articleData && (
        <>
          <meta property="article:author" content={articleData.author || 'Leo Loves Travel'} />
          {articleData.publishedTime && <meta property="article:published_time" content={articleData.publishedTime} />}
          {articleData.modifiedTime && <meta property="article:modified_time" content={articleData.modifiedTime} />}
          {articleData.section && <meta property="article:section" content={articleData.section} />}
          {articleData.tags && articleData.tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#0093DE" />
      <meta name="msapplication-TileColor" content="#0093DE" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Vietnam Travel" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* DNS Prefetch for performance */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//images.unsplash.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        {/* Preconnect for critical resources */}
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      
      {/* JSON-LD Structured Data for Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Leo Loves Travel",
          "alternateName": ["LLT Vietnam Tours", "Leo Loves Travel Vietnam"],
          "url": "https://leolovestravel.com",
          "logo": {
            "@type": "ImageObject",
            "url": "https://leolovestravel.com/og-image.jpg",
            "width": 512,
            "height": 512
          },
          "image": "https://leolovestravel.com/og-image.jpg",
          "description": "Leo Loves Travel is the premier Vietnam travel agency offering authentic cultural experiences and expert-guided tours throughout Vietnam for international travelers.",
          "foundingDate": "2025",
          "slogan": "Your trusted Vietnam travel companion",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+84-xxx-xxx-xxx",
            "contactType": "customer service",
            "areaServed": "VN",
            "availableLanguage": ["en", "vi"]
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Ho Chi Minh City",
            "addressRegion": "Ho Chi Minh City",
            "postalCode": "700000",
            "addressCountry": "VN"
          },
          "areaServed": [
            {
              "@type": "Country",
              "name": "Vietnam"
            },
            {
              "@type": "Place", 
              "name": "Southeast Asia"
            }
          ],
          "knowsAbout": [
            "Vietnam Travel",
            "Vietnam Tours",
            "Cultural Tours",
            "Adventure Tours",
            "Halong Bay Tours",
            "Sapa Trekking",
            "Mekong Delta Tours",
            "Vietnam Travel Guide"
          ],
          "sameAs": [
            "https://www.facebook.com/leolovestravel",
            "https://www.instagram.com/leolovestravel", 
            "https://www.youtube.com/@leolovestravel"
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Vietnam Travel Tours",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "TouristTrip",
                  "name": "Vietnam Cultural Tours",
                  "description": "Authentic Vietnamese cultural experiences"
                }
              },
              {
                "@type": "Offer", 
                "itemOffered": {
                  "@type": "TouristTrip",
                  "name": "Vietnam Adventure Tours",
                  "description": "Exciting adventure activities across Vietnam"
                }
              }
            ]
          }
        })}
      </script>
      
      {/* JSON-LD for Website */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Leo Loves Travel",
          "alternateName": "Leo Loves Travel Vietnam Tours",
          "url": "https://leolovestravel.com",
          "description": "Official website of Leo Loves Travel - Vietnam's premier travel agency",
          "publisher": {
            "@type": "Organization",
            "name": "Leo Loves Travel"
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://leolovestravel.com/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          },
          "inLanguage": "en-US"
        })}
      </script>
    </Helmet>
  );
};

export default SEO;