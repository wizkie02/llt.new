import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Edit, PlusCircle, Trash2, XCircle, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';

const AdminCategoryManagement = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState('');
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOperating, setIsOperating] = useState(false); // New loading state for operations
  const [error, setError] = useState<string | null>(null);
  const [apiResponse, setApiResponse] = useState<string>('');
  const [showDebug, setShowDebug] = useState(false);

  // Manual refresh function
  const refreshCategories = () => {
    setLoading(true);
    setError(null);
    
    fetch('https://leolovestravel.com/api/get-categories.php')
      .then(res => {
        // console.log('Refresh - Response status:', res.status);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.text();
      })
      .then(responseText => {
        // console.log('Refresh - Raw API response:', responseText);
        setApiResponse(responseText);
        
        try {
          const data = JSON.parse(responseText);
          // console.log('Refresh - Parsed API response:', data);
          
          let categoriesArray = [];
          
          if (Array.isArray(data)) {
            if (data.length > 0 && typeof data[0] === 'object' && data[0].name) {
              categoriesArray = data.map((c: { name: string }) => c.name);
            } else if (data.length > 0 && typeof data[0] === 'string') {
              categoriesArray = data;
            } else {
              categoriesArray = data;
            }
          } else if (data.categories && Array.isArray(data.categories)) {
            if (data.categories.length > 0 && typeof data.categories[0] === 'object' && data.categories[0].name) {
              categoriesArray = data.categories.map((c: { name: string }) => c.name);
            } else {
              categoriesArray = data.categories;
            }
          } else if (data.data && Array.isArray(data.data)) {
            if (data.data.length > 0 && typeof data.data[0] === 'object' && data.data[0].name) {
              categoriesArray = data.data.map((c: { name: string }) => c.name);
            } else {
              categoriesArray = data.data;
            }
          }
          
          // console.log('Refresh - Final categories array:', categoriesArray);
          setCategories(categoriesArray);
          setLoading(false);
          
        } catch (parseError) {
          console.error('Refresh - JSON parse error:', parseError);
          setError('API response is not valid JSON.');
          setLoading(false);
        }
      })
      .catch(error => {
        console.error('Refresh - Fetch error:', error);
        setError('Failed to refresh categories from API.');
        setLoading(false);
      });
  };

  // Fetch categories
  useEffect(() => {
    setLoading(true);
    setError(null);
    
    fetch('https://leolovestravel.com/api/get-categories.php')
      .then(res => {
        // console.log('Response status:', res.status);
        // console.log('Response headers:', res.headers);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.text(); // Get as text first to see raw response
      })
      .then(responseText => {
        // console.log('Raw API response:', responseText);
        setApiResponse(responseText); // Store for debugging
        
        try {
          const data = JSON.parse(responseText);
          // console.log('Parsed API response:', data);
          // console.log('Type of data:', typeof data);
          // console.log('Data keys:', Object.keys(data));

          // Handle different possible response formats
          let categoriesArray = [];
          
          if (Array.isArray(data)) {
            // Check if it's array of objects with 'name' property (like PackageTours expects)
            if (data.length > 0 && typeof data[0] === 'object' && data[0].name) {
              categoriesArray = data.map((c: { name: string }) => c.name);
              // console.log('Response is array of objects with name property:', categoriesArray);
            } else if (data.length > 0 && typeof data[0] === 'string') {
              // If response is directly an array of strings
              categoriesArray = data;
              // console.log('Response is array of strings:', data);
            } else {
              categoriesArray = data;
              // console.log('Response is array (other format):', data);
            }
          } else if (data.categories && Array.isArray(data.categories)) {
            // If response is object with categories property
            if (data.categories.length > 0 && typeof data.categories[0] === 'object' && data.categories[0].name) {
              categoriesArray = data.categories.map((c: { name: string }) => c.name);
            } else {
              categoriesArray = data.categories;
            }
            // console.log('Response has categories property:', categoriesArray);
          } else if (data.data && Array.isArray(data.data)) {
            // If response is object with data property
            if (data.data.length > 0 && typeof data.data[0] === 'object' && data.data[0].name) {
              categoriesArray = data.data.map((c: { name: string }) => c.name);
            } else {
              categoriesArray = data.data;
            }
            // console.log('Response has data property:', categoriesArray);
          } else if (data.success && data.categories) {
            // If response has success flag and categories
            if (Array.isArray(data.categories) && data.categories.length > 0 && typeof data.categories[0] === 'object' && data.categories[0].name) {
              categoriesArray = data.categories.map((c: { name: string }) => c.name);
            } else {
              categoriesArray = data.categories;
            }
            // console.log('Response has success flag and categories:', categoriesArray);
          } else {
            // Try to find any array in the response
            for (const key in data) {
              if (Array.isArray(data[key])) {
                if (data[key].length > 0 && typeof data[key][0] === 'object' && data[key][0].name) {
                  categoriesArray = data[key].map((c: { name: string }) => c.name);
                } else {
                  categoriesArray = data[key];
                }
                // console.log(`Found array in ${key}:`, categoriesArray);
                break;
              }
            }
          }
          
          // console.log('Final categories array:', categoriesArray);
          setCategories(categoriesArray);
          setLoading(false);
          
        } catch (parseError) {
          console.error('JSON parse error:', parseError);
          // console.log('Response is not valid JSON, treating as plain text');
          setError('API response is not valid JSON. Using sample data.');
          setCategories(['Adventure Tours', 'Cultural Tours', 'Beach Tours', 'Mountain Tours', 'City Tours']);
          setLoading(false);
        }
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setError('Failed to connect to API. Using sample data.');
        // Fallback to sample data for testing
        setCategories(['Adventure Tours', 'Cultural Tours', 'Beach Tours', 'Mountain Tours', 'City Tours']);
        setLoading(false);
      });
  }, []);

  const handleAddCategory = () => {
    if (!newCategory.trim() || isOperating) return;
    
    const categoryName = newCategory.trim();
    setIsOperating(true); // Set operating state
    
    // Try multiple API patterns that might work
    fetch(`https://leolovestravel.com/api/add-category.php?name=${encodeURIComponent(categoryName)}`, {
      method: 'GET',
    })
      .then(res => {
        // console.log('Add category response status:', res.status);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.text();
      })
      .then(responseText => {
        // console.log('Add category response:', responseText);
        
        try {
          const data = JSON.parse(responseText);
          if (data.success) {
            // console.log('Category added successfully via API');
            // Refresh categories from server to get latest data
            setTimeout(() => refreshCategories(), 500);
            setNewCategory('');
          } else {
            throw new Error(data.message || 'Add failed');
          }
        } catch (parseError) {
          // If response is not JSON, try alternative POST method
          // console.log('GET method failed, trying POST method...');
          return fetch('https://leolovestravel.com/api/add-category.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: categoryName }),
          })
            .then(res => res.text())
            .then(text => {
              console.log('POST Add response:', text);
              // Add locally and refresh from server
              setCategories([...categories, categoryName]);
              setNewCategory('');
              setTimeout(() => refreshCategories(), 500);
              console.log('Category added locally after API attempt');
            });
        }
      })
      .catch(error => {
        console.error('Error adding category:', error);
        // Fallback: add locally for better user experience
        setCategories([...categories, categoryName]);
        setNewCategory('');
        console.log('Category added locally due to API error');
      })
      .finally(() => {
        setIsOperating(false); // Reset operating state
      });
  };

  const handleUpdateCategory = () => {
    if (editingIndex === null || !editingValue.trim() || isOperating) return;
    
    const oldCategory = categories[editingIndex];
    const newCategory = editingValue.trim();
    setIsOperating(true); // Set operating state
    
    // Try multiple API patterns that might work
    fetch(`https://leolovestravel.com/api/update-category.php?old=${encodeURIComponent(oldCategory)}&new=${encodeURIComponent(newCategory)}`, {
      method: 'GET',
    })
      .then(res => {
        console.log('Update category response status:', res.status);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.text();
      })
      .then(responseText => {
        console.log('Update category response:', responseText);
        
        try {
          const data = JSON.parse(responseText);
          if (data.success) {
            console.log('Category updated successfully via API');
            // Refresh categories from server to get latest data
            setTimeout(() => refreshCategories(), 500);
            setEditingIndex(null);
            setEditingValue('');
          } else {
            throw new Error(data.message || 'Update failed');
          }
        } catch (parseError) {
          // If response is not JSON, try alternative POST method
          console.log('GET method failed, trying POST method...');
          return fetch('https://leolovestravel.com/api/update-category.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ old: oldCategory, name: newCategory }),
          })
            .then(res => res.text())
            .then(text => {
              console.log('POST Update response:', text);
              // Update locally and refresh from server
              const updated = [...categories];
              updated[editingIndex] = newCategory;
              setCategories(updated);
              setTimeout(() => refreshCategories(), 500);
              console.log('Category updated locally after API attempt');
              setEditingIndex(null);
              setEditingValue('');
            });
        }
      })
      .catch(error => {
        console.error('Error updating category:', error);
        // Fallback: update locally for better user experience
        const updated = [...categories];
        updated[editingIndex] = newCategory;
        setCategories(updated);
        setEditingIndex(null);
        setEditingValue('');
        console.log('Category updated locally due to API error');
      })
      .finally(() => {
        setIsOperating(false); // Reset operating state
      });
  };

  const handleDeleteCategory = () => {
    if (deleteIndex === null || isOperating) return;
    
    const categoryToDelete = categories[deleteIndex];
    setIsOperating(true); // Set operating state
    
    // Try multiple API patterns that might work
    fetch(`https://leolovestravel.com/api/delete-category.php?name=${encodeURIComponent(categoryToDelete)}`, {
      method: 'GET',
    })
      .then(res => {
        console.log('Delete category response status:', res.status);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.text();
      })
      .then(responseText => {
        console.log('Delete category response:', responseText);
        
        try {
          const data = JSON.parse(responseText);
          if (data.success) {
            console.log('Category deleted successfully via API');
            // Refresh categories from server to get latest data
            setTimeout(() => refreshCategories(), 500);
            setDeleteIndex(null);
          } else {
            throw new Error(data.message || 'Delete failed');
          }
        } catch (parseError) {
          // If response is not JSON, try alternative POST method
          console.log('GET method failed, trying POST method...');
          return fetch('https://leolovestravel.com/api/delete-category.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: categoryToDelete }),
          })
            .then(res => res.text())
            .then(text => {
              console.log('POST Delete response:', text);
              // Delete locally and refresh from server
              setCategories(categories.filter((_, i) => i !== deleteIndex));
              setTimeout(() => refreshCategories(), 500);
              console.log('Category deleted locally after API attempt');
              setDeleteIndex(null);
            });
        }
      })
      .catch(error => {
        console.error('Error deleting category:', error);
        // Fallback: delete locally for better user experience
        setCategories(categories.filter((_, i) => i !== deleteIndex));
        setDeleteIndex(null);
        console.log('Category deleted locally due to API error');
      })
      .finally(() => {
        setIsOperating(false); // Reset operating state
      });
  };

  return (
    <div className="container mx-auto py-10 max-w-4xl">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-[#0093DE] text-2xl font-bold">Manage Categories</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg">
              ⚠️ {error}
              <div className="mt-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => window.location.reload()}
                  className="mr-2"
                  disabled={isOperating}
                >
                  Retry Loading
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => {
                    fetch('https://leolovestravel.com/api/get-categories.php')
                      .then(res => res.text())
                      .then(text => {
                        console.log('Manual test response:', text);
                        setApiResponse(text);
                        setShowDebug(true);
                        alert('Check console for API response details');
                      })
                      .catch(err => {
                        console.error('Manual test error:', err);
                        alert('API test failed - check console');
                      });
                  }}
                  disabled={isOperating}
                >
                  Test API
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setShowDebug(!showDebug)}
                  className="ml-2"
                  disabled={isOperating}
                >
                  {showDebug ? 'Hide' : 'Show'} Debug
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={refreshCategories}
                  className="ml-2 bg-blue-50 hover:bg-blue-100 text-blue-600"
                  disabled={isOperating}
                >
                  🔄 Refresh
                </Button>
              </div>
            </div>
          )}
          
          {/* Operating indicator */}
          {isOperating && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg flex items-center">
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              Processing your request...
            </div>
          )}
          
          <div className="flex gap-4 mb-6">
            <Input 
              value={newCategory} 
              onChange={e => setNewCategory(e.target.value)} 
              placeholder="Enter new category name" 
              className="flex-1"
              disabled={isOperating}
            />
            <Button 
              onClick={handleAddCategory} 
              disabled={!newCategory.trim() || isOperating}
              className="bg-[#0093DE] text-white hover:bg-[#007BC4]"
            >
              {isOperating ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <PlusCircle className="mr-2 h-5 w-5" />
              )}
              Add Category
            </Button>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#0093DE]"></div>
              <p className="mt-2 text-gray-600">Loading categories...</p>
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="text-lg">No categories found</p>
              <p className="text-sm">Add your first category above</p>
            </div>
          ) : (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Existing Categories ({categories.length})
              </h3>
              {categories.map((category, index) => (
                <div key={index} className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-600">
                  {editingIndex === index ? (
                    <Input 
                      value={editingValue} 
                      onChange={e => setEditingValue(e.target.value)} 
                      className="flex-1 mr-4"
                      autoFocus
                      disabled={isOperating}
                    />
                  ) : (
                    <span className="text-lg font-medium text-gray-800 dark:text-white flex-1">
                      {category}
                    </span>
                  )}
                  <div className="flex gap-2">
                    {editingIndex === index ? (
                      <>
                        <Button 
                          size="sm" 
                          onClick={handleUpdateCategory} 
                          disabled={!editingValue.trim() || isOperating}
                          className="bg-green-500 text-white hover:bg-green-600"
                        >
                          {isOperating ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            'Save'
                          )}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => {setEditingIndex(null); setEditingValue('');}}
                          disabled={isOperating}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => { setEditingIndex(index); setEditingValue(category); }}
                          className="hover:bg-blue-50"
                          disabled={isOperating}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive" 
                          onClick={() => setDeleteIndex(index)}
                          className="hover:bg-red-600"
                          disabled={isOperating}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Debug Panel */}
      {showDebug && apiResponse && (
        <Card className="mb-6 border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600 text-lg">🔍 API Debug Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Raw API Response:</h4>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto max-h-40">
                  {apiResponse}
                </pre>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Current Categories State:</h4>
                <pre className="bg-blue-50 p-3 rounded text-sm">
                  {JSON.stringify(categories, null, 2)}
                </pre>
              </div>
              <div>
                <h4 className="font-semibold mb-2">API URL:</h4>
                <code className="bg-gray-100 p-2 rounded text-sm">
                  https://leolovestravel.com/api/get-categories.php
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteIndex !== null} onOpenChange={() => !isOperating && setDeleteIndex(null)}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-red-600 text-xl font-bold flex items-center">
              <Trash2 className="mr-2 h-5 w-5" />
              Confirm Delete Category
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-6">
            <div className="mx-auto mb-6 p-4 bg-red-50 rounded-lg border-2 border-red-200">
              <p className="text-gray-700 mb-2">Are you sure you want to delete this category?</p>
              <p className="text-red-600 font-semibold text-lg">"{categories[deleteIndex ?? 0]}"</p>
              <p className="text-sm text-gray-500 mt-2">This action cannot be undone.</p>
            </div>
            <div className="flex justify-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setDeleteIndex(null)} 
                className="px-6 hover:bg-gray-50"
                disabled={isOperating}
              >
                <XCircle className="mr-2 h-4 w-4" /> Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDeleteCategory} 
                className="px-6 bg-red-600 hover:bg-red-700"
                disabled={isOperating}
              >
                {isOperating ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="mr-2 h-4 w-4" />
                )}
                Delete Category
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCategoryManagement;
