import { useState, useEffect, useRef } from 'react';
import { TourOption } from '../../contexts/ToursContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Checkbox } from '../../components/ui/checkbox';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Plus, Trash2, Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';



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
}: TourTemplateFormProps) => {
  const { getAuthHeaders } = useAuth();
    // ImageUpload Component
  const ImageUpload = ({ 
    onImageSelected, 
    currentImage, 
    className = ''   }: {
    onImageSelected: (imageUrl: string) => void;
    currentImage?: string;
    className?: string;
  }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadMethod, setUploadMethod] = useState<'file' | 'url'>('file');
    const [urlInput, setUrlInput] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
      // Image editing states
    const [showImageEditor, setShowImageEditor] = useState(false);
    const [originalImage, setOriginalImage] = useState<string>('');
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [imageTransform, setImageTransform] = useState({
      scale: 1,
      rotation: 0,
      x: 0,
      y: 0,
      cropX: 0,
      cropY: 0,
      cropWidth: 0,
      cropHeight: 0
    });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [isCropping, setIsCropping] = useState(false);
    const [cropStart, setCropStart] = useState({ x: 0, y: 0 });    const validateFile = (file: File): string | null => {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        return 'Please select a valid image file (JPEG, PNG, GIF, or WebP)';
      }
      
      const maxSize = 10 * 1024 * 1024; // 10MB cho ảnh tour chất lượng cao
      if (file.size > maxSize) {
        return 'File size must be less than 10MB';
      }
      
      return null;
    };    // Image editing functions
    const loadImageToCanvas = (imageUrl: string) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size chuẩn 1280x720 - auto fit chiều ngang 1280px
        const standardWidth = 1280;
        const standardHeight = 720;
        
        // Luôn giữ chiều ngang cố định là 1280px
        let canvasWidth = standardWidth;
        let canvasHeight = standardHeight;
        
        // Tính toán chiều dọc dựa trên tỷ lệ ảnh gốc
        const imageRatio = img.width / img.height;
        canvasHeight = Math.round(canvasWidth / imageRatio);
        
        // Giới hạn chiều dọc trong khoảng hợp lý (400-1080px)
        if (canvasHeight < 400) canvasHeight = 400;
        if (canvasHeight > 1080) canvasHeight = 1080;
        
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        
        // Reset transform
        setImageTransform({
          scale: 1,
          rotation: 0,
          x: 0,
          y: 0,
          cropX: 0,
          cropY: 0,
          cropWidth: canvas.width,
          cropHeight: canvas.height
        });
        
        // Draw image
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
      img.src = imageUrl;
    };

    const drawImageOnCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas || !originalImage) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Save context
        ctx.save();
        
        // Apply transformations
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        ctx.translate(centerX + imageTransform.x, centerY + imageTransform.y);
        ctx.scale(imageTransform.scale, imageTransform.scale);
        ctx.rotate((imageTransform.rotation * Math.PI) / 180);
        
        // Draw image centered
        ctx.drawImage(img, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
        
        // Restore context
        ctx.restore();
        
        // Draw crop rectangle if cropping
        if (isCropping && imageTransform.cropWidth > 0 && imageTransform.cropHeight > 0) {
          ctx.strokeStyle = '#ff0000';
          ctx.lineWidth = 2;
          ctx.setLineDash([5, 5]);
          ctx.strokeRect(
            imageTransform.cropX,
            imageTransform.cropY,
            imageTransform.cropWidth,
            imageTransform.cropHeight
          );
          ctx.setLineDash([]);
        }
      };
      img.src = originalImage;
    };

    const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      if (isCropping) {
        setCropStart({ x, y });
        setImageTransform(prev => ({ ...prev, cropX: x, cropY: y, cropWidth: 0, cropHeight: 0 }));
      } else {
        setIsDragging(true);
        setDragStart({ x: x - imageTransform.x, y: y - imageTransform.y });
      }
    };

    const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      if (isCropping) {
        const width = x - cropStart.x;
        const height = y - cropStart.y;
        setImageTransform(prev => ({ 
          ...prev, 
          cropWidth: Math.abs(width), 
          cropHeight: Math.abs(height),
          cropX: width < 0 ? x : cropStart.x,
          cropY: height < 0 ? y : cropStart.y
        }));
        drawImageOnCanvas();
      } else if (isDragging) {
        setImageTransform(prev => ({ 
          ...prev, 
          x: x - dragStart.x, 
          y: y - dragStart.y 
        }));
        drawImageOnCanvas();
      }
    };

    const handleCanvasMouseUp = () => {
      setIsDragging(false);
    };

    // Apply crop to image
    const applyCrop = () => {
      const canvas = canvasRef.current;
      if (!canvas || !originalImage) return;
      
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return;
      
      tempCanvas.width = imageTransform.cropWidth;
      tempCanvas.height = imageTransform.cropHeight;
      
      const img = new Image();
      img.onload = () => {
        // Calculate source coordinates based on crop area
        const scaleX = img.width / canvas.width;
        const scaleY = img.height / canvas.height;
        
        tempCtx.drawImage(
          img,
          imageTransform.cropX * scaleX,
          imageTransform.cropY * scaleY,
          imageTransform.cropWidth * scaleX,
          imageTransform.cropHeight * scaleY,
          0,
          0,
          imageTransform.cropWidth,
          imageTransform.cropHeight
        );
        
        // Update canvas
        canvas.width = imageTransform.cropWidth;
        canvas.height = imageTransform.cropHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(tempCanvas, 0, 0);
        }
        
        // Reset crop state
        setIsCropping(false);
        setImageTransform(prev => ({
          ...prev,
          cropX: 0,
          cropY: 0,
          cropWidth: canvas.width,
          cropHeight: canvas.height,
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0
        }));
      };
      img.src = originalImage;
    };

    // Resize image
    const resizeImage = (width: number, height: number) => {
      const canvas = canvasRef.current;
      if (!canvas || !originalImage) return;
      
      const img = new Image();
      img.onload = () => {
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);
        }
        
        setImageTransform(prev => ({
          ...prev,
          cropWidth: width,
          cropHeight: height,
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0
        }));
      };
      img.src = originalImage;
    };

    // Save edited image
    const saveEditedImage = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
        canvas.toBlob((blob) => {
        if (blob) {
          setShowImageEditor(false);
          
          // Upload the edited image
          const file = new File([blob], 'edited-image.jpg', { type: 'image/jpeg' });
          handleFileUpload(file);
        }
      }, 'image/jpeg', 0.9);
    };    // Reset image editor
    const resetImageEditor = () => {
      setShowImageEditor(false);
      setOriginalImage('');
      setImageTransform({
        scale: 1,
        rotation: 0,
        x: 0,
        y: 0,
        cropX: 0,
        cropY: 0,
        cropWidth: 0,
        cropHeight: 0
      });
      setIsCropping(false);
    };

    // Open image editor
    const openImageEditor = (imageUrl: string) => {
      setOriginalImage(imageUrl);
      setShowImageEditor(true);
      setTimeout(() => loadImageToCanvas(imageUrl), 100);
    };

    // Update drawing when transform changes
    useEffect(() => {
      if (showImageEditor && originalImage) {
        drawImageOnCanvas();
      }
    }, [imageTransform, showImageEditor, originalImage]);

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
        formData.append('image', file);        // Get auth headers
        const authHeaders = getAuthHeaders();
        
        // Use absolute URL to avoid frontend routing confusion
        const response = await fetch('https://leolovestravel.com/api/upload-image.php', {
          method: 'POST',
          headers: {
            'Authorization': authHeaders.Authorization
          },
          body: formData
        });

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          console.error('Non-JSON response:', text);
          throw new Error('Server returned invalid response format');
        }

        const result = await response.json();
        
        if (!response.ok) {
          throw new Error(result.error || `Upload failed: ${response.status} ${response.statusText}`);
        }        if (result.success && result.url) {
          onImageSelected(result.url);
          setSuccess('Image uploaded successfully!');
          setError(null);
          
          setTimeout(() => setSuccess(null), 3000);
        } else {
          throw new Error(result.error || 'Upload failed - no image URL returned');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Upload failed';
        setError(errorMessage);
        setSuccess(null);
        console.error('Upload error:', err);
      } finally {
        setIsUploading(false);
      }
    };    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        // Create URL for image editor
        const imageUrl = URL.createObjectURL(file);
        openImageEditor(imageUrl);
      }
    };

    const handleUrlSubmit = () => {
      if (!urlInput.trim()) {
        setError('Please enter a valid image URL');
        setSuccess(null);
        return;
      }

      try {
        new URL(urlInput);
        onImageSelected(urlInput.trim());
        setUrlInput('');
        setError(null);
        setSuccess('Image URL added successfully!');
        
        setTimeout(() => setSuccess(null), 3000);
      } catch {
        setError('Please enter a valid URL');
        setSuccess(null);
      }
    };    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        // Create URL for image editor
        const imageUrl = URL.createObjectURL(file);
        openImageEditor(imageUrl);
      } else {
        setError('Please drop a valid image file');
      }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
    };

    const clearImage = () => {
      onImageSelected('');
      setError(null);
      setSuccess(null);
    };    return (
      <div className={`space-y-4 ${className}`}>
        <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Tour Image
        </Label>        {/* Image Editor Modal */}
        {showImageEditor && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#0093DE] to-[#0077b3] text-white p-4 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">Image Editor</h3>
                  <p className="text-blue-100 text-sm">Edit your tour image before uploading</p>
                </div>
                <Button
                  type="button"
                  onClick={resetImageEditor}
                  className="bg-white/20 hover:bg-white/30 text-white border-0 h-8 w-8 p-0 rounded-full"
                >
                  ×
                </Button>
              </div>

              <div className="p-6 overflow-auto max-h-[calc(95vh-140px)]">
                <div className="space-y-6">
                  {/* Canvas Container */}
                  <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300">
                    <div className="flex justify-center">                      <canvas
                        ref={canvasRef}
                        onMouseDown={handleCanvasMouseDown}
                        onMouseMove={handleCanvasMouseMove}
                        onMouseUp={handleCanvasMouseUp}
                        className="border border-gray-300 rounded-lg shadow-sm bg-white cursor-crosshair max-w-full"
                        style={{ 
                          cursor: isCropping ? 'crosshair' : isDragging ? 'grabbing' : 'grab',
                          maxHeight: '600px',
                          width: 'auto',
                          height: 'auto'
                        }}
                      />
                    </div>
                    {/* Canvas Instructions */}
                    <div className="text-center mt-3 text-sm text-gray-600">
                      {isCropping ? (
                        <span className="text-blue-600 font-medium">🎯 Click and drag to select crop area</span>
                      ) : (
                        <span>🖱️ Click and drag to move image • Use controls below to edit</span>
                      )}
                    </div>
                  </div>

                  {/* Control Panels */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">                    {/* Transform Controls */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                        <span className="mr-2">🔄</span> Transform
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs text-gray-600 block mb-1">Scale: {imageTransform.scale.toFixed(1)}x</label>
                          <input
                            type="range"
                            min="0.1"
                            max="3"
                            step="0.1"
                            value={imageTransform.scale}
                            onChange={(e) => setImageTransform(prev => ({ ...prev, scale: parseFloat(e.target.value) }))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-600 block mb-1">Rotation: {imageTransform.rotation}°</label>
                          <input
                            type="range"
                            min="0"
                            max="360"
                            step="15"
                            value={imageTransform.rotation}
                            onChange={(e) => setImageTransform(prev => ({ ...prev, rotation: parseInt(e.target.value) }))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>                    {/* Height Adjust Controls */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                        <span className="mr-2">📏</span> Height Adjust
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs text-gray-600 block mb-1">
                            Height: {canvasRef.current?.height || 720}px (Width: Fixed 1280px)
                          </label>
                          <input
                            type="range"
                            min="400"
                            max="1080"
                            step="20"
                            value={canvasRef.current?.height || 720}
                            onChange={(e) => {
                              const newHeight = parseInt(e.target.value);
                              resizeImage(1280, newHeight);
                            }}
                            className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                        <div className="text-xs text-gray-500">
                          Drag to adjust height (400-1080px). Width always stays 1280px.
                        </div>
                      </div>
                    </div>

                    {/* Crop Controls */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                        <span className="mr-2">✂️</span> Crop
                      </h4>
                      <div className="space-y-2">
                        <Button
                          type="button"
                          onClick={() => setIsCropping(!isCropping)}
                          className={`w-full text-xs h-8 ${
                            isCropping 
                              ? 'bg-red-500 hover:bg-red-600 text-white' 
                              : 'bg-blue-500 hover:bg-blue-600 text-white'
                          }`}
                        >
                          {isCropping ? 'Cancel Crop' : 'Start Cropping'}
                        </Button>
                        {isCropping && imageTransform.cropWidth > 0 && (
                          <Button
                            type="button"
                            onClick={applyCrop}
                            className="w-full text-xs h-8 bg-green-500 hover:bg-green-600 text-white"
                          >
                            Apply Crop
                          </Button>
                        )}
                      </div>
                    </div>                    {/* Quick Resize */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                        <span className="mr-2">📐</span> Quick Resize
                      </h4>                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          type="button"
                          onClick={() => resizeImage(1280, 720)}
                          className="text-xs h-8 bg-purple-500 hover:bg-purple-600 text-white font-semibold"
                        >
                          1280×720 ⭐
                        </Button>
                        <Button
                          type="button"  
                          onClick={() => resizeImage(1280, 960)}
                          className="text-xs h-8 bg-purple-500 hover:bg-purple-600 text-white"
                        >
                          1280×960
                        </Button>
                        <Button
                          type="button"
                          onClick={() => resizeImage(1280, 853)}
                          className="text-xs h-8 bg-purple-500 hover:bg-purple-600 text-white"
                        >
                          1280×853
                        </Button>
                        <Button
                          type="button"
                          onClick={() => resizeImage(1280, 640)}
                          className="text-xs h-8 bg-purple-500 hover:bg-purple-600 text-white"
                        >
                          1280×640
                        </Button>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        Tất cả preset giữ chiều ngang 1280px
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                        <span className="mr-2">⚡</span> Quick Actions
                      </h4>
                      <div className="space-y-2">
                        <Button
                          type="button"
                          onClick={() => setImageTransform(prev => ({ ...prev, rotation: (prev.rotation + 90) % 360 }))}
                          className="w-full text-xs h-8 bg-orange-500 hover:bg-orange-600 text-white"
                        >
                          Rotate 90°
                        </Button>
                        <Button
                          type="button"
                          onClick={() => setImageTransform({
                            scale: 1, rotation: 0, x: 0, y: 0,
                            cropX: 0, cropY: 0, cropWidth: 0, cropHeight: 0
                          })}
                          className="w-full text-xs h-8 bg-gray-500 hover:bg-gray-600 text-white"
                        >
                          Reset All
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Image Info */}
                  {canvasRef.current && (
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <div className="text-sm text-blue-800">
                        <strong>Image Info:</strong> {canvasRef.current.width} × {canvasRef.current.height}px
                        {imageTransform.cropWidth > 0 && (
                          <span className="ml-4">
                            <strong>Crop Area:</strong> {Math.round(imageTransform.cropWidth)} × {Math.round(imageTransform.cropHeight)}px
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="bg-gray-50 px-6 py-4 border-t flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  💡 Tip: Use the canvas to drag and position your image, then use the controls to fine-tune
                </div>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    onClick={resetImageEditor}
                    className="px-4 py-2 border-2 border-gray-400 bg-transparent text-gray-600 hover:bg-gray-100"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={saveEditedImage}
                    className="px-6 py-2 bg-gradient-to-r from-[#0093DE] to-[#0077b3] text-white hover:from-[#0077b3] hover:to-[#005a8a] font-medium"
                  >
                    Save & Upload
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

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
            Upload File
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
            Use URL
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
                  <p>Uploading...</p>
                </div>
              ) : (
                <div className="text-gray-500">
                  <svg className="mx-auto h-12 w-12 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>                  <p className="text-lg font-medium">Click to upload or drag and drop</p>                  <p className="text-sm">PNG, JPG, GIF, WebP up to 10MB</p>
                  <p className="text-xs text-gray-400 mt-1">Auto-fit to 1280px width, adjustable height</p>
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
                placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleUrlSubmit()}
              />
              <Button
                type="button"
                onClick={handleUrlSubmit}
                className="px-4 py-2 bg-[#0093DE] text-white rounded hover:bg-[#0077b3] transition-colors"
              >
                Use URL
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
        )}        {/* Current Image Preview */}
        {currentImage && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Current Image:</p>
            <div className="relative inline-block">
              <img
                src={currentImage}
                alt="Current tour image"
                className="h-40 w-60 object-cover rounded border shadow-sm"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="240" height="160" viewBox="0 0 240 160"><rect width="240" height="160" fill="%23f3f4f6"/><text x="120" y="80" text-anchor="middle" dy="0.3em" font-family="Arial" font-size="14" fill="%236b7280">No Image</text></svg>';
                }}
              />
              <div className="absolute -top-2 -right-2 flex gap-1">
                <Button
                  type="button"
                  onClick={() => openImageEditor(currentImage)}
                  className="bg-blue-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm hover:bg-blue-600 p-0 shadow-lg"
                  title="Edit image"
                >
                  ✎
                </Button>
                <Button
                  type="button"
                  onClick={clearImage}
                  className="bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm hover:bg-red-600 p-0 shadow-lg"
                  title="Remove image"
                >
                  ×
                </Button>
              </div>
            </div>            <div className="text-xs text-gray-500">
              Standard: 1280px width with adjustable height
            </div>
          </div>
        )}
      </div>
    );
  };

  // ...existing code...
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
    featured: initialData.featured || false,
    category: initialData.category ? String(initialData.category) : '',
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
  });  // Load categories from API - Improved version
  const loadCategories = async () => {
    console.log('🔄 Loading categories...');
    setLoadingCategories(true);
    setCategoriesError(null);

    try {
      const response = await fetch('https://leolovestravel.com/api/get-categories.php');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const rawText = await response.text();
      console.log('📥 Raw API Response:', rawText);

      let data;
      try {
        data = JSON.parse(rawText);
      } catch (parseError) {
        throw new Error(`JSON parse error: ${parseError}. Raw response: ${rawText}`);
      }

      console.log('📊 Parsed Categories API Response:', data);

      let categoriesData: Category[] = [];
      // Handle multiple response formats
      if (Array.isArray(data)) {
        // Direct array response format (like your API: [{name: "Adventure"}, {name: "Beer Street"}])
        console.log('✅ Using direct array format');
        categoriesData = data.map((cat: any) => ({
          id: cat.name, // Use name as ID since API doesn't provide id
          name: cat.name
        }));
      } else if (data && typeof data === 'object') {
        // Check for various object formats
        if (data.success && data.categories && Array.isArray(data.categories)) {
          console.log('✅ Using wrapped success format');
          categoriesData = data.categories.map((cat: any) => ({
            id: cat.id || cat.name, // Use id if available, otherwise use name
            name: cat.name
          }));
        } else if (data.data && Array.isArray(data.data)) {
          console.log('✅ Using data wrapper format');
          categoriesData = data.data.map((cat: any) => ({
            id: cat.id || cat.name, // Use id if available, otherwise use name
            name: cat.name
          }));
        } else if (data.categories && Array.isArray(data.categories)) {
          console.log('✅ Using categories only format');
          categoriesData = data.categories.map((cat: any) => ({
            id: cat.id || cat.name, // Use id if available, otherwise use name
            name: cat.name
          }));
        } else {
          throw new Error(`Invalid API response format. Expected array or object with categories but got: ${JSON.stringify(data)}`);
        }
      } else {
        throw new Error(`Invalid API response format. Expected array or object but got: ${typeof data}`);
      }

      console.log(`✅ Successfully loaded ${categoriesData.length} categories:`, categoriesData);
      setCategories(categoriesData);

      // Handle pending category selection after loading
      if (pendingCategorySelection && categoriesData.length > 0) {
        const categoryToSelect = categoriesData.find((cat: Category) => cat.name === pendingCategorySelection);
        if (categoryToSelect) {
          setFormData(prev => ({ ...prev, category: categoryToSelect.id }));
          setPendingCategorySelection(null);
        }
      }
    } catch (error) {
      console.error('❌ Error loading categories:', error);
      setCategoriesError(`Failed to load categories: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setCategories([]);
    } finally {
      setLoadingCategories(false);
    }
  };

  // Add new category function
  const handleAddNewCategory = async () => {
    if (!newCategoryName.trim() || addingCategory) return;

    setAddingCategory(true);
    setCategoriesError(null);

    try {
      const response = await fetch('https://leolovestravel.com/api/add-categories.php', {
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

        // Get the new category ID from response, or use the name as ID
        let newCategoryId = data.id || data.category_id || data.categoryId || newCategoryName.trim();

        // Add the new category to the local state using name as ID if no ID provided
        const newCategory = { id: newCategoryId, name: newCategoryName.trim() };
        setCategories(prev => [...prev, newCategory]);

        // Select the newly created category
        setFormData(prev => ({ ...prev, category: newCategoryId }));

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
  };  // Load categories on component mount 
  useEffect(() => {
    loadCategories();
  }, []); // Only run once on mount
  // Set initial category from initialData when categories are loaded
  useEffect(() => {
    console.log('🔍 Initial category useEffect triggered:', {
      hasInitialCategory: !!initialData.category,
      categoriesLength: categories.length,
      currentFormCategory: formData.category,
      initialDataCategory: initialData.category
    });

    if (initialData.category && categories.length > 0 && (!formData.category || formData.category === '')) {
      const categoryExists = categories.find(cat =>
        cat.id === String(initialData.category) ||
        cat.name.toLowerCase() === String(initialData.category).toLowerCase()
      );

      if (categoryExists) {
        console.log('✅ Setting initial category:', categoryExists);
        setFormData(prev => ({ ...prev, category: categoryExists.id }));
      } else {
        console.log('❌ Initial category not found in available categories');
      }
    }
  }, [categories.length, initialData.category]); // Simplified dependencies to prevent loops

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
  };  // Submit form with better validation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('=== FORM SUBMISSION ===');
    console.log('Form data:', formData);
    console.log('Category selected:', formData.category);
    console.log('Available categories:', categories);

    // Validate required fields
    if (!formData.category || formData.category.trim() === '') {
      alert('⚠️ Please select a category before submitting the form.');
      console.error('Validation failed: No category selected');
      return;
    }

    if (!formData.name.trim()) {
      alert('⚠️ Please enter a tour name.');
      return;
    }

    if (!formData.location.trim()) {
      alert('⚠️ Please enter a location.');
      return;
    }

    if (formData.price <= 0) {
      alert('⚠️ Please enter a valid price.');
      return;
    }

    // Clean up empty items
    const cleanedData = {
      ...formData,
      highlights: formData.highlights.filter(item => item.trim() !== ''),
      included: formData.included.filter(item => item.trim() !== ''),
      whatToBring: formData.whatToBring.filter(item => item.trim() !== ''),
      itinerary: formData.itinerary.filter(item => item.activities.trim() !== '')
    };

    console.log('✅ Submitting cleaned form data:', cleanedData);
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
              </div>            </div>

            <ImageUpload
              currentImage={formData.image}
              onImageSelected={(url: string) =>
                setFormData(prev => ({ ...prev, image: url }))
              }
              className="w-full"
            />            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={2}
                className="w-full"
                placeholder="Describe the tour experience, highlights, and what's included..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">              <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="category" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Category*
                </Label>
                <div className="flex items-center gap-2">
                  {/* Category status indicator */}
                  {loadingCategories ? (
                    <div className="flex items-center text-xs text-blue-500">
                      <Loader2 className="animate-spin h-3 w-3 mr-1" />
                      Loading...
                    </div>
                  ) : categoriesError ? (
                    <div className="flex items-center text-xs text-red-500">
                      <span className="h-2 w-2 bg-red-500 rounded-full mr-1"></span>
                      Error
                    </div>
                  ) : categories.length > 0 ? (
                    <div className="flex items-center text-xs text-green-500">
                      <span className="h-2 w-2 bg-green-500 rounded-full mr-1"></span>
                      {categories.length} available
                    </div>
                  ) : (
                    <div className="flex items-center text-xs text-gray-500">
                      <span className="h-2 w-2 bg-gray-400 rounded-full mr-1"></span>
                      No categories
                    </div>
                  )}
                </div>
              </div>

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
                </div>) : (
                // Simple and working category selection
                <div className="space-y-4">
                  {/* Main category selector */}                    <div className="space-y-2">
                    <select
                      value={formData.category || ''}
                      onChange={(e) => {
                        const value = e.target.value;
                        console.log('🎯 Category selection event:', {
                          selectedValue: value,
                          currentFormCategory: formData.category,
                          availableCategories: categories,
                          eventTarget: e.target.value
                        });

                        if (value === '__add_new__') {
                          console.log('🔄 Opening add new category form');
                          setShowAddCategory(true);
                        } else {
                          console.log('💾 Updating category state to:', value);
                          setFormData(prev => {
                            const updated = { ...prev, category: value };
                            console.log('📊 Form data after category update:', updated);
                            return updated;
                          });
                        }
                      }}
                      className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                      disabled={loadingCategories}
                      required
                    >
                      <option value="" disabled>
                        {loadingCategories ? 'Loading categories...' : 'Choose a category...'}
                      </option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                      <option value="__add_new__" className="font-medium text-green-600">
                        ➕ Add New Category
                      </option>
                    </select>
                  </div>

                  {/* Selection status */}
                  {formData.category && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="text-sm font-medium text-green-800">
                        ✅ Selected: {categories.find(cat => cat.id === formData.category)?.name || 'Unknown'}
                      </div>
                      <div className="text-xs text-green-600 mt-1">
                        Category ID: {formData.category}
                      </div>
                    </div>
                  )}                    {/* Quick actions */}
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      onClick={loadCategories}
                      disabled={loadingCategories}
                      className="h-8 px-3 text-xs bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      {loadingCategories ? 'Loading...' : '🔄 Reload'}
                    </Button>

                    {categories.length > 0 && (
                      <Button
                        type="button"
                        onClick={() => {
                          const firstCategory = categories[0];
                          console.log('🎯 Manually selecting first category:', firstCategory);
                          setFormData(prev => {
                            const updated = { ...prev, category: firstCategory.id };
                            console.log('📊 Manual selection result:', updated);
                            return updated;
                          });
                        }}
                        className="h-8 px-3 text-xs bg-purple-500 hover:bg-purple-600 text-white"
                      >
                        🎯 Select First
                      </Button>
                    )}

                    <Button
                      type="button"
                      onClick={() => {
                        console.log('🔍 CURRENT STATE DEBUG:');
                        console.log('formData:', formData);
                        console.log('categories:', categories);
                        console.log('formData.category:', formData.category);
                        console.log('typeof formData.category:', typeof formData.category);
                        console.log('formData.category === "":', formData.category === '');
                        console.log('formData.category === undefined:', formData.category === undefined);
                        alert(`Category: "${formData.category}" (${typeof formData.category})\nCategories: ${categories.length} available`);
                      }}
                      className="h-8 px-3 text-xs bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      🔍 Debug State
                    </Button>
                    {categories.length === 0 && (
                      <>
                        <Button
                          type="button"
                          onClick={() => {
                            // Test with your exact API response format
                            const apiResponse = [
                              { "name": "Adventure" },
                              { "name": "Beer Street" },
                              { "name": "City Tours" },
                              { "name": "Luxury Tours" }
                            ];
                            const testCategories = apiResponse.map(cat => ({
                              id: cat.name, // Use name as ID
                              name: cat.name
                            }));
                            setCategories(testCategories);
                            setCategoriesError(null);
                            console.log('✅ Loaded categories from API format:', testCategories);
                          }}
                          className="h-8 px-3 text-xs bg-green-500 hover:bg-green-600 text-white"
                        >
                          🎯 Test API Format
                        </Button>

                        <Button
                          type="button"
                          onClick={() => {
                            const testCategories = [
                              { id: '1', name: 'Adventure Tours' },
                              { id: '2', name: 'Cultural Tours' },
                              { id: '3', name: 'Food Tours' },
                              { id: '4', name: 'City Tours' },
                              { id: '5', name: 'Nature Tours' }
                            ];
                            setCategories(testCategories);
                            setCategoriesError(null);
                          }}
                          className="h-8 px-3 text-xs bg-yellow-500 hover:bg-yellow-600 text-white"
                        >
                          📦 Load Test Data
                        </Button>
                      </>
                    )}
                  </div>

                  {/* Categories info */}
                  <div className="text-xs text-gray-500 space-y-1">
                    <div>Available categories: {categories.length}</div>
                    <div>Status: {loadingCategories ? 'Loading...' : categoriesError ? 'Error' : 'Ready'}</div>
                  </div>
                </div>
              )}                {categoriesError && (
                <div className="text-sm text-red-500 mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="font-medium">⚠️ Error loading categories</div>
                  <div className="text-xs mt-1">{categoriesError}</div>
                  <Button
                    type="button"
                    onClick={loadCategories}
                    disabled={loadingCategories}
                    className="h-8 px-3 text-xs bg-red-500 hover:bg-red-600 text-white mt-2"
                  >
                    Try Again
                  </Button>
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
                  onCheckedChange={(checked: boolean) => setFormData({ ...formData, featured: !!checked })}
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
                  />                  {formData.highlights.length > 1 && (
                    <Button
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
                  {formData.included.length > 1 && (<Button
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
                  />                  {formData.whatToBring.length > 1 && (
                    <Button
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
                    {formData.itinerary.length > 1 && (<Button
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