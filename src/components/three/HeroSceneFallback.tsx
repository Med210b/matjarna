/**
 * HeroSceneFallback — beautiful static CSS composition shown when
 * WebGL is unavailable or context creation fails.
 * Reuses the Stage 1 visual style as a graceful degradation.
 */
export default function HeroSceneFallback() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-radial-glow" />

      {/* Rotating outer ring */}
      <div className="absolute w-[420px] h-[420px] md:w-[500px] md:h-[500px] rounded-full border border-burgundy/10 animate-spin-slow" />

      {/* Inner rotating ring */}
      <div
        className="absolute w-[320px] h-[320px] md:w-[380px] md:h-[380px] rounded-full border border-coral/15 animate-spin-slow"
        style={{ animationDirection: 'reverse', animationDuration: '22s' }}
      />

      {/* Main orb composition */}
      <div className="relative animate-float-slow">
        <div
          className="relative w-[240px] h-[240px] md:w-[300px] md:h-[300px] rounded-full opacity-90"
          style={{
            background:
              'radial-gradient(circle at 35% 30%, #FFC29D 0%, #EE8B78 25%, #A91442 60%, #85052D 90%)',
            boxShadow:
              '0 30px 80px -20px rgba(133, 5, 45, 0.5), inset -20px -30px 60px rgba(48, 19, 15, 0.3), inset 15px 20px 40px rgba(255, 194, 157, 0.2)',
          }}
        >
          <div
            className="absolute top-[12%] left-[20%] w-20 h-12 rounded-full blur-xl opacity-60"
            style={{ background: 'rgba(255, 248, 243, 0.6)' }}
          />
        </div>
        <div
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[200px] h-[60px] rounded-full blur-2xl opacity-30"
          style={{ background: 'linear-gradient(180deg, #A91442, transparent)' }}
        />
      </div>

      {/* Floating accents */}
      <div className="absolute top-[10%] right-[12%] animate-float-medium">
        <div
          className="w-16 h-16 rounded-2xl rotate-12 opacity-70"
          style={{
            background: 'linear-gradient(135deg, #DF7084, #A91442)',
            boxShadow: '0 15px 40px -10px rgba(169, 20, 66, 0.4)',
          }}
        />
      </div>

      <div className="absolute bottom-[15%] left-[8%] animate-float-fast">
        <div
          className="w-12 h-12 rounded-full opacity-80"
          style={{
            background: 'linear-gradient(135deg, #FFC29D, #EE8B78)',
            boxShadow: '0 10px 30px -8px rgba(238, 139, 120, 0.4)',
          }}
        />
      </div>

      <div
        className="absolute top-[20%] left-[10%] animate-float-medium"
        style={{ animationDelay: '1.5s' }}
      >
        <div
          className="w-10 h-10 opacity-60"
          style={{
            background: 'linear-gradient(135deg, #A91442, #85052D)',
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            boxShadow: '0 8px 25px -5px rgba(133, 5, 45, 0.4)',
          }}
        />
      </div>

      <div
        className="absolute bottom-[20%] right-[10%] animate-float-slow"
        style={{ animationDelay: '0.8s' }}
      >
        <div
          className="w-20 h-20 rounded-full opacity-40 blur-sm"
          style={{ background: 'radial-gradient(circle, #DF7084, transparent 70%)' }}
        />
      </div>
    </div>
  );
}
