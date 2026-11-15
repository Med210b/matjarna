import { Sparkles } from 'lucide-react';

import StudioComposition from './StudioComposition';
import ScrollReveal from './animations/ScrollReveal';
import ParallaxElement from './animations/ParallaxElement';

import AnimatedHeading, {
  Line,
} from './animations/AnimatedHeading';

export default function BrandIntro() {
  return (
    <section
      id="about"
      className="relative w-full bg-espresso overflow-hidden noise-texture py-24 md:py-32"
    >
      <ParallaxElement
        className="pointer-events-none absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-burgundy/20 blur-3xl"
        intensity={60}
      >
        <div className="w-full h-full" />
      </ParallaxElement>

      <ParallaxElement
        className="pointer-events-none absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-cherry/10 blur-3xl"
        intensity={-40}
      >
        <div className="w-full h-full" />
      </ParallaxElement>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <ScrollReveal y={20} duration={0.8}>
              <div className="inline-flex items-center gap-2 mb-8">
                <Sparkles className="h-4 w-4 text-coral" />

                <span className="text-xs font-medium tracking-widest uppercase text-coral/80">
                  About Matjrnaa
                </span>
              </div>
            </ScrollReveal>

            <AnimatedHeading
              as="h2"
              className="font-display text-section font-bold text-ivory leading-tight"
              stagger={0.1}
            >
              <Line>Where ideas become</Line>

              <Line>
                <span className="text-gradient-coral">
                  digital experiences.
                </span>
              </Line>
            </AnimatedHeading>

            <ScrollReveal
              y={30}
              delay={0.1}
              duration={0.9}
            >
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-ivory/75">
                Matjrnaa is a creative digital studio based in Dubai,
                specializing in social media applications development
                and management. We exist at the intersection of art
                and technology — where strategy meets storytelling,
                and where brands find their voice in the digital
                landscape.
              </p>
            </ScrollReveal>

            <ScrollReveal
              y={30}
              delay={0.2}
              duration={0.9}
            >
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/65">
                We believe in the power of meaningful connection.
                Every project we undertake is an opportunity to craft
                something that resonates, engages, and endures. From
                the first concept to the final pixel, we are committed
                to excellence.
              </p>
            </ScrollReveal>

            <ScrollReveal
              y={20}
              delay={0.3}
              duration={0.8}
            >
              <div className="mt-10 flex items-center gap-4">
                <div className="h-px w-12 bg-coral/40" />

                <span
                  className="font-arabic text-xl text-rose/70"
                  dir="rtl"
                >
                  نحوّل الأفكار إلى تجارب رقمية
                </span>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-5">
            <ScrollReveal
              y={50}
              duration={1.1}
              start="top 80%"
            >
              <StudioComposition />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}