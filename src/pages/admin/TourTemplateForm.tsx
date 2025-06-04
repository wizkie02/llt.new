import { useState, useEffect } from 'react';
import { TourOption } from '@/contexts/ToursContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2, Loader2 } from 'lucide-react';

interface Category {
  id: string;
  name: string;
}

interface TourTemplateFormProps {
  initialData?: Partial<TourOption>;
  onSubmit: (data: Omit<TourOption, 'id'>) => void;
  onCancel: () => void;
  submitLabel: string;
}

const TourTemplateForm = ({ 
  initialData = {}, 
  onSubmit, 
  onCancel,
  submitLabel
}: TourTemplateFormProps) => {  // Categories state
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);
    // Add new category state
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [addingCategory, setAddingCategory] = useState(false);
  const [pendingCategorySelection, setPendingCategorySelection] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    description: initialData.description || '',
    price: initialData.price || 0,
    duration: initialData.duration || '',
    location: initialData.location || '',
    image: initialData.image || '',
    featured: initialData.featured || false,    category: initialData.category || '',
    rating: initialData.rating || 4.5,
    reviewCount: initialData.reviewCount || 0,
    // Extended fields for detailed tour information
    highlights: initialData.highlights || [''],
    included: initialData.included || [''],
    itinerary: initialData.itinerary || [{ day: '1', activities: '' }],
    // Additional fields
    maxGroupSize: 12,
    languages: 'English, Vietnamese',    whatToBring: ['']
  });  // Load categories from API
  const loadCategories = async () => {
    setLoadingCategories(true);
    setCategoriesError(null);
    
    try {
      const response = await fetch('https://leolovestravel.com/api/get-categories.php');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const rawText = await response.text();
      console.log('Raw API Response:', rawText);
      console.log('Response Type:', typeof rawText);
      console.log('Response Length:', rawText.length);
      
      let data;
      try {
        data = JSON.parse(rawText);
      } catch (parseError) {
        throw new Error(`JSON parse error: ${parseError}. Raw response: ${rawText}`);
      }
      
      console.log('Parsed Categories API Response:', data);
      console.log('Data type:', typeof data);      console.log('Data keys:', Object.keys(data || {}));
      
      let categoriesData: Category[] = [];
      
      // Handle multiple response formats
      if (Array.isArray(data)) {
        // Direct array response format: [{"id": "1", "name": "Adventure"}, ...]
        console.log('Using direct array format');
        categoriesData = data;
        setCategories(data);
      } else if (data && typeof data === 'object') {
        // Check for various object formats
        if (data.success && data.categories && Array.isArray(data.categories)) {
          // Wrapped response format: {"success": true, "categories": [...]}
          console.log('Using wrapped success format');
          categoriesData = data.categories;
          setCategories(data.categories);
        } else if (data.data && Array.isArray(data.data)) {
          // Alternative format: {"data": [...]}
          console.log('Using data wrapper format');
          categoriesData = data.data;
          setCategories(data.data);
        } else if (data.categories && Array.isArray(data.categories)) {
          // Categories only format: {"categories": [...]}
          console.log('Using categories only format');
          categoriesData = data.categories;
          setCategories(data.categories);
        } else {
          console.error('Invalid categories API response format:', data);
          setCategoriesError(`Invalid API response format. Expected array or object with categories but got: ${JSON.stringify(data)}`);
          setCategories([]);
        }
      } else {
        console.error('Invalid categories API response format:', data);
        setCategoriesError(`Invalid API response format. Expected array or object but got: ${typeof data}`);
        setCategories([]);
      }
      
      // Handle pending category selection after loading
      if (pendingCategorySelection && categoriesData.length > 0) {
        const categoryToSelect = categoriesData.find((cat: Category) => cat.name === pendingCategorySelection);
        if (categoryToSelect) {
          setFormData(prev => ({ ...prev, category: categoryToSelect.id }));
          setPendingCategorySelection(null);
        }
      }
    } catch (error) {
      console.error('Error loading categories:', error);
      setCategoriesError(`Failed to load categories: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setCategories([]);
    } finally {
      setLoadingCategories(false);
    }  };

  // Add new category function
  const handleAddNewCategory = async () => {
    if (!newCategoryName.trim() || addingCategory) return;
    
    setAddingCategory(true);
    setCategoriesError(null);
    
    try {      const response = await fetch('https://leolovestravel.com/api/add-categories.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newCategoryName.trim()
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const rawText = await response.text();
      console.log('Add Category Raw Response:', rawText);
      
      let data;
      try {
        data = JSON.parse(rawText);
      } catch (parseError) {
        throw new Error(`JSON parse error: ${parseError}. Raw response: ${rawText}`);
      }
      
      console.log('Add Category Response:', data);
      
      // Handle various success response formats
      const isSuccess = data.success === true || data.status === 'success' || data.result === 'success';
      
      if (isSuccess) {
        console.log('Category added successfully:', data);
        
        // Get the new category ID from response or reload categories to get updated list
        let newCategoryId = data.id || data.category_id || data.categoryId;
        
        if (newCategoryId) {
          // Add the new category to the local state
          const newCategory = { id: String(newCategoryId), name: newCategoryName.trim() };
          setCategories(prev => [...prev, newCategory]);
          
          // Select the newly created category
          setFormData(prev => ({ ...prev, category: String(newCategoryId) }));        } else {
          // If no ID returned, reload categories and set pending selection
          setPendingCategorySelection(newCategoryName.trim());
          await loadCategories();
        }
        
        // Reset form state
        setNewCategoryName('');
        setShowAddCategory(false);
      } else {
        console.error('Failed to add category:', data);
        setCategoriesError(data.message || data.error || 'Failed to add category');
      }
    } catch (error) {
      console.error('Error adding category:', error);
      setCategoriesError(`Failed to add category: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setAddingCategory(false);
    }
  };

  // Load categories on component mount
  useEffect(() => {
    loadCategories();
  }, []);
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({
        ...formData,
        [name]: checked
      });
    } else if (name === 'price' || name === 'rating' || name === 'reviewCount') {
      setFormData({
        ...formData,
        [name]: parseFloat(value) || 0
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Handle array field changes (highlights, included, whatToBring)
  const handleArrayFieldChange = (field: 'highlights' | 'included' | 'whatToBring', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item: string, i: number) => i === index ? value : item)
    }));
  };

  // Add new array item
  const addArrayItem = (field: 'highlights' | 'included' | 'whatToBring') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  // Remove array item
  const removeArrayItem = (field: 'highlights' | 'included' | 'whatToBring', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_: string, i: number) => i !== index)
    }));
  };

  // Handle itinerary changes
  const handleItineraryChange = (index: number, field: 'day' | 'activities', value: string) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  // Add new itinerary day
  const addItineraryDay = () => {
    setFormData(prev => ({
      ...prev,
      itinerary: [...prev.itinerary, { day: String(prev.itinerary.length + 1), activities: '' }]
    }));
  };

  // Remove itinerary day
  const removeItineraryDay = (index: number) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, i) => i !== index)
    }));
  };

  // Submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clean up empty items
    const cleanedData = {
      ...formData,
      highlights: formData.highlights.filter(item => item.trim() !== ''),
      included: formData.included.filter(item => item.trim() !== ''),
      whatToBring: formData.whatToBring.filter(item => item.trim() !== ''),
      itinerary: formData.itinerary.filter(item => item.activities.trim() !== '')
    };
    
    onSubmit(cleanedData);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 mb-8 border border-gray-200 dark:border-gray-700">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
          {submitLabel === 'Add Tour' ? 'Create New Tour' : 'Edit Tour Details'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {submitLabel === 'Add Tour' 
            ? 'Fill in the details below to create a comprehensive tour package' 
            : 'Update the tour information and save your changes'}
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="highlights">Highlights</TabsTrigger>
            <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
            <TabsTrigger value="additional">Additional</TabsTrigger>
          </TabsList>

          {/* Basic Information Tab */}
          <TabsContent value="basic" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Tour Name*
                </Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full"
                  required
                  placeholder="e.g. Halong Bay Luxury Cruise"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Location*
                </Label>
                <Input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full"
                  required
                  placeholder="e.g. Halong Bay, Vietnam"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Price ($)*
                </Label>
                <Input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full"
                  min="0"
                  step="0.01"
                  required
                  placeholder="e.g. 299.99"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="duration" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Duration*
                </Label>
                <Input
                  type="text"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="w-full"
                  required
                  placeholder="e.g. 3 days 2 nights"
                />
              </div>
            </div>

            <ImageUpload
              value={formData.image}
              onChange={(value) => setFormData(prev => ({ ...prev, image: value }))}
              label="Tour Image"
              className="w-full"
            />

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full"
                placeholder="Describe the tour experience, highlights, and what's included..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Category*
                </Label>
                
                {showAddCategory ? (
                  // Add new category input
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="Enter new category name"
                        className="flex-1"
                        disabled={addingCategory}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddNewCategory()}
                      />                      <Button
                        type="button"
                        onClick={handleAddNewCategory}
                        disabled={!newCategoryName.trim() || addingCategory}
                        className="h-9 px-4 text-xs bg-green-600 hover:bg-green-700"
                      >
                        {addingCategory ? (
                          <Loader2 className="animate-spin h-4 w-4" />
                        ) : (
                          <Plus className="h-4 w-4" />
                        )}
                      </Button>                      <Button
                        type="button"
                        onClick={() => {
                          setShowAddCategory(false);
                          setNewCategoryName('');
                        }}
                        disabled={addingCategory}
                        className="h-9 px-4 text-xs border-2 border-[#0093DE] bg-transparent text-[#0093DE] hover:bg-[#0093DE] hover:text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-xs text-gray-500">
                      Press Enter or click + to add the category
                    </div>
                  </div>
                ) : (
                  // Regular category select
                  <Select 
                    value={formData.category}                    onValueChange={(value: string) => {
                      if (value === '__add_new__') {
                        setShowAddCategory(true);
                      } else {
                        setFormData({...formData, category: value});
                      }
                    }}
                    disabled={loadingCategories}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={loadingCategories ? "Loading categories..." : "Select category"} />
                    </SelectTrigger>
                    <SelectContent>
                      {loadingCategories ? (
                        <SelectItem value="loading" disabled>
                          <div className="flex items-center">
                            <Loader2 className="animate-spin h-4 w-4 mr-2" />
                            Loading...
                          </div>
                        </SelectItem>
                      ) : categoriesError ? (
                        <SelectItem value="error" disabled>
                          <div className="text-red-500">Error loading categories</div>
                        </SelectItem>
                      ) : (
                        <>
                          {categories.length === 0 ? (
                            <SelectItem value="empty" disabled>
                              No categories available
                            </SelectItem>
                          ) : (
                            categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))
                          )}
                          {/* Add new category option */}
                          <SelectItem value="__add_new__" className="text-green-600 font-medium">
                            <div className="flex items-center">
                              <Plus className="h-4 w-4 mr-2" />
                              Add New Category
                            </div>
                          </SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                )}
                
                {categoriesError && (
                  <div className="text-sm text-red-500 mt-1 space-y-2">
                    <div>{categoriesError}</div>
                    <div className="flex gap-2">                      <Button 
                        type="button" 
                        onClick={loadCategories} 
                        className="h-9 px-4 text-xs h-auto p-0 text-red-500 hover:text-red-700"
                      >
                        Retry
                      </Button>                      <Button 
                        type="button" 
                        onClick={async () => {
                          try {
                            const response = await fetch('https://leolovestravel.com/api/get-categories.php');
                            const data = await response.text();
                            console.log('Raw API Response:', data);
                            alert(`Raw API Response: ${data.substring(0, 500)}`);
                          } catch (error) {
                            console.error('Debug error:', error);
                            alert(`Debug error: ${error}`);
                          }
                        }}
                        className="h-9 px-4 text-xs h-auto p-0 text-blue-500 hover:text-blue-700"
                      >
                        Debug API
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rating" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Rating (1-5)
                </Label>
                <Input
                  type="number"
                  id="rating"
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  className="w-full"
                  min="1"
                  max="5"
                  step="0.1"
                  placeholder="4.5"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reviewCount" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Review Count
                </Label>
                <Input
                  type="number"
                  id="reviewCount"
                  name="reviewCount"
                  value={formData.reviewCount}
                  onChange={handleInputChange}
                  className="w-full"
                  min="0"
                  placeholder="25"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Tour Settings
              </Label>
              <div className="flex items-center space-x-3 pt-2">
                <Checkbox
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked: boolean) => setFormData({...formData, featured: !!checked})}
                />
                <Label htmlFor="featured" className="text-sm text-gray-700 dark:text-gray-300">
                  Feature this tour on homepage
                </Label>
              </div>
            </div>
          </TabsContent>

          {/* Highlights Tab */}
          <TabsContent value="highlights" className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Tour Highlights</h3>
                <Button type="button" onClick={() => addArrayItem('highlights')} className="h-9 px-4 text-xs border-2 border-[#0093DE] bg-transparent text-[#0093DE] hover:bg-[#0093DE] hover:text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Highlight
                </Button>
              </div>
              {formData.highlights.map((highlight, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={highlight}
                    onChange={(e) => handleArrayFieldChange('highlights', index, e.target.value)}
                    placeholder="e.g. Professional local guides"
                    className="flex-1"
                  />
                  {formData.highlights.length > 1 && (                    <Button 
                      type="button" 
                      onClick={() => removeArrayItem('highlights', index)} 
                      className="h-9 px-4 text-xs border-2 border-[#0093DE] bg-transparent text-[#0093DE] hover:bg-[#0093DE] hover:text-white"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">What's Included</h3>
                <Button type="button" onClick={() => addArrayItem('included')} className="h-9 px-4 text-xs border-2 border-[#0093DE] bg-transparent text-[#0093DE] hover:bg-[#0093DE] hover:text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>
              {formData.included.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={item}
                    onChange={(e) => handleArrayFieldChange('included', index, e.target.value)}
                    placeholder="e.g. Hotel accommodation"
                    className="flex-1"
                  />
                  {formData.included.length > 1 && (                    <Button 
                      type="button" 
                      onClick={() => removeArrayItem('included', index)} 
                      className="h-9 px-4 text-xs border-2 border-[#0093DE] bg-transparent text-[#0093DE] hover:bg-[#0093DE] hover:text-white"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">What to Bring</h3>
                <Button type="button" onClick={() => addArrayItem('whatToBring')} className="h-9 px-4 text-xs border-2 border-[#0093DE] bg-transparent text-[#0093DE] hover:bg-[#0093DE] hover:text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>
              {formData.whatToBring.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={item}
                    onChange={(e) => handleArrayFieldChange('whatToBring', index, e.target.value)}
                    placeholder="e.g. Valid passport"
                    className="flex-1"
                  />
                  {formData.whatToBring.length > 1 && (                    <Button 
                      type="button" 
                      onClick={() => removeArrayItem('whatToBring', index)} 
                      className="h-9 px-4 text-xs border-2 border-[#0093DE] bg-transparent text-[#0093DE] hover:bg-[#0093DE] hover:text-white"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Itinerary Tab */}
          <TabsContent value="itinerary" className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Day-by-Day Itinerary</h3>
                <Button type="button" onClick={addItineraryDay} className="h-9 px-4 text-xs border-2 border-[#0093DE] bg-transparent text-[#0093DE] hover:bg-[#0093DE] hover:text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Day
                </Button>
              </div>
              {formData.itinerary.map((day, index) => (
                <Card key={index} className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <Badge className="bg-[#0093DE]/10 text-[#0093DE] border border-[#0093DE]/30">
                      Day {day.day}
                    </Badge>
                    {formData.itinerary.length > 1 && (                      <Button 
                        type="button" 
                        onClick={() => removeItineraryDay(index)} 
                        className="h-9 px-4 text-xs border-2 border-[#0093DE] bg-transparent text-[#0093DE] hover:bg-[#0093DE] hover:text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="space-y-3">
                    <Input
                      value={day.day}
                      onChange={(e) => handleItineraryChange(index, 'day', e.target.value)}
                      placeholder="Day number"
                      className="w-full"
                    />
                    <Textarea
                      value={day.activities}
                      onChange={(e) => handleItineraryChange(index, 'activities', e.target.value)}
                      placeholder="Describe activities for this day..."
                      rows={3}
                      className="w-full"
                    />
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Additional Information Tab */}
          <TabsContent value="additional" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="maxGroupSize" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Maximum Group Size
                </Label>
                <Input
                  type="number"
                  id="maxGroupSize"
                  name="maxGroupSize"
                  value={formData.maxGroupSize}
                  onChange={handleInputChange}
                  className="w-full"
                  min="1"
                  placeholder="12"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="languages" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Languages
                </Label>
                <Input
                  type="text"
                  id="languages"
                  name="languages"
                  value={formData.languages}
                  onChange={handleInputChange}
                  className="w-full"
                  placeholder="English, Vietnamese"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-600 mt-8">          <Button
            type="button"
            onClick={onCancel}
            className="border-2 border-[#0093DE] bg-transparent text-[#0093DE] hover:bg-[#0093DE] hover:text-white"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-[#0093DE] hover:bg-[#0077b3]"
          >
            {submitLabel}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TourTemplateForm;