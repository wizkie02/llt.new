import { useState } from 'react';
import { TourOption } from '../../contexts/ToursContext';

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
    category: initialData.category || 'luxury'
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
    } else if (name === 'price') {
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
  
  // Submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">
        {submitLabel === 'Add Tour' ? 'Add New Tour' : 'Edit Tour'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-white" htmlFor="name">
              Tour Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
              placeholder="e.g. Halong Bay Luxury Cruise"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-white" htmlFor="location">
              Location*
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
              placeholder="e.g. Halong Bay, Vietnam"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-white" htmlFor="price">
              Price ($)*
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              min="0"
              step="0.01"
              required
              placeholder="e.g. 299.99"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-white" htmlFor="duration">
              Duration*
            </label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
              placeholder="e.g. 3 days, 2 nights"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-white" htmlFor="category">
              Category*
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            >
              <option value="luxury">Luxury</option>
              <option value="adventure">Adventure</option>
              <option value="cultural">Cultural</option>
              <option value="city">City</option>
              <option value="beach">Beach</option>
              <option value="family">Family</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-white" htmlFor="image">
              Image URL*
            </label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
              placeholder="e.g. https://example.com/image.jpg"
            />
            <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">
              Enter a URL to an image (JPG, PNG, WebP). For best results, use landscape orientation.
            </p>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1 dark:text-white" htmlFor="description">
              Description*
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
              placeholder="Provide a detailed description of the tour..."
            ></textarea>
          </div>
          
          <div className="md:col-span-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="h-4 w-4 text-[#0093DE] border-gray-300 rounded"
              />
              <label className="ml-2 text-sm font-medium dark:text-white" htmlFor="featured">
                Featured Tour (will be highlighted on the homepage)
              </label>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#0093DE] hover:bg-[#0077b3] text-white font-bold py-2 px-4 rounded"
          >
            {submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TourTemplateForm;
