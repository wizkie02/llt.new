import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImageIcon, X } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange, label, className }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // In a real app, upload the file to a server here
    // For this example, we'll create a fake URL
    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      // In a real app, this would be the URL returned from your image upload API
      const imageUrl = URL.createObjectURL(file);
      onChange(imageUrl);
      setIsUploading(false);
    }, 1000);
  };

  const clearImage = () => {
    onChange('');
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
        {label || 'Image'}
      </Label>
      
      <div className="flex flex-col items-center gap-4">
        {value ? (
          <div className="relative w-full max-h-80 overflow-hidden rounded-md">
            <img 
              src={value} 
              alt="Uploaded image" 
              className="object-cover w-full" 
            />
            <Button 
              type="button"
              onClick={clearImage}
              className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full bg-black/70 hover:bg-black"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 flex flex-col items-center justify-center w-full">
            <ImageIcon className="h-10 w-10 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {isUploading ? 'Uploading...' : 'Upload tour image'}
            </p>
          </div>
        )}
        
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className={value ? "hidden" : ""}
          disabled={isUploading}
        />
      </div>
    </div>
  );
};

export default ImageUpload;