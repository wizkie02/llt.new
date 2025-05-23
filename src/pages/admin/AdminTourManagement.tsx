import { useState } from 'react';
import { useTours, TourOption } from '../../contexts/ToursContext';
import TourTemplateForm from './TourTemplateForm';

const AdminTourManagement = () => {
  const { tours, addTour, updateTour, removeTour } = useTours();
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTour, setCurrentTour] = useState<TourOption | null>(null);
  
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
  
  // Delete a tour
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this tour?')) {
      removeTour(id);
    }
  };
  
  return (
    <div className="w-full px-4 py-8 mt-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tour Management</h1>
        {!isAdding && !isEditing && (
          <button 
            onClick={handleStartAdd}
            className="bg-[#0093DE] hover:bg-[#0077b3] text-white font-bold py-2 px-4 rounded"
          >
            Add New Tour
          </button>
        )}
      </div>
      
      {/* Add/Edit Form */}
      {isAdding && (
        <TourTemplateForm
          onSubmit={handleAddSubmit}
          onCancel={handleCancel}
          submitLabel="Add Tour"
        />
      )}
      
      {isEditing && currentTour && (
        <TourTemplateForm
          initialData={currentTour}
          onSubmit={handleEditSubmit}
          onCancel={handleCancel}
          submitLabel="Update Tour"
        />
      )}
      
      {/* Tours List */}
      {!isAdding && !isEditing && (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto w-full">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Tour
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Duration
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Featured
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {tours.map((tour) => (
                  <tr key={tour.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full object-cover" src={tour.image} alt={tour.name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{tour.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{tour.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">${tour.price}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{tour.duration}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                        {tour.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {tour.featured ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                          Featured
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                          Standard
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleStartEdit(tour)}
                        className="text-[#0093DE] hover:text-[#0077b3] mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(tour.id)}
                        className="text-[#BF0603] hover:text-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTourManagement;
