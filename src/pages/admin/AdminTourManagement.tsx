import { useState, useEffect } from 'react';
import { useTours, TourOption } from '../../contexts/ToursContext';
import { Link } from 'react-router-dom';
import TourTemplateForm from './TourTemplateForm';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Checkbox } from '../../components/ui/checkbox';
import { Eye, Edit, Trash2, PlusCircle, Search, Filter, ArrowUpDown, Star, StarOff, CheckCircle2, XCircle } from 'lucide-react';
import { getImageUrl } from '../../lib/imageUtils';

const AdminTourManagement = () => {
  const { tours, addTour, updateTour, removeTour } = useTours();
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTour, setCurrentTour] = useState<TourOption | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedTours, setSelectedTours] = useState<string[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [tourToDelete, setTourToDelete] = useState<string | null>(null);
  
  // Get unique categories
  const categories = ['all', ...Array.from(new Set(tours.map(tour => tour.category || 'Uncategorized')))];
  
  // Filter and sort tours
  const filteredTours = tours
    .filter(tour => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        tour.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (tour.description && tour.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Category filter
      const matchesCategory = categoryFilter === 'all' || tour.category === categoryFilter;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      // Sort by field
      let comparison = 0;
      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'location':
          comparison = a.location.localeCompare(b.location);
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'featured':
          comparison = (a.featured ? 1 : 0) - (b.featured ? 1 : 0);
          break;
        default:
          comparison = 0;
      }
      
      // Apply sort direction
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  
  // Start adding a new tour
  const handleStartAdd = () => {
    setIsAdding(true);
    setIsEditing(false);
    setCurrentTour(null);
  };
  
  // Start editing an existing tour
  const handleStartEdit = (tour: TourOption) => {
    setCurrentTour(tour);
    setIsEditing(true);
    setIsAdding(false);
  };
  
  // Handle add tour submission
  const handleAddSubmit = (formData: Omit<TourOption, 'id'>) => {
    addTour(formData);
    setIsAdding(false);
  };
  
  // Handle edit tour submission
  const handleEditSubmit = (formData: Omit<TourOption, 'id'>) => {
    if (currentTour) {
      updateTour(currentTour.id, formData);
      setIsEditing(false);
      setCurrentTour(null);
    }
  };
  
  // Cancel form
  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(false);
    setCurrentTour(null);
  };
  
  // Confirm delete a tour
  const handleConfirmDelete = (id: string) => {
    setTourToDelete(id);
    setShowDeleteConfirm(true);
  };
  
  // Delete a tour
  const handleDelete = () => {
    if (tourToDelete) {
      removeTour(tourToDelete);
      setShowDeleteConfirm(false);
      setTourToDelete(null);
    }
  };
  
  // Toggle sort direction or change sort field
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Toggle tour selection
  const toggleTourSelection = (id: string) => {
    setSelectedTours(prev => 
      prev.includes(id) 
        ? prev.filter(tourId => tourId !== id)
        : [...prev, id]
    );
  };
  
  // Toggle all tours selection
  const toggleAllSelection = () => {
    if (selectedTours.length === filteredTours.length) {
      setSelectedTours([]);
    } else {
      setSelectedTours(filteredTours.map(tour => tour.id));
    }
  };
  
  // Bulk delete selected tours
  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedTours.length} tours?`)) {
      selectedTours.forEach(id => removeTour(id));
      setSelectedTours([]);
    }
  };
  
  // Toggle featured status
  const toggleFeatured = (tour: TourOption) => {
    updateTour(tour.id, { ...tour, featured: !tour.featured });
  };
  
  // Reset filters
  const resetFilters = () => {
    setSearchQuery('');
    setCategoryFilter('all');
    setSortField('name');
    setSortDirection('asc');
  };
  
  // Check URL for edit parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('edit');
    
    if (editId) {
      const tourToEdit = tours.find(tour => tour.id === editId);
      if (tourToEdit) {
        handleStartEdit(tourToEdit);
      }
    }
  }, [tours]);
  
  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-gray-50 to-gray-50 via-blue-50/30 dark:from-gray-900 dark:via-blue-900/10 dark:to-gray-900">
      <div className="container px-6 py-12 mx-auto max-w-6xl sm:px-8 lg:px-12 xl:px-16">
        {/* Enhanced Header Section */}
        <div className="relative bg-gradient-to-r from-[#0093DE] to-[#0077b3] rounded-2xl p-8 mb-8 overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-black/5"></div>
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full translate-x-32 -translate-y-32 bg-white/10"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full -translate-x-24 translate-y-24 bg-white/5"></div>
          
          <div className="flex relative flex-col gap-4 justify-between items-start md:flex-row md:items-center">
            <div>
              <h1 className="mb-3 text-4xl font-bold text-white drop-shadow-md">
                Tour Management
              </h1>
              <p className="text-lg text-blue-100">Create, edit, and organize your tour packages with ease</p>
              <div className="flex items-center mt-4 space-x-6 text-blue-100">
                <div className="flex items-center">
                  <CheckCircle2 className="mr-2 w-5 h-5" />
                  <span className="text-sm">{tours.length} Total Tours</span>
                </div>
                <div className="flex items-center">
                  <Star className="mr-2 w-5 h-5" />
                  <span className="text-sm">{tours.filter(tour => tour.featured).length} Featured</span>
                </div>
              </div>
            </div>
            
            {!isAdding && !isEditing && (
              <Button 
                onClick={handleStartAdd} 
                className="bg-white text-[#0093DE] hover:bg-blue-50 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl font-semibold px-6 py-3 rounded-xl"
              >
                <PlusCircle className="mr-2 w-5 h-5" /> Add New Tour
              </Button>
            )}
          </div>
        </div>

        {/* Enhanced Statistics Cards */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
          <Card className="overflow-hidden bg-white rounded-xl border-0 shadow-lg transition-all duration-300 dark:bg-gray-800 hover:shadow-xl hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-br from-[#0093DE] to-[#0077b3] rounded-xl shadow-lg">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Tours</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{tours.length}</p>
                  <p className="mt-1 text-xs text-gray-500">Active packages</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden bg-white rounded-xl border-0 shadow-lg transition-all duration-300 dark:bg-gray-800 hover:shadow-xl hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl shadow-lg">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Featured Tours</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {tours.filter(tour => tour.featured).length}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">Highlighted packages</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden bg-white rounded-xl border-0 shadow-lg transition-all duration-300 dark:bg-gray-800 hover:shadow-xl hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-br from-green-400 to-green-500 rounded-xl shadow-lg">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Categories</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {categories.length - 1}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">Different types</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      
        {/* Enhanced Add/Edit Form */}
        {/* Enhanced Add/Edit Form */}
        {isAdding && (
          <Card className="overflow-hidden mb-8 rounded-2xl border-0 shadow-xl duration-500 animate-in fade-in-50">            <CardHeader className="bg-gradient-to-r from-[#0093DE]/10 to-[#0077b3]/10 border-b border-[#0093DE]/20 p-6">
              <CardTitle className="text-[#0093DE] text-xl font-semibold flex items-center">
                <PlusCircle className="mr-3 w-6 h-6" />
                Add New Tour
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 bg-white dark:bg-gray-800">
              <TourTemplateForm
                onSubmit={handleAddSubmit}
                onCancel={handleCancel}
                submitLabel="Add Tour"
              />
            </CardContent>
          </Card>
        )}
        
        {isEditing && currentTour && (
          <Card className="overflow-hidden mb-8 rounded-2xl border-0 shadow-xl duration-500 animate-in fade-in-50">            <CardHeader className="bg-gradient-to-r from-[#0093DE]/10 to-[#0077b3]/10 border-b border-[#0093DE]/20 p-6">
              <CardTitle className="text-[#0093DE] text-xl font-semibold flex items-center">
                <Edit className="mr-3 w-6 h-6" />
                Edit Tour: <span className="ml-2 text-gray-700 dark:text-gray-300">{currentTour.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 bg-white dark:bg-gray-800">
              <TourTemplateForm
                initialData={currentTour}
                onSubmit={handleEditSubmit}
                onCancel={handleCancel}
                submitLabel="Update Tour"
              />
            </CardContent>
          </Card>
        )}
        {/* Enhanced Tours List */}
        {!isAdding && !isEditing && (
          <Card className="overflow-hidden bg-white rounded-2xl border-0 shadow-xl dark:bg-gray-800">
            <CardHeader className="p-6 bg-gradient-to-r from-gray-50 border-b border-gray-200 to-blue-50/50 dark:from-gray-800 dark:to-blue-900/20 dark:border-gray-700">
              <div className="flex flex-col gap-4 justify-between lg:flex-row">
                <div>
                  <CardTitle className="flex items-center text-2xl font-bold text-gray-900 dark:text-white">
                    <div className="p-2 bg-[#0093DE]/10 rounded-lg mr-3">
                      <CheckCircle2 className="h-6 w-6 text-[#0093DE]" />
                    </div>
                    All Tours
                  </CardTitle>
                  <p className="mt-2 ml-14 text-sm text-gray-600 dark:text-gray-400">
                    Manage and organize your tour packages
                  </p>
                </div>                  <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="flex relative items-center">
                    <Search className="absolute left-3 z-10 w-4 h-4 text-gray-400 pointer-events-none" />
                    <Input
                      type="text"
                      placeholder="Search tours..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-full sm:w-64 h-10 border-gray-300 focus:border-[#0093DE] focus:ring-[#0093DE] rounded-xl"
                    />
                  </div>
                  
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="h-12 w-full sm:w-[150px] border-gray-300 focus:border-[#0093DE] focus:ring-[#0093DE] rounded-xl">
                      <Filter className="mr-2 w-4 h-4" />
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category === 'all' ? 'All Categories' : category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                    {(searchQuery || categoryFilter !== 'all') && (
                    <Button onClick={resetFilters} className="border-2 border-[#0093DE] bg-transparent text-[#0093DE] hover:bg-[#0093DE] hover:text-white transition-colors rounded-xl">
                      Clear Filters
                    </Button>
                  )}
                    {selectedTours.length > 0 && (
                    <Button onClick={handleBulkDelete} className="text-white bg-red-500 rounded-xl shadow-lg transition-all hover:bg-red-600 hover:shadow-xl">
                      Delete Selected ({selectedTours.length})
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            
            <div className="overflow-x-auto rounded-t-xl">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-gray-50 border-b to-blue-50/50 dark:from-gray-800 dark:to-blue-900/20 first:rounded-tl-xl last:rounded-tr-xl">
                    <TableHead className="w-[40px] pl-6 first:rounded-tl-xl">
                      <Checkbox 
                        checked={selectedTours.length === filteredTours.length && filteredTours.length > 0}
                        onCheckedChange={toggleAllSelection}
                        aria-label="Select all tours"
                        className="border-2 border-gray-300 data-[state=checked]:bg-[#0093DE] data-[state=checked]:border-[#0093DE]"
                      />
                    </TableHead>
                    <TableHead className="font-semibold transition-colors cursor-pointer hover:bg-white/50 dark:hover:bg-gray-700/50" onClick={() => handleSort('name')}>
                      <div className="flex items-center">
                        Tour
                        {sortField === 'name' && (
                          <ArrowUpDown className={`ml-2 h-4 w-4 text-[#0093DE] transition-transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold transition-colors cursor-pointer hover:bg-white/50 dark:hover:bg-gray-700/50" onClick={() => handleSort('location')}>
                      <div className="flex items-center">
                        Location
                        {sortField === 'location' && (
                          <ArrowUpDown className={`ml-2 h-4 w-4 text-[#0093DE] transition-transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold transition-colors cursor-pointer hover:bg-white/50 dark:hover:bg-gray-700/50" onClick={() => handleSort('price')}>
                      <div className="flex items-center">
                        Price
                        {sortField === 'price' && (
                          <ArrowUpDown className={`ml-2 h-4 w-4 text-[#0093DE] transition-transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold">Duration</TableHead>
                    <TableHead className="font-semibold">Category</TableHead>
                    <TableHead className="font-semibold transition-colors cursor-pointer hover:bg-white/50 dark:hover:bg-gray-700/50" onClick={() => handleSort('featured')}>
                      <div className="flex items-center">
                        Featured
                        {sortField === 'featured' && (
                          <ArrowUpDown className={`ml-2 h-4 w-4 text-[#0093DE] transition-transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="pr-6 font-semibold text-right last:rounded-tr-xl">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTours.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="py-12 text-center">
                        <div className="flex flex-col justify-center items-center text-gray-500 dark:text-gray-400">
                          <Search className="mb-4 w-16 h-16 opacity-20" />
                          <p className="mb-2 text-lg font-medium">No tours found</p>
                          <p className="text-sm">Try adjusting your search or filters</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTours.map((tour) => (
                      <TableRow key={tour.id} className="border-b border-gray-100 transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-transparent dark:hover:from-blue-900/20 dark:hover:to-transparent dark:border-gray-800">
                        <TableCell className="pl-6">
                          <Checkbox 
                            checked={selectedTours.includes(tour.id)}
                            onCheckedChange={() => toggleTourSelection(tour.id)}
                            aria-label={`Select ${tour.name}`}
                            className="border-2 border-gray-300 data-[state=checked]:bg-[#0093DE] data-[state=checked]:border-[#0093DE]"
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="overflow-hidden flex-shrink-0 w-14 h-14 rounded-xl border-2 border-white shadow-md dark:border-gray-700">
                              <img 
                                className="object-cover w-14 h-14 transition-transform duration-300 hover:scale-110" 
                                src={getImageUrl(tour.image)} 
                                alt={tour.name}
                                width="56"
                                height="56"
                                loading="lazy"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=No+Image';
                                }}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-lg font-semibold text-gray-900 dark:text-white">{tour.name}</div>
                              <div className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                                {tour.description || 'No description available'}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium text-gray-700 dark:text-gray-300">{tour.location}</TableCell>
                        <TableCell className="font-bold text-[#0093DE] text-lg">${tour.price}</TableCell>                        <TableCell>
                          <Badge className="px-3 py-1 font-medium text-blue-700 bg-blue-50 rounded-xl border border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800">
                            {tour.duration}
                          </Badge>
                        </TableCell>                        <TableCell>
                          <Badge className="bg-[#0093DE]/10 text-[#0093DE] border border-[#0093DE]/30 font-medium rounded-xl px-3 py-1">
                            {tour.category || 'Uncategorized'}
                          </Badge>
                        </TableCell>                        <TableCell>
                          <Button 
                            onClick={() => toggleFeatured(tour)}
                            className={`h-9 px-4 text-xs bg-white border border-gray-200 hover:bg-opacity-20 ${tour.featured ? 'text-yellow-500 hover:text-yellow-600 hover:bg-yellow-50' : 'text-black hover:text-yellow-500 hover:bg-yellow-50'} transition-all duration-200 rounded-xl shadow-sm`}
                          >
                            {tour.featured ? 
                              <Star className="w-5 h-5 fill-current" /> : 
                              <StarOff className="w-5 h-5" />
                            }
                          </Button>
                        </TableCell>
                        <TableCell className="pr-6 text-right">
                          <div className="flex justify-end space-x-2">
                            <Button asChild className="px-4 h-9 text-xs text-black bg-white rounded-xl border border-gray-200 shadow-sm transition-all duration-200 hover:bg-blue-50 hover:text-blue-600">
                              <Link to={`/tour/${tour.id}`} target="_blank">
                                <Eye className="w-4 h-4" />
                              </Link>
                            </Button>
                            <Button onClick={() => handleStartEdit(tour)} className="px-4 h-9 text-xs text-black bg-white rounded-xl border border-gray-200 shadow-sm transition-all duration-200 hover:bg-green-50 hover:text-green-600">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button onClick={() => handleConfirmDelete(tour.id)} className="px-4 h-9 text-xs text-black bg-white rounded-xl border border-gray-200 shadow-sm transition-all duration-200 hover:bg-red-50 hover:text-red-600">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            
            <div className="px-6 py-4 bg-gradient-to-r from-gray-50 border-t border-gray-200 to-blue-50/50 dark:from-gray-800 dark:to-blue-900/20 dark:border-gray-700">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium text-gray-600 dark:text-gray-400">
                  Showing <span className="text-[#0093DE] font-semibold">{filteredTours.length}</span> of <span className="text-[#0093DE] font-semibold">{tours.length}</span> tours
                </span>
                {selectedTours.length > 0 && (
                  <span className="text-[#0093DE] font-semibold bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                    {selectedTours.length} selected
                  </span>
                )}
              </div>
            </div>
          </Card>
        )}
        
        {/* Enhanced Delete Confirmation Dialog */}
        <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
          <DialogContent className="rounded-2xl border-0 shadow-2xl sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-center text-red-600">Confirm Deletion</DialogTitle>
            </DialogHeader>
            <div className="py-6 text-center">
              <div className="flex justify-center items-center mx-auto mb-6 w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full shadow-lg">
                <Trash2 className="w-8 h-8 text-red-600" />
              </div>
              <p className="mb-2 text-lg font-medium text-gray-900 dark:text-white">Are you sure you want to delete this tour?</p>
              <p className="mb-8 text-sm text-gray-500 dark:text-gray-400">This action cannot be undone and will permanently remove the tour from your system.</p>              <div className="flex gap-4 justify-center">
                <Button onClick={() => setShowDeleteConfirm(false)} className="px-6 border-2 border-[#0093DE] bg-transparent text-[#0093DE] hover:bg-gray-50 transition-colors rounded-xl">
                  <XCircle className="mr-2 w-4 h-4" /> Cancel
                </Button>
                <Button onClick={handleDelete} className="px-6 text-white bg-red-500 rounded-xl shadow-lg transition-all hover:bg-red-600 hover:shadow-xl">
                  <Trash2 className="mr-2 w-4 h-4" /> Delete Tour
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminTourManagement;