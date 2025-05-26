import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define types for tour data
export interface TourOption {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  location: string;
  image: string;
  featured: boolean;
  category: string;
  rating?: number;
  reviewCount?: number;
  highlights?: string[];
  included?: string[];
  itinerary?: { day: string, activities: string }[];
  whatToBring?: string[];
  maxGroupSize?: number;
  languages?: string;
}

interface ToursContextType {
  tours: TourOption[];
  addTour: (tour: Omit<TourOption, 'id'>) => void;
  updateTour: (id: string, tour: Partial<TourOption>) => void;
  removeTour: (id: string) => void;
  getTourById: (id: string) => TourOption | undefined;
  getToursByCategory: (category: string) => TourOption[];
  getFeaturedTours: () => TourOption[];
}

const ToursContext = createContext<ToursContextType | undefined>(undefined);

// Enhanced initial tour data with more details and additional tours
const initialTours: TourOption[] = [
  {
    id: '1',
    name: 'Halong Bay Luxury Cruise',
    description: 'Experience the breathtaking beauty of Halong Bay on our luxury cruise. Explore limestone caves, enjoy kayaking, and savor gourmet meals while surrounded by UNESCO World Heritage scenery.',
    price: 299,
    duration: '3 days, 2 nights',
    location: 'Halong Bay',
    image: 'https://images.unsplash.com/photo-1573270689103-d7a4e42b609a?q=80&w=800',
    featured: true,
    category: 'luxury',
    rating: 4.9,
    reviewCount: 142,
    highlights: [
      'Luxury cruise with private balcony cabins',
      'Kayaking among limestone karsts',
      'Gourmet dining with fresh seafood',
      'Tai Chi classes at sunrise',
      'Swimming and sunset cocktails'
    ],
    included: ['Luxury accommodation', 'All meals', 'Guided excursions', 'Kayak and activities', 'Transfers from Hanoi'],
    whatToBring: ['Comfortable walking shoes', 'Swimwear', 'Sun protection', 'Light jacket for evening', 'Camera'],
    maxGroupSize: 24,
    languages: 'English, Vietnamese',
    itinerary: [
      { day: '1', activities: 'Pickup from Hanoi, transfer to Halong Bay, board cruise, lunch, kayaking, sunset dinner' },
      { day: '2', activities: 'Tai Chi at sunrise, cave exploration, cooking class, swimming, overnight on cruise' },
      { day: '3', activities: 'Early morning activities, brunch, disembark, return to Hanoi' }
    ]
  },
  {
    id: '2',
    name: 'Sapa Trekking Adventure',
    description: 'Trek through the stunning rice terraces of Sapa and experience the unique cultures of ethnic minority villages. Meet local tribes, stay with families, and capture breathtaking mountain views.',
    price: 199,
    duration: '4 days, 3 nights',
    location: 'Sapa',
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=800',
    featured: true,
    category: 'adventure',
    rating: 4.8,
    reviewCount: 98,
    highlights: [
      'Guided treks through terraced rice fields',
      'Homestay with local H\'mong family',
      'Traditional cooking class',
      'Visit to local markets',
      'Bamboo rafting experience'
    ],
    included: ['Local homestay accommodation', 'Meals', 'Local guide', 'Trekking permits', 'Overnight train to/from Hanoi'],
    whatToBring: ['Hiking boots', 'Rain jacket', 'Warm clothing', 'Personal toiletries', 'Insect repellent', 'Camera'],
    maxGroupSize: 12,
    languages: 'English, Vietnamese, Local dialect guide',
    itinerary: [
      { day: '1', activities: 'Night train from Hanoi to Lao Cai, pickup and transfer to Sapa, village trek, homestay dinner' },
      { day: '2', activities: 'Full day trek through Cat Cat and Sin Chai villages, lunch with local family, cultural activities' },
      { day: '3', activities: 'Silver Waterfall and Heaven Gate visit, Fansipan cable car option, traditional market visit' },
      { day: '4', activities: 'Morning free time, cooking class, return train to Hanoi' }
    ]
  },
  {
    id: '3',
    name: 'Hoi An Cultural Experience',
    description: 'Immerse yourself in the charm of ancient Hoi An with its lantern-lit streets, tailors, and rich cultural heritage. Learn about traditional crafts, enjoy cooking classes, and explore the Old Town.',
    price: 149,
    duration: '2 days, 1 night',
    location: 'Hoi An',
    image: '/src/assets/images/destinations/hoi-an.jpg',
    featured: false,
    category: 'cultural',
    rating: 4.7,
    reviewCount: 123,
    highlights: [
      'Lantern-making workshop',
      'Vietnamese cooking class',
      'Old Town walking tour',
      'Visit to ancient trading houses',
      'Evening boat ride with lantern release'
    ],
    included: ['Boutique hotel accommodation', 'Daily breakfast', 'Cooking class with lunch', 'Entrance fees', 'Airport transfers']
  },
  {
    id: '4',
    name: 'Mekong Delta Exploration',
    description: 'Discover the vibrant life along the Mekong Delta, visit floating markets, and experience local village life. Navigate through narrow canals, taste tropical fruits, and witness traditional crafts.',
    price: 129,
    duration: '2 days, 1 night',
    location: 'Mekong Delta',
    image: '/src/assets/images/destinations/mekong.jpg',
    featured: false,
    category: 'cultural',
    rating: 4.6,
    reviewCount: 87,
    highlights: [
      'Cai Rang floating market at sunrise',
      'Boat trip through small canals',
      'Local fruit orchard visits',
      'Homestay with local family',
      'Traditional folk music performance'
    ],
    included: ['Homestay accommodation', 'Meals as per itinerary', 'Boat trips', 'English-speaking guide', 'Transfers from Ho Chi Minh City']
  },
  {
    id: '5',
    name: 'Phu Quoc Island Retreat',
    description: 'Relax on the pristine beaches of Phu Quoc Island, snorkel in crystal-clear waters, and enjoy luxury resort amenities. Perfect for honeymoons and romantic getaways with exclusive experiences.',
    price: 399,
    duration: '5 days, 4 nights',
    location: 'Phu Quoc',
    image: '/src/assets/images/destinations/phu-quoc.jpg',
    featured: true,
    category: 'luxury',
    rating: 4.9,
    reviewCount: 76,
    highlights: [
      'Private beach villa accommodation',
      'Sunset dinner cruise',
      'Snorkeling trip to coral reefs',
      'Island hopping tour',
      'Spa treatments included'
    ],
    included: ['Luxury resort accommodation', 'Daily breakfast and dinner', 'Welcome drinks', 'Airport transfers', 'One complementary spa treatment']
  },
  {
    id: '6',
    name: 'Hanoi City Explorer',
    description: 'Navigate the bustling streets of Hanoi, visit historical sites, and savor authentic Vietnamese cuisine. Experience the perfect blend of ancient traditions and modern life in Vietnam\'s capital.',
    price: 99,
    duration: '1 day',
    location: 'Hanoi',
    image: '/src/assets/images/destinations/hanoi.jpg',
    featured: false,
    category: 'city',
    rating: 4.5,
    reviewCount: 112,
    highlights: [
      'Old Quarter walking tour',
      'Street food adventure',
      'Ho Chi Minh Complex visit',
      'Water puppet show tickets',
      'Traditional coffee experience'
    ],
    included: ['English speaking guide', 'Lunch and snacks', 'Entrance fees', 'Water puppet show ticket']
  },
  {
    id: '7',
    name: 'Hue Imperial City Tour',
    description: 'Explore the magnificent walled fortress and palace that was home to the Nguyen Dynasty emperors. Discover ancient temples, royal tombs, and cruise along the Perfume River in this historical journey.',
    price: 159,
    duration: '3 days, 2 nights',
    location: 'Hue',
    image: '/src/assets/images/destinations/hue.jpg',
    featured: false,
    category: 'cultural',
    rating: 4.7,
    reviewCount: 94,
    highlights: [
      'Imperial Citadel tour',
      'Royal tomb visits',
      'Perfume River cruise',
      'Thien Mu Pagoda',
      'Traditional Hue royal cuisine'
    ],
    included: ['Hotel accommodation', 'Daily breakfast', 'Entrance fees', 'River cruise', 'Local guide']
  },
  {
    id: '8',
    name: 'Phong Nha Cave Expedition',
    description: 'Discover the world\'s largest caves with underground rivers, unique ecosystems and prehistoric limestone formations. An adventure into the heart of Vietnam\'s most spectacular natural wonders.',
    price: 249,
    duration: '3 days, 2 nights',
    location: 'Phong Nha',
    image: '/src/assets/images/destinations/phong-nha.jpg',
    featured: false,
    category: 'adventure',
    rating: 4.8,
    reviewCount: 68,
    highlights: [
      'Paradise Cave exploration',
      'Dark Cave adventure with zip-line',
      'Boat journey through Phong Nha Cave',
      'Swimming in natural pools',
      'Trek through jungle paths'
    ],
    included: ['Guesthouse accommodation', 'Meals', 'Caving equipment', 'Expert cave guides', 'National park fees']
  },
  {
    id: '9',
    name: 'Ho Chi Minh City & Cu Chi Tunnels',
    description: 'Discover the vibrant energy of Ho Chi Minh City and the historical Cu Chi Tunnels. Experience the perfect blend of Vietnam\'s modern life and wartime history in this comprehensive tour.',
    price: 119,
    duration: '2 days, 1 night',
    location: 'Ho Chi Minh City',
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    featured: false,
    category: 'city',
    rating: 4.6,
    reviewCount: 105,
    highlights: [
      'Cu Chi Tunnels exploration',
      'War Remnants Museum',
      'Reunification Palace',
      'Ben Thanh Market visit',
      'Saigon street food tour'
    ],
    included: ['Hotel accommodation', 'Breakfast', 'Entrance fees', 'Transport', 'English-speaking guide']
  },
  {
    id: '10',
    name: 'Ninh Binh & Tam Coc Boat Tour',
    description: 'Often called "Halong Bay on Land", explore the stunning limestone karsts rising from rice paddies by boat and bicycle. Visit ancient temples and enjoy the tranquility of rural Vietnam.',
    price: 139,
    duration: '2 days, 1 night',
    location: 'Ninh Binh',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    featured: false,
    category: 'adventure',
    rating: 4.7,
    reviewCount: 89,
    highlights: [
      'Tam Coc boat ride through rice fields',
      'Bicycle tour of villages',
      'Bich Dong Pagoda',
      'Mua Cave and panoramic lookout',
      'Traditional homestay experience'
    ],
    included: ['Homestay accommodation', 'Meals', 'Bicycle rental', 'Boat rides', 'Guide services']
  },
  {
    id: '11',
    name: 'Central Highlands Coffee Tour',
    description: 'Journey through Vietnam\'s Central Highlands, the heart of coffee country. Visit plantations, learn about production methods, and taste some of the world\'s best coffee straight from the source.',
    price: 189,
    duration: '3 days, 2 nights',
    location: 'Central Highlands',
    image: 'https://images.unsplash.com/photo-1512830414785-3c4d915402f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    featured: true,
    category: 'cultural',
    rating: 4.8,
    reviewCount: 72,
    highlights: [
      'Coffee plantation tours',
      'Traditional coffee processing demonstration',
      'Cupping and tasting sessions',
      'Meeting ethnic minority communities',
      'Scenic mountain treks'
    ],
    included: ['Lodge accommodation', 'All meals', 'Coffee tastings', 'Transportation', 'Expert coffee guide']
  },
  {
    id: '12',
    name: 'Da Nang Beach Holiday',
    description: 'Enjoy the beautiful beaches of Da Nang, voted among the world\'s most beautiful beaches. Relax by the ocean, explore Marble Mountains, and experience the perfect balance of relaxation and adventure.',
    price: 229,
    duration: '4 days, 3 nights',
    location: 'Da Nang',
    image: 'https://images.unsplash.com/photo-1540874288331-c8adc9bb0fa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    featured: false,
    category: 'luxury',
    rating: 4.8,
    reviewCount: 110,
    highlights: [
      'Beach resort accommodation',
      'Ba Na Hills & Golden Bridge visit',
      'Marble Mountains exploration',
      'My Khe Beach relaxation',
      'Sunset seafood dinner'
    ],
    included: ['Beachfront hotel', 'Daily breakfast', 'One massage treatment', 'Ba Na Hills tickets', 'Airport transfers']
  }
];

