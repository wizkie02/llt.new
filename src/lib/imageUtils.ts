// Import all destination images to ensure they're included in the build
import halonBay from '../assets/images/destinations/halong-bay.jpg';
import hanoi from '../assets/images/destinations/hanoi.jpg';
import hoiAn from '../assets/images/destinations/hoi-an.jpg';
import hue from '../assets/images/destinations/hue.jpg';
import mekong from '../assets/images/destinations/mekong.jpg';
import phongNha from '../assets/images/destinations/phong-nha.jpg';
import phuQuoc from '../assets/images/destinations/phu-quoc.jpg';
import sapa from '../assets/images/destinations/sapa.jpg';
import taynguyen from '../assets/images/destinations/taynguyen.jpg';

// Map of destination names to their imported images
const destinationImagesMap: Record<string, string> = {
  'halong-bay': halonBay,
  'hanoi': hanoi,
  'hoi-an': hoiAn,
  'hue': hue,
  'mekong': mekong,
  'phong-nha': phongNha,
  'phu-quoc': phuQuoc,
  'sapa': sapa,
  'taynguyen': taynguyen
};

// Utility function to handle image URLs (local, assets, and external)
export const getImageUrl = (imageUrl: string): string => {
  if (!imageUrl) {
    return 'https://via.placeholder.com/400x200?text=No+Image';
  }
  
  // Check if image matches a destination in our assets folder
  const destinationName = Object.keys(destinationImagesMap).find(name => 
    imageUrl.toLowerCase().includes(name)
  );
  
  if (destinationName) {
    return destinationImagesMap[destinationName];
  }
  
  // Handle local images stored in localStorage
  if (imageUrl.startsWith('local://images/')) {
    const imageId = imageUrl.replace('local://images/', '');
    
    // First try to match with asset images
    const assetMatch = Object.keys(destinationImagesMap).find(name => 
      imageId.toLowerCase().includes(name)
    );
    
    if (assetMatch) {
      return destinationImagesMap[assetMatch];
    }
    
    // Fall back to localStorage if no match in assets
    const base64Image = localStorage.getItem(imageId);
    return base64Image || 'https://via.placeholder.com/400x200?text=Image+Not+Found';
  }
  
  // Return external URLs as-is
  return imageUrl;
};

// Function to cleanup local images when tours are deleted
export const cleanupLocalImage = (imageUrl: string): void => {
  if (imageUrl.startsWith('local://images/')) {
    const imageId = imageUrl.replace('local://images/', '');
    localStorage.removeItem(imageId);
  }
};

// Function to export/backup local images
export const exportLocalImages = (): { [key: string]: string } => {
  const localImages: { [key: string]: string } = {};
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('tour_image_')) {
      const value = localStorage.getItem(key);
      if (value) {
        localImages[key] = value;
      }
    }
  }
  
  return localImages;
};

// Function to import/restore local images
export const importLocalImages = (images: { [key: string]: string }): void => {
  Object.entries(images).forEach(([key, value]) => {
    localStorage.setItem(key, value);
  });
};

// Function to migrate tour images to use assets instead of localStorage
export const migrateToAssetsImages = (tourData: any[]): any[] => {
  return tourData.map(tour => {
    // Skip if tour doesn't have an image
    if (!tour.image) return tour;
    
    // Check if image is in localStorage format
    if (tour.image.startsWith('local://images/')) {
      // Try to match with a destination image
      const imageId = tour.image.replace('local://images/', '');
      
      // Find matching destination image
      const destinationMatch = Object.keys(destinationImagesMap).find(name => 
        imageId.toLowerCase().includes(name) || tour.location.toLowerCase().includes(name)
      );
      
      if (destinationMatch) {
        return {
          ...tour,
          // Keep original in a backup field
          originalImage: tour.image,
          // Use the static asset instead
          image: `destination:${destinationMatch}`
        };
      }
    }
    
    return tour;
  });
};
