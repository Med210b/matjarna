import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import {
  gsap,
  lenisRef,
} from '@/lib/gsapSetup';

import { useReducedMotion } from '@/hooks/useReducedMotion';

interface PreloaderProps {
  fontsReady: boolean;
  visualReady: boolean;
  onReveal: () => void;
  onComplete: () => void;
  onSkip: () => void;
}

export default function Preloader({
  fontsReady,
  visualReady,
  onReveal,
  onComplete,
  onSkip,
}: PreloaderProps) {
  const root = useRef<HTMLDivElement>(null);
  const skipButton = useRef<HTMLButtonElement>(null);

  const [entered, setEntered] = useState(false);

  const reduced = useReducedMotion();
  const ready = fontsReady && visualReady;

  useEffect(() => {
    const html = document.documentElement;
    const previousOverflow = html.style.overflow;

    html.style.overflow = 'hidden';

    lenisRef.current?.stop();

    const lockFrame = requestAnimationFrame(() => {
      lenisRef.current?.stop();
    });

    skipButton.current?.focus({
      preventScroll: true,
    });

    const preventScroll = (event: Event) => {
      event.preventDefault();
    };

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onSkip();
      }

      if (event.key === 'Tab') {
        event.preventDefault();
        skipButton.current?.focus();
      }

      const scrollKeys = [
        'ArrowUp',
        'ArrowDown',
        'PageUp',
        'PageDown',
        'Home',
        'End',
        ' ',
      ];

      if (scrollKeys.includes(event.key)) {
        event.preventDefault();
      }
    };

    window.addEventListener(
      'wheel',
      preventScroll,
      { passive: false }
    );

    window.addEventListener(
      'touchmove',
      preventScroll,
      { passive: false }
    );

    window.addEventListener('keydown', handleKey);

    return () => {
      cancelAnimationFrame(lockFrame);

      html.style.overflow = previousOverflow;

      lenisRef.current?.start();

      window.removeEventListener(
        'wheel',
        preventScroll
      );

      window.removeEventListener(
        'touchmove',
        preventScroll
      );

      window.removeEventListener(
        'keydown',
        handleKey
      );
    };
  }, [onSkip]);

  // Wordmark entrance.
  useLayoutEffect(() => {
    if (reduced) {
      setEntered(true);
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        '[data-studio-letter]',
        {
          yPercent: 115,
        },
        {
          yPercent: 0,
          stagger: 0.025,
          duration: 0.55,
          ease: 'power3.out',
          onComplete: () => {
            setEntered(true);
          },
        }
      );
    }, root);

    return () => {
      context.revert();
    };
  }, [reduced]);

  // Blend into the hero while keeping the ribbon in place.
  useLayoutEffect(() => {
    if (!ready || !entered) return;

    if (reduced) {
      onReveal();
      onComplete();
      return;
    }

    const context = gsap.context(() => {
      gsap
        .timeline({
          onComplete,
        })
        .to(
          '[data-studio-letter]',
          {
            yPercent: -115,
            stagger: 0.018,
            duration: 0.35,
            ease: 'power3.in',
          },
          0
        )
        .to(
          '[data-studio-detail]',
          {
            opacity: 0,
            y: -8,
            duration: 0.25,
          },
          0
        )
        .call(
          onReveal,
          [],
          0.1
        )
        .to(
          root.current,
          {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.inOut',
          },
          0.1
        );
    }, root);

    return () => {
      context.revert();
    };
  }, [
    ready,
    entered,
    reduced,
    onReveal,
    onComplete,
  ]);

  return (
    <div
      ref={root}
      className="studio-loader"
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to Matjrnaa"
    >
      <div
        className="studio-loader-veil"
        aria-hidden="true"
      />

      <div
        className="studio-loader-top"
        data-studio-detail
      >
        <span>MATJRNAA</span>
        <span>DUBAI / UAE</span>
      </div>

      <div className="studio-loader-copy">
        <p
          className="studio-loader-eyebrow"
          data-studio-detail
        >
          Independent digital studio
        </p>

        <div
          className="studio-loader-wordmark"
          aria-label="Matjrnaa"
        >
          {'MATJRNAA'.split('').map(
            (letter, index) => (
              <span
                className="studio-loader-mask"
                key={index}
                aria-hidden="true"
              >
                <span data-studio-letter>
                  {letter}
                </span>
              </span>
            )
          )}
        </div>

        <p
          className="studio-loader-tagline"
          data-studio-detail
        >
          Ideas. Crafted into experiences.
        </p>
      </div>

      <div
        className="studio-loader-bottom"
        data-studio-detail
      >
        <span
          className="studio-loader-status"
          role="status"
        >
          <i aria-hidden="true" />

          {ready
            ? 'Welcome to our world'
            : 'Preparing the experience'}
        </span>

        <button
          ref={skipButton}
          onClick={onSkip}
        >
          Skip intro ↗
        </button>
      </div>
    </div>
  );
}