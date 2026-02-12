import { useEffect, useState } from 'react';

const REQUIRED_ASSETS = [
  'logo2.png',
  'jacques-johnson.png',
  'kream-kuntree.png',
  'rl-stafford.png'
];

export interface AssetValidationResult {
  filename: string;
  isValid: boolean;
}

export function useRequiredAssets() {
  const [missingAsset, setMissingAsset] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const [validationResults, setValidationResults] = useState<AssetValidationResult[]>([]);

  useEffect(() => {
    const checkAssets = async () => {
      const results: AssetValidationResult[] = [];
      
      for (const filename of REQUIRED_ASSETS) {
        try {
          const response = await fetch(`/${filename}`);
          if (!response.ok) {
            setMissingAsset(filename);
            setIsChecking(false);
            return;
          }
          
          // Additional check: try to load as image
          await new Promise<void>((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => reject();
            img.src = `/${filename}`;
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
    };

    checkAssets();
  }, []);

  return { missingAsset, isChecking, validationResults };
}
