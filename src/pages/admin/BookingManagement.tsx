import { useState, useEffect } from 'react';
import { useBookings } from '../../contexts/BookingContext';
import { useTours } from '../../contexts/ToursContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../../components/ui/alert-dialog';
import { Calendar, Users, Mail, Phone, MapPin, Clock, Edit, Trash2, Eye, Loader2, AlertCircle, CheckCircle, XCircle, ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { format } from 'date-fns';
import type { Booking } from '../../contexts/BookingContext';

const BookingManagement = () => {
  const { bookings, loading, error, fetchBookings, updateBooking, deleteBooking } = useBookings();
  const { tours } = useTours();  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);  const [editForm, setEditForm] = useState<Partial<Booking>>({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [editingStatusId, setEditingStatusId] = useState<number | null>(null);
  const [updatingStatusId, setUpdatingStatusId] = useState<number | null>(null);
    useEffect(() => {
    fetchBookings();
  }, []);

  // Close status dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (editingStatusId !== null) {
        const target = event.target as Element;
        if (!target.closest('[data-radix-collection-item]') && !target.closest('button[role="combobox"]')) {
          setEditingStatusId(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editingStatusId]);// Helper function to format date for input fields
  const formatDateForInput = (dateString: string | undefined): string => {
    if (!dateString) return '';
    
    try {
      // Handle various date formats
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      
      // Format as YYYY-MM-DD for date input
      return date.toISOString().split('T')[0];
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };
  // Populate edit form when selectedBooking changes
  useEffect(() => {
    if (selectedBooking && isEditDialogOpen) {
      setEditForm({
        // Customer Information
        firstName: selectedBooking.firstName || '',
        lastName: selectedBooking.lastName || '',
        email: selectedBooking.email || '',
        phone: selectedBooking.phone || '',
        address: selectedBooking.address || '',
        
        // Tour Information
        tourId: selectedBooking.tourId || undefined,
        name: selectedBooking.name || '',
        price: selectedBooking.price || undefined,
        location: selectedBooking.location || '',
        duration: selectedBooking.duration || '',
        
        // Travel Details
        departureDate: formatDateForInput(selectedBooking.departureDate),
        returnDate: formatDateForInput(selectedBooking.returnDate),
        numberOfTravelers: selectedBooking.numberOfTravelers || 1,
        
        // Traveler Information
        travelersArray: selectedBooking.travelersArray || [],
        
        // Special Requirements
        specialRequests: selectedBooking.specialRequests || '',
        dietaryRestrictions: selectedBooking.dietaryRestrictions || '',
        
        // Booking Status
        status: selectedBooking.status || 'pending',
      });
    }
  }, [selectedBooking, isEditDialogOpen]);const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      (booking.firstName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (booking.lastName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (booking.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (booking.phone || '').includes(searchTerm) ||
      (booking.name && booking.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || (booking.status || 'pending') === statusFilter;
    
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    if (!sortField) return 0;

    let aValue: any = '';
    let bValue: any = '';

    switch (sortField) {
      case 'guest':
        aValue = `${a.firstName || ''} ${a.lastName || ''}`.trim().toLowerCase();
        bValue = `${b.firstName || ''} ${b.lastName || ''}`.trim().toLowerCase();
        break;
      case 'tour':
        aValue = (a.name || '').toLowerCase();
        bValue = (b.name || '').toLowerCase();
        break;
      case 'price':
        aValue = a.price || 0;
        bValue = b.price || 0;
        break;
      case 'email':
        aValue = (a.email || '').toLowerCase();
        bValue = (b.email || '').toLowerCase();
        break;
      case 'phone':
        aValue = a.phone || '';
        bValue = b.phone || '';
        break;
      case 'departureDate':
        aValue = a.departureDate ? new Date(a.departureDate).getTime() : 0;
        bValue = b.departureDate ? new Date(b.departureDate).getTime() : 0;
        break;
      case 'travelers':
        aValue = a.numberOfTravelers || 0;
        bValue = b.numberOfTravelers || 0;
        break;
      case 'status':
        aValue = (a.status || 'pending').toLowerCase();
        bValue = (b.status || 'pending').toLowerCase();
        break;
      default:
        return 0;
    }

    // Handle different data types
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      const result = aValue.localeCompare(bValue);
      return sortDirection === 'asc' ? result : -result;
    } else {
      const result = aValue - bValue;
      return sortDirection === 'asc' ? result : -result;
    }
  });

  // Handle sorting
  const handleSort = (field: string) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field with ascending direction
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Get sort icon for table headers
  const getSortIcon = (field: string) => {
    if (sortField !== field) {
      return <ChevronsUpDown className="w-4 h-4 text-gray-400" />;
    }
    return sortDirection === 'asc' 
      ? <ChevronUp className="w-4 h-4 text-[#0093DE]" />
      : <ChevronDown className="w-4 h-4 text-[#0093DE]" />;
  };

  const handleEditBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsEditDialogOpen(true);
  };  // Handle tour selection in edit form
  const handleTourSelection = (tourId: string) => {
    if (tourId === "custom") {
      // Clear tour information for manual entry
      setEditForm(prev => ({
        ...prev,
        tourId: undefined,
        name: '',
        price: undefined,
        location: '',
        duration: '',
      }));
      return;
    }

    const selectedTour = tours.find(tour => tour.id.toString() === tourId);
    if (selectedTour) {
      setEditForm(prev => ({
        ...prev,
        tourId: parseInt(selectedTour.id.toString()),
        name: selectedTour.name,
        price: selectedTour.price,
        location: selectedTour.location,
        duration: selectedTour.duration,
      }));
    } else {
      // Manual tour ID entry
      setEditForm(prev => ({
        ...prev,
        tourId: tourId ? parseInt(tourId) : undefined,
      }));
    }
  };

  const handleViewBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsViewDialogOpen(true);
  };
  const handleUpdateBooking = async () => {
    if (!selectedBooking) return;

    setIsUpdating(true);
    try {
      const success = await updateBooking(selectedBooking.id, editForm);
      if (success) {
        setIsEditDialogOpen(false);
        setSelectedBooking(null);
        setEditForm({});
      }
    } catch (err) {
      console.error('Failed to update booking:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCloseEditDialog = (open: boolean) => {
    setIsEditDialogOpen(open);
    if (!open) {
      setSelectedBooking(null);
      setEditForm({});
    }
  };
  const handleDeleteBooking = async (bookingId: number) => {
    try {
      const success = await deleteBooking(bookingId);
      if (success) {
        // Booking list will be refreshed automatically
      }
    } catch (err) {
      console.error('Failed to delete booking:', err);
    }
  };

  // Handle quick status update from table
  const handleQuickStatusUpdate = async (bookingId: number, newStatus: string) => {
    setUpdatingStatusId(bookingId);
    try {
      const success = await updateBooking(bookingId, { status: newStatus });
      if (success) {
        setEditingStatusId(null);
        // Booking list will be refreshed automatically by context
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdatingStatusId(null);
    }
  };

  const getStatusBadge = (status: string | undefined, bookingId?: number, isClickable: boolean = false) => {
    const normalizedStatus = status?.toLowerCase() || 'pending';
    
    // If this status is being edited, show dropdown
    if (isClickable && editingStatusId === bookingId) {
      return (
        <div className="relative">
          <Select 
            value={normalizedStatus} 
            onValueChange={(value) => handleQuickStatusUpdate(bookingId!, value)}
            onOpenChange={(open) => {
              if (!open) {
                setEditingStatusId(null);
              }
            }}
            defaultOpen={true}
          >
            <SelectTrigger className="w-auto h-auto p-1 border-0 bg-transparent shadow-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-2" />
                  Pending
                </div>
              </SelectItem>
              <SelectItem value="confirmed">
                <div className="flex items-center">
                  <CheckCircle className="w-3 h-3 mr-2" />
                  Confirmed
                </div>
              </SelectItem>
              <SelectItem value="cancelled">
                <div className="flex items-center">
                  <XCircle className="w-3 h-3 mr-2" />
                  Cancelled
                </div>
              </SelectItem>
              <SelectItem value="completed">
                <div className="flex items-center">
                  <CheckCircle className="w-3 h-3 mr-2" />
                  Completed
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      );
    }

    // Show loading state if this status is being updated
    if (updatingStatusId === bookingId) {
      return (
        <Badge className="bg-gray-100 text-gray-600 border-gray-200 cursor-wait">
          <Loader2 className="w-3 h-3 mr-1 animate-spin" />
          Updating...
        </Badge>
      );
    }

    const baseClasses = isClickable 
      ? "transition-colors cursor-pointer hover:shadow-md" 
      : "cursor-default";
    
    const handleClick = isClickable && bookingId 
      ? () => setEditingStatusId(bookingId) 
      : undefined;
    
    switch (normalizedStatus) {
      case 'confirmed':
        return (
          <Badge 
            className={`bg-green-100 text-green-800 border-green-200 hover:bg-green-200 hover:text-green-900 hover:border-green-300 ${baseClasses}`}
            onClick={handleClick}
            title={isClickable ? "Click to change status" : undefined}
          >
            <CheckCircle className="w-3 h-3 mr-1" />
            Confirmed
          </Badge>
        );
      case 'pending':
        return (
          <Badge 
            className={`bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200 hover:text-yellow-900 hover:border-yellow-300 ${baseClasses}`}
            onClick={handleClick}
            title={isClickable ? "Click to change status" : undefined}
          >
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge 
            className={`bg-red-100 text-red-800 border-red-200 hover:bg-red-200 hover:text-red-900 hover:border-red-300 ${baseClasses}`}
            onClick={handleClick}
            title={isClickable ? "Click to change status" : undefined}
          >
            <XCircle className="w-3 h-3 mr-1" />
            Cancelled
          </Badge>
        );
      case 'completed':
        return (
          <Badge 
            className={`bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200 hover:text-blue-900 hover:border-blue-300 ${baseClasses}`}
            onClick={handleClick}
            title={isClickable ? "Click to change status" : undefined}
          >
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        );
      default:
        return (
          <Badge 
            className={`bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200 hover:text-gray-900 hover:border-gray-300 ${baseClasses}`}
            onClick={handleClick}
            title={isClickable ? "Click to change status" : undefined}
          >
            <AlertCircle className="w-3 h-3 mr-1" />
            {status || 'Unknown'}
          </Badge>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-[#0093DE]" />
        <span className="ml-2">Loading bookings...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 text-red-600">
        <AlertCircle className="w-6 h-6 mr-2" />
        <span>Error loading bookings: {error}</span>
        <Button onClick={fetchBookings} className="ml-4" variant="outline">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bookings.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {bookings.filter(b => (b.status || 'pending').toLowerCase() === 'pending').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {bookings.filter(b => (b.status || 'pending').toLowerCase() === 'confirmed').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {bookings.filter(b => {
                const bookingDate = new Date(b.createdAt || b.departureDate);
                const now = new Date();
                return bookingDate.getMonth() === now.getMonth() && bookingDate.getFullYear() === now.getFullYear();
              }).length}
            </div>
          </CardContent>
        </Card>
      </div>      {/* Bookings Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-[#0093DE]" />
              Bookings ({filteredBookings.length})
            </span>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">                <Input
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 placeholder:text-gray-400 placeholder:font-normal"
                />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                {sortField && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSortField('');
                      setSortDirection('asc');
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Clear Sort
                  </Button>
                )}
              </div>
              <Button onClick={fetchBookings} variant="outline" size="sm">
                Refresh
              </Button>
            </div>          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <div 
                    className="flex items-center cursor-pointer hover:text-[#0093DE] transition-colors" 
                    onClick={() => handleSort('guest')}
                    title="Sort by guest name"
                  >
                    Guest
                    <span className="ml-2">{getSortIcon('guest')}</span>
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="flex items-center cursor-pointer hover:text-[#0093DE] transition-colors" 
                      onClick={() => handleSort('tour')}
                      title="Sort by tour name"
                    >
                      Tour
                      <span className="ml-1">{getSortIcon('tour')}</span>
                    </div>
                    <div className="text-gray-400">|</div>                    <div 
                      className="flex items-center cursor-pointer hover:text-[#0093DE] transition-colors text-sm" 
                      onClick={() => handleSort('price')}
                      title="Sort by total price"
                    >
                      Total Price
                      <span className="ml-1">{getSortIcon('price')}</span>
                    </div>
                  </div>
                </TableHead>
                <TableHead>
                  <div 
                    className="flex items-center cursor-pointer hover:text-[#0093DE] transition-colors" 
                    onClick={() => handleSort('email')}
                    title="Sort by email"
                  >
                    Contact
                    <span className="ml-2">{getSortIcon('email')}</span>
                  </div>
                </TableHead>
                <TableHead>
                  <div 
                    className="flex items-center cursor-pointer hover:text-[#0093DE] transition-colors" 
                    onClick={() => handleSort('departureDate')}
                    title="Sort by departure date"
                  >
                    Travel Date
                    <span className="ml-2">{getSortIcon('departureDate')}</span>
                  </div>
                </TableHead>
                <TableHead>
                  <div 
                    className="flex items-center cursor-pointer hover:text-[#0093DE] transition-colors" 
                    onClick={() => handleSort('travelers')}
                    title="Sort by number of travelers"
                  >
                    Travelers
                    <span className="ml-2">{getSortIcon('travelers')}</span>
                  </div>
                </TableHead>
                <TableHead>
                  <div 
                    className="flex items-center cursor-pointer hover:text-[#0093DE] transition-colors" 
                    onClick={() => handleSort('status')}
                    title="Sort by status"
                  >
                    Status
                    <span className="ml-2">{getSortIcon('status')}</span>
                  </div>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id}>                  <TableCell>
                    <div>
                      <div className="font-medium">{(booking.firstName || '')} {(booking.lastName || '')}</div>
                      <div className="text-sm text-gray-500">ID: {booking.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{booking.name || 'N/A'}</div>                      <div className="text-sm text-gray-500 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {booking.location || 'N/A'}
                      </div>                      {booking.price && booking.numberOfTravelers && (
                        <div className="text-sm font-semibold text-[#0093DE]">
                          ${(booking.price * booking.numberOfTravelers).toLocaleString()}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="flex items-center mb-1">
                        <Mail className="w-3 h-3 mr-1" />
                        {booking.email || 'N/A'}
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-3 h-3 mr-1" />
                        {booking.phone || 'N/A'}
                      </div>
                    </div>
                  </TableCell>                  <TableCell>
                    <div className="text-sm">
                      <div>
                        {booking.departureDate 
                          ? format(new Date(booking.departureDate), 'MMM dd, yyyy')
                          : 'N/A'
                        }
                      </div>
                      {booking.returnDate && (
                        <div className="text-gray-500">
                          to {format(new Date(booking.returnDate), 'MMM dd, yyyy')}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      <Users className="w-3 h-3 mr-1" />
                      {booking.numberOfTravelers}
                    </Badge>
                  </TableCell>                  <TableCell>
                    {getStatusBadge(booking.status, booking.id, true)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewBooking(booking)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditBooking(booking)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Booking</AlertDialogTitle>                            <AlertDialogDescription>
                              Are you sure you want to delete the booking for {(booking.firstName || '')} {(booking.lastName || '')}? 
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDeleteBooking(booking.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredBookings.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No bookings found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Booking Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>
              Complete information for booking #{selectedBooking?.id}
            </DialogDescription>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="grid gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Basic Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Booking ID</Label>
                    <p className="text-sm font-semibold">{selectedBooking.id}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Source</Label>
                    <p className="text-sm">{selectedBooking.source || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">First Name</Label>
                    <p className="text-sm">{selectedBooking.firstName || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Last Name</Label>
                    <p className="text-sm">{selectedBooking.lastName || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Email</Label>
                    <p className="text-sm">{selectedBooking.email || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Phone</Label>
                    <p className="text-sm">{selectedBooking.phone || 'N/A'}</p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm font-medium text-gray-600">Address</Label>
                    <p className="text-sm">{selectedBooking.address || 'N/A'}</p>
                  </div>                  <div>
                    <Label className="text-sm font-medium text-gray-600">Status</Label>
                    <div className="mt-1">{getStatusBadge(selectedBooking.status)}</div>
                  </div>
                </div>
              </div>

              {/* Tour Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Tour Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  {selectedBooking.tourId && (
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Tour ID</Label>
                      <p className="text-sm">{selectedBooking.tourId}</p>
                    </div>
                  )}
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Tour Name</Label>
                    <p className="text-sm">{selectedBooking.name || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Location</Label>
                    <p className="text-sm">{selectedBooking.location || 'N/A'}</p>
                  </div>
                  {selectedBooking.duration && (
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Duration</Label>
                      <p className="text-sm">{selectedBooking.duration}</p>
                    </div>
                  )}
                  {selectedBooking.price && (
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Price per Person</Label>
                      <p className="text-sm font-semibold text-[#0093DE]">${selectedBooking.price}</p>
                    </div>
                  )}
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Number of Travelers</Label>
                    <p className="text-sm">{selectedBooking.numberOfTravelers || 0}</p>
                  </div>
                </div>
              </div>

              {/* Travel Dates */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Travel Dates</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Departure Date</Label>
                    <p className="text-sm">
                      {selectedBooking.departureDate 
                        ? format(new Date(selectedBooking.departureDate), 'PPP')
                        : 'N/A'
                      }
                    </p>
                  </div>
                  {selectedBooking.returnDate && (
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Return Date</Label>
                      <p className="text-sm">{format(new Date(selectedBooking.returnDate), 'PPP')}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Traveler Details */}
              {selectedBooking.travelersArray && selectedBooking.travelersArray.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Traveler Details</h3>
                  <div className="grid gap-3">                    {selectedBooking.travelersArray.map((traveler, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg border">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-xs font-medium text-gray-600">Traveler {index + 1}</Label>
                            <p className="text-sm font-medium">
                              {traveler.firstName || 'N/A'} {traveler.lastName || 'N/A'}
                            </p>
                          </div>
                          {traveler.dateOfBirth && (
                            <div>
                              <Label className="text-xs font-medium text-gray-600">Date of Birth</Label>
                              <p className="text-sm">
                                {new Date(traveler.dateOfBirth).toLocaleDateString('en-US', { 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric' 
                                })}
                              </p>
                            </div>
                          )}
                          {traveler.nationality && (
                            <div>
                              <Label className="text-xs font-medium text-gray-600">Nationality</Label>
                              <p className="text-sm">{traveler.nationality}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Special Requirements */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Special Requirements</h3>
                <div className="grid gap-4">
                  {selectedBooking.specialRequests && (
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Special Requests</Label>
                      <div className="mt-1 p-3 bg-gray-50 rounded-lg border">
                        <p className="text-sm">{selectedBooking.specialRequests}</p>
                      </div>
                    </div>
                  )}
                    {selectedBooking.dietaryRestrictions && (
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Dietary Restrictions</Label>
                      <div className="mt-1 p-3 bg-gray-50 rounded-lg border">
                        <p className="text-sm">{selectedBooking.dietaryRestrictions}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Booking Timestamps */}
              {(selectedBooking.createdAt || selectedBooking.updatedAt) && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Booking History</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedBooking.createdAt && (
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Created At</Label>
                        <p className="text-sm">{format(new Date(selectedBooking.createdAt), 'PPP pp')}</p>
                      </div>
                    )}
                    {selectedBooking.updatedAt && (
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Last Updated</Label>
                        <p className="text-sm">{format(new Date(selectedBooking.updatedAt), 'PPP pp')}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Total Calculation */}
              {selectedBooking.price && selectedBooking.numberOfTravelers && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Payment Summary</h3>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">
                        ${selectedBooking.price} × {selectedBooking.numberOfTravelers} travelers
                      </span>
                      <span className="text-lg font-bold text-[#0093DE]">
                        Total: ${(selectedBooking.price * selectedBooking.numberOfTravelers).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>      {/* Enhanced Edit Booking Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={handleCloseEditDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">          <DialogHeader>
            <DialogTitle>Edit Booking</DialogTitle>
            <DialogDescription>
              Update booking information for {(selectedBooking?.firstName || '')} {(selectedBooking?.lastName || '')}
            </DialogDescription>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="grid gap-6">
              {/* Customer Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Customer Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={editForm.firstName || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, firstName: e.target.value }))}
                      placeholder="First name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={editForm.lastName || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, lastName: e.target.value }))}
                      placeholder="Last name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={editForm.email || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Email address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={editForm.phone || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="Phone number"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={editForm.address || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, address: e.target.value }))}
                      placeholder="Full address"
                    />
                  </div>
                </div>
              </div>              {/* Tour Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Tour Information</h3>
                <div className="grid grid-cols-1 gap-4">
                  {/* Tour Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="tourSelection">Select Tour</Label>
                    <div className="space-y-3">
                      {/* Tour Dropdown */}                      <Select 
                        value={editForm.tourId ? editForm.tourId.toString() : 'custom'} 
                        onValueChange={handleTourSelection}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a tour or enter custom tour ID" />
                        </SelectTrigger>                        <SelectContent>
                          <SelectItem value="custom">Custom Tour (Manual Entry)</SelectItem>
                          {tours.map((tour) => (
                            <SelectItem key={tour.id} value={tour.id.toString()}>
                              <div className="flex items-center justify-between w-full">
                                <span>{tour.name}</span>
                                <span className="text-sm text-gray-500 ml-2">${tour.price}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>                      {/* Tour Info Display */}
                      {editForm.tourId && tours.find(t => t.id.toString() === editForm.tourId?.toString()) && (
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="text-sm font-medium text-blue-800">
                            ✅ Selected: {editForm.name}
                          </div>
                          <div className="text-xs text-blue-600 mt-1">
                            Location: {editForm.location} | Duration: {editForm.duration} | Price: ${editForm.price}
                          </div>
                        </div>
                      )}

                      {/* Quick Actions */}
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          onClick={() => {
                            // Clear tour selection
                            setEditForm(prev => ({
                              ...prev,
                              tourId: undefined,
                              name: '',
                              price: undefined,
                              location: '',
                              duration: '',
                            }));
                          }}
                          className="h-8 px-3 text-xs bg-gray-500 hover:bg-gray-600 text-white"
                        >
                          🔄 Clear Tour
                        </Button>

                        {tours.length > 0 && (
                          <Button
                            type="button"
                            onClick={() => {
                              const firstTour = tours[0];
                              handleTourSelection(firstTour.id.toString());
                            }}
                            className="h-8 px-3 text-xs bg-purple-500 hover:bg-purple-600 text-white"
                          >
                            🎯 Select First Tour
                          </Button>
                        )}

                        <Button
                          type="button"
                          onClick={() => {
                            console.log('Available tours:', tours.length);
                            console.log('Current tour selection:', editForm.tourId);
                            alert(`Available tours: ${tours.length}\nSelected tour ID: ${editForm.tourId || 'None'}`);
                          }}
                          className="h-8 px-3 text-xs bg-orange-500 hover:bg-orange-600 text-white"
                        >
                          🔍 Debug Tours
                        </Button>
                      </div>

                      {/* Tours info */}
                      <div className="text-xs text-gray-500">
                        Available tours: {tours.length} | Selected: {editForm.tourId ? `ID ${editForm.tourId}` : 'None'}
                      </div>
                    </div>
                  </div>
                  
                  {/* Manual Tour Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tourId">Tour ID</Label>
                      <Input
                        id="tourId"
                        type="number"
                        value={editForm.tourId || ''}
                        onChange={(e) => {
                          const value = e.target.value;
                          setEditForm(prev => ({ 
                            ...prev, 
                            tourId: value ? parseInt(value) : undefined 
                          }));
                        }}
                        placeholder="Tour ID"
                      />
                    </div>
                    <div>
                      <Label htmlFor="tourName">Tour Name</Label>
                      <Input
                        id="tourName"
                        value={editForm.name || ''}
                        onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Tour name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={editForm.location || ''}
                        onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="Tour location"
                      />
                    </div>
                    <div>
                      <Label htmlFor="duration">Duration</Label>
                      <Input
                        id="duration"
                        value={editForm.duration || ''}
                        onChange={(e) => setEditForm(prev => ({ ...prev, duration: e.target.value }))}
                        placeholder="e.g., 3 days 2 nights"
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Price per Person</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={editForm.price || ''}
                        onChange={(e) => setEditForm(prev => ({ ...prev, price: e.target.value ? parseFloat(e.target.value) : undefined }))}
                        placeholder="Price in USD"
                      />
                    </div>
                    <div>
                      <Label htmlFor="numberOfTravelers">Number of Travelers</Label>
                      <Input
                        id="numberOfTravelers"
                        type="number"
                        min="1"
                        value={editForm.numberOfTravelers || 1}
                        onChange={(e) => setEditForm(prev => ({ ...prev, numberOfTravelers: parseInt(e.target.value) || 1 }))}
                        placeholder="Number of travelers"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Travel Dates */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Travel Dates</h3>
                <div className="grid grid-cols-2 gap-4">                  <div>
                    <Label htmlFor="departureDate">Departure Date</Label>
                    <Input
                      id="departureDate"
                      type="date"
                      value={editForm.departureDate || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, departureDate: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="returnDate">Return Date (Optional)</Label>
                    <Input
                      id="returnDate"
                      type="date"
                      value={editForm.returnDate || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, returnDate: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              {/* Traveler Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Traveler Details</h3>
                <div className="space-y-3">
                  {editForm.travelersArray && editForm.travelersArray.length > 0 ? (
                    editForm.travelersArray.map((traveler, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg border">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-medium text-gray-800">Traveler {index + 1}</h4>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const newTravelers = editForm.travelersArray?.filter((_, i) => i !== index) || [];
                              setEditForm(prev => ({ ...prev, travelersArray: newTravelers }));
                            }}
                            className="text-red-600 hover:text-red-800 h-auto p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor={`traveler-${index}-firstName`}>First Name</Label>
                            <Input
                              id={`traveler-${index}-firstName`}
                              value={traveler.firstName || ''}
                              onChange={(e) => {
                                const newTravelers = [...(editForm.travelersArray || [])];
                                newTravelers[index] = { ...newTravelers[index], firstName: e.target.value };
                                setEditForm(prev => ({ ...prev, travelersArray: newTravelers }));
                              }}
                              placeholder="First name"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`traveler-${index}-lastName`}>Last Name</Label>
                            <Input
                              id={`traveler-${index}-lastName`}
                              value={traveler.lastName || ''}
                              onChange={(e) => {
                                const newTravelers = [...(editForm.travelersArray || [])];
                                newTravelers[index] = { ...newTravelers[index], lastName: e.target.value };
                                setEditForm(prev => ({ ...prev, travelersArray: newTravelers }));
                              }}
                              placeholder="Last name"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`traveler-${index}-dateOfBirth`}>Date of Birth</Label>
                            <Input
                              id={`traveler-${index}-dateOfBirth`}
                              type="date"
                              value={traveler.dateOfBirth ? formatDateForInput(traveler.dateOfBirth) : ''}
                              onChange={(e) => {
                                const newTravelers = [...(editForm.travelersArray || [])];
                                newTravelers[index] = { ...newTravelers[index], dateOfBirth: e.target.value };
                                setEditForm(prev => ({ ...prev, travelersArray: newTravelers }));
                              }}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`traveler-${index}-nationality`}>Nationality</Label>
                            <Input
                              id={`traveler-${index}-nationality`}
                              value={traveler.nationality || ''}
                              onChange={(e) => {
                                const newTravelers = [...(editForm.travelersArray || [])];
                                newTravelers[index] = { ...newTravelers[index], nationality: e.target.value };
                                setEditForm(prev => ({ ...prev, travelersArray: newTravelers }));
                              }}
                              placeholder="Nationality"
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-gray-500">
                      No travelers added yet. Click "Add Traveler" to add traveler information.
                    </div>
                  )}
                    <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const newTraveler = {
                        firstName: '',
                        lastName: '',
                        dateOfBirth: '',
                        nationality: ''
                      };
                      const newTravelers = [...(editForm.travelersArray || []), newTraveler];
                      setEditForm(prev => ({ ...prev, travelersArray: newTravelers }));
                    }}
                    className="w-full"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Add Traveler
                  </Button>
                </div>
              </div>

              {/* Special Requirements */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Special Requirements</h3>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="special-requests">Special Requests</Label>
                    <Textarea
                      id="special-requests"
                      value={editForm.specialRequests || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, specialRequests: e.target.value }))}
                      placeholder="Any special requests or notes..."
                      rows={3}
                    />
                  </div>
                    <div>
                    <Label htmlFor="dietary-restrictions">Dietary Restrictions</Label>
                    <Textarea
                      id="dietary-restrictions"
                      value={editForm.dietaryRestrictions || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, dietaryRestrictions: e.target.value }))}
                      placeholder="Any dietary restrictions..."
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              {/* Booking Status */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Booking Status</h3>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={editForm.status || 'pending'} 
                    onValueChange={(value) => setEditForm(prev => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Total Calculation Display */}
              {editForm.price && editForm.numberOfTravelers && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Payment Summary</h3>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">
                        ${editForm.price} × {editForm.numberOfTravelers} travelers
                      </span>
                      <span className="text-lg font-bold text-[#0093DE]">
                        Total: ${(editForm.price * editForm.numberOfTravelers).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>            <Button 
              variant="outline" 
              onClick={() => handleCloseEditDialog(false)}
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleUpdateBooking}
              disabled={isUpdating}
              className="bg-[#0093DE] hover:bg-[#0077b3]"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Booking'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingManagement;
