import { useEffect, useRef, type ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
  href?: string;
}

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
    const element = ref.current;

    if (!element || reduced) return;

    if (window.matchMedia('(hover: none)').matches) return;

    const handleMove = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect();

      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      element.style.transform =
        `translate(${x * strength}px, ${y * strength}px)`;
    };

    const handleLeave = () => {
      element.style.transform = '';
    };

    element.addEventListener('mousemove', handleMove);
    element.addEventListener('mouseleave', handleLeave);

    return () => {
      element.removeEventListener('mousemove', handleMove);
      element.removeEventListener('mouseleave', handleLeave);
      element.style.transform = '';
    };
  }, [reduced, strength]);

  const classes =
    `${className} transition-transform duration-300 ease-out will-change-transform`;

  if (href) {
    return (
      <a
        ref={ref as unknown as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as unknown as React.Ref<HTMLButtonElement>}
      className={classes}
      onClick={onClick}
    >
      {children}
    </button>
  );
}