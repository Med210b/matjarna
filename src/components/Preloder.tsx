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

import '@/styles/kinetic-intro.css';

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

  const [sequenceDone, setSequenceDone] =
    useState(false);

  const reduced = useReducedMotion();
  const ready = fontsReady && visualReady;

  useEffect(() => {
    const html = document.documentElement;
    const previous = html.style.overflow;

    html.style.overflow = 'hidden';

    lenisRef.current?.stop();

    const frame = requestAnimationFrame(() => {
      lenisRef.current?.stop();
    });

    skipButton.current?.focus({
      preventScroll: true,
    });

    const preventScroll = (event: Event) => {
      event.preventDefault();
    };

    const keydown = (event: KeyboardEvent) => {
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

    window.addEventListener(
      'keydown',
      keydown
    );

    return () => {
      cancelAnimationFrame(frame);

      html.style.overflow = previous;

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
        keydown
      );
    };
  }, [onSkip]);

  // Wait for the essential visual before starting the sequence.
  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const words =
        root.current!.querySelectorAll(
          '[data-kinetic-word]'
        );

      if (!ready) {
        gsap.set(words[3], {
          opacity: 1,
          yPercent: 0,
        });

        return;
      }

      if (reduced) {
        gsap.set(words[3], {
          opacity: 1,
          yPercent: 0,
        });

        setSequenceDone(true);
        return;
      }

      gsap.set(words, {
        yPercent: 110,
        opacity: 0,
      });

      gsap.to('[data-kinetic-orbit]', {
        rotation: 360,
        duration: 9,
        repeat: -1,
        ease: 'none',
      });

      const timeline = gsap.timeline({
        onComplete: () => {
          setSequenceDone(true);
        },
      });

      timeline
        .fromTo(
          '[data-kinetic-symbol]',
          {
            scale: 0.8,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
          },
          0
        )
        .to(
          '[data-kinetic-trace]',
          {
            attr: {
              'stroke-dashoffset': 0,
            },
            duration: 3.8,
            ease: 'power1.inOut',
          },
          0
        );

      [0.1, 1.2, 2.3].forEach(
        (start, index) => {
          timeline
            .to(
              words[index],
              {
                yPercent: 0,
                opacity: 1,
                duration: 0.55,
                ease: 'power3.out',
              },
              start
            )
            .to(
              words[index],
              {
                yPercent: -110,
                opacity: 0,
                duration: 0.3,
                ease: 'power3.in',
              },
              start + 0.9
            );
        }
      );

      timeline.to(
        words[3],
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'power3.out',
        },
        3.4
      );
    }, root);

    return () => {
      context.revert();
    };
  }, [reduced, ready]);

  // Open from the center and reveal the hero.
  useLayoutEffect(() => {
    if (!ready || !sequenceDone) return;

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
          '[data-kinetic-content]',
          {
            opacity: 0,
            y: -12,
            duration: 0.3,
          },
          0
        )
        .to(
          '[data-kinetic-symbol]',
          {
            opacity: 0,
            scale: 1.12,
            duration: 0.35,
          },
          0
        )
        .call(
          onReveal,
          [],
          0.25
        )
        .to(
          '[data-kinetic-left]',
          {
            xPercent: -100,
            duration: 0.8,
            ease: 'power4.inOut',
          },
          0.1
        )
        .to(
          '[data-kinetic-right]',
          {
            xPercent: 100,
            duration: 0.8,
            ease: 'power4.inOut',
          },
          0.1
        );
    }, root);

    return () => {
      context.revert();
    };
  }, [
    ready,
    sequenceDone,
    reduced,
    onReveal,
    onComplete,
  ]);

  return (
    <div
      ref={root}
      className="kinetic-intro"
      role="dialog"
      aria-modal="true"
      aria-label="Matjrnaa — Imagine, Shape, Connect"
    >
      <div
        className="kinetic-panel kinetic-panel-left"
        data-kinetic-left
      />

      <div
        className="kinetic-panel kinetic-panel-right"
        data-kinetic-right
      />

      <div
        className="kinetic-top"
        data-kinetic-content
      >
        <span>MATJRNAA</span>
        <span>DUBAI / UAE</span>
      </div>

      <div className="kinetic-center">
        <div
          className="kinetic-symbol"
          data-kinetic-symbol
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 320 320"
            fill="none"
          >
            <circle
              cx="160"
              cy="160"
              r="140"
              stroke="#85052d"
              strokeOpacity="0.1"
            />

            <circle
              data-kinetic-trace
              cx="160"
              cy="160"
              r="140"
              pathLength={1}
              stroke="#85052d"
              strokeWidth="1.5"
              strokeDasharray="1"
              strokeDashoffset="1"
              transform="rotate(-90 160 160)"
            />
          </svg>

          <div
            className="kinetic-orbit"
            data-kinetic-orbit
          >
            <span />
          </div>

          <div className="kinetic-orbit-ellipse" />
        </div>

        <div
          className="kinetic-title-mask"
          data-kinetic-content
          aria-hidden="true"
        >
          <span
            data-kinetic-word
            className="kinetic-word"
          >
            Imagine.
          </span>

          <span
            data-kinetic-word
            className="kinetic-word kinetic-word-outline"
          >
            Shape.
          </span>

          <span
            data-kinetic-word
            className="kinetic-word"
          >
            Connect.
          </span>

          <span
            data-kinetic-word
            className="kinetic-word kinetic-word-brand"
          >
            MATJRNAA
          </span>
        </div>

        <p
          className="kinetic-caption"
          data-kinetic-content
        >
          Ideas in motion. Experiences that matter.
        </p>
      </div>

      <div
        className="kinetic-bottom"
        data-kinetic-content
      >
        <span role="status">
          {!ready
            ? 'Preparing your experience…'
            : 'Beyond the ordinary.'}
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