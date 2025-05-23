import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTours } from '../contexts/ToursContext';
import { useTheme } from '../contexts/ThemeContext';

const TourDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getTourById } = useTours();
  const { theme, colors } = useTheme();
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
        <div className="text-center bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
          <div className="mb-6 relative w-24 h-24 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-t-[var(--primary-color)] border-r-[var(--accent-color)] border-b-[var(--secondary-color)] border-l-[var(--primary-color)] animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-4 border-t-transparent border-r-transparent border-b-transparent border-l-[var(--primary-color)] animate-spin animation-delay-200"></div>
          </div>
          <h2 className="text-2xl font-bold mb-4">Loading your Vietnam journey...</h2>
          <p className="mb-6 text-[#2A3B4A]/80">If this message persists, the tour may not exist.</p>
          <Link 
            to="/package-tours" 
            className="mt-6 inline-block bg-[var(--primary-color)] hover:bg-[#0077b3] text-white font-bold py-3 px-6 rounded-xl transition-colors"
          >
            Explore Other Vietnamese Adventures
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16 max-w-7xl">
      {/* Hero Section */}
      <div 
        className="w-full h-[60vh] bg-cover bg-center rounded-xl overflow-hidden relative mb-8"
        style={{ backgroundImage: `url(${tour.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70 flex items-end">
          <div className="p-8 w-full">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-[#FFCB3C]/90 text-[#2A3B4A] text-sm font-medium mb-4">
                  Explore Vietnam
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{tour.name}</h1>
                <div className="flex items-center text-white text-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[var(--primary-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p>{tour.location}, Vietnam</p>
                </div>
              </div>
              <div className="mt-6 md:mt-0 bg-[var(--primary-color)] text-white px-6 py-4 rounded-xl text-2xl font-bold shadow-lg transform transition-transform hover:scale-105">
                ${tour.price} <span className="text-sm font-normal">/ person</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content Section */}          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
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
                      ? 'border-b-2 border-[var(--primary-color)] text-[var(--primary-color)]'
                      : 'border-transparent hover:text-[var(--primary-color)] hover:border-[var(--primary-color)]'
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
                      ? 'border-b-2 border-[var(--primary-color)] text-[var(--primary-color)]'
                      : 'border-transparent hover:text-[var(--primary-color)] hover:border-[var(--primary-color)]'
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
                      ? 'border-b-2 border-[var(--primary-color)] text-[var(--primary-color)]'
                      : 'border-transparent hover:text-[var(--primary-color)] hover:border-[var(--primary-color)]'
                  }`}
                >
                  Reviews
                </button>
              </li>
            </ul>
          </div>
          
          {/* Tab Content */}
          <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8 ${theme === 'dark' ? 'text-white' : ''}`}>
            {selectedTab === 'overview' && (
              <div className="max-w-3xl mx-auto">
                <div className="relative mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
                  <span className="absolute -top-3 -left-3 w-16 h-16 bg-[url('https://i.imgur.com/n9S0Lwh.png')] bg-contain bg-no-repeat opacity-20"></span>
                  <h2 className="text-2xl font-bold mb-4 relative">Tour Overview</h2>
                  <p className="mb-6 text-base leading-relaxed">{tour.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                    <div className="flex flex-col items-center p-3 rounded-xl bg-[var(--background)] dark:bg-gray-700 border border-gray-100 dark:border-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary-color)] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h3 className="font-semibold text-sm mb-0.5">Duration</h3>
                      <p className="text-sm">{tour.duration}</p>
                    </div>
                    <div className="flex flex-col items-center p-4 rounded-xl bg-[#FFFAF0] dark:bg-gray-700 border border-gray-100 dark:border-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--accent-color)] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <h3 className="font-semibold text-sm mb-1">Group Size</h3>
                      <p>Max 12 travelers</p>
                    </div>
                    <div className="flex flex-col items-center p-4 rounded-xl bg-[#FFFAF0] dark:bg-gray-700 border border-gray-100 dark:border-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--secondary-color)] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <h3 className="font-semibold text-sm mb-1">Languages</h3>
                      <p>English, Vietnamese</p>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <span className="w-8 h-8 flex items-center justify-center bg-[var(--primary-color)]/10 rounded-full mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[var(--primary-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                    <span>Experience the unique culture and landscapes of {tour.location} with local insight</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#64A86B] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Authentic Vietnamese cuisine with regional specialties</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#64A86B] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Professional guides with extensive Vietnamese cultural knowledge</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#64A86B] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Carefully curated itinerary to maximize your Vietnamese experience</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#64A86B] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Comfortable accommodations in beautiful Vietnamese settings</span>
                  </li>
                </ul>
                
                <h3 className="text-xl font-semibold mb-3 flex items-center mt-6">
                  <span className="w-8 h-8 flex items-center justify-center bg-[#FFCB3C]/10 rounded-full mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#FFCB3C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  What to Bring
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  <li className="flex items-center py-2 px-3 rounded-xl bg-[#FFFAF0] dark:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#E4784D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Valid passport
                  </li>
                  <li className="flex items-center py-2 px-3 rounded-xl bg-[#FFFAF0] dark:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#E4784D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Local currency (VND)
                  </li>
                  <li className="flex items-center py-2 px-3 rounded-xl bg-[#FFFAF0] dark:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#E4784D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Travel insurance
                  </li>
                  <li className="flex items-center py-2 px-3 rounded-xl bg-[#FFFAF0] dark:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#E4784D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Camera
                  </li>
                  <li className="flex items-center py-2 px-3 rounded-xl bg-[#FFFAF0] dark:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#E4784D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Copy of visa
                  </li>
                  <li className="flex items-center py-2 px-3 rounded-xl bg-[#FFFAF0] dark:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#E4784D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                    Lightweight clothing
                  </li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 flex items-center mt-6">
                  <span className="w-8 h-8 flex items-center justify-center bg-[#64A86B]/10 rounded-full mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#64A86B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </span>
                  Cancellation Policy
                </h3>
                <div className="bg-[#FFFAF0] dark:bg-gray-700 rounded-xl p-4 mb-6">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#64A86B] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Free cancellation up to 30 days before the tour</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#64A86B] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>75% refund 15-29 days before the tour</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#64A86B] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>50% refund 7-14 days before the tour</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#64A86B] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>No refund less than 7 days before the tour</span>
                    </li>
                  </ul>
                </div>

                <h3 className="text-xl font-semibold mb-3 flex items-center mt-6">
                  <span className="w-8 h-8 flex items-center justify-center bg-[var(--primary-color)]/10 rounded-full mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[var(--primary-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  Tour Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-[#FFFAF0] dark:bg-gray-700 p-4 rounded-xl">
                    <h4 className="font-semibold mb-2">Included</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#64A86B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Professional English-speaking guide</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#64A86B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Hotel accommodation with breakfast</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#64A86B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>All transportation in Vietnam</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#64A86B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Entrance fees & sightseeing</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-[#FFFAF0] dark:bg-gray-700 p-4 rounded-xl">
                    <h4 className="font-semibold mb-2">Not Included</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span>International flights</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span>Travel insurance</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span>Personal expenses</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span>Visa fees</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {selectedTab === 'itinerary' && (
              <div>
                <div className="relative mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
                  <span className="absolute -top-3 -left-3 w-16 h-16 bg-[url('https://i.imgur.com/n9S0Lwh.png')] bg-contain bg-no-repeat opacity-20"></span>
                  <h2 className="text-2xl font-bold mb-4 relative">Your Vietnam Journey</h2>
                  <p className="mb-6 text-lg">Discover the beauty and culture of Vietnam through our carefully crafted itinerary.</p>
                </div>
                
                <div className="space-y-6 mb-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px lg:before:mx-auto lg:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#E4784D]/60 before:via-[#FFCB3C]/60 before:to-[#64A86B]/60 before:opacity-70">
                  <div className="relative flex items-start group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-[#E4784D] text-white shadow shrink-0 z-10">
                      <span className="font-bold">1</span>
                    </div>
                    <div className="grow bg-white dark:bg-gray-700 p-4 rounded-xl shadow ml-6 before:absolute before:w-5 before:h-5 before:bg-[#E4784D] before:rounded-full before:top-5 before:left-5 before:ml-px before:translate-x-1/2 before:hidden lg:before:block">
                      <div className="font-bold text-[#E4784D] mb-1">Day 1: Welcome to Vietnam</div>
                      <div className="text-sm mb-2"><span className="text-[#2A3B4A]/70">{tour.location}, Vietnam</span></div>
                      <div className="text-sm">
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#E4784D] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Airport pickup and transfer to your hotel</span>
                          </li>
                          <li className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#E4784D] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Welcome ceremony with traditional Vietnamese tea</span>
                          </li>
                          <li className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#E4784D] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Evening welcome dinner with cultural performance</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative flex items-start group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-[#FFCB3C] text-[#2A3B4A] shadow shrink-0 z-10">
                      <span className="font-bold">2</span>
                    </div>
                    <div className="grow bg-white dark:bg-gray-700 p-4 rounded-xl shadow ml-6 before:absolute before:w-5 before:h-5 before:bg-[#FFCB3C] before:rounded-full before:top-5 before:left-5 before:ml-px before:translate-x-1/2 before:hidden lg:before:block">
                      <div className="font-bold text-[#FFCB3C] mb-1">Day 2-3: Cultural Immersion</div>
                      <div className="text-sm mb-2"><span className="text-[#2A3B4A]/70">Cultural heart of {tour.location}</span></div>
                      <div className="text-sm">
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#FFCB3C] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Morning guided tour of historical sites and landmarks</span>
                          </li>
                          <li className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#FFCB3C] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Vietnamese cooking class with local chef</span>
                          </li>
                          <li className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#FFCB3C] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Visit to local artisan workshops and markets</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative flex items-start group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-[#64A86B] text-white shadow shrink-0 z-10">
                      <span className="font-bold">3</span>
                    </div>
                    <div className="grow bg-white dark:bg-gray-700 p-4 rounded-xl shadow ml-6 before:absolute before:w-5 before:h-5 before:bg-[#64A86B] before:rounded-full before:top-5 before:left-5 before:ml-px before:translate-x-1/2 before:hidden lg:before:block">
                      <div className="font-bold text-[#64A86B] mb-1">Final Day: Farewell to Vietnam</div>
                      <div className="text-sm mb-2"><span className="text-[#2A3B4A]/70">{tour.location}, Vietnam</span></div>
                      <div className="text-sm">
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#64A86B] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Morning leisure time for personal exploration or shopping</span>
                          </li>
                          <li className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#64A86B] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Special farewell lunch with Vietnamese specialties</span>
                          </li>
                          <li className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#64A86B] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Airport transfer and departure assistance</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={`overflow-hidden transition-all duration-500 ${showFullItinerary ? 'max-h-[1000px]' : 'max-h-0'}`}>
                  <div className="space-y-4 p-4 bg-[#FFFAF0] dark:bg-gray-700 rounded-xl">
                    <h3 className="font-bold text-lg">Additional Tour Information</h3>
                    <p>Your Vietnam experience includes all accommodation, daily breakfast, welcome and farewell meals, guided tours and activities as specified, transportation within Vietnam, airport transfers, and the services of our expert local guides.</p>
                    <p>Not included: International flights, travel insurance, visa fees, personal expenses, and additional meals not specified in the itinerary.</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => setShowFullItinerary(!showFullItinerary)}
                  className="mt-4 w-full py-2 rounded-xl border border-[#E4784D] text-[#E4784D] hover:bg-[#E4784D] hover:text-white transition-colors flex items-center justify-center"
                >
                  {showFullItinerary ? 'Show Less' : 'View Full Itinerary Details'}
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ml-1 transition-transform duration-300 ${showFullItinerary ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            )}
            
            {selectedTab === 'reviews' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Vietnam Traveler Reviews</h2>
                <div className="space-y-6">
                  <div className="border-b pb-6 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-700 p-4">
                    <div className="flex items-center mb-2">
                      <div className="flex text-[#FFCB3C]">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 font-medium">Sarah J.</span>
                      <span className="ml-auto text-sm text-gray-500">Visited 2 months ago</span>
                    </div>
                    <p className="mb-2 italic">"An incredible journey through Vietnam! Our guide brought the culture and history to life, and the accommodations were perfectly chosen. The street food tour was a highlight - I'm still dreaming about that phở!"</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>California, USA</span>
                      <span className="mx-2">•</span>
                      <span>Family Trip</span>
                    </div>
                  </div>
                  
                  <div className="border-b pb-6 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-700 p-4">
                    <div className="flex items-center mb-2">
                      <div className="flex text-[#FFCB3C]">
                        {[...Array(4)].map((_, i) => (
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <span className="ml-2 font-medium">Michael T.</span>
                      <span className="ml-auto text-sm text-gray-500">Visited 3 months ago</span>
                    </div>
                    <p className="mb-2 italic">"Vietnam exceeded my expectations! Beautiful landscapes, delicious food, and welcoming people. The tour was well-organized and our guide Minh had incredible knowledge. Would have liked more free time for shopping in Hoi An."</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>London, UK</span>
                      <span className="mx-2">•</span>
                      <span>Solo Traveler</span>
                    </div>
                  </div>
                  
                  <div className="rounded-xl bg-gray-50 dark:bg-gray-700 p-4">
                    <div className="flex items-center mb-2">
                      <div className="flex text-[#FFCB3C]">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 font-medium">Lisa & David</span>
                      <span className="ml-auto text-sm text-gray-500">Visited 1 month ago</span>
                    </div>
                    <p className="mb-2 italic">"Our honeymoon in Vietnam was absolutely magical! From the cruise in Halong Bay to the lantern-lit streets of Hoi An, every moment was special. The private dinner arranged for us on the beach was unforgettable. Worth every penny!"</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>Sydney, Australia</span>
                      <span className="mx-2">•</span>
                      <span>Honeymoon</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <button className="px-6 py-2 bg-[#64A86B] text-white rounded-xl hover:bg-[#5a9960] transition-colors">
                    Write a Review
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-4">
          <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8 sticky top-24 ${theme === 'dark' ? 'text-white' : ''}`}>
            <div className="text-center mb-6">
              <div className="inline-block bg-[#FFFAF0] dark:bg-gray-700 p-3 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#E4784D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-1">From ${tour.price} per person</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">All-inclusive Vietnamese experience</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between border-b border-gray-200 dark:border-gray-600 pb-2">
                <span className="font-medium">Duration:</span>
                <span>{tour.duration}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 dark:border-gray-600 pb-2">
                <span className="font-medium">Tour Type:</span>
                <span className="capitalize bg-[#FFFAF0] dark:bg-gray-700 px-2 py-0.5 rounded-full text-sm">{tour.category}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 dark:border-gray-600 pb-2">
                <span className="font-medium">Group Size:</span>
                <span>Max 12 people</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 dark:border-gray-600 pb-2">
                <span className="font-medium">Languages:</span>
                <span>English, Vietnamese</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 dark:border-gray-600 pb-2">
                <span className="font-medium">Starting Point:</span>
                <span>{tour.location}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 dark:border-gray-600 pb-2">
                <span className="font-medium">Accommodation:</span>
                <span>3-4★ Hotels</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 dark:border-gray-600 pb-2">
                <span className="font-medium">Transportation:</span>
                <span>Modern Air-con Vehicle</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Meals Included:</span>
                <span>Daily Breakfast + Selected Meals</span>
              </div>
            </div>
            
            <div className="p-4 bg-[#FFFAF0] dark:bg-gray-700 rounded-xl mb-6">
              <div className="flex items-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FFCB3C] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">Booking Information</span>
              </div>
              <p className="text-sm">Secure your spot with a small deposit. Full payment due 30 days before departure.</p>
            </div>
            
            <button className="w-full bg-[var(--primary-color)] hover:bg-[#0077b3] text-white font-bold py-3 px-4 rounded-xl mb-3 flex items-center justify-center transform transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book This Tour
            </button>
            
            <button className="w-full bg-white hover:bg-slate-100 text-[#2A3B4A] font-bold py-3 px-4 rounded-xl mt-3 border-2 border-[var(--primary-color)] transition-all duration-300 hover:shadow-md dark:bg-transparent dark:hover:bg-gray-700 dark:text-white dark:border-white group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2 transition-transform duration-300 group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Ask a Question
            </button>
          </div>
          
          <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 ${theme === 'dark' ? 'text-white' : ''}`}>
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#FFCB3C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              More Vietnam Experiences
            </h2>
            <div className="space-y-4">
              <Link to="/tour/2" className="block group">
                <div className="flex items-center p-3 rounded-xl bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <img 
                      src="https://images.unsplash.com/photo-1528181304800-259b08848526?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                      alt="Sapa Trekking Adventure" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium group-hover:text-[#E4784D] transition-colors">Sapa Trekking Adventure</h3>
                    <div className="flex items-center">
                      <span className="text-sm text-[#E4784D] font-semibold">$199</span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">4 days</span>
                    </div>
                  </div>
                </div>
              </Link>
              <Link to="/tour/3" className="block group">
                <div className="flex items-center p-3 rounded-xl bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <img 
                      src="https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                      alt="Hoi An Cultural Experience" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium group-hover:text-[#E4784D] transition-colors">Hoi An Cultural Experience</h3>
                    <div className="flex items-center">
                      <span className="text-sm text-[#E4784D] font-semibold">$149</span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">2 days</span>
                    </div>
                  </div>
                </div>
              </Link>
              <Link to="/tour/5" className="block group">
                <div className="flex items-center p-3 rounded-xl bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <img 
                      src="https://images.unsplash.com/photo-1544550581-1bcabf842b77?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                      alt="Phu Quoc Island Retreat" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium group-hover:text-[#E4784D] transition-colors">Phu Quoc Island Retreat</h3>
                    <div className="flex items-center">
                      <span className="text-sm text-[#E4784D] font-semibold">$399</span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">5 days</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Link 
                to="/package-tours" 
                className="flex items-center justify-center text-[#64A86B] hover:text-[#5a9960] font-medium"
              >
                View All Vietnam Tours
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetail;
