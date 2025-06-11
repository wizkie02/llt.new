import React, { useState, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';

interface ImageUploadProps {
  onImageSelected: (imageUrl: string) => void;
  currentImage?: string;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onImageSelected, 
  currentImage, 
  className = '' 
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<'file' | 'url'>('file');
  const [urlInput, setUrlInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { getAuthHeaders } = useAuth();

  const validateFile = (file: File): string | null => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return 'Vui lòng chọn file ảnh hợp lệ (JPEG, PNG, GIF, hoặc WebP)';
    }
    
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return 'Kích thước file phải nhỏ hơn 5MB';
    }
    
    return null;
  };

  const handleFileUpload = async (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      setSuccess(null);
      return;
    }

    setIsUploading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const authHeaders = getAuthHeaders();
      
      const response = await fetch('https://leolovestravel.com/api/upload-image.php', {
        method: 'POST',
        headers: {
          'Authorization': authHeaders.Authorization
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Upload thất bại: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.success && result.imageUrl) {
        onImageSelected(result.imageUrl);
        setSuccess('Tải ảnh lên thành công!');
        setError(null);
        
        setTimeout(() => setSuccess(null), 3000);
      } else {
        throw new Error(result.error || 'Upload thất bại');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload thất bại';
      setError(errorMessage);
      setSuccess(null);
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleUrlSubmit = () => {
    if (!urlInput.trim()) {
      setError('Vui lòng nhập URL ảnh hợp lệ');
      setSuccess(null);
      return;
    }

    try {
      new URL(urlInput);
      onImageSelected(urlInput.trim());
      setUrlInput('');
      setError(null);
      setSuccess('Đã thêm URL ảnh thành công!');
      
      setTimeout(() => setSuccess(null), 3000);
    } catch {
      setError('Vui lòng nhập URL hợp lệ');
      setSuccess(null);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const clearImage = () => {
    onImageSelected('');
    setError(null);
    setSuccess(null);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
        Ảnh Tour
      </Label>

      {/* Method Selection */}
      <div className="flex space-x-2">
        <Button
          type="button"
          onClick={() => setUploadMethod('file')}
          className={`px-4 py-2 rounded text-xs ${
            uploadMethod === 'file'
              ? 'bg-[#0093DE] text-white'
              : 'border-2 border-[#0093DE] bg-transparent text-[#0093DE] hover:bg-[#0093DE] hover:text-white'
          }`}
        >
          Tải File Lên
        </Button>
        <Button
          type="button"
          onClick={() => setUploadMethod('url')}
          className={`px-4 py-2 rounded text-xs ${
            uploadMethod === 'url'
              ? 'bg-[#0093DE] text-white'
              : 'border-2 border-[#0093DE] bg-transparent text-[#0093DE] hover:bg-[#0093DE] hover:text-white'
          }`}
        >
          Dùng URL
        </Button>
      </div>

      {/* File Upload */}
      {uploadMethod === 'file' && (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
            disabled={isUploading}
          />
          
          <div
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className={`
              border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer
              hover:border-[#0093DE] hover:bg-blue-50 transition-colors
              ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {isUploading ? (
              <div className="text-[#0093DE]">
                <div className="animate-spin inline-block w-6 h-6 border-2 border-current border-t-transparent rounded-full mb-2"></div>
                <p>Đang tải lên...</p>
              </div>
            ) : (
              <div className="text-gray-500">
                <svg className="mx-auto h-12 w-12 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-lg font-medium">Nhấp để tải lên hoặc kéo thả</p>
                <p className="text-sm">PNG, JPG, GIF, WebP tối đa 5MB</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* URL Input */}
      {uploadMethod === 'url' && (
        <div className="space-y-2">
          <div className="flex space-x-2">
            <Input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Nhập URL ảnh (vd: https://example.com/image.jpg)"
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && handleUrlSubmit()}
            />
            <Button
              type="button"
              onClick={handleUrlSubmit}
              className="px-4 py-2 bg-[#0093DE] text-white rounded hover:bg-[#0077b3] transition-colors"
            >
              Sử Dụng URL
            </Button>
          </div>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          ✅ {success}
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          ❌ {error}
        </div>
      )}

      {/* Current Image Preview */}
      {currentImage && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Ảnh hiện tại:</p>
          <div className="relative inline-block">
            <img
              src={currentImage}
              alt="Ảnh tour hiện tại"
              className="h-32 w-48 object-cover rounded border"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="192" height="128" viewBox="0 0 192 128"><rect width="192" height="128" fill="%23f3f4f6"/><text x="96" y="64" text-anchor="middle" dy="0.3em" font-family="Arial" font-size="14" fill="%236b7280">Không có ảnh</text></svg>';
              }}
            />
            <Button
              type="button"
              onClick={clearImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 p-0"
            >
              ×
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export { ImageUpload };
export default ImageUpload;
