import { REQUIRED_ASSET_FILENAMES } from './requiredAssetFilenames';

/**
 * Runtime safeguard that normalizes <img> src attributes for known required assets.
 * Scans all document <img> elements and rewrites src attributes that start with "/"
 * to relative paths (without leading slash) for the four known required assets.
 * 
 * This prevents issues where the preview environment rewrites image src to absolute paths.
 */
export function normalizeKnownAssetImgSrcs(): void {
  // Get all img elements in the document
  const images = document.querySelectorAll('img');
  
  images.forEach((img) => {
    // Get the src attribute value (not the resolved URL)
    const srcAttr = img.getAttribute('src');
    
    if (!srcAttr) return;
    
    // Check if it starts with "/" (absolute path)
    if (srcAttr.startsWith('/')) {
      // Extract just the filename (remove leading slash)
      const filename = srcAttr.substring(1);
      
      // Check if this filename matches one of our known required assets
      if (REQUIRED_ASSET_FILENAMES.includes(filename as any)) {
        // Rewrite to relative path (no leading slash)
        img.setAttribute('src', filename);
      }
    }
  });
}

/**
 * Initialize the img src normalization safeguard.
 * Should be called once on app bootstrap before React renders.
 */
export function initializeImgSrcNormalization(): void {
  // Run immediately
  normalizeKnownAssetImgSrcs();
  
  // Also run after a short delay to catch any dynamically added images
  // during initial render
  setTimeout(() => {
    normalizeKnownAssetImgSrcs();
  }, 100);
}
