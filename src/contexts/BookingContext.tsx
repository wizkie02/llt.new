import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useAuth } from './AuthContext';

export interface Booking {
  id: number;
  source: string;
  tourId?: number;
  name?: string;
  price?: number;
  location?: string;
  duration?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  departureDate: string;
  returnDate?: string;
  numberOfTravelers: number;
  travelersArray?: Array<{ firstName?: string; lastName?: string; dateOfBirth?: string; nationality?: string }>;
  specialRequests?: string;
  dietaryRestrictions?: string;
  medicalConditions?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface BookingContextType {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
  fetchBookings: () => Promise<void>;
  addBooking: (booking: Omit<Booking, 'id'>) => Promise<boolean>;
  updateBooking: (id: number, updates: Partial<Booking>) => Promise<boolean>;
  deleteBooking: (id: number) => Promise<boolean>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBookings = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBookings must be used within a BookingProvider');
  }
  return context;
};

interface BookingProviderProps {
  children: ReactNode;
}

export const BookingProvider = ({ children }: BookingProviderProps) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getAuthHeaders } = useAuth();

  // Transform API data to component format
  const transformApiBooking = (apiBooking: any): Booking => {
    // Parse travelers if it's a string
    let travelersArray = [];
    if (apiBooking.travelers && typeof apiBooking.travelers === 'string') {
      try {
        travelersArray = JSON.parse(apiBooking.travelers);
      } catch (e) {
        console.warn('Failed to parse travelers:', apiBooking.travelers);
      }
    }

    return {
      id: parseInt(apiBooking.id),
      source: apiBooking.source || '',
      tourId: apiBooking.tour_id ? parseInt(apiBooking.tour_id) : undefined,
      name: apiBooking.tour_name || '',
      price: apiBooking.tour_price ? parseFloat(apiBooking.tour_price) : undefined,
      location: apiBooking.tour_location || '',
      duration: apiBooking.tour_duration || '',
      firstName: apiBooking.first_name || '',
      lastName: apiBooking.last_name || '',
      email: apiBooking.email || '',
      phone: apiBooking.phone || '',
      address: apiBooking.address || '',
      departureDate: apiBooking.departure_date || '',
      returnDate: apiBooking.return_date || '',
      numberOfTravelers: apiBooking.number_of_travelers ? parseInt(apiBooking.number_of_travelers) : 1,
      travelersArray: travelersArray,
      specialRequests: apiBooking.special_requests || '',
      dietaryRestrictions: apiBooking.dietary_restrictions || '',
      medicalConditions: apiBooking.medical_conditions || '',
      status: apiBooking.status || 'pending',
      createdAt: apiBooking.created_at || '',
      updatedAt: apiBooking.updated_at || ''
    };
  };
  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://leolovestravel.com/api/get-bookings.php', {
        headers: getAuthHeaders(),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch bookings: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Raw API data:', data); // Debug log
      
      // Transform API data to component format
      const transformedBookings = (data.bookings || []).map(transformApiBooking);
      console.log('Transformed bookings:', transformedBookings); // Debug log
      
      setBookings(transformedBookings);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch bookings');
      console.error('Error fetching bookings:', err);
    } finally {
          setLoading(false);
    }
  }, [getAuthHeaders]); // Add getAuthHeaders as dependency
  
  const addBooking = useCallback(async (booking: Omit<Booking, 'id'>): Promise<boolean> => {
    try {
      const response = await fetch('https://leolovestravel.com/api/add-booking.php', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(booking),
      });

      if (!response.ok) {
        throw new Error(`Failed to add booking: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        await fetchBookings(); // Refresh the list
        return true;
      } else {
        throw new Error(result.message || 'Failed to add booking');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add booking');
      console.error('Error adding booking:', err);
      return false;
    }
  }, [getAuthHeaders, fetchBookings]);
    // Transform component data to API format for updates
  const transformToApiFormat = (componentData: Partial<Booking>): any => {
    const apiData: any = {};
    
    // Map camelCase to snake_case
    if (componentData.firstName !== undefined) apiData.first_name = componentData.firstName;
    if (componentData.lastName !== undefined) apiData.last_name = componentData.lastName;
    if (componentData.email !== undefined) apiData.email = componentData.email;
    if (componentData.phone !== undefined) apiData.phone = componentData.phone;
    if (componentData.address !== undefined) apiData.address = componentData.address;
    if (componentData.departureDate !== undefined) apiData.departure_date = componentData.departureDate;
    if (componentData.returnDate !== undefined) apiData.return_date = componentData.returnDate;
    if (componentData.numberOfTravelers !== undefined) apiData.number_of_travelers = componentData.numberOfTravelers;
    if (componentData.specialRequests !== undefined) apiData.special_requests = componentData.specialRequests;
    if (componentData.dietaryRestrictions !== undefined) apiData.dietary_restrictions = componentData.dietaryRestrictions;
    if (componentData.medicalConditions !== undefined) apiData.medical_conditions = componentData.medicalConditions;
    if (componentData.status !== undefined) apiData.status = componentData.status;
    if (componentData.tourId !== undefined) apiData.tour_id = componentData.tourId;
    if (componentData.name !== undefined) apiData.tour_name = componentData.name;
    if (componentData.price !== undefined) apiData.tour_price = componentData.price;
    if (componentData.location !== undefined) apiData.tour_location = componentData.location;
    if (componentData.duration !== undefined) apiData.tour_duration = componentData.duration;
    if (componentData.travelersArray !== undefined) apiData.travelers = JSON.stringify(componentData.travelersArray);
    
    return apiData;
  };
  const updateBooking = useCallback(async (id: number, updates: Partial<Booking>): Promise<boolean> => {
    try {
      // Transform component format to API format
      const apiUpdates = transformToApiFormat(updates);
      console.log('Sending API updates:', { id, ...apiUpdates }); // Debug log
      
      const response = await fetch('https://leolovestravel.com/api/update-booking.php', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ id, ...apiUpdates }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update booking: ${response.status}`);
      }

      const result = await response.json();
      console.log('Update API response:', result); // Debug log
      
      if (result.success) {
        await fetchBookings(); // Refresh the list
        return true;
      } else {
        throw new Error(result.message || 'Failed to update booking');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update booking');
      console.error('Error updating booking:', err);
      return false;
    }
  }, [getAuthHeaders, fetchBookings]);  const deleteBooking = useCallback(async (id: number): Promise<boolean> => {
    try {
      const response = await fetch(`https://leolovestravel.com/api/delete-booking.php?id=${id}`, {
        method: 'POST',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete booking: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        await fetchBookings(); // Refresh the list
        return true;
      } else {
        throw new Error(result.message || 'Failed to delete booking');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete booking');
      console.error('Error deleting booking:', err);
      return false;
    }
  }, [getAuthHeaders, fetchBookings]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const value: BookingContextType = {
    bookings,
    loading,
    error,
    fetchBookings,
    addBooking,
    updateBooking,
    deleteBooking,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};
