import { WHY_STOP_LOGO_FILENAME } from '@/utils/logoAssetFilenames';

export function BackgroundSilhouetteLogo() {
  return (
    <div className="fixed inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
      <img
        src={WHY_STOP_LOGO_FILENAME}
        alt=""
        className="w-[160vw] h-auto opacity-[0.03] select-none"
        style={{
          filter: 'brightness(0.3)',
        }}
      />
    </div>
  );
}
