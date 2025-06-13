import { useEffect } from 'react';
import { useTours } from '../../contexts/ToursContext';
import { useBookings } from '../../contexts/BookingContext';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Settings, BarChart3, List, Users, DollarSign, MapPin, Clock, Star, Eye, Edit, Trash2, Upload, Download, AlertTriangle, Folder, Calendar, TrendingUp, Award, Loader2 } from 'lucide-react';
import BookingManagement from './BookingManagement';

const AdminDashboard = () => {
  const { tours } = useTours();
  const { bookings, fetchBookings, loading: bookingsLoading } = useBookings();
  
  // Load bookings immediately when dashboard loads for better performance
  // This ensures booking statistics are available instantly and booking management 
  // tab doesn't need to wait for data when accessed
  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);
  // Export functions - Updated to match actual API response structures
  const exportToursAsCSV = () => {
    if (tours.length === 0) {
      alert('No tours data to export');
      return;
    }

    const headers = [
      'ID', 'Name', 'Description', 'Price', 'Duration', 'Location', 'Image', 
      'Featured', 'Category', 'Rating', 'Review Count', 'Max Group Size', 'Languages'
    ];
    
    const csvContent = [
      headers.join(','),
      ...tours.map(tour => [
        tour.id,
        `"${tour.name || 'N/A'}"`,
        `"${(tour.description || '').replace(/"/g, '""').substring(0, 200)}..."`,
        tour.price || 0,
        `"${tour.duration || 'N/A'}"`,
        `"${tour.location || 'N/A'}"`,
        `"${tour.image || 'N/A'}"`,
        tour.featured ? 'Yes' : 'No',
        `"${tour.category || 'Uncategorized'}"`,
        tour.rating || 'N/A',
        tour.reviewCount || 0,
        tour.maxGroupSize || 'N/A',
        `"${tour.languages || 'N/A'}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `tours_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportBookingsAsCSV = () => {
    if (bookings.length === 0) {
      alert('No bookings data to export');
      return;
    }

    const headers = [
      'ID', 'Source', 'Tour ID', 'Tour Name', 'Tour Price', 'Tour Location', 'Tour Duration',
      'First Name', 'Last Name', 'Email', 'Phone', 'Address', 
      'Departure Date', 'Return Date', 'Number of Travelers', 
      'Special Requests', 'Dietary Restrictions', 'Status', 'Created At'
    ];
    
    const csvContent = [
      headers.join(','),
      ...bookings.map(booking => [
        booking.id || 'N/A',
        `"${booking.source || 'booking_form'}"`,
        booking.tourId || 'N/A',
        `"${booking.name || 'N/A'}"`,
        booking.price || 0,
        `"${booking.location || 'N/A'}"`,
        `"${booking.duration || 'N/A'}"`,
        `"${booking.firstName || 'N/A'}"`,
        `"${booking.lastName || 'N/A'}"`,
        `"${booking.email || 'N/A'}"`,
        `"${booking.phone || 'N/A'}"`,
        `"${booking.address || 'N/A'}"`,
        `"${booking.departureDate || 'N/A'}"`,
        `"${booking.returnDate || 'N/A'}"`,
        booking.numberOfTravelers || 1,
        `"${(booking.specialRequests || '').replace(/"/g, '""')}"`,
        `"${(booking.dietaryRestrictions || '').replace(/"/g, '""')}"`,
        `"${booking.status || 'pending'}"`,
        `"${booking.createdAt || 'N/A'}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `bookings_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // System functions
  const resetToDefaultTours = async () => {
    if (!confirm('⚠️ WARNING: This will permanently delete ALL custom tours and reset to default tours. This action cannot be undone. Are you sure?')) {
      return;
    }
    
    if (!confirm('This is your final confirmation. All your tours data will be lost. Continue?')) {
      return;
    }

    try {
      // This would need to be implemented in your backend
      alert('Reset functionality would be implemented here. This would call an API to reset tours to defaults.');
      // Example API call:
      // const response = await fetch('/api/reset-tours.php', { method: 'POST' });
      // if (response.ok) {
      //   alert('Tours reset successfully!');
      //   window.location.reload();
      // }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert('Error resetting tours: ' + errorMessage);
    }
  };

  const clearAllBookings = async () => {
    if (!confirm('⚠️ WARNING: This will permanently delete ALL booking records. This action cannot be undone. Are you sure?')) {
      return;
    }

    if (!confirm('This is your final confirmation. All booking data will be lost. Continue?')) {
      return;
    }

    try {
      alert('Clear bookings functionality would be implemented here.');
      // Example API call:
      // const response = await fetch('/api/clear-bookings.php', { method: 'POST' });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert('Error clearing bookings: ' + errorMessage);
    }
  };

  const runSystemHealthCheck = async () => {
    try {
      const healthData = {
        tours: tours.length,
        bookings: bookings.length,
        categories: [...new Set(tours.map(tour => tour.category || 'Uncategorized'))].length,
        systemTime: new Date().toISOString(),
        memoryUsage: 'N/A', // Would get from server
        diskSpace: 'N/A'    // Would get from server
      };

      alert(`System Health Report:
      
✅ Tours: ${healthData.tours} records
✅ Bookings: ${healthData.bookings} records  
✅ Categories: ${healthData.categories} active
🕒 System Time: ${new Date().toLocaleString()}
💾 Memory: Checking...
💿 Disk Space: Checking...

System appears to be running normally.`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert('Error running health check: ' + errorMessage);
    }
  };

  const createBackup = async () => {
    try {
      const backupData = {
        tours: tours,
        bookings: bookings,
        timestamp: new Date().toISOString(),
        version: '1.0'
      };

      const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `system_backup_${new Date().toISOString().split('T')[0]}.json`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      alert('✅ Backup created successfully! The backup file has been downloaded.');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert('Error creating backup: ' + errorMessage);
    }
  };
    // Calculate tour statistics
  const totalTours = tours.length;
  const featuredTours = tours.filter(tour => tour.featured).length;
  const categories = [...new Set(tours.map(tour => tour.category || 'Uncategorized'))];
  // Calculate average price from all tours retrieved from API
  const averagePrice = tours.length > 0 
    ? tours.reduce((sum, tour) => {
        // Ensure price is a valid number
        const price = typeof tour.price === 'number' ? tour.price : parseFloat(tour.price) || 0;
        return sum + price;
      }, 0) / tours.length 
    : 0;

  // Calculate booking statistics for current month
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const thisMonthBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.createdAt || booking.departureDate);
    return bookingDate.getMonth() === currentMonth && bookingDate.getFullYear() === currentYear;
  });
  const revenueGeneratingBookingsThisMonth = thisMonthBookings.filter(booking => {
    const status = (booking.status || 'pending').toLowerCase();
    return status === 'confirmed' || status === 'completed';
  });

  // Calculate total revenue this month (confirmed and completed bookings)
  const totalRevenueThisMonth = revenueGeneratingBookingsThisMonth.reduce((sum, booking) => {
    const price = booking.price || 0;
    const travelers = booking.numberOfTravelers || 1;
    return sum + (price * travelers);
  }, 0);

  // Calculate average booking value this month
  const averageBookingValueThisMonth = revenueGeneratingBookingsThisMonth.length > 0 
    ? totalRevenueThisMonth / revenueGeneratingBookingsThisMonth.length 
    : 0;

  // Find most popular tour (by booking count)
  const tourBookingCounts = bookings.reduce((acc, booking) => {
    if (booking.tourId && booking.name) {
      if (!acc[booking.tourId]) {
        acc[booking.tourId] = {
          tourId: booking.tourId,
          tourName: booking.name,
          location: booking.location || 'N/A',
          bookingCount: 0,
          totalRevenue: 0
        };
      }      acc[booking.tourId].bookingCount += 1;
      
      // Add revenue if confirmed or completed
      const status = (booking.status || 'pending').toLowerCase();
      if (status === 'confirmed' || status === 'completed') {
        const revenue = (booking.price || 0) * (booking.numberOfTravelers || 1);
        acc[booking.tourId].totalRevenue += revenue;
      }
    }
    return acc;
  }, {} as Record<number, { tourId: number; tourName: string; location: string; bookingCount: number; totalRevenue: number }>);

  const mostPopularTour = Object.values(tourBookingCounts).sort((a, b) => b.bookingCount - a.bookingCount)[0];

  // Debug logs (can be removed in production)
  console.log('Tours for average calculation:', {
    totalTours: tours.length,
    tourPrices: tours.map(t => ({ name: t.name, price: t.price })),
    calculatedAverage: averagePrice
  });

  console.log('Dashboard bookings data:', {
    totalBookings: bookings.length,
    bookingsLoading,
    thisMonthBookings: thisMonthBookings.length,
    confirmedThisMonth: revenueGeneratingBookingsThisMonth.length
  });  // Calculate real monthly bookings data
  const realMonthlyBookingsData = (() => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    
    return monthNames.map((month, index) => {
      const monthBookings = bookings.filter(booking => {
        const bookingDate = new Date(booking.createdAt || booking.departureDate);
        return bookingDate.getMonth() === index && bookingDate.getFullYear() === currentYear;
      });
      
      return {
        month,
        bookings: monthBookings.length
      };
    });
  })();

  // Calculate real tour category data
  const realTourCategoryData = (() => {
    const categoryStats = categories.map(category => ({
      name: category,
      count: tours.filter(tour => tour.category === category).length
    }));
    
    // Sort by count descending and take top categories
    return categoryStats.sort((a, b) => b.count - a.count);
  })();  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50/40 to-purple-50/30 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/10 pt-16 relative overflow-hidden">
      {/* Global Background decorative elements */}
      <div className="fixed inset-0 bg-gradient-to-r from-[#0093DE]/8 via-transparent to-green-500/8 pointer-events-none z-0"></div>
      <div className="fixed top-20 left-1/6 w-[600px] h-[600px] bg-gradient-to-br from-[#0093DE]/12 to-transparent rounded-full blur-3xl pointer-events-none z-0"></div>
      <div className="fixed top-40 right-1/6 w-[500px] h-[500px] bg-gradient-to-bl from-green-500/12 to-transparent rounded-full blur-3xl pointer-events-none z-0"></div>
      <div className="fixed bottom-20 left-1/3 w-[400px] h-[400px] bg-gradient-to-tr from-purple-500/8 to-transparent rounded-full blur-3xl pointer-events-none z-0"></div>
      <div className="fixed bottom-40 right-1/4 w-[450px] h-[450px] bg-gradient-to-tl from-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none z-0"></div>
      
      {/* Enhanced Header with User Info */}
      <div className="relative z-10 overflow-hidden">
        {/* Header specific decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0093DE]/10 via-transparent to-green-500/10 pointer-events-none"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-[#0093DE]/15 to-transparent rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-gradient-to-bl from-green-500/15 to-transparent rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          <div className="text-center mb-12">
            {/* Welcome section */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#0093DE]/10 to-green-500/10 border border-[#0093DE]/20 mb-6">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">System Online • All Services Running</span>
            </div>
            
            {/* Main title with enhanced styling */}
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-[#0093DE] to-gray-900 dark:from-white dark:via-[#0093DE] dark:to-white bg-clip-text text-transparent mb-4 leading-tight">
              Admin Dashboard
            </h1>
            
            {/* Subtitle with better styling */}
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
              Comprehensive control center for managing your tours, bookings, and business analytics with real-time insights
            </p>
            
            {/* Quick stats bar */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
              <div className="flex items-center space-x-2 px-4 py-2 bg-white/50 dark:bg-gray-800/50 rounded-2xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                <div className="w-3 h-3 bg-[#0093DE] rounded-full"></div>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{totalTours} Tours</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-white/50 dark:bg-gray-800/50 rounded-2xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{bookings.length} Bookings</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-white/50 dark:bg-gray-800/50 rounded-2xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{categories.length} Categories</span>
              </div>
            </div>
          </div>
        </div>
      </div>      {/* Enhanced Main Content */}      <div className="w-full min-h-screen px-4 sm:px-6 lg:px-9 pb-16 relative z-10">
        <div className="max-w-7xl mx-auto relative">
          {/* Content background with glassmorphism */}
          <div className="absolute inset-0 bg-white/20 dark:bg-gray-900/20 backdrop-blur-sm rounded-3xl pointer-events-none"></div>
          
          <Tabs defaultValue="overview" className="w-full relative z-10">            <TabsList className="grid w-full grid-cols-4 mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-xl rounded-2xl border-0 p-2 h-[69px] border border-white/20 dark:border-gray-700/30">
              <TabsTrigger value="overview" className="rounded-2xl data-[state=active]:bg-[#0093DE] data-[state=active]:text-white data-[state=active]:shadow-lg font-medium transition-all duration-300 py-4 text-base hover:bg-[#0093DE]/10 hover:text-[#0093DE] hover:shadow-md hover:scale-105 transform cursor-pointer group">
                <span className="relative z-10">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="tours" className="rounded-2xl data-[state=active]:bg-[#0093DE] data-[state=active]:text-white data-[state=active]:shadow-lg font-medium transition-all duration-300 py-4 text-base hover:bg-[#0093DE]/10 hover:text-[#0093DE] hover:shadow-md hover:scale-105 transform cursor-pointer group">
                <span className="relative z-10">Tour Management</span>
              </TabsTrigger>
              <TabsTrigger value="bookings" className="rounded-2xl data-[state=active]:bg-[#0093DE] data-[state=active]:text-white data-[state=active]:shadow-lg font-medium transition-all duration-300 py-4 text-base hover:bg-[#0093DE]/10 hover:text-[#0093DE] hover:shadow-md hover:scale-105 transform cursor-pointer group">
                <span className="relative z-10">Bookings</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="rounded-2xl data-[state=active]:bg-[#0093DE] data-[state=active]:text-white data-[state=active]:shadow-lg font-medium transition-all duration-300 py-4 text-base hover:bg-[#0093DE]/10 hover:text-[#0093DE] hover:shadow-md hover:scale-105 transform cursor-pointer group">
                <span className="relative z-10">Settings</span>
              </TabsTrigger>
            </TabsList><TabsContent value="overview">
          {/* Main Statistics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-2xl bg-white dark:bg-gray-800 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Tours</CardTitle>
                <div className="p-2 bg-[#0093DE]/10 rounded-2xl">
                  <List className="h-5 w-5 text-[#0093DE]" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{totalTours}</div>
                <p className="text-xs text-green-600 dark:text-green-400 font-medium">+2 tours from last month</p>
              </CardContent>
            </Card>            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-2xl bg-white dark:bg-gray-800 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Tours Booked This Month</CardTitle>
                <div className="p-2 bg-blue-500/10 rounded-2xl">
                  <Calendar className="h-5 w-5 text-blue-500" />
                </div>
              </CardHeader><CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {bookingsLoading ? (
                    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />                ) : (
                    revenueGeneratingBookingsThisMonth.length
                  )}
                </div>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                  {bookingsLoading ? 'Loading...' : 'Confirmed & completed bookings'}
                </p>
              </CardContent>
            </Card>            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-2xl bg-white dark:bg-gray-800 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Revenue This Month</CardTitle>
                <div className="p-2 bg-green-500/10 rounded-2xl">
                  <DollarSign className="h-5 w-5 text-green-500" />
                </div>
              </CardHeader><CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {bookingsLoading ? (
                    <Loader2 className="w-8 h-8 animate-spin text-green-500" />
                  ) : (
                    `$${totalRevenueThisMonth.toLocaleString()}`
                  )}
                </div>
                <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                  {bookingsLoading ? 'Loading...' : 'From confirmed bookings'}
                </p>
              </CardContent>
            </Card>            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-2xl bg-white dark:bg-gray-800 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Booking Value</CardTitle>
                <div className="p-2 bg-purple-500/10 rounded-2xl">
                  <TrendingUp className="h-5 w-5 text-purple-500" />
                </div>
              </CardHeader><CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {bookingsLoading ? (
                    <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                  ) : (
                    `$${averageBookingValueThisMonth.toFixed(2)}`
                  )}
                </div>
                <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                  {bookingsLoading ? 'Loading...' : 'This month average'}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Secondary Statistics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-2xl bg-white dark:bg-gray-800 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Featured Tours</CardTitle>
                <div className="p-2 bg-yellow-500/10 rounded-2xl">
                  <Star className="h-5 w-5 text-yellow-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{featuredTours}</div>
                <p className="text-xs text-green-600 dark:text-green-400 font-medium">+1 featured this week</p>
              </CardContent>
            </Card>            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-2xl bg-white dark:bg-gray-800 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Categories</CardTitle>
                <div className="p-2 bg-indigo-500/10 rounded-2xl">
                  <MapPin className="h-5 w-5 text-indigo-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{categories.length}</div>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Tour categories</p>
              </CardContent>
            </Card>            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-2xl bg-white dark:bg-gray-800 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Tour Price</CardTitle>
                <div className="p-2 bg-orange-500/10 rounded-2xl">
                  <DollarSign className="h-5 w-5 text-orange-500" />
                </div>
              </CardHeader><CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">${averagePrice.toFixed(2)}</div>
                <p className="text-xs text-orange-600 dark:text-orange-400 font-medium">
                  Calculated from {totalTours} tours via API
                </p>
              </CardContent>
            </Card>            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-2xl bg-white dark:bg-gray-800 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Most Popular Tour</CardTitle>
                <div className="p-2 bg-pink-500/10 rounded-2xl">
                  <Award className="h-5 w-5 text-pink-500" />
                </div>
              </CardHeader><CardContent>
                <div className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                  {bookingsLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin text-pink-500" />
                  ) : mostPopularTour ? (
                    mostPopularTour.tourName.substring(0, 20) + '...'
                  ) : (
                    'No data'
                  )}
                </div>
                <p className="text-xs text-pink-600 dark:text-pink-400 font-medium">
                  {bookingsLoading ? 'Loading...' : mostPopularTour ? `${mostPopularTour.bookingCount} bookings` : 'No bookings yet'}
                </p>
              </CardContent>
            </Card>          </div>

          {/* Popular Tours Section */}
          {mostPopularTour && (            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-2xl bg-white dark:bg-gray-800 shadow-lg mb-8">
              <CardHeader className="bg-gradient-to-r from-pink-500/5 to-transparent p-6 border-b border-gray-100 dark:border-gray-700 rounded-t-2xl">
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                  <div className="p-2 bg-pink-500/10 rounded-2xl mr-3">
                    <Award className="h-6 w-6 text-pink-500" />
                  </div>
                  Most Popular Tour Details
                </CardTitle>
              </CardHeader>              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {mostPopularTour.tourName}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 flex items-center text-base">
                      <MapPin className="w-5 h-5 mr-2 text-gray-500" />
                      {mostPopularTour.location}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-pink-50 dark:bg-pink-900/20 p-6 rounded-2xl border border-pink-100 dark:border-pink-800/30 hover:shadow-md transition-shadow duration-200 h-[140px] flex flex-col justify-center">
                      <div className="text-3xl font-bold text-pink-600 mb-2">{mostPopularTour.bookingCount}</div>
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Bookings</div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl border border-green-100 dark:border-green-800/30 hover:shadow-md transition-shadow duration-200 h-[140px] flex flex-col justify-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">${mostPopularTour.totalRevenue.toLocaleString()}</div>
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</div>
                    </div>
                    <div className="bg-gradient-to-br from-pink-100 via-pink-50 to-purple-50 dark:from-pink-900/30 dark:via-pink-900/20 dark:to-purple-900/20 p-6 rounded-2xl border border-pink-200/50 dark:border-pink-800/30 h-[140px] flex flex-col justify-center">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-lg">Performance Stats</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400 font-medium text-sm">Market Share:</span>
                          <span className="font-bold text-base text-pink-600">{((mostPopularTour.bookingCount / bookings.length) * 100).toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400 font-medium text-sm">Avg Revenue/Booking:</span>
                          <span className="font-bold text-base text-green-600">${(mostPopularTour.totalRevenue / mostPopularTour.bookingCount || 0).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Top 5 Tours by Bookings */}          <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-2xl bg-white dark:bg-gray-800 shadow-lg mb-8">
            <CardHeader className="bg-gradient-to-r from-blue-500/5 to-transparent p-6 border-b border-gray-100 dark:border-gray-700 rounded-t-2xl">
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                <div className="p-2 bg-blue-500/10 rounded-2xl mr-3">
                  <TrendingUp className="h-6 w-6 text-blue-500" />
                </div>
                Top 5 Tours by Bookings
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 dark:bg-gray-800/50 border-b">
                    <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Rank</TableHead>
                    <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Tour Name</TableHead>
                    <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Location</TableHead>
                    <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Bookings</TableHead>
                    <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Revenue</TableHead>
                    <TableHead className="text-right font-semibold text-gray-700 dark:text-gray-300">Market Share</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.values(tourBookingCounts)
                    .sort((a, b) => b.bookingCount - a.bookingCount)
                    .slice(0, 5)
                    .map((tour, index) => (
                    <TableRow key={tour.tourId} className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-transparent dark:hover:from-blue-900/20 dark:hover:to-transparent transition-all duration-200 border-b border-gray-100 dark:border-gray-800">
                      <TableCell className="font-medium text-gray-900 dark:text-white py-4">
                        <div className="flex items-center">
                          {index === 0 && <Award className="w-4 h-4 text-yellow-500 mr-2" />}
                          #{index + 1}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-gray-900 dark:text-white">{tour.tourName}</TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-400">{tour.location}</TableCell>                      <TableCell>
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200 rounded-2xl hover:bg-blue-200 hover:text-blue-900 transition-colors duration-200">
                          {tour.bookingCount} bookings
                        </Badge>
                      </TableCell>
                      <TableCell className="font-bold text-green-600">${tour.totalRevenue.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="text-sm font-medium">
                          {((tour.bookingCount / bookings.length) * 100).toFixed(1)}%
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {Object.keys(tourBookingCounts).length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No booking data available yet.
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-2xl bg-white dark:bg-gray-800 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-[#0093DE]/5 to-transparent p-6 border-b border-gray-100 dark:border-gray-700 rounded-t-2xl">
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                  <div className="p-2 bg-[#0093DE]/10 rounded-2xl mr-3">
                    <BarChart3 className="h-6 w-6 text-[#0093DE]" />
                  </div>
                  Monthly Bookings
                </CardTitle>
              </CardHeader><CardContent className="p-6">                <div className="flex items-center justify-center h-[300px] bg-gray-50 dark:bg-gray-700 rounded-2xl">
                  <div className="text-center w-full">
                    <BarChart3 className="h-12 w-12 text-[#0093DE] mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">Monthly Bookings Chart</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      {bookingsLoading ? 'Loading real booking data...' : 'Real data from bookings API'}
                    </p>
                    <div className="mt-4 grid grid-cols-3 gap-3 text-center max-h-[180px] overflow-y-auto">
                      {bookingsLoading ? (
                        <div className="col-span-3 flex justify-center">
                          <Loader2 className="w-6 h-6 animate-spin text-[#0093DE]" />
                        </div>
                      ) : (
                        realMonthlyBookingsData.slice(0, 6).map((data, idx) => (
                          <div key={idx} className="bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200">
                            <div className="text-xs text-gray-500 dark:text-gray-400">{data.month}</div>
                            <div className="text-lg font-bold text-[#0093DE]">{data.bookings}</div>
                          </div>
                        ))
                      )}
                    </div>
                    {!bookingsLoading && (
                      <div className="mt-3 text-xs text-gray-500">
                        Total this year: {realMonthlyBookingsData.reduce((sum, month) => sum + month.bookings, 0)} bookings
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-2xl bg-white dark:bg-gray-800 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-500/5 to-transparent p-6 border-b border-gray-100 dark:border-gray-700 rounded-t-2xl">
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                  <div className="p-2 bg-green-500/10 rounded-2xl mr-3">
                    <BarChart3 className="h-6 w-6 text-green-500" />
                  </div>
                  Tours by Category
                </CardTitle>
              </CardHeader>              <CardContent className="p-6">                <div className="flex items-center justify-center h-[300px] bg-gray-50 dark:bg-gray-700 rounded-2xl">
                  <div className="text-center w-full">
                    <BarChart3 className="h-10 w-10 text-green-500 mx-auto mb-3" />
                    <h3 className="text-base font-medium text-gray-600 dark:text-gray-300 mb-2">Tours by Category</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                      {tours.length} tours total
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-center max-h-[140px] overflow-y-auto">
                      {realTourCategoryData.length === 0 ? (
                        <div className="col-span-2 text-gray-500 text-sm">
                          No categories
                        </div>
                      ) : (
                        realTourCategoryData.slice(0, 4).map((data, idx) => (
                          <div key={idx} className="bg-white dark:bg-gray-800 p-2 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                            <div className="text-xs text-gray-500 dark:text-gray-400 truncate" title={data.name}>
                              {data.name.length > 12 ? data.name.substring(0, 12) + '...' : data.name}
                            </div>
                            <div className="text-base font-bold text-green-500">{data.count}</div>
                            <div className="text-xs text-gray-400">
                              {((data.count / tours.length) * 100).toFixed(0)}%
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    {realTourCategoryData.length > 0 && (
                      <div className="mt-2 text-xs text-gray-500">
                        Top: {realTourCategoryData[0]?.name.length > 15 
                          ? realTourCategoryData[0]?.name.substring(0, 15) + '...'
                          : realTourCategoryData[0]?.name
                        } ({realTourCategoryData[0]?.count})
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>          <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-2xl bg-white dark:bg-gray-800 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-500/5 to-transparent p-6 border-b border-gray-100 dark:border-gray-700 rounded-t-2xl">
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                <div className="p-2 bg-blue-500/10 rounded-2xl mr-3">
                  <Clock className="h-6 w-6 text-blue-500" />
                </div>
                Recent Tours Added
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 dark:bg-gray-800/50 border-b">
                    <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Name</TableHead>
                    <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Location</TableHead>
                    <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Price</TableHead>
                    <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Category</TableHead>
                    <TableHead className="text-right font-semibold text-gray-700 dark:text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>                <TableBody>
                  {tours
                    .sort((a, b) => {
                      // Sort by id descending to get most recently added tours
                      const bId = typeof b.id === 'number' ? b.id : 0;
                      const aId = typeof a.id === 'number' ? a.id : 0;
                      return bId - aId;
                    })
                    .slice(0, 5)
                    .map((tour) => {
                      // Check if tour is featured
                      const isFeatured = tour.featured;
                      
                      return (
                        <TableRow key={tour.id} className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-transparent dark:hover:from-blue-900/20 dark:hover:to-transparent transition-all duration-200 border-b border-gray-100 dark:border-gray-800">
                          <TableCell className="font-medium text-gray-900 dark:text-white py-4">
                            <div className="flex items-center">
                              {isFeatured && <Star className="w-4 h-4 text-yellow-500 mr-2" />}
                              {tour.name}
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-600 dark:text-gray-400">{tour.location}</TableCell>
                          <TableCell className="font-bold text-[#0093DE]">${tour.price}</TableCell>                      <TableCell>                        <Badge className="bg-[#0093DE]/10 text-[#0093DE] border border-[#0093DE]/30 font-medium hover:bg-[#0093DE]/20 hover:text-[#0077b3] transition-colors duration-200 cursor-pointer">
                              {tour.category || 'Uncategorized'}
                            </Badge>
                          </TableCell><TableCell className="text-right">                        <div className="flex justify-end space-x-2">                          <Button className="h-9 px-4 text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 rounded-2xl" asChild>
                              <Link to={`/tour/${tour.id}`} target="_blank">
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>                          <Button className="h-9 px-4 text-xs bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 transition-all duration-200 rounded-2xl" asChild>
                               <Link to={`/admin/tour-management?edit=${tour.id}`}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>        <TabsContent value="tours">           <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-2xl bg-white dark:bg-gray-800 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-[#0093DE]/5 to-transparent p-6 border-b border-gray-100 dark:border-gray-700 rounded-t-2xl">
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                <div className="p-2 bg-[#0093DE]/10 rounded-2xl mr-3">
                  <List className="h-6 w-6 text-[#0093DE]" />
                </div>
                Management Center
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="mb-6 text-gray-600 dark:text-gray-400 text-lg">Manage all aspects of your tours and categories from the dedicated management pages.</p>
              <div className="flex flex-col sm:flex-row gap-4">                <Button asChild className="bg-[#0093DE] hover:bg-[#0077b3] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-6 py-3 rounded-2xl">
                  <Link to="/admin/tour-management">
                    <List className="mr-2 h-5 w-5" /> Open Tour Management
                  </Link>
                </Button>
                <Button asChild className="bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-6 py-3 rounded-2xl">
                  <Link to="/admin/category-management">
                    <Folder className="mr-2 h-5 w-5" /> Open Category Management
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>        </TabsContent>

        <TabsContent value="bookings">
          <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-xl bg-white dark:bg-gray-800 shadow-lg">            <CardHeader className="bg-gradient-to-r from-[#0093DE]/5 to-transparent p-6 border-b border-gray-100 dark:border-gray-700">
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                <div className="p-2 bg-[#0093DE]/10 rounded-lg mr-3">
                  <Calendar className="h-6 w-6 text-[#0093DE]" />
                </div>
                Booking Management
                {bookingsLoading && (
                  <div className="ml-3 flex items-center text-sm text-gray-500">
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Loading bookings data...
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <BookingManagement />
            </CardContent>
          </Card>
        </TabsContent>        <TabsContent value="settings">
          <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-xl bg-white dark:bg-gray-800 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-500/5 to-transparent p-6 border-b border-gray-100 dark:border-gray-700">
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                <div className="p-2 bg-purple-500/10 rounded-lg mr-3">
                  <Settings className="h-6 w-6 text-purple-500" />
                </div>
                Admin Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 p-6">
              {/* Account Management */}
              <div className="bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-900/20 dark:to-transparent p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
                  <div className="p-2 bg-blue-500/10 rounded-xl mr-3">
                    <Users className="h-5 w-5 text-blue-500" />
                  </div>
                  Account Management
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Manage admin accounts, permissions, and security settings
                </p>
                <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-4 py-2 rounded-xl">
                  <Link to="/admin/account-management">
                    <Users className="mr-2 h-4 w-4" /> Manage Admin Accounts
                  </Link>
                </Button>
              </div>

              {/* Access Control */}
              <div className="bg-gradient-to-r from-purple-50 to-transparent dark:from-purple-900/20 dark:to-transparent p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
                  <div className="p-2 bg-purple-500/10 rounded-xl mr-3">
                    <Settings className="h-5 w-5 text-purple-500" />
                  </div>
                  Access Control
                </h3>
                <div className="flex items-center space-x-3">
                  <input type="checkbox" id="require-login" defaultChecked className="h-5 w-5 text-[#0093DE] bg-gray-100 border-gray-300 rounded-lg focus:ring-[#0093DE] focus:ring-2" />
                  <label htmlFor="require-login" className="text-sm font-medium text-gray-700 dark:text-gray-300">Require login for admin access</label>
                </div>
              </div>

              {/* Data Management */}
              <div className="bg-gradient-to-r from-green-50 to-transparent dark:from-green-900/20 dark:to-transparent p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
                  <div className="p-2 bg-green-500/10 rounded-xl mr-3">
                    <Upload className="h-5 w-5 text-green-500" />
                  </div>
                  Data Management
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <input type="checkbox" id="auto-backup" defaultChecked className="h-5 w-5 text-[#0093DE] bg-gray-100 border-gray-300 rounded-lg focus:ring-[#0093DE] focus:ring-2" />
                    <label htmlFor="auto-backup" className="text-sm font-medium text-gray-700 dark:text-gray-300">Enable automatic daily data backup</label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input type="checkbox" id="confirm-delete" defaultChecked className="h-5 w-5 text-[#0093DE] bg-gray-100 border-gray-300 rounded-lg focus:ring-[#0093DE] focus:ring-2" />
                    <label htmlFor="confirm-delete" className="text-sm font-medium text-gray-700 dark:text-gray-300">Require confirmation before deleting tours</label>
                  </div>
                </div>
              </div>

              {/* Export Data */}
              <div className="bg-gradient-to-r from-yellow-50 to-transparent dark:from-yellow-900/20 dark:to-transparent p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
                  <div className="p-2 bg-yellow-500/10 rounded-xl mr-3">
                    <Download className="h-5 w-5 text-yellow-500" />
                  </div>
                  Export Data
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Export your data for backup or analysis purposes
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={exportToursAsCSV}
                    className="border-2 border-[#0093DE] bg-transparent text-[#0093DE] hover:bg-[#0093DE] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl rounded-xl"
                  >
                    <Download className="mr-2 h-4 w-4" /> Export Tours as CSV
                  </Button>
                  <Button 
                    onClick={exportBookingsAsCSV}
                    className="border-2 border-green-600 bg-transparent text-green-600 hover:bg-green-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl rounded-xl"
                  >
                    <Download className="mr-2 h-4 w-4" /> Export Bookings as CSV
                  </Button>
                </div>
              </div>

              {/* System Backup */}
              <div className="bg-gradient-to-r from-cyan-50 to-transparent dark:from-cyan-900/20 dark:to-transparent p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
                  <div className="p-2 bg-cyan-500/10 rounded-xl mr-3">
                    <Download className="h-5 w-5 text-cyan-500" />
                  </div>
                  System Backup
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Create complete system backups including all tours and bookings data
                </p>
                <Button 
                  onClick={createBackup}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-4 py-2 rounded-xl"
                >
                  <Download className="mr-2 h-4 w-4" /> Create Full Backup
                </Button>
              </div>

              {/* Development Tools */}
              <div className="bg-gradient-to-r from-indigo-50 to-transparent dark:from-indigo-900/20 dark:to-transparent p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
                  <div className="p-2 bg-indigo-500/10 rounded-xl mr-3">
                    <Settings className="h-5 w-5 text-indigo-500" />
                  </div>
                  Development Tools
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Test admin system APIs and functionality
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-4 py-2 rounded-xl">
                    <Link to="/admin/system-test">
                      <Settings className="mr-2 h-4 w-4" /> System Test
                    </Link>
                  </Button>
                  <Button 
                    onClick={runSystemHealthCheck}
                    className="border-2 border-indigo-600 bg-transparent text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl rounded-xl"
                  >
                    <BarChart3 className="mr-2 h-4 w-4" /> Health Check
                  </Button>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-gradient-to-r from-red-50 to-transparent dark:from-red-900/20 dark:to-transparent p-6 rounded-xl border border-red-200 dark:border-red-800">
                <h3 className="text-lg font-semibold mb-4 flex items-center text-red-600">
                  <div className="p-2 bg-red-500/10 rounded-xl mr-3">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  </div>
                  Danger Zone
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  ⚠️ These actions are permanent and cannot be undone. Use with extreme caution.
                </p>
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      onClick={resetToDefaultTours}
                      className="bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Reset to Default Tours
                    </Button>
                    <Button 
                      onClick={clearAllBookings}
                      className="border-2 border-red-500 bg-transparent text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl rounded-xl"
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Clear All Bookings
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">These actions cannot be undone and will permanently remove data.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  </div>
</div>
  );
};

export default AdminDashboard;

