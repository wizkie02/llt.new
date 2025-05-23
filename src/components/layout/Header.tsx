import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const isHome = location.pathname === '/';
  // Enhanced scroll handler with simplified transition - only active on homepage
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Only apply scroll effects on homepage
      if (isHome) {
        // Only two states: transparent at top, white background when scrolled
        setIsScrolled(scrollY > 10);

        // Calculate scroll progress for a single smooth transition (0 to 1)
        // Use a smaller divisor for faster completion of the transition
        const progress = Math.min(scrollY / 150, 1);
        setScrollProgress(progress);
      } else {
        // For non-homepage, always use solid header
        setIsScrolled(true);
        setScrollProgress(1);
      }
    };

    // Run once on initial load to set correct state for page refresh
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  // Handle click outside to close dropdown with improved detection
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target as Node)) {
        setIsServicesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesDropdownOpen(false);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };  return (    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500`}
      style={{
        backgroundColor: !isHome 
          ? 'rgba(255, 255, 255, 1)' // Solid white for non-homepage
          : isScrolled
            ? 'rgba(255, 255, 255, 0.95)'
            : 'transparent',
        backdropFilter: !isHome
          ? 'none' // No blur effect on non-homepage
          : isScrolled
            ? 'blur(8px)'
            : 'none',
        boxShadow: !isHome
          ? '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)'
          : isScrolled
            ? '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)'
            : 'none'
      }}
    >      <div
        className="container mx-auto px-4 transition-all duration-500"
        style={{
          paddingTop: `${Math.max(24 - scrollProgress * 8, 16)}px`,
          paddingBottom: `${Math.max(24 - scrollProgress * 8, 16)}px`,
        }}
      >
        <div className="flex justify-between items-center">          {/* Logo without hover effects */}          
          <Link to="/" className="flex items-center">            <img
              src="src/assets/horizontal_1.png"
              alt="Explore Vietnam"
              className="transition-all duration-500 mix-blend-multiply"
              style={{
                height: `${Math.max(60 - scrollProgress * 15, 45)}px`,
                filter: 'drop-shadow(0 0 0 transparent)',
                opacity: 1,
                transform: `scale(${1 - scrollProgress * 0.05})`
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://placehold.co/200x80/0093DE/FFFFFF/png?text=Vietnam+Travel";
              }}
            />
          </Link>          {/* Search bar - New Addition (appears on scroll or mobile) */}
          <div className={`hidden md:flex relative transition-all duration-500 ${isScrolled ? 'w-1/3 opacity-100' : 'w-1/4 opacity-90'
            }`}>
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search destinations, tours..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}                  className={`w-full py-2 pl-4 pr-10 text-sm border-0 rounded-full focus:ring-2 transition-all duration-500 focus:ring-[#0093DE]/50`}
                  style={{
                    backgroundColor: `rgba(${255 - scrollProgress * 12}, ${255 - scrollProgress * 8}, ${255 - scrollProgress * 5}, ${0.8 + scrollProgress * 0.1})`,
                    color: '#2A3B4A',
                    backdropFilter: `blur(${scrollProgress * 4}px)`
                  }}
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-[#E4784D] transition-colors duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">            <Link
              to="/"              className={`relative font-medium text-sm px-4 py-2 rounded-full transition-all duration-500 ${
                location.pathname === '/'
                  ? `text-[#0093DE] bg-[#0093DE]/10 shadow-sm font-semibold`
                  : ``
              } hover:text-[#0093DE] transform hover:-translate-y-0.5`}
              style={{
                color: location.pathname === '/' ? '' : isScrolled ? '#2A3B4A' : 'white',
                backgroundColor: location.pathname === '/' ? '' : isScrolled ? 'transparent' : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (location.pathname !== '/') {
                  e.currentTarget.style.backgroundColor = isScrolled ? 'rgba(243, 244, 246, 0.8)' : 'rgba(255, 255, 255, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (location.pathname !== '/') {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              Home
            </Link>            <Link
              to="/package-tours"              className={`relative font-medium text-sm px-4 py-2 rounded-full transition-all duration-500 ${
                location.pathname === '/package-tours'
                  ? `text-[#0093DE] bg-[#0093DE]/10 shadow-sm font-semibold`
                  : ``
              } hover:text-[#0093DE] transform hover:-translate-y-0.5`}
              style={{
                color: location.pathname === '/package-tours' ? '' : isScrolled ? '#2A3B4A' : 'white',
                backgroundColor: location.pathname === '/package-tours' ? '' : isScrolled ? 'transparent' : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (location.pathname !== '/package-tours') {
                  e.currentTarget.style.backgroundColor = isScrolled ? 'rgba(243, 244, 246, 0.8)' : 'rgba(255, 255, 255, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (location.pathname !== '/package-tours') {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              Package Tours
            </Link>

            {/* Services Dropdown */}
            <div className="relative" ref={servicesDropdownRef}>              <button                className={`font-medium flex items-center text-sm px-4 py-2 rounded-full transition-all duration-500 ${
                  ['/travel-services', '/team-building', '/events', '/romantic-travel', '/medical-travel'].includes(location.pathname) || isServicesDropdownOpen
                    ? 'text-[#0093DE] bg-[#0093DE]/10 shadow-sm font-semibold'
                    : ''
                } hover:text-[#0093DE] transform hover:-translate-y-0.5`}
                style={{
                  color: ['/travel-services', '/team-building', '/events', '/romantic-travel', '/medical-travel'].includes(location.pathname) || isServicesDropdownOpen 
                    ? '' 
                    : isScrolled ? '#2A3B4A' : 'white',
                  backgroundColor: ['/travel-services', '/team-building', '/events', '/romantic-travel', '/medical-travel'].includes(location.pathname) || isServicesDropdownOpen 
                    ? '' 
                    : 'transparent',
                }}
                onMouseEnter={(e) => {
                  if (!['/travel-services', '/team-building', '/events', '/romantic-travel', '/medical-travel'].includes(location.pathname) && !isServicesDropdownOpen) {
                    e.currentTarget.style.backgroundColor = isScrolled ? 'rgba(243, 244, 246, 0.8)' : 'rgba(255, 255, 255, 0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!['/travel-services', '/team-building', '/events', '/romantic-travel', '/medical-travel'].includes(location.pathname) && !isServicesDropdownOpen) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
                onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                aria-expanded={isServicesDropdownOpen}
                aria-haspopup="true"
              >
                Experiences
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ml-1 transition-transform duration-300 ${isServicesDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute top-full left-0 mt-1 w-64 rounded-2xl shadow-xl transform origin-top transition-all duration-300 ${isServicesDropdownOpen
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
                  } bg-white ring-1 ring-black/5 backdrop-blur-sm z-50 overflow-hidden`}
              >
                <div className="p-1">
                  <Link
                    to="/travel-services"
                    className="block px-4 py-2 text-sm rounded-xl hover:bg-gray-50 text-gray-700 hover:text-[#E4784D] flex items-center transition-all duration-300"
                  >
                    <span className="w-7 h-7 mr-3 flex items-center justify-center text-[#64A86B] bg-[#64A86B]/10 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </span>
                    Cultural Journeys
                  </Link>
                  <Link
                    to="/team-building"
                    className="block px-4 py-2 text-sm rounded-xl hover:bg-gray-50 text-gray-700 hover:text-[#E4784D] flex items-center transition-all duration-300"
                  >
                    <span className="w-7 h-7 mr-3 flex items-center justify-center text-[#64A86B] bg-[#64A86B]/10 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </span>
                    Adventure Tours
                  </Link>
                  <Link
                    to="/events"
                    className="block px-4 py-2 text-sm rounded-xl hover:bg-gray-50 text-gray-700 hover:text-[#E4784D] flex items-center transition-all duration-300"
                  >
                    <span className="w-7 h-7 mr-3 flex items-center justify-center text-[#64A86B] bg-[#64A86B]/10 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </span>
                    Local Cuisine
                  </Link>
                  <Link
                    to="/romantic-travel"
                    className="block px-4 py-2 text-sm rounded-xl hover:bg-gray-50 text-gray-700 hover:text-[#E4784D] flex items-center transition-all duration-300"
                  >
                    <span className="w-7 h-7 mr-3 flex items-center justify-center text-[#64A86B] bg-[#64A86B]/10 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </span>
                    Romantic Getaways
                  </Link>
                  <Link
                    to="/medical-travel"
                    className="block px-4 py-2 text-sm rounded-xl hover:bg-gray-50 text-gray-700 hover:text-[#E4784D] flex items-center transition-all duration-300"
                  >
                    <span className="w-7 h-7 mr-3 flex items-center justify-center text-[#64A86B] bg-[#64A86B]/10 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </span>
                    Medical Travel
                  </Link>
                </div>
              </div>
            </div>

            <Link              to="/about"              className={`relative font-medium text-sm px-4 py-2 rounded-full transition-all duration-500 ${
                location.pathname === '/about'
                  ? 'text-[#0093DE] bg-[#0093DE]/10 shadow-sm font-semibold'
                  : ''
                } hover:text-[#0093DE] transform hover:-translate-y-0.5`}
              style={{
                color: location.pathname === '/about' ? '' : isScrolled ? '#2A3B4A' : 'white',
                backgroundColor: location.pathname === '/about' ? '' : isScrolled ? 'transparent' : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (location.pathname !== '/about') {
                  e.currentTarget.style.backgroundColor = isScrolled ? 'rgba(243, 244, 246, 0.8)' : 'rgba(255, 255, 255, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (location.pathname !== '/about') {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              About
            </Link>            <Link
              to="/contact"              className={`relative font-medium text-sm px-4 py-2 rounded-full transition-all duration-500 ${
                location.pathname === '/contact'
                  ? 'text-[#0093DE] bg-[#0093DE]/10 shadow-sm font-semibold'
                  : ''
                } hover:text-[#0093DE] transform hover:-translate-y-0.5`}
              style={{
                color: location.pathname === '/contact' ? '' : isScrolled ? '#2A3B4A' : 'white',
                backgroundColor: location.pathname === '/contact' ? '' : isScrolled ? 'transparent' : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (location.pathname !== '/contact') {
                  e.currentTarget.style.backgroundColor = isScrolled ? 'rgba(243, 244, 246, 0.8)' : 'rgba(255, 255, 255, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (location.pathname !== '/contact') {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-2">            {/* Contact Button (Desktop) */}
            <Link
              to="/contact"              className="hidden md:flex items-center bg-gradient-to-r from-[#0093DE] to-[#0EA5FF] hover:from-[#0078b3] hover:to-[#0b8ed9] text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-500 transform hover:-translate-y-0.5 hover:shadow-md"
              style={{ 
                boxShadow: `0 ${Math.min(4 * scrollProgress, 4)}px ${Math.min(6 * scrollProgress, 6)}px -1px rgba(0, 0, 0, ${0.1 * scrollProgress}), 0 ${Math.min(2 * scrollProgress, 2)}px ${Math.min(4 * scrollProgress, 4)}px -1px rgba(0, 0, 0, ${0.06 * scrollProgress})`,
                transform: `translateY(${isScrolled ? '0' : '0'})`,
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Book Now
            </Link>{/* Mobile Search Button */}
            <button
              className="md:hidden p-2 rounded-full focus:outline-none transition-all duration-300 transform hover:scale-110 hover:bg-white/10"
              aria-label="Search"
            >              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" 
                stroke="currentColor"
                style={{ 
                  color: scrollProgress > 0.5 ? "#2A3B4A" : "white",
                  transition: "color 0.5s ease"
                }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-full focus:outline-none transition-all duration-300 transform hover:scale-110 hover:bg-white/10"
              aria-label="Toggle menu"
            >              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" 
                  stroke="currentColor"
                  style={{ 
                    color: scrollProgress > 0.5 ? "#2A3B4A" : "white",
                    transition: "color 0.5s ease"
                  }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" 
                  stroke="currentColor"
                  style={{ 
                    color: scrollProgress > 0.5 ? "#2A3B4A" : "white",
                    transition: "color 0.5s ease"
                  }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>      {/* Mobile Menu with improved styling */}
      <div
        className={`lg:hidden transition-all duration-500 fixed inset-0 z-40 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div
          onClick={() => setIsMenuOpen(false)}
          className={`absolute inset-0 ${isScrolled ? 'bg-black/20' : 'bg-black/40'} backdrop-blur-sm transition-opacity duration-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
        ></div>

        <div
          className={`absolute top-[72px] right-0 w-3/4 max-w-sm h-screen ${isScrolled ? 'bg-white' : 'bg-white/95'} transform transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            } shadow-xl overflow-y-auto`}
        >
          <div className="p-6">
            {/* Mobile Search */}
            <div className="mb-6">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search destinations, tours..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-2 pl-4 pr-10 text-sm border-0 rounded-full focus:ring-2 bg-gray-100 text-gray-800 focus:ring-[#E4784D]/50 transition-all duration-300"
                  />
                  <button
                    type="submit"
                    className="absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-[#E4784D] transition-colors duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>

            <nav className="flex flex-col space-y-3">
              <Link
                to="/"                className={`font-medium text-base rounded-xl p-3 transition-all duration-300 ${location.pathname === '/'
                    ? 'text-[#0093DE] bg-[#0093DE]/10 shadow-sm'
                    : 'text-[#2A3B4A]'
                  } hover:text-[#0093DE] hover:bg-[#0093DE]/5 flex items-center`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
              </Link>
              <Link
                to="/package-tours"                className={`font-medium text-base rounded-xl p-3 transition-all duration-300 ${location.pathname === '/package-tours'
                    ? 'text-[#0093DE] bg-[#0093DE]/10 shadow-sm'
                    : 'text-[#2A3B4A]'
                  } hover:text-[#0093DE] hover:bg-[#0093DE]/5 flex items-center`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Package Tours
              </Link>

              {/* Mobile Services Dropdown */}
              <div className="space-y-2">
                <button
                  onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}                  className={`font-medium text-base rounded-xl p-3 transition-all duration-300 w-full text-left ${['/travel-services', '/team-building', '/events', '/romantic-travel', '/medical-travel'].includes(location.pathname) || isServicesDropdownOpen
                      ? 'text-[#0093DE] bg-[#0093DE]/10 shadow-sm'
                      : 'text-[#2A3B4A]'
                    } hover:text-[#0093DE] hover:bg-[#0093DE]/5 flex items-center justify-between`}
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Experiences
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 ml-1 transition-transform duration-300 ${isServicesDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div className={`pl-4 space-y-2 transition-all duration-500 ${isServicesDropdownOpen ? 'max-h-screen opacity-100 pt-2' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                  <Link
                    to="/travel-services"                    className={`block font-medium rounded-xl p-3 transition-all duration-300 ${location.pathname === '/travel-services'
                        ? 'text-[#0093DE] bg-[#0093DE]/10 shadow-sm'
                        : 'text-[#2A3B4A]'
                      } hover:text-[#0093DE] hover:bg-[#0093DE]/5 flex items-center`}
                  >
                    <span className="w-8 h-8 mr-3 flex items-center justify-center text-[#64A86B] bg-[#64A86B]/10 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </span>
                    Cultural Journeys
                  </Link>
                  <Link
                    to="/team-building"                    className={`block font-medium rounded-xl p-3 transition-all duration-300 ${location.pathname === '/team-building'
                        ? 'text-[#0093DE] bg-[#0093DE]/10 shadow-sm'
                        : 'text-[#2A3B4A]'
                      } hover:text-[#0093DE] hover:bg-[#0093DE]/5 flex items-center`}
                  >
                    <span className="w-8 h-8 mr-3 flex items-center justify-center text-[#64A86B] bg-[#64A86B]/10 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </span>
                    Adventure Tours
                  </Link>
                  <Link
                    to="/events"                    className={`block font-medium rounded-xl p-3 transition-all duration-300 ${location.pathname === '/events'
                        ? 'text-[#0093DE] bg-[#0093DE]/10 shadow-sm'
                        : 'text-[#2A3B4A]'
                      } hover:text-[#0093DE] hover:bg-[#0093DE]/5 flex items-center`}
                  >
                    <span className="w-8 h-8 mr-3 flex items-center justify-center text-[#64A86B] bg-[#64A86B]/10 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </span>
                    Local Cuisine
                  </Link>
                  <Link
                    to="/romantic-travel"                    className={`block font-medium rounded-xl p-3 transition-all duration-300 ${location.pathname === '/romantic-travel'
                        ? 'text-[#0093DE] bg-[#0093DE]/10 shadow-sm'
                        : 'text-[#2A3B4A]'
                      } hover:text-[#0093DE] hover:bg-[#0093DE]/5 flex items-center`}
                  >
                    <span className="w-8 h-8 mr-3 flex items-center justify-center text-[#64A86B] bg-[#64A86B]/10 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </span>
                    Romantic Getaways
                  </Link>
                  <Link
                    to="/medical-travel"                    className={`block font-medium rounded-xl p-3 transition-all duration-300 ${location.pathname === '/medical-travel'
                        ? 'text-[#0093DE] bg-[#0093DE]/10 shadow-sm'
                        : 'text-[#2A3B4A]'
                      } hover:text-[#0093DE] hover:bg-[#0093DE]/5 flex items-center`}
                  >
                    <span className="w-8 h-8 mr-3 flex items-center justify-center text-[#64A86B] bg-[#64A86B]/10 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </span>
                    Medical Travel
                  </Link>
                </div>
              </div>

              <Link
                to="/about"                className={`font-medium text-base rounded-xl p-3 transition-all duration-300 ${location.pathname === '/about'
                    ? 'text-[#0093DE] bg-[#0093DE]/10 shadow-sm'
                    : 'text-[#2A3B4A]'
                  } hover:text-[#0093DE] hover:bg-[#0093DE]/5 flex items-center`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                About
              </Link>
              <Link
                to="/contact"                className={`font-medium text-base rounded-xl p-3 transition-all duration-300 ${location.pathname === '/contact'
                    ? 'text-[#0093DE] bg-[#0093DE]/10 shadow-sm'
                    : 'text-[#2A3B4A]'
                  } hover:text-[#0093DE] hover:bg-[#0093DE]/5 flex items-center`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact
              </Link>

              {/* Book Now Button */}
              <Link
                to="/contact"
                className="inline-flex items-center justify-center bg-gradient-to-r from-[#0093DE] to-[#0EA5FF] hover:from-[#0078b3] hover:to-[#0b8ed9] text-white px-5 py-3 rounded-xl text-base font-medium transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg mt-4"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Book Now
              </Link>

              {/* Language selector for mobile */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-gray-500">Language:</span>
                  <div className="flex space-x-2">                    <button className="font-medium text-[#0093DE]">Vietnamese</button>
                    <button className="text-gray-500">English</button>
                    <button className="text-gray-500">French</button>
                  </div>
                </div>
              </div>

              {/* Social links for mobile */}
              <div className="flex space-x-4 mt-6">                <a href="#" className="p-2 rounded-full bg-gray-100 hover:bg-[#0093DE]/20 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </a>
                <a href="#" className="p-2 rounded-full bg-gray-100 hover:bg-[#0093DE]/20 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="p-2 rounded-full bg-gray-100 hover:bg-[#0093DE]/20 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
