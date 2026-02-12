export function CenteredHubLogo() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      {/* Very faint halo/orbit ring */}
      <div
        className="absolute"
        style={{
          width: 'min(50vw, 600px)',
          height: 'min(50vw, 600px)',
          borderRadius: '50%',
          border: '1px solid oklch(0.40 0.05 0 / 0.15)',
          boxShadow: `
            0 0 40px oklch(0.35 0.05 0 / 0.08),
            inset 0 0 40px oklch(0.35 0.05 0 / 0.06)
          `,
        }}
      />

      {/* Center hub logo */}
      <img
        src="/logo2.png"
        alt="Hub Logo"
        className="relative z-10 select-none"
        style={{
          width: 'min(40vw, 480px)',
          height: 'auto',
          filter: 'drop-shadow(0 0 60px oklch(0.30 0.08 0 / 0.4))',
        }}
      />
    </div>
  );
}
