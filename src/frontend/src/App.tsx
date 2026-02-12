import { useState } from 'react';
import { useRequiredAssets } from './hooks/useRequiredAssets';
import { MissingAssetOverlay } from './components/MissingAssetOverlay';
import { AssetScanResultsOverlay } from './components/AssetScanResultsOverlay';
import { BackgroundSilhouetteLogo } from './components/BackgroundSilhouetteLogo';
import { TheatreStageScene } from './components/TheatreStageScene';
import { CenteredHubLogo } from './components/CenteredHubLogo';

function App() {
  const { missingAsset, isChecking, validationResults } = useRequiredAssets();
  const [hasAcknowledgedScan, setHasAcknowledgedScan] = useState(false);

  if (isChecking) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (missingAsset) {
    return <MissingAssetOverlay filename={missingAsset} />;
  }

  if (!hasAcknowledgedScan && validationResults.length > 0) {
    return (
      <AssetScanResultsOverlay
        assets={validationResults}
        onContinue={() => setHasAcknowledgedScan(true)}
      />
    );
  }

  return (
    <div className="fixed inset-0 overflow-hidden">
      <BackgroundSilhouetteLogo />
      <TheatreStageScene />
      <CenteredHubLogo />
    </div>
  );
}

export default App;
