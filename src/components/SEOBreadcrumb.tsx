import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import StructuredData from './StructuredData';

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface SEOBreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

const SEOBreadcrumb = ({ items, className = '' }: SEOBreadcrumbProps) => {
  const { theme } = useTheme();
  const location = useLocation();

  // Auto-generate breadcrumbs from URL if not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (items) return items;

    const pathSegments = location.pathname.split('/').filter(segment => segment !== '');
    const breadcrumbs: BreadcrumbItem[] = [
      { name: 'Home', path: '/' }
    ];

    let currentPath = '';
    pathSegments.forEach(segment => {
      currentPath += `/${segment}`;
      
      // Custom naming for better SEO
      let name = segment;
      switch (segment) {
        case 'package-tours':
          name = 'Vietnam Package Tours';
          break;
        case 'travel-services':
          name = 'Travel Services';
          break;
        case 'about':
          name = 'About Leo Loves Travel';
          break;
        case 'contact':
          name = 'Contact Us';
          break;
        case 'tour':
          name = 'Tour Details';
          break;
        case 'romantic-travel':
          name = 'Romantic Vietnam Travel';
          break;
        case 'team-building':
          name = 'Team Building Tours';
          break;
        case 'events':
          name = 'Vietnam Events & Festivals';
          break;
        case 'medical-travel':
          name = 'Medical Tourism Vietnam';
          break;
        default:
          name = segment
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
      }
      
      breadcrumbs.push({ name, path: currentPath });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on homepage
  if (location.pathname === '/') return null;

  return (
    <>
      <StructuredData
        type="BreadcrumbList"
        data={{
          itemListElement: breadcrumbs.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: `https://leolovestravel.com${item.path}`
          }))
        }}
      />
      <nav 
        className={`flex items-center space-x-1 text-sm py-4 ${
          theme === 'light' ? 'text-gray-600' : 'text-gray-300'
        } ${className}`}
        aria-label="Breadcrumb"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-1">
            {breadcrumbs.map((item, index) => (
              <div key={item.path} className="flex items-center">
                {index === 0 && (
                  <Home className="w-4 h-4 mr-1" />
                )}
                
                {index < breadcrumbs.length - 1 ? (
                  <Link
                    to={item.path}
                    className={`hover:text-[#0093DE] transition-colors duration-200 ${
                      theme === 'light' ? 'hover:text-[#0093DE]' : 'hover:text-blue-400'
                    }`}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <span className={`font-medium ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    {item.name}
                  </span>
                )}
                
                {index < breadcrumbs.length - 1 && (
                  <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default SEOBreadcrumb;
