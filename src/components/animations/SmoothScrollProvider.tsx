import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import {
  gsap,
  ScrollTrigger,
  lenisRef,
} from '@/lib/gsapSetup';

import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion();
  const lenisInstance = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      autoRaf: false,
      smoothWheel: true,
      syncTouch: false,
      duration: 1.1,
      easing: (time: number) =>
        Math.min(1, 1.001 - Math.pow(2, -10 * time)),
    });

    lenisInstance.current = lenis;
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    let disposed = false;

    document.fonts.ready.then(() => {
      if (!disposed) {
        ScrollTrigger.refresh();
      }
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      disposed = true;

      clearTimeout(refreshTimer);
      gsap.ticker.remove(updateLenis);

      lenis.destroy();

      lenisInstance.current = null;
      lenisRef.current = null;
    };
  }, [reduced]);

  return <>{children}</>;
}