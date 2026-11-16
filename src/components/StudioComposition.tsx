import {
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';

import {
  ArrowUpRight,
  Layers,
  ScanLine,
  Sparkles,
} from 'lucide-react';

import { useReducedMotion } from '@/hooks/useReducedMotion';

import '@/styles/studio-interactive.css';

const DISCIPLINES = [
  {
    key: 'brand',
    label: 'Brand',
    eyebrow: '01 / IDENTITY',
    icon: Layers,
    description:
      'A clear identity. A lasting impression.',
  },
  {
    key: 'content',
    label: 'Content',
    eyebrow: '02 / EXPRESSION',
    icon: Sparkles,
    description:
      'Stories that make people stop and connect.',
  },
  {
    key: 'technology',
    label: 'Technology',
    eyebrow: '03 / EXPERIENCE',
    icon: ScanLine,
    description:
      'Ideas built into seamless digital experiences.',
  },
] as const;

export default function StudioComposition() {
  const scene = useRef<HTMLDivElement>(null);
  const detailId = useId();

  const reduced = useReducedMotion();

  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const element = scene.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(element);

    const visibility = () => {
      setPageVisible(!document.hidden);
    };

    visibility();

    document.addEventListener(
      'visibilitychange',
      visibility
    );

    return () => {
      observer.disconnect();

      document.removeEventListener(
        'visibilitychange',
        visibility
      );
    };
  }, []);

  useEffect(() => {
    const element = scene.current;

    if (!element) return;

    const finePointer = window.matchMedia(
      '(hover: hover) and (pointer: fine)'
    );

    let frame = 0;

    const reset = () => {
      cancelAnimationFrame(frame);

      element.style.setProperty(
        '--scene-x',
        '0deg'
      );

      element.style.setProperty(
        '--scene-y',
        '0deg'
      );

      element.style.setProperty(
        '--spot-opacity',
        '0'
      );
    };

    const move = (event: PointerEvent) => {
      if (reduced || !finePointer.matches) {
        return;
      }

      const rect =
        element.getBoundingClientRect();

      const x = Math.max(
        0,
        Math.min(
          1,
          (event.clientX - rect.left) /
            rect.width
        )
      );

      const y = Math.max(
        0,
        Math.min(
          1,
          (event.clientY - rect.top) /
            rect.height
        )
      );

      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        element.style.setProperty(
          '--scene-x',
          `${(0.5 - y) * 9}deg`
        );

        element.style.setProperty(
          '--scene-y',
          `${(x - 0.5) * 12}deg`
        );

        element.style.setProperty(
          '--spot-x',
          `${x * 100}%`
        );

        element.style.setProperty(
          '--spot-y',
          `${y * 100}%`
        );

        element.style.setProperty(
          '--spot-opacity',
          '1'
        );
      });
    };

    reset();

    element.addEventListener(
      'pointermove',
      move
    );

    element.addEventListener(
      'pointerleave',
      reset
    );

    finePointer.addEventListener(
      'change',
      reset
    );

    return () => {
      element.removeEventListener(
        'pointermove',
        move
      );

      element.removeEventListener(
        'pointerleave',
        reset
      );

      finePointer.removeEventListener(
        'change',
        reset
      );

      reset();
    };
  }, [reduced]);

  const selected = DISCIPLINES[active];

  return (
    <div
      ref={scene}
      className="studio-x-scene"
      data-animate={
        inView && pageVisible && !reduced
          ? 'true'
          : 'false'
      }
    >
      <div
        className="studio-x-board"
        data-active={selected.key}
      >
        <div
          className="studio-x-backdrop"
          aria-hidden="true"
        >
          <div className="studio-x-grid" />
          <div className="studio-x-spotlight" />
        </div>

        <div
          className="studio-x-orbit studio-x-orbit-one"
          aria-hidden="true"
        >
          <div className="studio-x-orbit-track" />
        </div>

        <div
          className="studio-x-orbit studio-x-orbit-two"
          aria-hidden="true"
        >
          <div className="studio-x-orbit-track" />
        </div>

        <div
          className="studio-x-core-position"
          aria-hidden="true"
        >
          <div className="studio-x-core">
            <span>m.</span>

            <div className="studio-x-core-shine" />
          </div>
        </div>

        {DISCIPLINES.map((item, index) => {
          const Icon = item.icon;

          return (
            <button
              key={item.key}
              type="button"
              className={
                `studio-x-card studio-x-card-${item.key}`
              }
              aria-pressed={active === index}
              aria-controls={detailId}
              onPointerEnter={(event) => {
                if (
                  event.pointerType === 'mouse'
                ) {
                  setActive(index);
                }
              }}
              onFocus={() => {
                setActive(index);
              }}
              onClick={() => {
                setActive(index);
              }}
            >
              <span className="studio-x-icon">
                <Icon
                  size={19}
                  aria-hidden="true"
                />
              </span>

              <span className="studio-x-card-copy">
                <small>{item.eyebrow}</small>
                <strong>{item.label}</strong>
              </span>

              <ArrowUpRight
                className="studio-x-arrow"
                size={17}
                aria-hidden="true"
              />
            </button>
          );
        })}

        <div
          id={detailId}
          className="studio-x-detail"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <span>{selected.label}</span>
          <p>{selected.description}</p>
        </div>

        <div className="studio-x-footer">
          <span>
            Independent thinking.
            <br />
            Connected experiences.
          </span>

          <span>
            DUBAI
            <br />
            UAE ↗
          </span>
        </div>
      </div>
    </div>
  );
}