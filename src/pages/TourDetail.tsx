import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTours } from '../contexts/ToursContext';
import { useTheme } from '../contexts/ThemeContext';

const TourDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getTourById } = useTours();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [showFullItinerary, setShowFullItinerary] = useState(false);
  
  const tour = getTourById(id || '');
  
  useEffect(() => {
    if (tour) {
      setIsLoading(false);
    }
  }, [tour]);
  
  if (isLoading || !tour) {
    return (
      <div className="container mx-auto px-8 md:px-12 py-16 mt-16 flex justify-center items-center min-h-[60vh]">
        <div className="text-center bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8">
          <div className="mb-6 relative w-24 h-24 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-t-[#0093DE] border-r-[#64A86B] border-b-[#0093DE] border-l-[#0093DE] animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-4 border-t-transparent border-r-transparent border-b-transparent border-l-[#0093DE] animate-spin animation-delay-200"></div>
          </div>
          <h2 className="text-2xl font-bold mb-4 relative">Loading your Vietnam journey...</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">If this message persists, the tour may not exist.</p>
          <Link 
            to="/package-tours" 
            className="mt-6 inline-block bg-[#0093DE] hover:bg-[#007ab8] text-white font-bold py-3 px-6 rounded-xl transition-colors transform hover:-translate-y-1 hover:shadow-lg duration-300"
          >
            Explore Other Vietnamese Adventures
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20 max-w-7xl">
      {/* Hero Section */}
      <div 
        className="w-full h-[60vh] bg-cover bg-center rounded-2xl overflow-hidden relative mb-8"
        style={{ backgroundImage: `url(${tour.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70 flex items-end">
          <div className="p-8 w-full">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end">
              <div>
                <span className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-4 shadow-xl">
                  Explore Vietnam
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{tour.name}</h1>
                <div className="flex items-center text-white text-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#0093DE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p>{tour.location}, Vietnam</p>
                </div>
              </div>
              <div className="mt-6 md:mt-0 bg-[#0093DE] text-white px-6 py-4 rounded-xl text-2xl font-bold shadow-lg transform transition-transform hover:scale-105">
                ${tour.price} <span className="text-sm font-normal">/ person</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-8">
          {/* Navigation Tabs */}
          <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
              <li className="mr-2">
                <button
                  onClick={() => setSelectedTab('overview')}
                  className={`inline-block p-3 rounded-t-lg ${
                    selectedTab === 'overview'
                      ? 'border-b-2 border-[#0093DE] text-[#0093DE]'
                      : 'border-transparent hover:text-[#0093DE] hover:border-[#0093DE]'
                  }`}
                >
                  Overview
                </button>
              </li>
              <li className="mr-2">
                <button
                  onClick={() => setSelectedTab('itinerary')}
                  className={`inline-block p-4 rounded-t-lg ${
                    selectedTab === 'itinerary'
                      ? 'border-b-2 border-[#0093DE] text-[#0093DE]'
                      : 'border-transparent hover:text-[#0093DE] hover:border-[#0093DE]'
                  }`}
                >
                  Itinerary
                </button>
              </li>
              <li className="mr-2">
                <button
                  onClick={() => setSelectedTab('reviews')}
                  className={`inline-block p-4 rounded-t-lg ${
                    selectedTab === 'reviews'
                      ? 'border-b-2 border-[#0093DE] text-[#0093DE]'
                      : 'border-transparent hover:text-[#0093DE] hover:border-[#0093DE]'
                  }`}
                >
                  Reviews
                </button>
              </li>
            </ul>
          </div>
          
          {/* Tab Content */}
          <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8 ${theme === 'dark' ? 'text-white' : ''}`}>
            {selectedTab === 'overview' && (
              <div className="max-w-3xl mx-auto">
                <div className="relative mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
                  <span className="absolute -top-3 -left-3 w-16 h-16 bg-[url('https://i.imgur.com/n9S0Lwh.png')] bg-contain bg-no-repeat opacity-20"></span>
                  <h2 className="text-2xl font-bold mb-4 relative">Tour Overview</h2>
                  <p className="mb-6 text-base leading-relaxed text-gray-600 dark:text-gray-300">{tour.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                    <div className="flex flex-col items-center p-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#0093DE] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h3 className="font-semibold text-sm mb-0.5">Duration</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{tour.duration}</p>
                    </div>
                    <div className="flex flex-col items-center p-4 rounded-xl bg-[#0093DE]/5 dark:bg-gray-700 border border-gray-100 dark:border-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#64A86B] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <h3 className="font-semibold text-sm mb-1">Group Size</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Max 12 travelers</p>
                    </div>
                    <div className="flex flex-col items-center p-4 rounded-xl bg-[#0093DE]/5 dark:bg-gray-700 border border-gray-100 dark:border-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#0093DE] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <h3 className="font-semibold text-sm mb-1">Languages</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">English, Vietnamese</p>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <span className="w-8 h-8 flex items-center justify-center bg-[#0093DE]/10 rounded-full mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#0093DE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  Vietnamese Experience Highlights
                </h3>
                <ul className="list-none pl-6 mb-6 space-y-3">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#64A86B] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">Experience the unique culture and landscapes of {tour.location} with local insight</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#64A86B] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">Authentic Vietnamese cuisine with regional specialties</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#64A86B] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">Professional guides with extensive Vietnamese cultural knowledge</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#64A86B] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">Carefully curated itinerary to maximize your Vietnamese experience</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#64A86B] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">Comfortable accommodations in beautiful Vietnamese settings</span>
                  </li>
                </ul>
                
                <h3 className="text-xl font-semibold mb-3 flex items-center mt-6">
                  <span className="w-8 h-8 flex items-center justify-center bg-[#64A86B]/10 rounded-full mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#64A86B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  What to Bring
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  <li className="flex items-center py-2 px-3 rounded-xl bg-[#0093DE]/5 dark:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#0093DE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">Valid passport</span>
                  </li>
                  <li className="flex items-center py-2 px-3 rounded-xl bg-[#0093DE]/5 dark:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#0093DE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">Local currency (VND)</span>
                  </li>
                  <li className="flex items-center py-2 px-3 rounded-xl bg-[#0093DE]/5 dark:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#0093DE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">Travel insurance</span>
                  </li>
                  <li className="flex items-center py-2 px-3 rounded-xl bg-[#0093DE]/5 dark:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#0093DE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">Camera</span>
                  </li>
                  <li className="flex items-center py-2 px-3 rounded-xl bg-[#0093DE]/5 dark:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#0093DE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">Copy of visa</span>
                  </li>
                  <li className="flex items-center py-2 px-3 rounded-xl bg-[#0093DE]/5 dark:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#0093DE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">Light clothing</span>
                  </li>
                </ul>
              </div>
            )}
            
            {selectedTab === 'itinerary' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Tour Itinerary</h2>
                <div className="space-y-6">
                  <div className="relative pl-8 pb-6 border-l-2 border-[#0093DE]">
                    <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-[#0093DE]"></div>
                    <h3 className="text-xl font-bold mb-2">Day 1: Arrival in {tour.location}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Welcome to Vietnam! Upon arrival at the airport, you'll be greeted by your guide and transferred to your hotel. After check-in and some rest, enjoy a welcome dinner featuring authentic Vietnamese cuisine.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#0093DE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm text-gray-600 dark:text-gray-300">Airport pickup</span>
                      </div>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#0093DE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span className="text-sm text-gray-600 dark:text-gray-300">Hotel check-in</span>
                      </div>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#0093DE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                        </svg>
                        <span className="text-sm text-gray-600 dark:text-gray-300">Welcome dinner</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative pl-8 pb-6 border-l-2 border-[#0093DE]">
                    <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-[#0093DE]"></div>
                    <h3 className="text-xl font-bold mb-2">Day 2: Exploring {tour.location}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      After breakfast, embark on a full-day tour of {tour.location}'s highlights. Visit historical landmarks, cultural sites, and enjoy local cuisine for lunch. In the afternoon, experience the vibrant local markets and street life.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#0093DE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                        </svg>
                        <span className="text-sm text-gray-600 dark:text-gray-300">Guided city tour</span>
                      </div>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#0093DE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm text-gray-600 dark:text-gray-300">Photo opportunities</span>
                      </div>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#0093DE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                        </svg>
                        <span className="text-sm text-gray-600 dark:text-gray-300">Local lunch</span>
                      </div>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#0093DE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <span className="text-sm text-gray-600 dark:text-gray-300">Market visit</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative pl-8 pb-6 border-l-2 border-[#0093DE]">
                    <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-[#0093DE]"></div>
                    <h3 className="text-xl font-bold mb-2">Day 3: Cultural Immersion</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Today is dedicated to Vietnamese culture. Participate in a traditional cooking class in the morning, learning to prepare authentic Vietnamese dishes. In the afternoon, visit local artisans and witness traditional crafts being made.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#0093DE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm text-gray-600 dark:text-gray-300">Cooking class</span>
                      </div>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#0093DE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                        </svg>
                        <span className="text-sm text-gray-600 dark:text-gray-300">Lunch you prepare</span>
                      </div>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#0093DE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm text-gray-600 dark:text-gray-300">Artisan visits</span>
                      </div>
                    </div>
                  </div>
                  
                  {!showFullItinerary && (
                    <button 
                      onClick={() => setShowFullItinerary(true)}
                      className="mt-4 flex items-center text-[#0093DE] hover:text-[#007ab8] transition-colors"
                    >
                      <span>Show full itinerary</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                  
                  {showFullItinerary && (
                    <>
                      <div className="relative pl-8 pb-6 border-l-2 border-[#0093DE]">
                        <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-[#0093DE]"></div>
                        <h3 className="text-xl font-bold mb-2">Day 4: Natural Wonders</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          Today we venture outside the city to explore Vietnam's natural beauty. Depending on the location, this could include a boat trip, hiking in national parks, or visiting scenic landscapes. Lunch will be provided in a scenic location.
                        </p>
                      </div>
                      
                      <div className="relative pl-8 pb-6 border-l-2 border-[#0093DE]">
                        <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-[#0093DE]"></div>
                        <h3 className="text-xl font-bold mb-2">Day 5: Departure</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          Enjoy a leisurely morning with free time for last-minute shopping or exploration. Depending on your flight time, transfer to the airport for your departure. End of our services.
                        </p>
                      </div>
                      
                      <button 
                        onClick={() => setShowFullItinerary(false)}
                        className="mt-4 flex items-center text-[#0093DE] hover:text-[#007ab8] transition-colors"
                      >
                        <span>Hide full itinerary</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
            
            {selectedTab === 'reviews' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Customer Reviews</h2>
                  <div className="flex items-center">
                    <div className="flex mr-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg 
                          key={star}
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-5 w-5 ${star <= Math.round(tour.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`} 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-lg font-bold">{tour.rating || 4.5}</span>
                    <span className="text-sm text-gray-500 ml-1">({Math.floor(Math.random() * 50) + 10} reviews)</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className={`p-6 rounded-2xl ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'}`}>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-[#0093DE]/20 flex items-center justify-center text-[#0093DE] font-bold text-xl mr-4">
                        JD
                      </div>
                      <div>
                        <h4 className="font-bold">John Doe</h4>
                        <div className="flex items-center">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg 
                                key={star}
                                xmlns="http://www.w3.org/2000/svg" 
                                className={`h-4 w-4 ${star <= 5 ? 'text-yellow-400' : 'text-gray-300'}`} 
                                viewBox="0 0 20 20" 
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-sm text-gray-500 ml-2">Traveled in April 2023</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      "This tour exceeded all my expectations! Our guide was incredibly knowledgeable about Vietnamese culture and history. The itinerary was perfectly balanced between major attractions and hidden gems. I especially loved the cooking class where we learned to make authentic Vietnamese spring rolls. Highly recommend!"
                    </p>
                  </div>
                  
                  <div className={`p-6 rounded-2xl ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'}`}>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-[#64A86B]/20 flex items-center justify-center text-[#64A86B] font-bold text-xl mr-4">
                        MS
                      </div>
                      <div>
                        <h4 className="font-bold">Maria Smith</h4>
                        <div className="flex items-center">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg 
                                key={star}
                                xmlns="http://www.w3.org/2000/svg" 
                                className={`h-4 w-4 ${star <= 4 ? 'text-yellow-400' : 'text-gray-300'}`} 
                                viewBox="0 0 20 20" 
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-sm text-gray-500 ml-2">Traveled in February 2023</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      "Beautiful country and a well-organized tour. The accommodations were comfortable and centrally located. Our guide spoke excellent English and was very attentive to everyone's needs. The only reason I'm not giving 5 stars is because one day felt a bit rushed. Otherwise, a fantastic experience that I would recommend to friends and family."
                    </p>
                  </div>
                  
                  <div className={`p-6 rounded-2xl ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'}`}>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-[#0093DE]/20 flex items-center justify-center text-[#0093DE] font-bold text-xl mr-4">
                        RJ
                      </div>
                      <div>
                        <h4 className="font-bold">Robert Johnson</h4>
                        <div className="flex items-center">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg 
                                key={star}
                                xmlns="http://www.w3.org/2000/svg" 
                                className={`h-4 w-4 ${star <= 5 ? 'text-yellow-400' : 'text-gray-300'}`} 
                                viewBox="0 0 20 20" 
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-sm text-gray-500 ml-2">Traveled in March 2023</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      "As a solo traveler, I was a bit apprehensive about this tour, but it turned out to be perfect! The small group size made it easy to make friends, and our guide was exceptional at creating a friendly atmosphere. The cultural experiences were authentic and not touristy at all. The food was incredible - I'm still dreaming about the pho we had on our second day!"
                    </p>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <button className="px-6 py-2 bg-[#0093DE] hover:bg-[#007ab8] text-white rounded-xl transition-colors">
                    View All Reviews
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Map Section */}
          <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 ${theme === 'dark' ? 'text-white' : ''}`}>
            <h2 className="text-xl font-bold mb-4">Tour Location</h2>
            <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <p className="text-gray-500 dark:text-gray-400">Interactive map of {tour.location}, Vietnam</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-4">
          {/* Booking Card */}
          <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 sticky top-24 ${theme === 'dark' ? 'text-white' : ''}`}>
            <h2 className="text-xl font-bold mb-4">Book This Tour</h2>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 dark:text-gray-300">Price per person</span>
                <span className="font-bold text-xl">${tour.price}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 dark:text-gray-300">Duration</span>
                <span>{tour.duration}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">Group size</span>
                <span>Max 12 people</span>
              </div>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="travel-date">Travel Date</label>
                <input 
                  type="date" 
                  id="travel-date" 
                  className={`w-full p-3 rounded-xl border ${
                    theme === 'light' 
                      ? 'border-gray-300 focus:border-[#0093DE]' 
                      : 'border-gray-600 bg-gray-700 focus:border-[#0093DE]'
                  } focus:outline-none focus:ring-2 focus:ring-[#0093DE]`}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="travelers">Number of Travelers</label>
                <select 
                  id="travelers" 
                  className={`w-full p-3 rounded-xl border ${
                    theme === 'light' 
                      ? 'border-gray-300 focus:border-[#0093DE]' 
                      : 'border-gray-600 bg-gray-700 focus:border-[#0093DE]'
                  } focus:outline-none focus:ring-2 focus:ring-[#0093DE]`}
                >
                  <option value="1">1 person</option>
                  <option value="2">2 people</option>
                  <option value="3">3 people</option>
                  <option value="4">4 people</option>
                  <option value="5">5+ people</option>
                </select>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-[#0093DE] hover:bg-[#007ab8] text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              >
                Book Now
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Not ready to book yet?</p>
              <button className="text-[#0093DE] hover:text-[#007ab8] font-medium transition-colors">
                Save to Wishlist
              </button>
            </div>
          </div>
          
          {/* Why Book With Us */}
          <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 ${theme === 'dark' ? 'text-white' : ''}`}>
            <h2 className="text-xl font-bold mb-4">Why Book With Us</h2>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0093DE]/10 flex items-center justify-center text-[#0093DE] mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Best Price Guarantee</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Find a lower price? We'll match it and give you an additional 10% off.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0093DE]/10 flex items-center justify-center text-[#0093DE] mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Flexible Booking</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Change your travel dates up to 30 days before departure without fees.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0093DE]/10 flex items-center justify-center text-[#0093DE] mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">24/7 Support</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Our local team is available around the clock during your journey.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0093DE]/10 flex items-center justify-center text-[#0093DE] mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Local Expertise</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Our guides are local Vietnamese experts with deep cultural knowledge.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Similar Tours Section */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div 
              key={item}
              className={`rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                theme === 'light' ? 'bg-white' : 'bg-gray-800'
              }`}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={`https://images.unsplash.com/photo-${1520000000000 + item * 10000}?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80`}
                  alt={`Similar tour ${item}`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute bottom-3 right-3 bg-white/90 text-[#0093DE] text-sm font-bold px-3 py-1 rounded-full">
                  ${(tour.price - 50 + (item * 100))}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2">Vietnam Discovery Tour {item}</h3>
                <div className="flex items-center text-sm mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#0093DE] mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">Northern Vietnam</span>
                </div>
                
                <div className="flex items-center text-sm mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#0093DE] mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">{4 + item} days</span>
                </div>
                
                <Link 
                  to={`/tour/${tour.id + item}`}
                  className="block w-full text-center bg-[#0093DE] hover:bg-[#007ab8] text-white font-medium py-2 px-4 rounded-xl transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TourDetail;
