import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsapSetup';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * ScrollProgress — a thin gradient progress bar at the top
 * of the viewport that represents actual scroll progress.
 * Uses burgundy → peach gradient. Stays below the navbar.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!barRef.current) return;

    if (reduced) {
      gsap.set(barRef.current, { scaleX: 0 });
      return;
    }

    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        gsap.to(barRef.current, {
          scaleX: self.progress,
          duration: 0.1,
          ease: 'none',
          overwrite: true,
        });
      },
    });

    return () => st.kill();
  }, [reduced]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] pointer-events-none">
      <div
        ref={barRef}
        className="h-full origin-left scale-x-0"
        style={{
          background:
            'linear-gradient(90deg, #85052D 0%, #A91442 30%, #DF7084 60%, #EE8B78 80%, #FFC29D 100%)',
        }}
      />
    </div>
  );
}
