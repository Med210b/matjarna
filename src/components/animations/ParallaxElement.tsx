import { useRef, useEffect, ReactNode } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsapSetup';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ParallaxElementProps {
  children: ReactNode;
  className?: string;
  /** Vertical parallax intensity in px — positive moves down, negative up */
  intensity?: number;
  /** Horizontal parallax intensity */
  xIntensity?: number;
  /** Start position for trigger */
  start?: string;
}

/**
 * ParallaxElement — scroll-linked parallax movement.
 * Uses GPU-friendly transforms only. Configurable intensity.
 */
export default function ParallaxElement({
  children,
  className = '',
  intensity = 50,
  xIntensity = 0,
  start = 'top bottom',
}: ParallaxElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: -intensity, x: -xIntensity },
        {
          y: intensity,
          x: xIntensity,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start,
            end: 'bottom top',
            scrub: 1,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [reduced, intensity, xIntensity, start]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
