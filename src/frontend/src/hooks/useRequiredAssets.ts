import { useCallback, useEffect, useState } from 'react';

const REQUIRED_ASSETS = [
  'logo2-1.png',
  'jacques-johnson-1.png',
  'kream-kuntree-1.png',
  'rl-stafford-1.png'
];

export interface AssetValidationResult {
  filename: string;
  isValid: boolean;
}

export function useRequiredAssets() {
  const [missingAsset, setMissingAsset] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const [validationResults, setValidationResults] = useState<AssetValidationResult[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const checkAssets = useCallback(async (bypassCache = false) => {
    setIsChecking(true);
    setMissingAsset(null);
    setValidationResults([]);
    
    const results: AssetValidationResult[] = [];
    
    for (const filename of REQUIRED_ASSETS) {
      try {
        // Fetch with cache-busting options when refreshing
        const fetchOptions: RequestInit = bypassCache
          ? {
              cache: 'no-store',
              headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
              }
            }
          : {};
        
        const response = await fetch(`/${filename}?t=${Date.now()}`, fetchOptions);
        if (!response.ok) {
          setMissingAsset(filename);
          setIsChecking(false);
          return;
        }
        
        // Convert response to blob and create object URL for image decode validation
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        
        // Additional check: try to load as image from blob
        await new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            URL.revokeObjectURL(objectUrl);
            resolve();
          };
          img.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            reject();
          };
          img.src = objectUrl;
        });
        
        results.push({ filename, isValid: true });
      } catch (error) {
        setMissingAsset(filename);
        setIsChecking(false);
        return;
      }
    }
    
    // Only set validation results if all assets passed
    setValidationResults(results);
    setIsChecking(false);
  }, []);

  const refresh = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  useEffect(() => {
    checkAssets(refreshTrigger > 0);
  }, [checkAssets, refreshTrigger]);

  return { missingAsset, isChecking, validationResults, refresh };
}
