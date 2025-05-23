import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import wallpaper from '../assets/images/wallpaper.png';

const HomePage = () => {  const { theme } = useTheme();
  const [visibleDestination, setVisibleDestination] = useState<number | null>(null);
  
  
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'United States',
      rating: 5,
      experience: 'Family Tour',
      text: 'Our family journey through Vietnam was pure magic! From cruising emerald waters of Halong Bay to wandering ancient Hoi An streets, every moment was filled with wonder. The local guides shared fascinating cultural insights that made our experience truly authentic.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
    },
    {
      id: 2,
      name: 'David Chen',
      location: 'Australia',
      rating: 5,
      experience: 'Solo Adventure',
      text: 'As a solo explorer, I wanted genuine Vietnamese experiences, and this team delivered beyond imagination. I savored phở in hidden Hanoi alleyways, cycled through misty Sapa rice terraces, and connected with hill tribe families. An unforgettable adventure!',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
    },
    {
      id: 3,
      name: 'Emma & Thomas',
      location: 'United Kingdom',
      rating: 5,
      experience: 'Honeymoon Package',
      text: 'Our Vietnam honeymoon exceeded all dreams! We watched sunrise over limestone karsts, enjoyed private beach dinners under lantern light in Hoi An, and relaxed in mountain spa retreats. The personalized touches made us feel like royalty every step of the way.',
      image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
    }
  ];

  const services = [
    {
      id: 1,
      title: 'Cultural Journeys',
      description: 'Immerse yourself in Vietnam\'s ancient traditions, temple visits, and local village experiences',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
        </svg>
      ),
      link: '/package-tours'
    },
    {
      id: 2,
      title: 'Culinary Experiences',
      description: 'Savor phở in hidden Hanoi alleyways, learn to cook with local chefs, and explore vibrant street food markets',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
        </svg>
      ),
      link: '/travel-services'
    },
    {
      id: 3,
      title: 'Nature Adventures',
      description: 'Trek through misty Sapa rice terraces, cruise emerald waters of Halong Bay, and explore lush national parks',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      ),
      link: '/team-building'
    },
    {
      id: 4,
      title: 'Romantic Getaways',
      description: 'Private beach dinners under Hoi An lantern light, sunrise over limestone karsts, and mountain spa retreats',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      ),
      link: '/romantic-travel'
    },
    {
      id: 5,
      title: 'Local Experiences',
      description: 'Connect with hill tribe families, learn traditional crafts, and participate in authentic Vietnamese customs',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
      link: '/travel-services'
    },
    {
      id: 6,
      title: 'Events & Conferences',
      description: 'Professional MICE services and personalized event planning for conferences and celebrations',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      link: '/events'
    }
  ];

  const popularDestinations = [
    {
      id: 1,
      name: 'Halong Bay',
      description: 'Glide through emerald waters amid thousands of limestone karsts and isles topped with lush rainforest',
      image: '/src/assets/images/destinations/halong-bay.jpg',
      fallbackImage: 'https://content.r9cdn.net/rimg/dimg/cb/cf/2f1a018b-city-58327-1598a2b47df.jpg'
    },
    {
      id: 2,
      name: 'Hoi An Ancient Town',
      description: 'Wander through golden-hued streets adorned with colorful lanterns, centuries-old temples, and riverside cafes',
      image: '/src/assets/images/destinations/hoi-an.jpg',
      fallbackImage: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 3,
      name: 'Sapa Rice Terraces',
      description: 'Trek among cascading emerald-green rice paddies carved into mountainsides by ethnic minority villages',
      image: '/src/assets/images/destinations/sapa.jpg',
      fallbackImage: 'https://images.unsplash.com/photo-1555921015-5ab9a0a99d08?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 4,
      name: 'Mekong Delta',
      description: 'Navigate through a maze of rivers, swamps and islands where floating markets and villages reveal daily river life',
      image: '/src/assets/images/destinations/mekong.jpg',
      fallbackImage: 'https://images.unsplash.com/photo-1533614121634-c535232f1b65?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 5,
      name: 'Hue Imperial City',
      description: 'Explore the magnificent walled fortress and palace that was home to the Nguyen Dynasty emperors',
      image: '/src/assets/images/destinations/hue.jpg',
      fallbackImage: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 6,
      name: 'Phong Nha Caves',
      description: 'Discover the world\'s largest caves with underground rivers, unique ecosystems and prehistoric limestone formations',
      image: '/src/assets/images/destinations/phong-nha.jpg',
      fallbackImage: 'https://images.unsplash.com/photo-1528372164741-89c6078a3cf5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 7,
      name: 'Phu Quoc Island',
      description: 'Relax on pristine white-sand beaches with crystal clear waters or explore the lush national park interior',
      image: '/src/assets/images/destinations/phu-quoc.jpg',
      fallbackImage: 'https://images.unsplash.com/photo-1551251880-3ca5cd41549a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 8,
      name: 'Hanoi Old Quarter',
      description: 'Get lost in ancient narrow streets filled with vendors, colonial architecture, and bustling street food scenes',
      image: '/src/assets/images/destinations/hanoi.jpg',
      fallbackImage: 'https://images.unsplash.com/photo-1594285676267-c63e84e58e0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    }
  ];

  // Function to handle image loading errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, fallbackSrc: string) => {
    const target = e.target as HTMLImageElement;
    target.src = fallbackSrc;
  };

  return (
    <div className={`${theme === 'light' ? 'bg-[#F7F9FC] text-[#292F36]' : 'bg-[#1A202C] text-[#F7F9FC]'}`}>
      {/* Hero Section */}      <section className="relative h-[calc(100vh-80px)]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center animate-slow-zoom"
          style={{ 
            backgroundImage: `url(${wallpaper})`,
            height: 'calc(100vh - 80px)'
          }}
        ></div>
        
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white">
          <span className="inline-block px-5 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6 animate-fade-in-up shadow-lg transform transition-all duration-500 hover:scale-105 hover:bg-white/30" style={{animationDelay: '0.3s'}}>
            Welcome to Vietnam
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight max-w-5xl animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            Experience <span className="text-blue-400">Vietnam's</span> Hidden <span className="text-blue-400">Treasures</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl opacity-90 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
            Dive into authentic experiences from misty mountain villages to ancient coastal towns
          </p>          <div className="flex flex-col sm:flex-row gap-5 animate-fade-in-up" style={{animationDelay: '0.9s'}}>            <Link 
              to="/contact" 
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
            >
              Plan My Journey
            </Link>
            <Link 
              to="/package-tours" 
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold py-3 px-8 rounded-full border border-white/30 transition-all duration-300 hover:border-white/80 transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg"
            >
              Explore Vietnam Tours
            </Link>
          </div>
            <div className="mt-20 flex flex-wrap items-center justify-center gap-6 md:gap-12 bg-black/20 backdrop-blur-sm py-4 px-8 rounded-full animate-fade-in-up shadow-xl transition-all duration-500 hover:bg-black/30" style={{animationDelay: '1.1s'}}>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 text-blue-400">
                <path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              <span>Trusted by 10,000+ travelers</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 text-blue-400">
                <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
              </svg>
              <span>4.9/5 rating (1200+ reviews)</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 text-blue-400">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z" clipRule="evenodd" />
              </svg>
              <span>100% Local Vietnamese Guides</span>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white animate-bounce cursor-pointer hover:text-blue-400 transition-colors duration-300" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </section>      {/* Services Section */}
      <section className={`py-20 ${theme === 'light' ? 'bg-[#F7F9FC]' : 'bg-gray-900'}`}>
        <div className="container mx-auto px-8 md:px-12">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-md bg-blue-100 text-blue-600 text-sm font-medium mb-4">
              Our Services
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Unforgettable Vietnamese Experiences</h2>
            <p className="text-lg max-w-2xl mx-auto opacity-80">
              Discover our range of thoughtfully designed travel experiences that showcase the best of Vietnam
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service) => (              <a 
                key={service.id}
                href={service.link}
                className={`p-6 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl h-[320px] flex flex-col ${
                  theme === 'light' 
                    ? 'bg-white hover:shadow-blue-100' 
                    : 'bg-gray-800 hover:shadow-blue-900/20'
                }`}
              >
                <div className="text-blue-500 mb-4 transform transition-all duration-300 group-hover:scale-110">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="opacity-80 mb-4 flex-grow line-clamp-4">{service.description}</p>
                <div className="flex items-center text-blue-500 font-medium group mt-auto">
                  <span className="transition-all duration-300 group-hover:mr-2">Learn more</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transition-all duration-300 transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
        {/* Featured Destinations */}
      <section className={`py-20 ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
        <div className="container mx-auto px-8 md:px-12">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-md bg-teal-100 text-teal-600 text-sm font-medium mb-4">
              Top Destinations
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Vietnam's Treasured Places</h2>
            <p className="text-lg max-w-2xl mx-auto opacity-80">
              Discover breathtaking landscapes, ancient culture, and unforgettable adventures
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {popularDestinations.slice(0, 8).map((destination) => (
              <div 
                key={destination.id}
                className="relative overflow-hidden rounded-2xl h-80 group destination-card shadow-lg transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
                onMouseEnter={() => setVisibleDestination(destination.id)}
                onMouseLeave={() => setVisibleDestination(null)}
              >
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  onError={(e) => handleImageError(e, destination.fallbackImage)}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2 text-white">{destination.name}</h3>
                  <p className={`text-sm text-white/80 transition-all duration-500 ease-in-out transform ${visibleDestination === destination.id ? 'opacity-100 max-h-20 translate-y-0' : 'opacity-0 max-h-0 translate-y-4'}`}>
                    {destination.description}
                  </p>
                  <div className={`mt-4 transition-all duration-500 ease-in-out transform ${visibleDestination === destination.id ? 'opacity-100 max-h-10 translate-y-0' : 'opacity-0 max-h-0 translate-y-4'}`}>                    <Link 
                      to="/package-tours" 
                      className="inline-flex items-center text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                    >
                      Explore tours
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">            <Link 
              to="/package-tours" 
              className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
            >
              View All Vietnam Destinations
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
        {/* Testimonials Section */}
      <section className={`py-20 ${theme === 'light' ? 'bg-[#F7F9FC]' : 'bg-[#1A202C]'}`}>
        <div className="container mx-auto px-8 md:px-12">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-4">
              Traveler Stories
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Unforgettable Vietnam Memories</h2>
            <p className="text-lg max-w-2xl mx-auto opacity-80">
              Real experiences from travelers who discovered the heart of Vietnam with us
            </p>
          </div>
          
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className={`p-6 rounded-2xl relative overflow-hidden shadow-lg transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${
                  theme === 'light' ? 'bg-white' : 'bg-gray-800'
                }`}
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-100"
                  />
                  <div className="ml-4">
                    <h3 className="font-bold text-lg">{testimonial.name}</h3>
                    <p className="text-sm opacity-70">{testimonial.location}</p>
                    <div className="flex items-center mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs font-medium text-blue-500 mt-1 block">{testimonial.experience}</span>
                  </div>
                </div>
                <div className="relative">
                  <svg className="h-8 w-8 text-blue-400 mb-4 opacity-50" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"/>
                  </svg>
                  <p className="text-sm leading-relaxed opacity-90 line-clamp-4">{testimonial.text}</p>
                </div>
                <div className="mt-4 flex items-center text-sm text-blue-500">
                  <span>Read full story</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-500 opacity-90 z-0"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 z-10"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1583417319070-4a69db38a482?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')" }}
        ></div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white/10 z-10"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full bg-white/10 z-10"></div>
        
        <div className="container mx-auto px-4 text-center relative z-20">
          <span className="inline-block px-3 py-1 rounded-md bg-white/20 text-white text-sm font-medium mb-4">
            Begin Your Journey
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Experience the Magic of Vietnam?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 text-white/90">
            From northern mountain tribes to southern delta villages, let us craft your perfect Vietnamese adventure.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/contact" 
              className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-md hover:bg-blue-50 transition-colors duration-300 shadow-lg transform hover:-translate-y-1 hover:shadow-xl"
            >
              Plan My Vietnam Adventure
            </Link>
            <Link 
              to="/package-tours" 
              className="inline-block bg-transparent text-white border-2 border-white font-bold py-3 px-8 rounded-md hover:bg-white/10 transition-colors duration-300 transform hover:-translate-y-1"
            >
              Browse Tour Packages
            </Link>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-white max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="bg-white/20 p-3 rounded-full mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <p className="font-medium">100% Secure Booking</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white/20 p-3 rounded-full mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="font-medium">Flexible Scheduling</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white/20 p-3 rounded-full mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <p className="font-medium">24/7 Local Support</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
