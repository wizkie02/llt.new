import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  type: 'Organization' | 'TravelAgency' | 'Tour' | 'Article' | 'LocalBusiness' | 'Place' | 'Product' | 'BreadcrumbList' | 'TouristDestination' | 'OfferCatalog';
  data: Record<string, any>;
}

const StructuredData = ({ type, data }: StructuredDataProps) => {
  const getStructuredData = () => {
    const baseData = {
      '@context': 'https://schema.org',
      '@type': type,
    };

    switch (type) {
      case 'Organization':
        return {
          ...baseData,
          name: 'Leo Loves Travel',
          alternateName: 'LLT Vietnam Tours',
          url: 'https://leolovestravel.com',
          logo: {
            '@type': 'ImageObject',
            url: 'https://leolovestravel.com/og-image.jpg',
            width: 512,
            height: 512
          },
          description: 'Leading Vietnam travel agency specializing in authentic cultural experiences and personalized tours for international travelers',
          foundingDate: '2025',
          areaServed: [
            {
              '@type': 'Country',
              name: 'Vietnam'
            },
            {
              '@type': 'Place',
              name: 'Southeast Asia'
            }
          ],
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Vietnam Travel Tours',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'TouristTrip',
                  name: 'Vietnam Cultural Tours',
                  description: 'Authentic Vietnamese cultural experiences'
                }
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'TouristTrip',
                  name: 'Vietnam Adventure Tours',
                  description: 'Exciting outdoor adventures across Vietnam'
                }
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'TouristTrip',
                  name: 'Vietnam Food Tours',
                  description: 'Culinary journeys through Vietnamese cuisine'
                }
              }
            ]
          },
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+84-865-843-276',
            contactType: 'Customer Service',
            areaServed: ['VN', 'US', 'AU', 'GB', 'CA'],
            availableLanguage: ['English', 'Vietnamese']
          },
          sameAs: [
            'https://www.facebook.com/leolovestravel',
            'https://www.instagram.com/leo.lovestravel',
            'https://www.linkedin.com/in/leo-loves-travel-a0064b366/',
            'https://www.tiktok.com/@leolovestravel1999'
          ],
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'VN',
            addressRegion: 'Ha Noi City',
            addressLocality: 'Hoang Mai',
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            reviewCount: '150',
            bestRating: '5',
            worstRating: '1'
          },
          ...data,
        };

      case 'TravelAgency':
        return {
          ...baseData,
          name: 'Leo Loves Travel',
          description: 'Premier Vietnam travel agency offering authentic experiences for international visitors',
          url: 'https://leolovestravel.com',
          telephone: '+84-865-843-276',
          email: 'info@leolovestravel.com',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'Vietnam',
            addressRegion: 'Ha Noi City',
            addressLocality: 'Hoang Mai',
            streetAddress: 'Vietnam Travel Center'
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 20.98130,
            longitude: 105.83083
          },
          priceRange: '$$',
          openingHours: 'Mo-Su 08:00-22:00',
          paymentAccepted: ['Cash', 'Credit Card', 'Bank Transfer', 'PayPal'],
          currenciesAccepted: 'VND, USD, EUR, GBP, AUD',
          serviceArea: {
            '@type': 'Country',
            name: 'Vietnam'
          },
          ...data,
        };

      case 'Tour':
        return {
          ...baseData,
          '@type': 'TouristTrip',
          name: data.name || 'Vietnam Tour Package',
          description: data.description,
          provider: {
            '@type': 'TravelAgency',
            name: 'Leo Loves Travel',
            url: 'https://leolovestravel.com'
          },
          touristType: ['Individual', 'Group', 'Family', 'Solo Traveler', 'Couple'],
          offers: {
            '@type': 'Offer',
            price: data.price,
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            validFrom: new Date().toISOString(),
            seller: {
              '@type': 'TravelAgency',
              name: 'Leo Loves Travel'
            },
            priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
          },
          duration: data.duration,
          itinerary: data.itinerary ? data.itinerary.map((item: any, index: number) => ({
            '@type': 'TouristAttraction',
            name: `Day ${index + 1}: ${item.day}`,
            description: item.activities?.join(', '),
            geo: item.location ? {
              '@type': 'GeoCoordinates',
              latitude: item.location.lat,
              longitude: item.location.lng
            } : undefined
          })) : undefined,
          image: data.image,
          aggregateRating: data.rating ? {
            '@type': 'AggregateRating',
            ratingValue: data.rating,
            reviewCount: data.reviewCount || 50,
            bestRating: 5,
            worstRating: 1
          } : undefined,
          isAccessibleForFree: false,
          ...data,
        };

      case 'TouristDestination':
        return {
          ...baseData,
          name: data.name,
          description: data.description,
          geo: {
            '@type': 'GeoCoordinates',
            latitude: data.latitude,
            longitude: data.longitude
          },
          containsPlace: data.attractions ? data.attractions.map((attraction: any) => ({
            '@type': 'TouristAttraction',
            name: attraction.name,
            description: attraction.description
          })) : undefined,
          image: data.image,
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'Vietnam',
            addressRegion: data.region,
            addressLocality: data.city
          },
          ...data,
        };

      case 'LocalBusiness':
        return {
          ...baseData,
          name: 'Leo Loves Travel Vietnam Office',
          description: 'Vietnam Travel Agency Office',
          address: {
            '@type': 'PostalAddress',
            streetAddress: data.streetAddress,
            addressLocality: data.city,
            addressRegion: data.region,
            postalCode: data.postalCode,
            addressCountry: 'VN'
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: data.latitude || 20.98130,
            longitude: data.longitude || 105.83083
          },
          telephone: '+84-865-843-276',
          openingHours: 'Mo-Su 08:00-22:00',
          priceRange: '$$',
          serviceArea: {
            '@type': 'Country',
            name: 'Vietnam'
          },
          ...data,
        };

      case 'Article':
        return {
          ...baseData,
          headline: data.headline,
          description: data.description,
          image: data.image,
          author: {
            '@type': 'Person',
            name: data.author || 'Leo Loves Travel Team'
          },
          publisher: {
            '@type': 'Organization',
            name: 'Leo Loves Travel',
            logo: {
              '@type': 'ImageObject',
              url: 'https://leolovestravel.com/og-image.jpg',
            },
          },
          datePublished: data.datePublished,
          dateModified: data.dateModified || data.datePublished,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': data.url
          },
          keywords: data.keywords || 'vietnam travel, vietnam tours, vietnam guide',
          ...data,
        };

      case 'BreadcrumbList':
        return {
          ...baseData,
          itemListElement: data.items?.map((item: any, index: number) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url
          })) || [],
          ...data,        };

      case 'OfferCatalog':
        return {
          ...baseData,
          name: data.name || 'Tour Catalog',
          description: data.description || 'Collection of travel tours',
          itemListElement: data.itemListElement || [],
          ...data,
        };

      default:
        return { ...baseData, ...data };
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(getStructuredData())}
      </script>
    </Helmet>
  );
};

export default StructuredData;