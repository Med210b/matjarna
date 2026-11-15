import { Share2, Palette, Video, Compass, Users, BarChart3, ArrowUpRight } from 'lucide-react';
import { SERVICES } from '@/lib/content';
import ScrollReveal from './animations/ScrollReveal';
import AnimatedHeading, { Line } from './animations/AnimatedHeading';

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Share2,
  Palette,
  Video,
  Compass,
  Users,
  BarChart3,
};

const ACCENT_STYLES: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  burgundy: {
    bg: 'from-burgundy/8 to-burgundy/2',
    text: 'text-burgundy',
    border: 'group-hover:border-burgundy/30',
    glow: 'group-hover:shadow-[0_20px_60px_-15px_rgba(133,5,45,0.25)]',
  },
  cherry: {
    bg: 'from-cherry/8 to-cherry/2',
    text: 'text-cherry',
    border: 'group-hover:border-cherry/30',
    glow: 'group-hover:shadow-[0_20px_60px_-15px_rgba(169,20,66,0.25)]',
  },
  coral: {
    bg: 'from-coral/10 to-coral/2',
    text: 'text-coral',
    border: 'group-hover:border-coral/30',
    glow: 'group-hover:shadow-[0_20px_60px_-15px_rgba(238,139,120,0.25)]',
  },
  rose: {
    bg: 'from-rose/10 to-rose/2',
    text: 'text-rose',
    border: 'group-hover:border-rose/30',
    glow: 'group-hover:shadow-[0_20px_60px_-15px_rgba(223,112,132,0.25)]',
  },
  peach: {
    bg: 'from-peach/12 to-peach/2',
    text: 'text-peach-dark',
    border: 'group-hover:border-peach/40',
    glow: 'group-hover:shadow-[0_20px_60px_-15px_rgba(255,194,157,0.3)]',
  },
};

export default function Services() {
  return (
    <section
      id="services"
      className="relative w-full bg-ivory py-24 md:py-32 overflow-hidden"
    >
      <div className="pointer-events-none absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-burgundy/3 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section header */}
        <div className="mb-16 md:mb-20">
          <ScrollReveal y={20} duration={0.8}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-burgundy/30" />
              <span className="text-xs font-medium tracking-widest uppercase text-burgundy/70">
                What We Do
              </span>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <AnimatedHeading
              as="h2"
              className="lg:col-span-8 font-display text-section font-bold text-espresso leading-tight"
              stagger={0.1}
            >
              <Line>Six disciplines.</Line>
              <Line>
                <span className="text-gradient-burgundy">One vision.</span>
              </Line>
            </AnimatedHeading>
            <ScrollReveal className="lg:col-span-4" y={30} delay={0.15} duration={0.9}>
              <p className="text-base text-espresso/50 leading-relaxed">
                A comprehensive suite of services designed to elevate your brand
                across every digital touchpoint.
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Services grid — varied layout with scroll reveal */}
        <ScrollReveal staggerChildren stagger={0.1} y={50} duration={0.8} start="top 80%">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 md:gap-6">
            {SERVICES.map((service, i) => {
              const Icon = ICONS[service.icon];
              const accent = ACCENT_STYLES[service.accent] ?? ACCENT_STYLES.burgundy;

              const span =
                i === 0
                  ? 'lg:col-span-3'
                  : i === 1
                  ? 'lg:col-span-3'
                  : i === 2
                  ? 'lg:col-span-2'
                  : i === 3
                  ? 'lg:col-span-2'
                  : i === 4
                  ? 'lg:col-span-2'
                  : 'lg:col-span-6';

              return (
                <article
                  key={service.title}
                  className={`group relative ${span} rounded-3xl border border-espresso/8 bg-gradient-to-br ${accent.bg} p-7 md:p-8 transition-all duration-500 ${accent.border} ${accent.glow} hover:-translate-y-1`}
                >
                  <div className="absolute top-6 right-7 font-display text-sm font-medium text-espresso/20">
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  <div
                    className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-ivory shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}
                  >
                    {Icon && <Icon className={`h-6 w-6 ${accent.text}`} />}
                  </div>

                  <h3 className="font-display text-xl md:text-2xl font-semibold text-espresso leading-tight">
                    {service.title}
                  </h3>

                  <p className="mt-4 text-sm md:text-base leading-relaxed text-espresso/55">
                    {service.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-400">
                    <span className={`text-sm font-medium ${accent.text}`}>
                      Learn more
                    </span>
                    <ArrowUpRight className={`h-4 w-4 ${accent.text}`} />
                  </div>
                </article>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
