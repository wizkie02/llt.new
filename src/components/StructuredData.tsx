import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  type: 'Organization' | 'TravelAgency' | 'Tour' | 'Article';
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
          url: 'https://leolovestravel.com',
          logo: 'https://leolovestravel.com/src/assets/icon-circle.svg',
          sameAs: [
            'https://www.facebook.com/leolovestravel',
            'https://www.instagram.com/leolovestravel',
          ],
          ...data,
        };
      case 'TravelAgency':
        return {
          ...baseData,
          name: 'Leo Loves Travel',
          description: 'Your trusted travel companion for unforgettable adventures',
          ...data,
        };
      case 'Tour':
        return {
          ...baseData,
          provider: {
            '@type': 'Organization',
            name: 'Leo Loves Travel',
          },
          ...data,
        };
      case 'Article':
        return {
          ...baseData,
          publisher: {
            '@type': 'Organization',
            name: 'Leo Loves Travel',
            logo: {
              '@type': 'ImageObject',
              url: 'https://leolovestravel.com/src/assets/icon-circle.svg',
            },
          },
          ...data,
        };
      default:
        return baseData;
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