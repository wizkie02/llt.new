// Utility function to handle image URLs (both local and external)
export const getImageUrl = (imageUrl: string): string => {
  if (!imageUrl) {
    return 'https://via.placeholder.com/400x200?text=No+Image';
  }
  
  // Handle local images stored in localStorage
  if (imageUrl.startsWith('local://images/')) {
    const imageId = imageUrl.replace('local://images/', '');
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
