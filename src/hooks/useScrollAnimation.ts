import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsapSetup';
import { useReducedMotion } from './useReducedMotion';

interface ScrollAnimationOptions {
  /** Animation trigger: 'top 85%' by default */
  start?: string;
  /** Toggle actions: 'play none none reverse' by default */
  toggleActions?: string;
  /** Stagger between child elements */
  stagger?: number;
  /** Y offset to animate from */
  y?: number;
  /** Duration in seconds */
  duration?: number;
  /** Whether to scrub with scroll */
  scrub?: boolean | number;
}

/**
 * useScrollAnimation — a hook that applies GSAP scroll-triggered
 * reveal animations to a container ref's children. Handles cleanup
 * and reduced-motion automatically.
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: ScrollAnimationOptions = {}
) {
  const containerRef = useRef<T>(null);
  const reduced = useReducedMotion();
  const {
    start = 'top 85%',
    toggleActions = 'play none none reverse',
    stagger = 0.12,
    y = 40,
    duration = 0.9,
    scrub = false,
  } = options;

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(el.children, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        el.children,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions,
            scrub: scrub || undefined,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [reduced, start, toggleActions, stagger, y, duration, scrub]);

  return containerRef;
}
