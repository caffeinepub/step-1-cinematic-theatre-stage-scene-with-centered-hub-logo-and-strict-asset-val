export function TheatreStageScene() {
  return (
    <div className="fixed inset-0 z-10 overflow-hidden">
      {/* Pure black base */}
      <div className="absolute inset-0 bg-black" />

      {/* Background subtle glow for readability */}
      <div className="absolute inset-0 bg-gradient-radial from-zinc-900/40 via-black to-black" />

      {/* Left curtain */}
      <div className="absolute left-0 top-0 bottom-0 w-[20vw] z-20">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, 
              oklch(0.15 0.02 0) 0%,
              oklch(0.18 0.02 0) 15%,
              oklch(0.14 0.02 0) 25%,
              oklch(0.19 0.02 0) 35%,
              oklch(0.15 0.02 0) 45%,
              oklch(0.17 0.02 0) 55%,
              oklch(0.14 0.02 0) 65%,
              oklch(0.18 0.02 0) 75%,
              oklch(0.16 0.02 0) 85%,
              transparent 100%)`,
            boxShadow: 'inset -20px 0 40px rgba(0,0,0,0.8)',
          }}
        />
        {/* Curtain folds */}
        <div className="absolute inset-0 opacity-60">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 w-[2px]"
              style={{
                left: `${12 + i * 11}%`,
                background: 'linear-gradient(to bottom, oklch(0.12 0.01 0), oklch(0.20 0.02 0), oklch(0.12 0.01 0))',
              }}
            />
          ))}
        </div>
      </div>

      {/* Right curtain */}
      <div className="absolute right-0 top-0 bottom-0 w-[20vw] z-20">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to left, 
              oklch(0.15 0.02 0) 0%,
              oklch(0.18 0.02 0) 15%,
              oklch(0.14 0.02 0) 25%,
              oklch(0.19 0.02 0) 35%,
              oklch(0.15 0.02 0) 45%,
              oklch(0.17 0.02 0) 55%,
              oklch(0.14 0.02 0) 65%,
              oklch(0.18 0.02 0) 75%,
              oklch(0.16 0.02 0) 85%,
              transparent 100%)`,
            boxShadow: 'inset 20px 0 40px rgba(0,0,0,0.8)',
          }}
        />
        {/* Curtain folds */}
        <div className="absolute inset-0 opacity-60">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 w-[2px]"
              style={{
                right: `${12 + i * 11}%`,
                background: 'linear-gradient(to bottom, oklch(0.12 0.01 0), oklch(0.20 0.02 0), oklch(0.12 0.01 0))',
              }}
            />
          ))}
        </div>
      </div>

      {/* Left seating rows */}
      <div className="absolute left-[5vw] top-[20vh] bottom-[20vh] w-[15vw] z-15">
        {[...Array(12)].map((_, i) => (
          <div
            key={`left-${i}`}
            className="absolute left-0 right-0 h-[3vh] rounded-sm"
            style={{
              top: `${i * 6.5}%`,
              background: 'linear-gradient(to right, oklch(0.16 0.01 0), oklch(0.20 0.01 0))',
              boxShadow: '0 2px 4px rgba(0,0,0,0.6)',
              opacity: 0.7,
            }}
          />
        ))}
      </div>

      {/* Right seating rows */}
      <div className="absolute right-[5vw] top-[20vh] bottom-[20vh] w-[15vw] z-15">
        {[...Array(12)].map((_, i) => (
          <div
            key={`right-${i}`}
            className="absolute left-0 right-0 h-[3vh] rounded-sm"
            style={{
              top: `${i * 6.5}%`,
              background: 'linear-gradient(to left, oklch(0.16 0.01 0), oklch(0.20 0.01 0))',
              boxShadow: '0 2px 4px rgba(0,0,0,0.6)',
              opacity: 0.7,
            }}
          />
        ))}
      </div>

      {/* Central aisle/walkway */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[20vw] h-[70vh] z-15">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, 
              oklch(0.22 0.01 0) 0%,
              oklch(0.18 0.01 0) 50%,
              transparent 100%)`,
          }}
        />
      </div>

      {/* Warm aisle lights along walkway */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[22vw] h-[70vh] z-16">
        {/* Left side lights */}
        {[...Array(10)].map((_, i) => (
          <div
            key={`aisle-left-${i}`}
            className="absolute w-3 h-3 rounded-full"
            style={{
              left: '10%',
              bottom: `${10 + i * 6}%`,
              background: 'radial-gradient(circle, oklch(0.65 0.15 60) 0%, transparent 70%)',
              boxShadow: '0 0 20px oklch(0.60 0.15 60), 0 0 40px oklch(0.50 0.12 60)',
            }}
          />
        ))}
        {/* Right side lights */}
        {[...Array(10)].map((_, i) => (
          <div
            key={`aisle-right-${i}`}
            className="absolute w-3 h-3 rounded-full"
            style={{
              right: '10%',
              bottom: `${10 + i * 6}%`,
              background: 'radial-gradient(circle, oklch(0.65 0.15 60) 0%, transparent 70%)',
              boxShadow: '0 0 20px oklch(0.60 0.15 60), 0 0 40px oklch(0.50 0.12 60)',
            }}
          />
        ))}
      </div>

      {/* Overhead rigging/truss */}
      <div className="absolute top-0 left-0 right-0 h-[15vh] z-25">
        {/* Main truss bar */}
        <div
          className="absolute top-8 left-[15vw] right-[15vw] h-4"
          style={{
            background: 'linear-gradient(to bottom, oklch(0.30 0.01 0), oklch(0.22 0.01 0))',
            boxShadow: '0 4px 8px rgba(0,0,0,0.8)',
          }}
        />
        {/* Truss cross-beams */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`truss-${i}`}
            className="absolute top-8 w-1 h-4"
            style={{
              left: `${20 + i * 8.5}vw`,
              background: 'oklch(0.25 0.01 0)',
            }}
          />
        ))}
      </div>

      {/* Hanging spotlights */}
      <div className="absolute top-0 left-0 right-0 h-[25vh] z-26">
        {[...Array(6)].map((_, i) => (
          <div
            key={`spotlight-${i}`}
            className="absolute"
            style={{
              left: `${25 + i * 10}vw`,
              top: '3rem',
            }}
          >
            {/* Hanging cable */}
            <div
              className="absolute left-1/2 -translate-x-1/2 w-[1px] h-12"
              style={{
                background: 'oklch(0.20 0.01 0)',
              }}
            />
            {/* Spotlight fixture */}
            <div
              className="absolute left-1/2 -translate-x-1/2 top-12 w-8 h-10 rounded-b-lg"
              style={{
                background: 'linear-gradient(to bottom, oklch(0.28 0.01 0), oklch(0.20 0.01 0))',
                boxShadow: '0 4px 8px rgba(0,0,0,0.9)',
              }}
            />
          </div>
        ))}
      </div>

      {/* Subtle volumetric beams from spotlights */}
      <div className="absolute top-0 left-0 right-0 h-full z-18 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={`beam-${i}`}
            className="absolute"
            style={{
              left: `${25 + i * 10}vw`,
              top: '5rem',
              width: '80px',
              height: '60vh',
              transform: 'translateX(-50%)',
              background: `linear-gradient(to bottom, 
                oklch(0.35 0.02 60 / 0.08) 0%,
                oklch(0.30 0.02 60 / 0.04) 30%,
                transparent 100%)`,
              clipPath: 'polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
