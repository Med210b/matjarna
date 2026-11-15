import { useRef, useEffect, ReactNode } from 'react';
import { gsap } from '@/lib/gsapSetup';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  y?: number;
  duration?: number;
  delay?: number;
  start?: string;
  /** Stagger direct children instead of animating the container */
  staggerChildren?: boolean;
  stagger?: number;
}

/**
 * ScrollReveal — generic wrapper that reveals its content
 * (or staggered children) when scrolled into view.
 */
export default function ScrollReveal({
  children,
  className = '',
  y = 40,
  duration = 0.9,
  delay = 0,
  start = 'top 85%',
  staggerChildren = false,
  stagger = 0.12,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(staggerChildren ? el.children : el, { opacity: 1, y: 0 });
        return;
      }

      if (staggerChildren) {
        gsap.fromTo(
          el.children,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration,
            stagger,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start,
              toggleActions: 'play none none reverse',
            },
          }
        );
      } else {
        gsap.fromTo(
          el,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start,
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [reduced, y, duration, delay, start, staggerChildren, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
