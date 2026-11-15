import { useEffect, useRef, type ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface InteractiveSurfaceProps {
  children: ReactNode;
  className?: string;
}

export default function InteractiveSurface({
  children,
  className = '',
}: InteractiveSurfaceProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const media = window.matchMedia(
      '(hover: hover) and (pointer: fine)'
    );

    let frame = 0;

    const reset = () => {
      cancelAnimationFrame(frame);

      element.style.setProperty('--tilt-x', '0deg');
      element.style.setProperty('--tilt-y', '0deg');
      element.style.setProperty('--light-opacity', '0');
    };

    const move = (event: PointerEvent) => {
      if (reduced || !media.matches) return;

      const rect = element.getBoundingClientRect();

      const x = Math.max(
        0,
        Math.min(1, (event.clientX - rect.left) / rect.width)
      );

      const y = Math.max(
        0,
        Math.min(1, (event.clientY - rect.top) / rect.height)
      );

      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        element.style.setProperty(
          '--tilt-x',
          `${(0.5 - y) * 5}deg`
        );

        element.style.setProperty(
          '--tilt-y',
          `${(x - 0.5) * 7}deg`
        );

        element.style.setProperty('--light-x', `${x * 100}%`);
        element.style.setProperty('--light-y', `${y * 100}%`);
        element.style.setProperty('--light-opacity', '1');
      });
    };

    element.addEventListener('pointermove', move);
    element.addEventListener('pointerleave', reset);
    media.addEventListener('change', reset);

    reset();

    return () => {
      element.removeEventListener('pointermove', move);
      element.removeEventListener('pointerleave', reset);
      media.removeEventListener('change', reset);

      reset();
    };
  }, [reduced]);

  return (
    <div
      ref={ref}
      className={`interactive-surface ${className}`}
    >
      {children}
    </div>
  );
}