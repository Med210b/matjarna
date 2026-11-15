import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from '@/lib/gsapSetup';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  y?: number;
  duration?: number;
  delay?: number;
  start?: string;
  staggerChildren?: boolean;
  stagger?: number;
}

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
    const element = ref.current;

    if (!element) return;

    const targets = staggerChildren
      ? element.children.length === 1
        ? element.children[0].children
        : element.children
      : element;

    const context = gsap.context(() => {
      if (reduced) {
        gsap.set(targets, {
          opacity: 1,
          y: 0,
        });

        return;
      }

      gsap.fromTo(
        targets,
        {
          opacity: 0,
          y,
        },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger: staggerChildren ? stagger : 0,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start,
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, element);

    return () => context.revert();
  }, [
    reduced,
    y,
    duration,
    delay,
    start,
    staggerChildren,
    stagger,
  ]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}