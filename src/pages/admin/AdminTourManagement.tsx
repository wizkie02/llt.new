import { useState, useEffect } from 'react';
import { useTours, TourOption } from '../../contexts/ToursContext';
import { useTheme } from '../../contexts/ThemeContext';
import TourTemplateForm from './TourTemplateForm';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Checkbox } from '../../components/ui/checkbox';
import { Eye, Edit, Trash2, PlusCircle, Search, Filter, ArrowUpDown, Star, StarOff, CheckCircle2, XCircle } from 'lucide-react';

const AdminTourManagement = () => {
  const { tours, addTour, updateTour, removeTour } = useTours();
  const { theme } = useTheme();
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
    <div className={`w-full min-h-screen px-4 sm:px-6 lg:px-8 py-8 mt-16 ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900'}`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Tour Management</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your tours, packages and offerings</p>
        </div>
        
        {!isAdding && !isEditing && (
          <Button onClick={handleStartAdd} className="bg-[#0093DE] hover:bg-[#0077b3]">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Tour
          </Button>
        )}
      </div>
      
      {/* Add/Edit Form */}
      {isAdding && (
        <Card className="mb-8 animate-in fade-in-50 duration-300">
          <CardHeader>
            <CardTitle>Add New Tour</CardTitle>
          </CardHeader>
          <CardContent>
            <TourTemplateForm
              onSubmit={handleAddSubmit}
              onCancel={handleCancel}
              submitLabel="Add Tour"
            />
          </CardContent>
        </Card>
      )}
      
      {isEditing && currentTour && (
        <Card className="mb-8 animate-in fade-in-50 duration-300">
          <CardHeader>
            <CardTitle>Edit Tour: {currentTour.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <TourTemplateForm
              initialData={currentTour}
              onSubmit={handleEditSubmit}
              onCancel={handleCancel}
              submitLabel="Update Tour"
            />
          </CardContent>
        </Card>
      )}
      
      {/* Tours List */}
      {!isAdding && !isEditing && (
        <Card className="shadow-lg rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <CardHeader className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search tours..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-full"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {(searchQuery || categoryFilter !== 'all') && (
                  <Button variant="outline" onClick={resetFilters}>
                    Clear Filters
                  </Button>
                )}
                
                {selectedTours.length > 0 && (
                  <Button variant="destructive" onClick={handleBulkDelete}>
                    Delete Selected ({selectedTours.length})
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox 
                      checked={selectedTours.length === filteredTours.length && filteredTours.length > 0}
                      onCheckedChange={toggleAllSelection}
                      aria-label="Select all tours"
                    />
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('name')}>
                    <div className="flex items-center">
                      Tour
                      {sortField === 'name' && (
                        <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('location')}>
                    <div className="flex items-center">
                      Location
                      {sortField === 'location' && (
                        <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('price')}>
                    <div className="flex items-center">
                      Price
                      {sortField === 'price' && (
                        <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('featured')}>
                    <div className="flex items-center">
                      Featured
                      {sortField === 'featured' && (
                        <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTours.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                        <Search className="h-12 w-12 mb-2 opacity-20" />
                        <p className="text-lg font-medium">No tours found</p>
                        <p className="text-sm">Try adjusting your search or filters</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTours.map((tour) => (
                    <TableRow key={tour.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <TableCell>
                        <Checkbox 
                          checked={selectedTours.includes(tour.id)}
                          onCheckedChange={() => toggleTourSelection(tour.id)}
                          aria-label={`Select ${tour.name}`}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-md overflow-hidden">
                            <img 
                              className="h-10 w-10 object-cover" 
                              src={tour.image} 
                              alt={tour.name}
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=No+Image';
                              }}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium">{tour.name}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{tour.location}</TableCell>
                      <TableCell>${tour.price}</TableCell>
                      <TableCell>{tour.duration}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-[#0093DE]/10 text-[#0093DE] border-[#0093DE]/20">
                          {tour.category || 'Uncategorized'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => toggleFeatured(tour)}
                          className={tour.featured ? 'text-yellow-500' : 'text-gray-400'}
                        >
                          {tour.featured ? <Star className="h-4 w-4 fill-current" /> : <StarOff className="h-4 w-4" />}
                        </Button>
                      </TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button variant="ghost" size="icon" asChild>
                          <Link to={`/tour/${tour.id}`} target="_blank">
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleStartEdit(tour)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleConfirmDelete(tour.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="bg-white dark:bg-gray-800 px-4 py-3 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
            Showing {filteredTours.length} of {tours.length} tours
          </div>
        </Card>
      )}
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4 text-center">
            <p className="mb-4">Are you sure you want to delete this tour? This action cannot be undone.</p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
                <XCircle className="mr-2 h-4 w-4" /> Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                <Trash2 className="mr-2 h-4 w-4" /> Delete Tour
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTourManagement;
