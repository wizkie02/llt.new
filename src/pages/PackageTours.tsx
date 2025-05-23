import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTours, TourOption } from '../contexts/ToursContext';
import { useTheme } from '../contexts/ThemeContext';

const PackageTours = () => {
  const { tours, getToursByCategory, getFeaturedTours } = useTours();
  const { theme } = useTheme();
  const [filteredTours, setFilteredTours] = useState<TourOption[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState('recommended');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Get min and max prices from tours
  const minPrice = Math.min(...tours.map(tour => tour.price));
  const maxPrice = Math.max(...tours.map(tour => tour.price));
  
  // Initialize price range based on actual tour prices
  useEffect(() => {
    if (tours.length > 0) {
      setPriceRange([minPrice, maxPrice]);
    }
  }, [tours, minPrice, maxPrice]);
  
  // Filter and sort tours based on all criteria
  useEffect(() => {
    let result = [...tours];
    
    // Filter by category
    if (activeFilter !== 'all') {
      result = activeFilter === 'featured' 
        ? getFeaturedTours() 
        : getToursByCategory(activeFilter);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        tour => 
          tour.name.toLowerCase().includes(query) || 
          tour.description.toLowerCase().includes(query) ||
          tour.location.toLowerCase().includes(query) ||
          (tour.category && tour.category.toLowerCase().includes(query))
      );
    }
    
    // Filter by price range
    result = result.filter(
      tour => tour.price >= priceRange[0] && tour.price <= priceRange[1]
    );

    // Sort tours based on selected criteria
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'duration':
        result.sort((a, b) => {
          // Extract number of days from duration
          const getDays = (duration: string) => {
            const match = duration.match(/(\d+)\s*days?/i);
            return match ? parseInt(match[1]) : 0;
          };
          return getDays(b.duration) - getDays(a.duration);
        });
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default: // 'recommended' - featured first, then by rating
        result.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return (b.rating || 0) - (a.rating || 0);
        });
    }
    
    setFilteredTours(result);
  }, [tours, activeFilter, searchQuery, priceRange, sortBy, getFeaturedTours, getToursByCategory]);
  
  // Handle category filter change
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };
  
  // Handle search input change with debounce
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  // Handle price range change
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = parseInt(e.target.value);
    const newRange = [...priceRange] as [number, number];
    newRange[index] = newValue;
    setPriceRange(newRange);
  };

  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  // Function to render star ratings
  const renderStars = (rating: number = 0) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <svg key="half" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    // Add empty stars to make 5 stars in total
    const emptyStarsCount = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStarsCount; i++) {
      stars.push(
        <svg key={`empty-${i}`} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    return <div className="flex">{stars}</div>;
  };

  // Function to handle image error
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = 'https://images.unsplash.com/photo-1528181304800-259b08848526?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
  };

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-[#F7F9FC] text-[#292F36]' : 'bg-[#1A202C] text-[#F7F9FC]'}`}>
      {/* Hero Section */}
      <section className="relative mt-20 py-32 rounded-b-3xl overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30 z-0"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1528181304800-259b08848526?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')" }}
        ></div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <span className="inline-block px-6 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6 shadow-xl">
            Vietnam Adventures
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Explore Our Package Tours
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Discover handcrafted journeys through Vietnam's most breathtaking landscapes, vibrant cities, and cultural treasures
          </p>
        </div>
      </section>
      
      <div className="container mx-auto px-4 md:px-8 py-12">
        {/* Mobile filter toggle */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full flex items-center justify-center gap-2 bg-white py-3 px-4 rounded-full shadow-md font-medium text-gray-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Panel */}
          <div className={`${isFilterOpen || 'hidden md:block'} md:w-64 lg:w-1/4 space-y-6`}>
            {/* Category Filters */}
            <div className={`p-6 rounded-2xl shadow-md ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
              <h3 className="font-bold text-lg mb-4">Tour Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleFilterChange('all')}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeFilter === 'all'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  All Tours
                </button>
                <button
                  onClick={() => handleFilterChange('featured')}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeFilter === 'featured'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Featured
                </button>
                <button
                  onClick={() => handleFilterChange('luxury')}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeFilter === 'luxury'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Luxury
                </button>
                <button
                  onClick={() => handleFilterChange('adventure')}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeFilter === 'adventure'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Adventure
                </button>
                <button
                  onClick={() => handleFilterChange('cultural')}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeFilter === 'cultural'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Cultural
                </button>
                <button
                  onClick={() => handleFilterChange('city')}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeFilter === 'city'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  City Tours
                </button>
              </div>
            </div>
            
            {/* Price Range Filter */}
            <div className={`p-6 rounded-2xl shadow-md ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
              <h3 className="font-bold text-lg mb-4">Price Range</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">${priceRange[0]}</span>
                <span className="text-sm">${priceRange[1]}</span>
              </div>
              <div className="mb-6">
                <div className="relative h-1 rounded-full bg-gray-200 mb-4">
                  <div 
                    className="absolute h-1 rounded-full bg-blue-500"
                    style={{
                      left: `${((priceRange[0] - minPrice) / (maxPrice - minPrice)) * 100}%`,
                      right: `${100 - ((priceRange[1] - minPrice) / (maxPrice - minPrice)) * 100}%`
                    }}
                  ></div>
                </div>
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(e, 0)}
                  className="absolute w-full appearance-none bg-transparent pointer-events-none"
                  style={{ height: '20px', margin: '-10px 0' }}
                />
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(e, 1)}
                  className="absolute w-full appearance-none bg-transparent pointer-events-none"
                  style={{ height: '20px', margin: '-10px 0' }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <span className="absolute text-sm text-gray-500 font-medium left-3 top-1/2 transform -translate-y-1/2">$</span>
                  <input
                    type="number"
                    min={minPrice}
                    max={priceRange[1]}
                    value={priceRange[0]}
                    onChange={(e) => handlePriceChange(e, 0)}
                    className={`w-full pl-8 pr-3 py-2 rounded-xl text-sm ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-700'} border-0 focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                <div className="relative">
                  <span className="absolute text-sm text-gray-500 font-medium left-3 top-1/2 transform -translate-y-1/2">$</span>
                  <input
                    type="number"
                    min={priceRange[0]}
                    max={maxPrice}
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange(e, 1)}
                    className={`w-full pl-8 pr-3 py-2 rounded-xl text-sm ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-700'} border-0 focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
              </div>
            </div>
            
            {/* Duration Filter - Static Option for now */}
            <div className={`p-6 rounded-2xl shadow-md ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
              <h3 className="font-bold text-lg mb-4">Duration</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-500 rounded" />
                  <span className="text-sm font-medium">1 Day Tours</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-500 rounded" />
                  <span className="text-sm font-medium">2-3 Days</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-500 rounded" />
                  <span className="text-sm font-medium">4-7 Days</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-500 rounded" />
                  <span className="text-sm font-medium">1+ Week</span>
                </label>
              </div>
            </div>
            
            {/* Popular Locations */}
            <div className={`p-6 rounded-2xl shadow-md ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
              <h3 className="font-bold text-lg mb-4">Popular Destinations</h3>
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1.5 bg-gray-100 hover:bg-blue-500 hover:text-white rounded-full text-sm font-medium transition">Halong Bay</button>
                <button className="px-3 py-1.5 bg-gray-100 hover:bg-blue-500 hover:text-white rounded-full text-sm font-medium transition">Hoi An</button>
                <button className="px-3 py-1.5 bg-gray-100 hover:bg-blue-500 hover:text-white rounded-full text-sm font-medium transition">Sapa</button>
                <button className="px-3 py-1.5 bg-gray-100 hover:bg-blue-500 hover:text-white rounded-full text-sm font-medium transition">Mekong Delta</button>
                <button className="px-3 py-1.5 bg-gray-100 hover:bg-blue-500 hover:text-white rounded-full text-sm font-medium transition">Hanoi</button>
                <button className="px-3 py-1.5 bg-gray-100 hover:bg-blue-500 hover:text-white rounded-full text-sm font-medium transition">Phu Quoc</button>
              </div>
            </div>
          </div>
          
          {/* Main Content - Tours Grid/List */}
          <div className="flex-1">
            {/* Search and Sort Controls */}
            <div className={`mb-6 p-6 rounded-2xl shadow-md ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
              <div className="flex flex-col lg:flex-row justify-between gap-4">
                {/* Search Input */}
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search tours, destinations, activities..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className={`w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-700'}`}
                  />
                </div>
                
                <div className="flex gap-3">
                  {/* Sort Select */}
                  <div className="relative min-w-[180px]">
                    <select
                      value={sortBy}
                      onChange={handleSortChange}
                      className={`appearance-none w-full pl-4 pr-10 py-3 rounded-xl ${theme === 'light' ? 'bg-gray-100 text-gray-800' : 'bg-gray-700 text-white'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      <option value="recommended">Recommended</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="duration">Duration: Longest First</option>
                      <option value="rating">Rating: High to Low</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* View Mode Selector */}
                  <div className="flex rounded-xl overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`flex items-center justify-center w-11 h-11 ${
                        viewMode === 'grid' 
                          ? 'bg-blue-500 text-white' 
                          : `${theme === 'light' ? 'bg-gray-100 text-gray-700' : 'bg-gray-700 text-gray-300'}`
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`flex items-center justify-center w-11 h-11 ${
                        viewMode === 'list' 
                          ? 'bg-blue-500 text-white' 
                          : `${theme === 'light' ? 'bg-gray-100 text-gray-700' : 'bg-gray-700 text-gray-300'}`
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Search Results Count */}
            <div className="mb-6 flex justify-between items-center">
              <p className="text-lg font-medium">
                {filteredTours.length} {filteredTours.length === 1 ? 'tour' : 'tours'} found
                {activeFilter !== 'all' && ` in "${activeFilter}"`}
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            </div>
            
            {/* Tours Display */}
            {filteredTours.length > 0 ? (
              viewMode === 'grid' ? (
                // Grid View
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTours.map((tour) => (
                    <div 
                      key={tour.id} 
                      className={`rounded-2xl overflow-hidden shadow-lg transition-all duration-300 transform hover:-translate-y-2 ${
                        theme === 'light' ? 'bg-white hover:shadow-xl' : 'bg-gray-800 hover:shadow-2xl hover:shadow-blue-900/20'
                      }`}
                    >
                      <div className="relative h-52 overflow-hidden">
                        <img 
                          src={tour.image} 
                          alt={tour.name} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          onError={handleImageError}
                        />
                        {tour.featured && (
                          <div className="absolute top-4 left-4 bg-yellow-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                            Featured
                          </div>
                        )}
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 font-bold px-3 py-1.5 rounded-full shadow-lg">
                          ${tour.price}
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-bold line-clamp-1">{tour.name}</h3>
                        </div>
                        
                        <div className="flex items-center gap-1 mb-3">
                          {renderStars(tour.rating)}
                          {tour.reviewCount && (
                            <span className="text-sm text-gray-500">
                              ({tour.reviewCount} reviews)
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center mb-4 text-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-gray-600">{tour.location}</span>
                          <span className="mx-2">•</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-gray-600">{tour.duration}</span>
                        </div>
                        
                        <p className="text-gray-600 mb-6 line-clamp-3">{tour.description}</p>
                        
                        <div className="flex justify-between items-center mt-auto">
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1.5 rounded-full">
                            {tour.category}
                          </span>
                          <Link 
                            to={`/tour/${tour.id}`}
                            className="bg-[#0093DE] hover:bg-[#0077b3] text-white font-medium py-2.5 px-5 rounded-full transition-all duration-300 shadow hover:shadow-lg transform hover:-translate-y-0.5"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // List View
                <div className="space-y-6">
                  {filteredTours.map((tour) => (
                    <div 
                      key={tour.id} 
                      className={`flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
                        theme === 'light' ? 'bg-white hover:shadow-xl' : 'bg-gray-800 hover:shadow-2xl hover:shadow-blue-900/20'
                      }`}
                    >
                      <div className="relative md:w-1/3 h-52 md:h-auto overflow-hidden">
                        <img 
                          src={tour.image} 
                          alt={tour.name} 
                          className="w-full h-full object-cover transition-transform duration-700"
                          onError={handleImageError}
                        />
                        {tour.featured && (
                          <div className="absolute top-4 left-4 bg-yellow-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                            Featured
                          </div>
                        )}
                      </div>
                      
                      <div className="p-6 md:w-2/3">
                        <div className="flex flex-wrap justify-between items-start mb-2">
                          <h3 className="text-xl font-bold">{tour.name}</h3>
                          <div className="flex items-center">
                            <span className="font-bold text-xl text-blue-500">${tour.price}</span>
                            <span className="text-sm text-gray-500 ml-1">/ person</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1 mb-3">
                          {renderStars(tour.rating)}
                          {tour.reviewCount && (
                            <span className="text-sm text-gray-500">
                              ({tour.reviewCount} reviews)
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center mb-4 text-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-gray-600">{tour.location}</span>
                          <span className="mx-2">•</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-gray-600">{tour.duration}</span>
                          <span className="mx-2">•</span>
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            {tour.category}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-6 line-clamp-2">{tour.description}</p>
                        
                        {tour.highlights && (
                          <div className="mb-6">
                            <h4 className="font-medium text-sm mb-2">Highlights:</h4>
                            <div className="flex flex-wrap gap-2">
                              {tour.highlights.slice(0, 3).map((highlight, i) => (
                                <span 
                                  key={i} 
                                  className={`text-xs py-1 px-2 rounded-full ${
                                    theme === 'light' ? 'bg-gray-100' : 'bg-gray-700'
                                  }`}
                                >
                                  {highlight}
                                </span>
                              ))}
                              {tour.highlights.length > 3 && (
                                <span 
                                  className={`text-xs py-1 px-2 rounded-full ${
                                    theme === 'light' ? 'bg-gray-100' : 'bg-gray-700'
                                  }`}
                                >
                                  +{tour.highlights.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex justify-end mt-auto">
                          <Link 
                            to={`/tour/${tour.id}`}
                            className="bg-[#0093DE] hover:bg-[#0077b3] text-white font-medium py-2.5 px-6 rounded-full transition-all duration-300 shadow hover:shadow-lg transform hover:-translate-y-0.5"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <div className={`text-center py-16 rounded-2xl ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-medium mb-2">No tours found</h3>
                <p className="text-gray-500 max-w-md mx-auto">We couldn't find any tours matching your criteria. Try adjusting your filters or search query.</p>
                <button 
                  onClick={() => {
                    setActiveFilter('all');
                    setSearchQuery('');
                    setPriceRange([minPrice, maxPrice]);
                  }}
                  className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-full transition-all duration-300"
                >
                  Reset Filters
                </button>
              </div>
            )}
            
            {/* Pagination */}
            {filteredTours.length > 0 && (
              <div className="mt-10 flex justify-center">
                <nav className="flex items-center space-x-1">
                  <button className="px-2 py-2 rounded-full bg-white text-gray-600 hover:bg-blue-50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button className="px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600">1</button>
                  <button className="px-4 py-2 rounded-full bg-white text-gray-600 hover:bg-blue-50">2</button>
                  <button className="px-4 py-2 rounded-full bg-white text-gray-600 hover:bg-blue-50">3</button>
                  <span className="px-4 py-2 text-gray-600">...</span>
                  <button className="px-4 py-2 rounded-full bg-white text-gray-600 hover:bg-blue-50">8</button>
                  <button className="px-2 py-2 rounded-full bg-white text-gray-600 hover:bg-blue-50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageTours;
