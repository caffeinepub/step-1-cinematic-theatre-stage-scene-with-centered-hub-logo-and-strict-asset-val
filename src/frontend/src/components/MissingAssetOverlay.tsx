interface MissingAssetOverlayProps {
  filename: string;
}

export function MissingAssetOverlay({ filename }: MissingAssetOverlayProps) {
  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      <div className="text-center px-8">
        <div className="text-red-600 text-4xl font-bold mb-4">
          MISSING ASSET: {filename}
        </div>
        <div className="text-white text-2xl">
          — DO NOT SUBSTITUTE
        </div>
      </div>
    </div>
  );
}
