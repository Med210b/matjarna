import {
  useLayoutEffect,
  useRef,
} from 'react';

import {
  ArrowDown,
  ArrowUpRight,
} from 'lucide-react';

import HeroVisual from './HeroVisual';

import MagneticButton from './animations/MagneticButton';

import {
  gsap,
  ScrollTrigger,
  scrollStore,
} from '@/lib/gsapSetup';

import {
  scrollToSection,
} from '@/lib/navigation';

interface HeroProps {
  introStarted: boolean;
  forceFallback: boolean;
  onVisualReady: () => void;
}

export default function Hero({
  introStarted,
  forceFallback,
  onVisualReady,
}: HeroProps) {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!introStarted) return;

    const media = gsap.matchMedia();

    media.add(
      {
        all: '(min-width: 0px)',
        reduce:
          '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        if (context.conditions?.reduce) {
          return;
        }

        const hero = root.current;

        if (!hero) return;

        gsap
          .timeline()
          .fromTo(
            hero.querySelectorAll(
              '[data-cinema-line]'
            ),
            {
              yPercent: 110,
              rotate: 3,
              opacity: 0,
            },
            {
              yPercent: 0,
              rotate: 0,
              opacity: 1,
              duration: 1.1,
              stagger: 0.13,
              ease: 'power4.out',
              clearProps: 'all',
            },
            0.15
          )
          .fromTo(
            hero.querySelectorAll(
              '[data-cinema-enter]'
            ),
            {
              y: 25,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              stagger: 0.09,
              ease: 'power3.out',
              clearProps: 'all',
            },
            0.35
          );
      },
      root
    );

    return () => {
      media.revert();
    };
  }, [introStarted]);

  useLayoutEffect(() => {
    const hero = root.current;

    if (!hero) return;

    const media = gsap.matchMedia();

    media.add(
      '(min-width: 1024px) and (min-height: 560px) and (prefers-reduced-motion: no-preference)',
      () => {
        const select =
          gsap.utils.selector(hero);

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.65,
          },
          onUpdate: function () {
            scrollStore.heroProgress =
              this.progress();
          },
        });

        timeline
          .to(
            select('[data-cinema-copy]'),
            {
              y: -75,
              autoAlpha: 0,
              duration: 0.32,
              ease: 'power2.in',
            },
            0
          )
          .to(
            select('[data-cinema-hud]'),
            {
              autoAlpha: 0,
              duration: 0.15,
            },
            0
          )
          .to(
            select('[data-cinema-dark]'),
            {
              opacity: 1,
              duration: 0.55,
              ease: 'none',
            },
            0.08
          )
          .to(
            select('[data-cinema-sculpture]'),
            {
              xPercent: -42.5,
              scale: 0.86,
              duration: 0.65,
              ease: 'power2.inOut',
            },
            0.1
          )
          .to(
            select('[data-cinema-window]'),
            {
              clipPath:
                'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              rotate: -8,
              duration: 0.65,
              ease: 'power2.inOut',
            },
            0.1
          )
          .fromTo(
            select('[data-cinema-story]'),
            {
              y: 40,
              autoAlpha: 0,
            },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.22,
            },
            0.52
          )
          .fromTo(
            select('[data-cinema-word]'),
            {
              x: 25,
              autoAlpha: 0,
            },
            {
              x: 0,
              autoAlpha: 1,
              stagger: 0.06,
              duration: 0.18,
            },
            0.6
          )
          .to(
            select(
              '[data-cinema-story], [data-cinema-word]'
            ),
            {
              autoAlpha: 0,
              y: -20,
              duration: 0.13,
            },
            0.87
          );

        ScrollTrigger.refresh();

        return () => {
          scrollStore.heroProgress = 0;
        };
      },
      root
    );

    return () => {
      media.revert();
      scrollStore.heroProgress = 0;
    };
  }, []);

  return (
    <section
      ref={root}
      id="home"
      className="cinema-hero"
      data-intro={
        introStarted ? 'started' : 'waiting'
      }
    >
      <div className="cinema-stage">
        <div
          className="cinema-light"
          aria-hidden="true"
        />

        <div
          data-cinema-dark
          className="cinema-dark"
          aria-hidden="true"
        />

        <div
          data-cinema-copy
          className="cinema-copy"
        >
          <p
            data-cinema-enter
            className="cinema-eyebrow"
          >
            <span />
            Dubai, UAE · Digital Experience Studio
          </p>

          <h1 className="cinema-heading font-display">
            <span className="cinema-line-mask">
              <span data-cinema-line>
                Beyond Digital.
              </span>
            </span>

            <span className="cinema-line-mask">
              <span data-cinema-line>
                Beyond{' '}
                <span className="hero-gradient">
                  Ordinary.
                </span>
              </span>
            </span>
          </h1>

          <p
            data-cinema-enter
            className="cinema-description"
          >
            We shape meaningful digital experiences
            through creativity, innovation, and
            technology.
          </p>

          <div
            data-cinema-enter
            className="cinema-actions"
          >
            <MagneticButton
              onClick={() =>
                scrollToSection('#about')
              }
              strength={0.18}
              className="cinema-button cinema-button-primary"
            >
              Explore Our World
              <ArrowUpRight size={17} />
            </MagneticButton>

            <MagneticButton
              onClick={() =>
                scrollToSection('#services')
              }
              strength={0.12}
              className="cinema-button cinema-button-secondary"
            >
              Our Services
              <ArrowUpRight size={17} />
            </MagneticButton>
          </div>

          <div
            data-cinema-enter
            className="cinema-facts"
          >
            <div>
              <strong>06</strong>
              <span>Core Services</span>
            </div>

            <div>
              <strong>∞</strong>
              <span>Creative Vision</span>
            </div>

            <div>
              <strong
                className="font-arabic"
                lang="ar"
                dir="rtl"
              >
                متجرنا
              </strong>

              <span>Matjrnaa</span>
            </div>
          </div>
        </div>

        <div
          data-cinema-sculpture
          className="cinema-sculpture"
          role="img"
          aria-label="Sculptural Matjrnaa ribbon rotating as you explore"
        >
          <div
            data-cinema-entrance
            className="cinema-sculpture-inner"
          >
            <div
              data-cinema-window
              className="cinema-window"
              aria-hidden="true"
            />

            <div className="cinema-canvas">
              <HeroVisual
                onReady={onVisualReady}
                forceFallback={forceFallback}
              />
            </div>

            <span
              className="cinema-art-label"
              aria-hidden="true"
            >
              ART × TECHNOLOGY
            </span>
          </div>
        </div>

        <div
          data-cinema-story
          className="cinema-story"
        >
          <span>01 / THE IDEA</span>

          <h2 className="font-display">
            From a spark.
            <br />
            To a digital world.
          </h2>

          <p>
            Strategy, storytelling, and technology.
            Connected through one creative vision.
          </p>
        </div>

        <div
          className="cinema-words"
          aria-hidden="true"
        >
          <span data-cinema-word>
            Brand <small>01</small>
          </span>

          <span data-cinema-word>
            Content <small>02</small>
          </span>

          <span data-cinema-word>
            Technology <small>03</small>
          </span>
        </div>

        <div
          data-cinema-hud
          className="cinema-hud"
        >
          <span>
            Independent thinking.
            Connected experiences.
          </span>

          <button
            onClick={() =>
              scrollToSection('#about')
            }
            aria-label="Explore About Matjrnaa"
          >
            Scroll to explore
            <ArrowDown size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}