import { useState, useCallback } from 'react';
import { useRequiredAssets } from './hooks/useRequiredAssets';
import { MissingAssetOverlay } from './components/MissingAssetOverlay';
import { AssetScanResultsOverlay } from './components/AssetScanResultsOverlay';
import { BackgroundSilhouetteLogo } from './components/BackgroundSilhouetteLogo';
import { TheatreStageScene } from './components/TheatreStageScene';
import { CenteredHubLogo } from './components/CenteredHubLogo';
import { PreviewSyncControls } from './components/PreviewSyncControls';

function App() {
  const { missingAsset, isChecking, validationResults, refresh } = useRequiredAssets();
  const [hasAcknowledgedScan, setHasAcknowledgedScan] = useState(false);

  const handleResync = useCallback(() => {
    window.location.reload();
  }, []);

  const handleRefresh = useCallback(() => {
    setHasAcknowledgedScan(false);
    refresh();
  }, [refresh]);

  const handlePublish = useCallback(async (slug: string) => {
    // Publish handler - the slug is already validated by PreviewSyncControls
    console.log('Publishing with slug:', slug);
    
    // In a real implementation, this would trigger the actual publish flow
    // For now, we just log it to demonstrate the validated slug is being used
    
    // Simulate async publish
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // The publish flow would be handled by the Caffeine platform
    // This is just a placeholder to show the validated slug
  }, []);

  if (isChecking) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (missingAsset) {
    return (
      <MissingAssetOverlay
        filename={missingAsset}
        onRefresh={handleRefresh}
        onResync={handleResync}
      />
    );
  }

  if (!hasAcknowledgedScan && validationResults.length > 0) {
    return (
      <AssetScanResultsOverlay
        assets={validationResults}
        onContinue={() => setHasAcknowledgedScan(true)}
        onRefresh={handleRefresh}
        onResync={handleResync}
      />
    );
  }

  return (
    <div className="fixed inset-0 overflow-hidden">
      <BackgroundSilhouetteLogo />
      <TheatreStageScene />
      <CenteredHubLogo />
      <PreviewSyncControls 
        onRefresh={handleRefresh} 
        onResync={handleResync}
        onPublish={handlePublish}
      />
    </div>
  );
}

export default App;
