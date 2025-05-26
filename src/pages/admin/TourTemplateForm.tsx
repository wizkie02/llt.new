import { useState } from 'react';
import { TourOption } from '../../contexts/ToursContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Checkbox } from '../../components/ui/checkbox';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Plus, Trash2 } from 'lucide-react';

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
}: TourTemplateFormProps) => {
  // Form state
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    description: initialData.description || '',
    price: initialData.price || 0,
    duration: initialData.duration || '',
    location: initialData.location || '',
    image: initialData.image || '',
    featured: initialData.featured || false,
    category: initialData.category || 'luxury',
    rating: initialData.rating || 4.5,
    reviewCount: initialData.reviewCount || 0,
    // Extended fields for detailed tour information
    highlights: initialData.highlights || [''],
    included: initialData.included || [''],
    itinerary: initialData.itinerary || [{ day: '1', activities: '' }],
    // Additional fields
    maxGroupSize: 12,
    languages: 'English, Vietnamese',
    whatToBring: ['']
  });
  
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

            <div className="space-y-2">
              <Label htmlFor="image" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Image URL
              </Label>
              <Input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="w-full"
                placeholder="https://example.com/image.jpg"
              />
            </div>

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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Category*
                </Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="luxury">Luxury</SelectItem>
                    <SelectItem value="adventure">Adventure</SelectItem>
                    <SelectItem value="cultural">Cultural</SelectItem>
                    <SelectItem value="nature">Nature</SelectItem>
                    <SelectItem value="city">City Tours</SelectItem>
                    <SelectItem value="beach">Beach & Islands</SelectItem>
                    <SelectItem value="culinary">Culinary</SelectItem>
                    <SelectItem value="wellness">Wellness</SelectItem>
                  </SelectContent>
                </Select>
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
                  onCheckedChange={(checked) => setFormData({...formData, featured: !!checked})}
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
                <Button type="button" onClick={() => addArrayItem('highlights')} variant="outline" size="sm">
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
                  {formData.highlights.length > 1 && (
                    <Button 
                      type="button" 
                      onClick={() => removeArrayItem('highlights', index)} 
                      variant="outline" 
                      size="sm"
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
                <Button type="button" onClick={() => addArrayItem('included')} variant="outline" size="sm">
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
                  {formData.included.length > 1 && (
                    <Button 
                      type="button" 
                      onClick={() => removeArrayItem('included', index)} 
                      variant="outline" 
                      size="sm"
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
                <Button type="button" onClick={() => addArrayItem('whatToBring')} variant="outline" size="sm">
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
                  {formData.whatToBring.length > 1 && (
                    <Button 
                      type="button" 
                      onClick={() => removeArrayItem('whatToBring', index)} 
                      variant="outline" 
                      size="sm"
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
                <Button type="button" onClick={addItineraryDay} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Day
                </Button>
              </div>
              {formData.itinerary.map((day, index) => (
                <Card key={index} className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <Badge variant="outline" className="bg-[#0093DE]/10 text-[#0093DE]">
                      Day {day.day}
                    </Badge>
                    {formData.itinerary.length > 1 && (
                      <Button 
                        type="button" 
                        onClick={() => removeItineraryDay(index)} 
                        variant="outline" 
                        size="sm"
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

        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-600 mt-8">
          <Button
            type="button"
            onClick={onCancel}
            variant="outline"
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
