import { CheckCircle2, RefreshCw, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AssetScanResultsOverlayProps {
  assets: Array<{ filename: string; isValid: boolean }>;
  onContinue: () => void;
  onRefresh?: () => void;
  onResync?: () => void;
}

export function AssetScanResultsOverlay({ assets, onContinue, onRefresh, onResync }: AssetScanResultsOverlayProps) {
  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Asset Scan Results
          </h1>
          <p className="text-gray-400 text-lg">
            All required assets have been detected and validated
          </p>
        </div>

        <div className="bg-gray-900 rounded-lg border border-gray-800 p-8 mb-8">
          <div className="space-y-4">
            {assets.map((asset) => (
              <div
                key={asset.filename}
                className="flex items-center justify-between py-3 px-4 bg-gray-950 rounded-md border border-gray-800"
              >
                <span className="text-white font-mono text-sm">
                  {asset.filename}
                </span>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-green-500 text-sm font-medium">
                    Detected
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-4">
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
              variant="outline"
              size="lg"
              className="gap-2"
            >
              <RotateCw className="w-5 h-5" />
              Rebuild Preview
            </Button>
          )}
          <Button
            onClick={onContinue}
            size="lg"
            className="px-12 py-6 text-lg font-semibold"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
