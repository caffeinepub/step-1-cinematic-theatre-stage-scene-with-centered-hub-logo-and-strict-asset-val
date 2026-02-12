import { Button } from '@/components/ui/button';
import { RefreshCw, RotateCw } from 'lucide-react';

interface MissingAssetOverlayProps {
  filename: string;
  onRefresh?: () => void;
  onResync?: () => void;
}

export function MissingAssetOverlay({ filename, onRefresh, onResync }: MissingAssetOverlayProps) {
  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      <div className="text-center px-8 max-w-2xl">
        <div className="text-red-600 text-4xl font-bold mb-4">
          MISSING ASSET: {filename}
        </div>
        <div className="text-white text-2xl mb-8">
          — DO NOT SUBSTITUTE
        </div>
        
        {(onRefresh || onResync) && (
          <div className="flex gap-4 justify-center mt-8">
            {onRefresh && (
              <Button
                onClick={onRefresh}
                variant="outline"
                size="lg"
                className="gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Refresh Assets
              </Button>
            )}
            {onResync && (
              <Button
                onClick={onResync}
                variant="default"
                size="lg"
                className="gap-2"
              >
                <RotateCw className="w-5 h-5" />
                Rebuild Preview
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
