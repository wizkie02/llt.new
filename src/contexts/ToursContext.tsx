// ✅ Goal: Replace local state (sessionStorage) with real-time data from your PHP API on CPanel

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';

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

interface Category {
  id: string;
  name: string;
}

interface ToursContextType {
  tours: TourOption[];
  addTour: (tour: Omit<TourOption, 'id'>) => Promise<void>;
  updateTour: (id: string, tour: Partial<TourOption>) => Promise<void>;
  removeTour: (id: string) => Promise<void>;
  getTourById: (id: string) => TourOption | undefined;
  getToursByCategory: (category: string) => TourOption[];
  getFeaturedTours: () => TourOption[];
}

const ToursContext = createContext<ToursContextType | undefined>(undefined);

export const ToursProvider = ({ children }: { children: ReactNode }) => {
  const [tours, setTours] = useState<TourOption[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const { getAuthHeaders } = useAuth();

  const fetchTours = async () => {
    try {
      const res = await fetch('https://leolovestravel.com/api/get-tours.php');
      const data = await res.json();
      setTours(data);
    } catch (err) {
      console.error('Failed to fetch tours:', err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('https://leolovestravel.com/api/get-categories.php');
      const data = await res.json();
      
      // Handle different response formats
      if (Array.isArray(data)) {
        setCategories(data);
      } else if (data.categories && Array.isArray(data.categories)) {
        setCategories(data.categories);
      } else if (data.data && Array.isArray(data.data)) {
        setCategories(data.data);
      } else {
        console.error('Invalid categories response format:', data);
        setCategories([]);
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err);
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchTours();
    fetchCategories();
  }, []);

  const addTour = async (tour: Omit<TourOption, 'id'>) => {
    try {
      await fetch('https://leolovestravel.com/api/add-tour.php', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(tour),
      });
      await fetchTours();
      await fetchCategories(); // Refresh categories in case new category was added
    } catch (err) {
      console.error('Add tour error:', err);
    }
  };

  const updateTour = async (id: string, updatedTour: Partial<TourOption>) => {
    try {
      await fetch(`https://leolovestravel.com/api/update-tour.php?id=${id}`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(updatedTour),
      });
      await fetchTours();
      await fetchCategories(); // Refresh categories in case category was changed
    } catch (err) {
      console.error('Update tour error:', err);
    }
  };

  const removeTour = async (id: string) => {
    try {
      await fetch(`https://leolovestravel.com/api/delete-tour.php?id=${id}`, {
        method: 'POST',
        headers: getAuthHeaders(),
      });
      await fetchTours();
    } catch (err) {
      console.error('Delete tour error:', err);
    }
  };

  const getTourById = (id: string) => {
    const found = tours.find((tour) => String(tour.id) === String(id));
    return found;
  };

  const getToursByCategory = (categoryName: string) => {
    // console.log(`getToursByCategory called with: "${categoryName}"`);
    // console.log('Available categories:', categories);
    // console.log('All tours:', tours.map(t => ({ id: t.id, name: t.name, category: t.category })));
    
    // Create a mapping from category name to category ID
    const categoryNameToId = new Map<string, string>();
    const categoryIdToName = new Map<string, string>();
    
    categories.forEach(cat => {
      categoryNameToId.set(cat.name, cat.id);
      categoryIdToName.set(cat.id, cat.name);
    });
    
    // console.log('Category Name to ID mapping:', Object.fromEntries(categoryNameToId));
    // console.log('Category ID to Name mapping:', Object.fromEntries(categoryIdToName));
    
    const filtered = tours.filter((tour) => {
      // Handle both scenarios:
      // 1. Tour has category ID and we're filtering by category name
      // 2. Tour has category name and we're filtering by category name
      
      let match = false;
      
      // Direct name match (for tours that already use category names)
      if (tour.category === categoryName) {
        match = true;
      }
      
      // ID to name mapping (for tours that use category IDs)
      const tourCategoryName = categoryIdToName.get(tour.category);
      if (tourCategoryName === categoryName) {
        match = true;
      }
      
      // Name to ID mapping (fallback case)
      const categoryId = categoryNameToId.get(categoryName);
      if (tour.category === categoryId) {
        match = true;
      }
      
      // console.log(`Tour "${tour.name}" category: "${tour.category}" (resolved to: "${tourCategoryName || tour.category}") - matches "${categoryName}": ${match}`);
      return match;
    });
    
    // console.log(`getToursByCategory result: ${filtered.length} tours found for category "${categoryName}"`);
    return filtered;
  };
  
  const getFeaturedTours = () => {
    // console.log("getFeaturedTours called");
    const featured = tours.filter((tour) => tour.featured);
    // console.log(`getFeaturedTours result: ${featured.length} tours found`);
    return featured;
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

export const useTours = () => {
  const context = useContext(ToursContext);
  if (context === undefined) {
    throw new Error('useTours must be used within a ToursProvider');
  }
  return context;
};
