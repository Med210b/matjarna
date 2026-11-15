import type Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/**
 * Shared scroll progress store — a module-level mutable object
 * that GSAP writes to and R3F reads from in useFrame, avoiding
 * React re-renders during scrolling.
 *
 * heroProgress: 0 → 1 across the hero section scroll
 */
export const scrollStore = {
  heroProgress: 0,
};

/** Lenis instance reference for anchor navigation */
export const lenisRef: { current: Lenis | null } = { current: null };
