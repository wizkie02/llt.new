// ✅ Goal: Replace local state (sessionStorage) with real-time data from your PHP API on CPanel

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

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

  const fetchTours = async () => {
    try {
      const res = await fetch('https://leolovestravel.com/api/get-tours.php');
      const data = await res.json();
      setTours(data);
    } catch (err) {
      console.error('Failed to fetch tours:', err);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const addTour = async (tour: Omit<TourOption, 'id'>) => {
    try {
      await fetch('https://leolovestravel.com/api/add-tour.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tour),
      });
      await fetchTours();
    } catch (err) {
      console.error('Add tour error:', err);
    }
  };

  const updateTour = async (id: string, updatedTour: Partial<TourOption>) => {
    try {
      await fetch(`https://leolovestravel.com/api/update-tour.php?id=${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTour),
      });
      await fetchTours();
    } catch (err) {
      console.error('Update tour error:', err);
    }
  };

  const removeTour = async (id: string) => {
    try {
      await fetch(`https://leolovestravel.com/api/delete-tour.php?id=${id}`, {
        method: 'GET',
      });
      await fetchTours();
    } catch (err) {
      console.error('Delete tour error:', err);
    }
  };

  const getTourById = (id: string) => tours.find((tour) => tour.id === id);
  const getToursByCategory = (category: string) => tours.filter((tour) => tour.category === category);
  const getFeaturedTours = () => tours.filter((tour) => tour.featured);

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
