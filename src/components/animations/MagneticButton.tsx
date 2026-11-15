import { useRef, useEffect, ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  /** Magnetic strength — 0 to 1 */
  strength?: number;
  href?: string;
}

/**
 * MagneticButton — adds gentle magnetic pointer-following behavior
 * on desktop pointer devices. Uses direct DOM manipulation (no
 * React state) to avoid re-renders. Falls back to normal button
 * on touch devices and reduced-motion.
 */
export default function MagneticButton({
  children,
  className = '',
  onClick,
  strength = 0.25,
  href,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    // Skip on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };

    const handleLeave = () => {
      el.style.transform = '';
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);

    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [reduced, strength]);

  const classNameStr = `${className} transition-transform duration-300 ease-out will-change-transform`;

  if (href) {
    return (
      <a ref={ref as unknown as React.Ref<HTMLAnchorElement>} href={href} className={classNameStr} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button ref={ref as unknown as React.Ref<HTMLButtonElement>} className={classNameStr} onClick={onClick}>
      {children}
    </button>
  );
}
