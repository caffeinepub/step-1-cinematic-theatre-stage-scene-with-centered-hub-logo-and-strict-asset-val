export function BackgroundSilhouetteLogo() {
  return (
    <div className="fixed inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
      <img
        src="/logo2-1.png"
        alt=""
        className="w-[160vw] h-auto opacity-[0.03] select-none"
        style={{
          filter: 'brightness(0.3)',
        }}
      />
    </div>
  );
}
