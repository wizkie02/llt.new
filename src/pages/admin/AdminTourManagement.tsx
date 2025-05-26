import { useState, useEffect } from 'react';
import { useTours, TourOption } from '../../contexts/ToursContext';
import TourTemplateForm from './TourTemplateForm';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Checkbox } from '../../components/ui/checkbox';
import { Eye, Edit, Trash2, PlusCircle, Search, Filter, ArrowUpDown, Star, StarOff, CheckCircle2, XCircle } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 dark:from-gray-900 dark:via-blue-900/10 dark:to-gray-900 pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
        {/* Enhanced Header Section */}
        <div className="relative bg-gradient-to-r from-[#0093DE] to-[#0077b3] rounded-2xl p-8 mb-8 overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-black/5"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
          
          <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-3 drop-shadow-md">
                Tour Management
              </h1>
              <p className="text-blue-100 text-lg">Create, edit, and organize your tour packages with ease</p>
              <div className="flex items-center mt-4 space-x-6 text-blue-100">
                <div className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  <span className="text-sm">{tours.length} Total Tours</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 mr-2" />
                  <span className="text-sm">{tours.filter(tour => tour.featured).length} Featured</span>
                </div>
              </div>
            </div>
            
            {!isAdding && !isEditing && (
              <Button 
                onClick={handleStartAdd} 
                className="bg-white text-[#0093DE] hover:bg-blue-50 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl font-semibold px-6 py-3 rounded-xl"
              >
                <PlusCircle className="mr-2 h-5 w-5" /> Add New Tour
              </Button>
            )}
          </div>
        </div>

        {/* Enhanced Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-br from-[#0093DE] to-[#0077b3] rounded-xl shadow-lg">
                  <CheckCircle2 className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Tours</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{tours.length}</p>
                  <p className="text-xs text-gray-500 mt-1">Active packages</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl shadow-lg">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Featured Tours</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {tours.filter(tour => tour.featured).length}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Highlighted packages</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-br from-green-400 to-green-500 rounded-xl shadow-lg">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Categories</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {categories.length - 1}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Different types</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      
        {/* Enhanced Add/Edit Form */}
        {isAdding && (
          <Card className="mb-8 animate-in fade-in-50 duration-500 shadow-xl rounded-2xl border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-[#0093DE]/10 to-[#0077b3]/10 border-b border-[#0093DE]/20 p-6">
              <CardTitle className="text-[#0093DE] text-xl font-semibold flex items-center">
                <PlusCircle className="mr-3 h-6 w-6" />
                Add New Tour
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 bg-white dark:bg-gray-800">
              <TourTemplateForm
                onSubmit={handleAddSubmit}
                onCancel={handleCancel}
                submitLabel="Add Tour"
              />
            </CardContent>
          </Card>
        )}
        
        {isEditing && currentTour && (
          <Card className="mb-8 animate-in fade-in-50 duration-500 shadow-xl rounded-2xl border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-[#0093DE]/10 to-[#0077b3]/10 border-b border-[#0093DE]/20 p-6">
              <CardTitle className="text-[#0093DE] text-xl font-semibold flex items-center">
                <Edit className="mr-3 h-6 w-6" />
                Edit Tour: <span className="text-gray-700 dark:text-gray-300 ml-2">{currentTour.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 bg-white dark:bg-gray-800">
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
          <Card className="shadow-xl rounded-2xl overflow-hidden border-0 bg-white dark:bg-gray-800">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50/50 dark:from-gray-800 dark:to-blue-900/20 border-b border-gray-200 dark:border-gray-700 p-6">
              <div className="flex flex-col lg:flex-row gap-4 justify-between">
                <div>
                  <CardTitle className="text-2xl text-gray-900 dark:text-white font-bold flex items-center">
                    <div className="p-2 bg-[#0093DE]/10 rounded-lg mr-3">
                      <CheckCircle2 className="h-6 w-6 text-[#0093DE]" />
                    </div>
                    All Tours
                  </CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 ml-14">
                    Manage and organize your tour packages
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search tours..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-full sm:w-64 border-gray-300 focus:border-[#0093DE] focus:ring-[#0093DE] rounded-xl"
                    />
                  </div>
                  
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-full sm:w-[180px] border-gray-300 focus:border-[#0093DE] focus:ring-[#0093DE] rounded-xl">
                      <Filter className="mr-2 h-4 w-4" />
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
                    <Button variant="outline" onClick={resetFilters} className="hover:bg-[#0093DE] hover:text-white transition-colors rounded-xl">
                      Clear Filters
                    </Button>
                  )}
                  
                  {selectedTours.length > 0 && (
                    <Button variant="destructive" onClick={handleBulkDelete} className="shadow-lg hover:shadow-xl transition-all rounded-xl">
                      Delete Selected ({selectedTours.length})
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-gray-50 to-blue-50/50 dark:from-gray-800 dark:to-blue-900/20 border-b">
                    <TableHead className="w-[40px] pl-6">
                      <Checkbox 
                        checked={selectedTours.length === filteredTours.length && filteredTours.length > 0}
                        onCheckedChange={toggleAllSelection}
                        aria-label="Select all tours"
                        className="border-2 border-gray-300 data-[state=checked]:bg-[#0093DE] data-[state=checked]:border-[#0093DE]"
                      />
                    </TableHead>
                    <TableHead className="cursor-pointer hover:bg-white/50 dark:hover:bg-gray-700/50 transition-colors font-semibold" onClick={() => handleSort('name')}>
                      <div className="flex items-center">
                        Tour
                        {sortField === 'name' && (
                          <ArrowUpDown className={`ml-2 h-4 w-4 text-[#0093DE] transition-transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer hover:bg-white/50 dark:hover:bg-gray-700/50 transition-colors font-semibold" onClick={() => handleSort('location')}>
                      <div className="flex items-center">
                        Location
                        {sortField === 'location' && (
                          <ArrowUpDown className={`ml-2 h-4 w-4 text-[#0093DE] transition-transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer hover:bg-white/50 dark:hover:bg-gray-700/50 transition-colors font-semibold" onClick={() => handleSort('price')}>
                      <div className="flex items-center">
                        Price
                        {sortField === 'price' && (
                          <ArrowUpDown className={`ml-2 h-4 w-4 text-[#0093DE] transition-transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold">Duration</TableHead>
                    <TableHead className="font-semibold">Category</TableHead>
                    <TableHead className="cursor-pointer hover:bg-white/50 dark:hover:bg-gray-700/50 transition-colors font-semibold" onClick={() => handleSort('featured')}>
                      <div className="flex items-center">
                        Featured
                        {sortField === 'featured' && (
                          <ArrowUpDown className={`ml-2 h-4 w-4 text-[#0093DE] transition-transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="text-right font-semibold pr-6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTours.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-12">
                        <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                          <Search className="h-16 w-16 mb-4 opacity-20" />
                          <p className="text-lg font-medium mb-2">No tours found</p>
                          <p className="text-sm">Try adjusting your search or filters</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTours.map((tour) => (
                      <TableRow key={tour.id} className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-transparent dark:hover:from-blue-900/20 dark:hover:to-transparent transition-all duration-200 border-b border-gray-100 dark:border-gray-800">
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
                            <div className="flex-shrink-0 h-14 w-14 rounded-xl overflow-hidden shadow-md border-2 border-white dark:border-gray-700">
                              <img 
                                className="h-14 w-14 object-cover transition-transform hover:scale-110 duration-300" 
                                src={tour.image} 
                                alt={tour.name}
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=No+Image';
                                }}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="font-semibold text-gray-900 dark:text-white text-lg">{tour.name}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1 mt-1">
                                {tour.description || 'No description available'}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium text-gray-700 dark:text-gray-300">{tour.location}</TableCell>
                        <TableCell className="font-bold text-[#0093DE] text-lg">${tour.price}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800 font-medium rounded-xl px-3 py-1">
                            {tour.duration}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-[#0093DE]/10 text-[#0093DE] border-[#0093DE]/30 font-medium rounded-xl px-3 py-1">
                            {tour.category || 'Uncategorized'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => toggleFeatured(tour)}
                            className={`${tour.featured ? 'text-yellow-500 hover:text-yellow-600 hover:bg-yellow-50' : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'} transition-all duration-200 rounded-xl`}
                          >
                            {tour.featured ? 
                              <Star className="h-5 w-5 fill-current" /> : 
                              <StarOff className="h-5 w-5" />
                            }
                          </Button>
                        </TableCell>
                        <TableCell className="text-right pr-6">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="sm" asChild className="hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 rounded-xl">
                              <Link to={`/tour/${tour.id}`} target="_blank">
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleStartEdit(tour)} className="hover:bg-green-50 hover:text-green-600 transition-all duration-200 rounded-xl">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleConfirmDelete(tour.id)} className="hover:bg-red-50 hover:text-red-600 transition-all duration-200 rounded-xl">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            
            <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 dark:from-gray-800 dark:to-blue-900/20 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 dark:text-gray-400 font-medium">
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
          <DialogContent className="sm:max-w-md rounded-2xl border-0 shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-center text-red-600 text-xl font-semibold">Confirm Deletion</DialogTitle>
            </DialogHeader>
            <div className="py-6 text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-red-100 to-red-200 mb-6 shadow-lg">
                <Trash2 className="h-8 w-8 text-red-600" />
              </div>
              <p className="text-gray-900 dark:text-white mb-2 text-lg font-medium">Are you sure you want to delete this tour?</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">This action cannot be undone and will permanently remove the tour from your system.</p>
              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={() => setShowDeleteConfirm(false)} className="px-6 hover:bg-gray-50 transition-colors rounded-xl">
                  <XCircle className="mr-2 h-4 w-4" /> Cancel
                </Button>
                <Button variant="destructive" onClick={handleDelete} className="px-6 shadow-lg hover:shadow-xl transition-all rounded-xl">
                  <Trash2 className="mr-2 h-4 w-4" /> Delete Tour
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
