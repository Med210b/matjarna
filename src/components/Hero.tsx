import { ArrowUpRight, Compass } from 'lucide-react';
import HeroVisual from './HeroVisual';
import ScrollStorytelling from './animations/ScrollStorytelling';
import MagneticButton from './animations/MagneticButton';
import { lenisRef } from '@/lib/gsapSetup';

export default function Hero() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      // Use Lenis for smooth scroll if available
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el as HTMLElement, { offset: 0 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-ivory grid-texture noise-texture"
    >
      {/* Background gradient orbs */}
      <div data-hero-bg className="pointer-events-none absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-burgundy/5 blur-3xl" />
      <div data-hero-bg className="pointer-events-none absolute bottom-0 right-0 w-[600px] h-[400px] rounded-full bg-coral/5 blur-3xl" />

      <ScrollStorytelling />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[80vh]">
          {/* Left: Content */}
          <div data-hero-content className="lg:col-span-7 xl:col-span-7">
            {/* Eyebrow */}
            <div data-hero-eyebrow className="reveal mb-6 inline-flex items-center gap-2.5 rounded-full border border-burgundy/15 bg-ivory/50 px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-coral opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cherry" />
              </span>
              <span className="text-xs font-medium tracking-wide text-espresso/60">
                Dubai, UAE — Digital Experience Studio
              </span>
            </div>

            {/* Headline */}
            <h1 data-hero-headline className="font-display text-hero font-bold text-espresso reveal reveal-delay-1">
              <span className="block">Beyond Digital.</span>
              <span className="block">
                Beyond{' '}
                <span className="text-gradient-warm">Ordinary.</span>
              </span>
            </h1>

            {/* Supporting text */}
            <p data-hero-support className="mt-8 max-w-xl text-lg md:text-xl leading-relaxed text-espresso/60 reveal reveal-delay-2">
              We shape meaningful digital experiences through creativity,
              innovation, and technology.
            </p>

            {/* CTAs */}
            <div data-hero-ctas className="mt-10 flex flex-col sm:flex-row gap-4 reveal reveal-delay-3">
              <MagneticButton
                onClick={() => scrollTo('#about')}
                strength={0.2}
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-burgundy to-cherry px-7 py-4 text-base font-medium text-ivory shadow-glow-burgundy transition-all duration-300 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy"
              >
                Explore Our World
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </MagneticButton>
              <MagneticButton
                onClick={() => scrollTo('#services')}
                strength={0.15}
                className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-espresso/15 bg-ivory/50 px-7 py-4 text-base font-medium text-espresso transition-all duration-300 hover:border-burgundy hover:text-burgundy hover:bg-ivory focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy"
              >
                Discover Our Services
                <Compass className="h-5 w-5 transition-transform group-hover:rotate-12" />
              </MagneticButton>
            </div>

            {/* Stats row */}
            <div data-hero-stats className="mt-16 flex items-center gap-10 reveal reveal-delay-4">
              <div>
                <div className="font-display text-3xl font-bold text-burgundy">06</div>
                <div className="text-sm text-espresso/50 mt-1">Core Services</div>
              </div>
              <div className="h-12 w-px bg-espresso/10" />
              <div>
                <div className="font-display text-3xl font-bold text-cherry">∞</div>
                <div className="text-sm text-espresso/50 mt-1">Creative Vision</div>
              </div>
              <div className="h-12 w-px bg-espresso/10" />
              <div>
                <div className="font-arabic text-2xl font-semibold text-coral">متجرنا</div>
                <div className="text-sm text-espresso/50 mt-1">Matjrnaa</div>
              </div>
            </div>
          </div>

          {/* Right: 3D sculpture */}
          <div className="lg:col-span-5 xl:col-span-5 reveal reveal-delay-2">
            <div className="relative aspect-square w-full max-w-[500px] mx-auto min-h-[300px] md:min-h-[400px] lg:min-h-[500px]">
              <HeroVisual />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div data-hero-scroll-indicator className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 reveal reveal-delay-5">
        <span className="text-xs tracking-widest uppercase text-espresso/40">Scroll</span>
        <div className="h-12 w-px bg-gradient-to-b from-burgundy/30 to-transparent animate-shimmer" />
      </div>
    </section>
  );
}
