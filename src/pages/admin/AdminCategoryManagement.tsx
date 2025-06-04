import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit, PlusCircle, Trash2, XCircle, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Category {
  id: string;
  name: string;
}

const AdminCategoryManagement = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState('');
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOperating, setIsOperating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Load categories from API
  const loadCategories = async () => {
    setLoading(true);
    setError(null);
    
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
      console.log('Data type:', typeof data);
      console.log('Data keys:', Object.keys(data || {}));
      
      // Handle multiple response formats
      if (Array.isArray(data)) {
        // Direct array response format: [{"id": "1", "name": "Adventure"}, ...]
        console.log('Using direct array format');
        setCategories(data);
      } else if (data && typeof data === 'object') {
        // Check for various object formats
        if (data.success && data.categories && Array.isArray(data.categories)) {
          // Wrapped response format: {"success": true, "categories": [...]}
          console.log('Using wrapped success format');
          setCategories(data.categories);
        } else if (data.data && Array.isArray(data.data)) {
          // Alternative format: {"data": [...]}
          console.log('Using data wrapper format');
          setCategories(data.data);
        } else if (data.categories && Array.isArray(data.categories)) {
          // Categories only format: {"categories": [...]}
          console.log('Using categories only format');
          setCategories(data.categories);
        } else {
          console.error('Invalid categories API response format:', data);
          setError(`Invalid API response format. Expected array or object with categories but got: ${JSON.stringify(data)}`);
          setCategories([]);
        }
      } else {
        console.error('Invalid categories API response format:', data);
        setError(`Invalid API response format. Expected array or object but got: ${typeof data}`);
        setCategories([]);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
      setError(`Failed to load categories: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  // Load categories on component mount
  useEffect(() => {
    loadCategories();
  }, []);
  // Add category
  const handleAddCategory = async () => {
    if (!newCategory.trim() || isOperating) return;
    
    setIsOperating(true);
    setError(null);
    
    try {
      const response = await fetch('https://leolovestravel.com/api/add-categories.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newCategory.trim()
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
        setNewCategory('');
        // Reload categories to get updated list
        await loadCategories();
      } else {
        console.error('Failed to add category:', data);
        setError(data.message || data.error || 'Failed to add category');
      }
    } catch (error) {
      console.error('Error adding category:', error);
      setError(`Failed to add category: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsOperating(false);
    }
  };
  // Update category
  const handleUpdateCategory = async () => {
    if (editingIndex === null || !editingValue.trim() || isOperating) return;
    
    const categoryToUpdate = categories[editingIndex];
    if (!categoryToUpdate) return;
    
    setIsOperating(true);
    setError(null);
    
    try {
      const response = await fetch(`https://leolovestravel.com/api/update-category.php?id=${categoryToUpdate.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editingValue.trim()
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const rawText = await response.text();
      console.log('Update Category Raw Response:', rawText);
      
      let data;
      try {
        data = JSON.parse(rawText);
      } catch (parseError) {
        throw new Error(`JSON parse error: ${parseError}. Raw response: ${rawText}`);
      }
      
      console.log('Update Category Response:', data);
      
      // Handle various success response formats
      const isSuccess = data.success === true || data.status === 'success' || data.result === 'success';
      
      if (isSuccess) {
        console.log('Category updated successfully:', data);
        setEditingIndex(null);
        setEditingValue('');
        // Reload categories to get updated list
        await loadCategories();
      } else {
        console.error('Failed to update category:', data);
        setError(data.message || data.error || 'Failed to update category');
      }
    } catch (error) {
      console.error('Error updating category:', error);
      setError(`Failed to update category: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsOperating(false);
    }
  };
  // Delete category
  const handleDeleteCategory = async () => {
    if (deleteIndex === null || isOperating) return;
    
    const categoryToDelete = categories[deleteIndex];
    if (!categoryToDelete) return;
    
    setIsOperating(true);
    setError(null);
    
    try {
      const response = await fetch(`https://leolovestravel.com/api/delete-category.php?id=${categoryToDelete.id}`, {
        method: 'GET'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const rawText = await response.text();
      console.log('Delete Category Raw Response:', rawText);
      
      let data;
      try {
        data = JSON.parse(rawText);
      } catch (parseError) {
        throw new Error(`JSON parse error: ${parseError}. Raw response: ${rawText}`);
      }
      
      console.log('Delete Category Response:', data);
      
      // Handle various success response formats
      const isSuccess = data.success === true || data.status === 'success' || data.result === 'success';
      
      if (isSuccess) {
        console.log('Category deleted successfully:', data);
        setDeleteIndex(null);
        // Reload categories to get updated list
        await loadCategories();
      } else {
        console.error('Failed to delete category:', data);
        setError(data.message || data.error || 'Failed to delete category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      setError(`Failed to delete category: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsOperating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin h-8 w-8" />
        <span className="ml-2">Loading categories...</span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Category Management</CardTitle>
        </CardHeader>
        <CardContent>          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
              <div className="mt-2 flex gap-2">                <Button 
                  onClick={() => setError(null)} 
                  className="text-red-700 hover:text-red-900 hover:bg-red-50 bg-transparent"
                >
                  ×
                </Button>
                <Button 
                  onClick={loadCategories} 
                  disabled={isOperating}
                  className="text-red-700 border-red-300 hover:bg-red-50 border"
                >
                  {isOperating ? (
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  ) : null}
                  Debug API
                </Button>
              </div>
            </div>
          )}

          {/* Add Category Section */}
          <div className="mb-6 p-4 border rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Add New Category</h3>
            <div className="flex gap-2">
              <Input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter category name"
                onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                disabled={isOperating}
              />
              <Button 
                onClick={handleAddCategory} 
                disabled={!newCategory.trim() || isOperating}
                className="flex items-center gap-2"
              >
                {isOperating ? (
                  <Loader2 className="animate-spin h-4 w-4" />
                ) : (
                  <PlusCircle className="h-4 w-4" />
                )}
                Add
              </Button>
            </div>
          </div>

          {/* Categories List */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Existing Categories ({categories.length})</h3>
            
            {categories.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No categories found.</p>                <Button 
                  onClick={loadCategories} 
                  className="mt-2 border-2 border-[#0093DE] bg-transparent text-[#0093DE] hover:bg-[#0093DE] hover:text-white"
                  disabled={isOperating}
                >
                  {isOperating ? (
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  ) : null}
                  Refresh
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                {categories.map((category, index) => (
                  <div key={category.id} className="flex items-center gap-2 p-3 border rounded-lg">
                    {editingIndex === index ? (
                      <>
                        <Input
                          value={editingValue}
                          onChange={(e) => setEditingValue(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleUpdateCategory()}
                          className="flex-1"
                          autoFocus
                          disabled={isOperating}
                        />
                        <Button 
                          onClick={handleUpdateCategory} 
                          disabled={!editingValue.trim() || isOperating}
                        >
                          {isOperating ? (
                            <Loader2 className="animate-spin h-4 w-4" />
                          ) : (
                            'Save'
                          )}
                        </Button>                        <Button 
                          onClick={() => {
                            setEditingIndex(null);
                            setEditingValue('');
                          }} 
                          className="h-9 px-4 text-xs border-2 border-[#0093DE] bg-transparent text-[#0093DE] hover:bg-[#0093DE] hover:text-white"
                          disabled={isOperating}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <span className="flex-1 font-medium">{category.name}</span>
                        <span className="text-sm text-gray-500">ID: {category.id}</span>                        <Button
                          onClick={() => {
                            setEditingIndex(index);
                            setEditingValue(category.name);
                          }}
                          className="h-9 px-4 text-xs border-2 border-[#0093DE] bg-transparent text-[#0093DE] hover:bg-[#0093DE] hover:text-white"
                          disabled={isOperating}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => setDeleteIndex(index)}
                          className="h-9 px-4 text-xs border-2 border-[#0093DE] bg-transparent text-red-600 hover:text-red-800 hover:bg-red-50"
                          disabled={isOperating}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Refresh Button */}
          <div className="mt-6 flex justify-center">            <Button 
              onClick={loadCategories} 
              disabled={isOperating}
              className="flex items-center gap-2 border-2 border-[#0093DE] bg-transparent text-[#0093DE] hover:bg-[#0093DE] hover:text-white"
            >
              {isOperating ? (
                <Loader2 className="animate-spin h-4 w-4" />
              ) : null}
              Refresh Categories
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteIndex !== null} onOpenChange={() => setDeleteIndex(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete the category "{deleteIndex !== null ? categories[deleteIndex]?.name : ''}"?</p>
            <p className="text-sm text-gray-600 mt-2">This action cannot be undone.</p>
          </div>
          <div className="flex justify-end gap-2">            <Button 
              className="border-2 border-[#0093DE] bg-transparent text-[#0093DE] hover:bg-[#0093DE] hover:text-white"
              onClick={() => setDeleteIndex(null)}
              disabled={isOperating}
            >
              Cancel
            </Button>
            <Button 
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={handleDeleteCategory}
              disabled={isOperating}
            >
              {isOperating ? (
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
              ) : null}
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCategoryManagement;
