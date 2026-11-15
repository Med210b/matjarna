import {
  ArrowDown,
  ArrowUpRight,
  Compass,
} from 'lucide-react';

import HeroVisual from './HeroVisual';
import ScrollStorytelling from './animations/ScrollStorytelling';
import MagneticButton from './animations/MagneticButton';
import { scrollToSection } from '@/lib/navigation';

export default function Hero() {
  return (
    <section
      id="home"
      className="hero-section relative w-full overflow-hidden bg-ivory noise-texture"
    >
      <div
        data-hero-bg
        className="hero-ambient hero-ambient-one"
        aria-hidden="true"
      />

      <div
        data-hero-bg
        className="hero-ambient hero-ambient-two"
        aria-hidden="true"
      />

      <ScrollStorytelling />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          <div
            data-hero-content
            className="relative z-10 lg:col-span-7"
          >
            <div
              data-hero-enter
              className="mb-7 inline-flex items-center gap-3 rounded-full border border-burgundy/15 px-4 py-2.5"
            >
              <span
                className="h-1.5 w-1.5 rounded-full bg-cherry"
                aria-hidden="true"
              />

              <span className="text-[10px] sm:text-xs font-medium tracking-[0.12em] uppercase text-burgundy">
                Dubai, UAE · Digital Experience Studio
              </span>
            </div>

            <h1 className="hero-heading font-display font-bold text-espresso">
              <span className="hero-line-mask">
                <span data-hero-line className="block">
                  Beyond Digital.
                </span>
              </span>

              <span className="hero-line-mask">
                <span data-hero-line className="block">
                  Beyond{' '}
                  <span className="hero-gradient">
                    Ordinary.
                  </span>
                </span>
              </span>
            </h1>

            <p
              data-hero-enter
              className="mt-7 max-w-lg text-base sm:text-lg leading-relaxed text-espresso/75"
            >
              We shape meaningful digital experiences through
              creativity, innovation, and technology.
            </p>

            <div
              data-hero-enter
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <MagneticButton
                onClick={() => scrollToSection('#about')}
                strength={0.18}
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-burgundy to-cherry px-6 py-4 text-sm font-medium text-ivory shadow-glow-burgundy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-burgundy"
              >
                Explore Our World

                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </MagneticButton>

              <MagneticButton
                onClick={() => scrollToSection('#services')}
                strength={0.12}
                className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-espresso/20 px-6 py-4 text-sm font-medium text-espresso hover:bg-burgundy/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-burgundy"
              >
                Discover Our Services

                <Compass className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </MagneticButton>
            </div>

            <div
              data-hero-enter
              className="hero-stats mt-10 md:mt-14 flex flex-wrap items-center gap-6 sm:gap-8"
            >
              <div>
                <div className="font-display text-2xl font-bold text-burgundy">
                  06
                </div>

                <div className="mt-1 text-xs text-espresso/70">
                  Core Services
                </div>
              </div>

              <div
                className="h-9 w-px bg-espresso/15"
                aria-hidden="true"
              />

              <div>
                <div className="font-display text-2xl font-bold text-cherry">
                  ∞
                </div>

                <div className="mt-1 text-xs text-espresso/70">
                  Creative Vision
                </div>
              </div>

              <div
                className="h-9 w-px bg-espresso/15"
                aria-hidden="true"
              />

              <div>
                <div
                  className="font-arabic text-xl font-semibold text-burgundy"
                  lang="ar"
                  dir="rtl"
                >
                  متجرنا
                </div>

                <div className="mt-1 text-xs text-espresso/70">
                  Matjrnaa
                </div>
              </div>
            </div>
          </div>

          <div
            data-hero-visual
            className="lg:col-span-5 relative"
          >
            <div
              data-hero-enter
              className="hero-art-stage relative mx-auto w-full"
              role="img"
              aria-label="Sculptural burgundy and peach ribbons inspired by Matjrnaa"
            >
              <div
                className="hero-orbit hero-orbit-one"
                aria-hidden="true"
              />

              <div
                className="hero-orbit hero-orbit-two"
                aria-hidden="true"
              />

              <div className="absolute inset-0">
                <HeroVisual />
              </div>

              <span
                className="hero-art-label"
                aria-hidden="true"
              >
                ART × TECHNOLOGY
              </span>

              <span
                className="hero-art-coordinate"
                aria-hidden="true"
              >
                25.2048° N / 55.2708° E
              </span>
            </div>
          </div>
        </div>

        <div
          data-hero-enter
          className="mt-10 md:mt-14 flex items-center justify-between border-t border-burgundy/15 pt-5"
        >
          <span className="text-[10px] sm:text-xs tracking-[0.14em] uppercase text-espresso/65">
            Strategy. Storytelling. Digital craft.
          </span>

          <button
            onClick={() => scrollToSection('#about')}
            className="group flex items-center gap-2 text-xs text-burgundy"
            aria-label="Scroll to About Matjrnaa"
          >
            <span className="hidden sm:inline">
              Scroll to explore
            </span>

            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
          </button>
        </div>
      </div>
    </section>
  );
}