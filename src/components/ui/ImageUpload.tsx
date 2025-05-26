import React, { useState, useRef } from 'react';
import { Button } from './button';
import { Label } from './label';
import { Input } from './input';
import { Card } from './card';
import { Upload, X, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  label = "Image",
  className = ""
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [urlInput, setUrlInput] = useState(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Convert file to base64 for local storage
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  // Handle file upload
  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    try {
      // For demo purposes, we'll convert to base64
      // In a real app, you'd upload to a server/cloud storage
      const base64 = await fileToBase64(file);
      
      // Store in localStorage for persistence (in real app, use proper storage)
      const imageId = `tour_image_${Date.now()}`;
      localStorage.setItem(imageId, base64);
      
      // Return a local URL reference
      const localUrl = `local://images/${imageId}`;
      onChange(localUrl);
      
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  // Handle drag and drop
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  // Handle URL input
  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
    }
  };

  // Remove image
  const handleRemove = () => {
    // If it's a local image, remove from localStorage
    if (value.startsWith('local://images/')) {
      const imageId = value.replace('local://images/', '');
      localStorage.removeItem(imageId);
    }
    onChange('');
    setUrlInput('');
  };

  // Get display URL for local images
  const getDisplayUrl = (url: string) => {
    if (url.startsWith('local://images/')) {
      const imageId = url.replace('local://images/', '');
      return localStorage.getItem(imageId) || '';
    }
    return url;
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
        {label}
      </Label>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload Image</TabsTrigger>
          <TabsTrigger value="url">Image URL</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4">
          {/* Current Image Display */}
          {value && (
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Current Image:
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleRemove}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              </div>
              <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <img
                  src={getDisplayUrl(value)}
                  alt="Tour preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=Image+Not+Found';
                  }}
                />
              </div>
            </Card>
          )}

          {/* Upload Area */}
          <Card
            className={`p-8 border-2 border-dashed transition-colors ${
              dragActive
                ? 'border-[#0093DE] bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-300 dark:border-gray-600'
            } ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-[#0093DE]/10 mb-4">
                {isUploading ? (
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0093DE]"></div>
                ) : (
                  <Upload className="h-8 w-8 text-[#0093DE]" />
                )}
              </div>
              
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {isUploading ? 'Uploading...' : 'Upload Image'}
              </h3>
              
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Drag and drop your image here, or click to select
              </p>
              
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="mb-2"
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                Choose File
              </Button>
              
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Supports: JPG, PNG, GIF (max 5MB)
              </p>
            </div>
          </Card>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
          />
        </TabsContent>

        <TabsContent value="url" className="space-y-4">
          {/* Current Image Display */}
          {value && (
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Current Image:
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleRemove}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              </div>
              <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <img
                  src={getDisplayUrl(value)}
                  alt="Tour preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=Image+Not+Found';
                  }}
                />
              </div>
            </Card>
          )}

          {/* URL Input */}
          <Card className="p-4">
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Image URL
              </Label>
              <div className="flex gap-2">
                <Input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleUrlSubmit}
                  disabled={!urlInput.trim()}
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Load
                </Button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Enter a direct link to an image file
              </p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ImageUpload;
