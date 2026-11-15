import { useRef, useEffect, ReactNode } from 'react';
import { gsap } from '@/lib/gsapSetup';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface AnimatedHeadingProps {
  children: ReactNode;
  className?: string;
  /** Whether to split text into word spans for word-by-word reveal */
  wordByWord?: boolean;
  /** Stagger between lines/words */
  stagger?: number;
  /** Trigger element selector — defaults to self */
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

/**
 * AnimatedHeading — masked line reveal with staggered timing.
 *
 * Each direct child (line) is wrapped in an overflow-hidden mask
 * and reveals upward with opacity. When wordByWord is true,
 * text content is split into word spans for understated word reveal.
 *
 * Uses gsap.context for automatic cleanup.
 */
export default function AnimatedHeading({
  children,
  className = '',
  wordByWord = false,
  stagger = 0.08,
  as: Tag = 'h2',
}: AnimatedHeadingProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(el.querySelectorAll('[data-anim-line], [data-anim-word]'), {
          opacity: 1,
          y: 0,
        });
        return;
      }

      const targets = el.querySelectorAll('[data-anim-line]');
      const words = el.querySelectorAll('[data-anim-word]');

      if (words.length > 0 && wordByWord) {
        gsap.fromTo(
          words,
          { opacity: 0.15, y: 8 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      } else if (targets.length > 0) {
        gsap.fromTo(
          targets,
          { opacity: 0, y: '100%' },
          {
            opacity: 1,
            y: '0%',
            duration: 1,
            stagger,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [reduced, stagger, wordByWord]);

  const TagAny = Tag as unknown as React.ComponentType<React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }>;

  return (
    <TagAny ref={ref} className={className}>
      {children}
    </TagAny>
  );
}

/**
 * Helper: wraps text in a masked line span for use inside AnimatedHeading.
 */
export function Line({ children }: { children: React.ReactNode }) {
  return (
    <span className="block overflow-hidden">
      <span data-anim-line className="block">
        {children}
      </span>
    </span>
  );
}

/**
 * Helper: wraps text in a word span for word-by-word reveal.
 */
export function Word({ children }: { children: React.ReactNode }) {
  return (
    <span data-anim-word className="inline-block">
      {children}
    </span>
  );
}
