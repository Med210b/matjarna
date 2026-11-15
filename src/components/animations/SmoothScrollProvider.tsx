import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap, ScrollTrigger } from '@/lib/gsapSetup';
import { lenisRef } from '@/lib/gsapSetup';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * SmoothScrollProvider — initializes Lenis smooth scrolling
 * and synchronizes it with GSAP's ticker and ScrollTrigger.
 *
 * - Single RAF loop via gsap.ticker
 * - Proper cleanup on unmount
 * - React Strict Mode compatible (guard against double-init)
 * - Disables smooth scroll for reduced-motion users
 * - Keeps native touch scrolling on mobile
 */
export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const lenisInstance = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      autoRaf: false,
      smoothWheel: true,
      syncTouch: false,
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenisInstance.current = lenis;
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after Lenis is ready
    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 100);

    return () => {
      clearTimeout(refreshTimer);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      lenisInstance.current = null;
      lenisRef.current = null;
    };
  }, [reduced]);

  return <>{children}</>;
}