export const ToursProvider = ({ children }: { children: ReactNode }) => {
  // Initialize state with tours from localStorage or default to initialTours
  const [tours, setTours] = useState<TourOption[]>(() => {
    const savedTours = localStorage.getItem('tours');
    return savedTours ? JSON.parse(savedTours) : initialTours;
  });

  // Save tours to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tours', JSON.stringify(tours));
  }, [tours]);

  // Add a new tour
  const addTour = (tour: Omit<TourOption, 'id'>) => {
    const newTour = {
      ...tour,
      id: Date.now().toString(), // Generate a unique ID
    };
    setTours([...tours, newTour]);
  };

  // Update an existing tour
  const updateTour = (id: string, updatedTour: Partial<TourOption>) => {
    setTours(
      tours.map((tour) =>
        tour.id === id ? { ...tour, ...updatedTour } : tour
      )
    );
  };

  // Remove a tour
  const removeTour = (id: string) => {
    setTours(tours.filter((tour) => tour.id !== id));
  };

  // Get a tour by ID
  const getTourById = (id: string) => {
    return tours.find((tour) => tour.id === id);
  };

  // Get tours by category
  const getToursByCategory = (category: string) => {
    return tours.filter((tour) => tour.category === category);
  };

  // Get featured tours
  const getFeaturedTours = () => {
    return tours.filter((tour) => tour.featured);
  };

  return (
    <ToursContext.Provider
      value={{
        tours,
        addTour,
        updateTour,
        removeTour,
        getTourById,
        getToursByCategory,
        getFeaturedTours,
      }}
    >
      {children}
    </ToursContext.Provider>
  );
};

// Custom hook to use the tours context
export const useTours = () => {
  const context = useContext(ToursContext);
  if (context === undefined) {
    throw new Error('useTours must be used within a ToursProvider');
  }
  return context;
};
