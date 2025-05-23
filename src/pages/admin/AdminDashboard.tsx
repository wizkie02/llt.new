import { useState } from 'react';
import { useTours } from '../../contexts/ToursContext';

const AdminDashboard = () => {
  const { tours } = useTours();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Calculate statistics
  const totalTours = tours.length;
  const featuredTours = tours.filter(tour => tour.featured).length;
  const categories = [...new Set(tours.map(tour => tour.category))];
  
  // Calculate average price
  const averagePrice = tours.length > 0 
    ? tours.reduce((sum, tour) => sum + tour.price, 0) / tours.length 
    : 0;
  
  return (
    <div className="w-full px-4 py-8 mt-16">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-4 px-6 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-b-2 border-[#0093DE] text-[#0093DE]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('tours')}
            className={`py-4 px-6 font-medium text-sm ${
              activeTab === 'tours'
                ? 'border-b-2 border-[#0093DE] text-[#0093DE]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Tour Management
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-4 px-6 font-medium text-sm ${
              activeTab === 'settings'
                ? 'border-b-2 border-[#0093DE] text-[#0093DE]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Settings
          </button>
        </nav>
      </div>
      
      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-gray-500 text-sm font-medium">Total Tours</div>
              <div className="mt-2 text-3xl font-bold">{totalTours}</div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-gray-500 text-sm font-medium">Featured Tours</div>
              <div className="mt-2 text-3xl font-bold">{featuredTours}</div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-gray-500 text-sm font-medium">Categories</div>
              <div className="mt-2 text-3xl font-bold">{categories.length}</div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-gray-500 text-sm font-medium">Average Price</div>
              <div className="mt-2 text-3xl font-bold">${averagePrice.toFixed(2)}</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Tours</h2>
            <div className="overflow-x-auto w-full">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {tours.slice(0, 5).map((tour) => (
                    <tr key={tour.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{tour.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{tour.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">${tour.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {tour.category}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      
      {/* Tour Management Tab */}
      {activeTab === 'tours' && (
        <div className="w-full">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Tour Management</h2>
            <p className="mb-4">Manage your tours directly on this page:</p>
            <a 
              href="/admin/tour-management" 
              className="bg-[#0093DE] hover:bg-[#0077b3] text-white font-bold py-2 px-4 rounded inline-block"
              target="_self"
            >
              Open Tour Management
            </a>
          </div>
        </div>
      )}
      
      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Admin Settings</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-md font-medium mb-2">Access Control</h3>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="require-login"
                  className="h-4 w-4 text-[#0093DE] border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="require-login" className="ml-2 text-sm text-gray-700">
                  Require login for admin access
                </label>
              </div>
            </div>
            
            <div>
              <h3 className="text-md font-medium mb-2">Data Management</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="auto-backup"
                    className="h-4 w-4 text-[#0093DE] border-gray-300 rounded"
                    defaultChecked
                  />
                  <label htmlFor="auto-backup" className="ml-2 text-sm text-gray-700">
                    Enable automatic data backup
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="confirm-delete"
                    className="h-4 w-4 text-[#0093DE] border-gray-300 rounded"
                    defaultChecked
                  />
                  <label htmlFor="confirm-delete" className="ml-2 text-sm text-gray-700">
                    Confirm before deleting tours
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-md font-medium mb-2">Export Data</h3>
              <button
                className="bg-[#0093DE] hover:bg-[#0077b3] text-white font-medium py-2 px-4 rounded"
              >
                Export Tours as CSV
              </button>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <button
                className="bg-[#BF0603] hover:bg-red-700 text-white font-medium py-2 px-4 rounded"
              >
                Reset to Default Tours
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
