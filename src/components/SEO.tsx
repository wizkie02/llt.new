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
  title = 'Vietnam Travel Tours | Best Vietnam Travel Guide 2025 | Leo Loves Travel',
  description = 'Discover authentic Vietnam travel experiences with Leo Loves Travel. Expert Vietnam tours, travel guides, and local cultural immersion. From Hanoi to Ho Chi Minh City, Halong Bay to Hoi An - your trusted Vietnam travel companion.',
  keywords = 'vietnam travel, vietnam tours, vietnam travel guide, vietnam vacation, vietnam holiday, hanoi tours, ho chi minh city tours, halong bay cruise, hoi an tours, sapa trekking, mekong delta tours, vietnam cultural tours, vietnam adventure tours, vietnam beach holidays, vietnam backpacking, vietnam luxury travel, vietnam budget travel, southeast asia travel, vietnam tourism, visit vietnam',
  image = 'https://leolovestravel.com/src/assets/icon-circle.svg',
  url = 'https://leolovestravel.com',
  type = 'website',
  articleData,
  location,
}: SEOProps) => {  // Enhanced keywords for Vietnam tourism targeting international travelers
  const enhancedKeywords = [
    keywords,
    'leo loves travel',
    'vietnam travel 2025',
    'best time visit vietnam',
    'vietnam itinerary',
    'vietnam travel tips',
    'vietnam solo travel',
    'vietnam group tours',
    'vietnam family vacation',
    'vietnam honeymoon',
    'vietnam business travel',
    'vietnam food tours',
    'vietnam photography tours',
    'vietnam eco tours',
    'vietnam historical sites',
    'vietnam unesco sites',
    'phu quoc island',
    'cat ba island',
    'da nang vietnam',
    'nha trang vietnam',
    'dalat vietnam',
    'can tho vietnam'
  ].join(', ');

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={enhancedKeywords} />
      <meta name="author" content="Leo Loves Travel" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      
      {/* Language and Region */}
      <meta name="language" content="en-US" />
      <meta name="geo.region" content="VN" />
      <meta name="geo.country" content="Vietnam" />
      {location?.city && <meta name="geo.placename" content={location.city} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Vietnam Travel Tours - Leo Loves Travel" />
      <meta property="og:site_name" content="Leo Loves Travel" />
      <meta property="og:locale" content="en_US" />
      
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
    </Helmet>
  );
};

export default SEO;