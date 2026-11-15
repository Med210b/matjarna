import { ArrowUpRight } from 'lucide-react';

import ScrollReveal from './animations/ScrollReveal';
import MagneticButton from './animations/MagneticButton';
import ParallaxElement from './animations/ParallaxElement';

import AnimatedHeading, {
  Line,
} from './animations/AnimatedHeading';

import { scrollToSection } from '@/lib/navigation';

export default function FinalCTA() {
  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden py-24 md:py-36"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #85052D 0%, #A91442 30%, #DF7084 65%, #EE8B78 90%, #FFC29D 100%)',
          backgroundSize: '200% 200%',
        }}
      >
        <div
          className="absolute inset-0 animate-gradient-shift"
          style={{
            background:
              'linear-gradient(135deg, #85052D 0%, #A91442 30%, #DF7084 65%, #EE8B78 90%, #FFC29D 100%)',
            backgroundSize: '200% 200%',
          }}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,248,243,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,248,243,0.2) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <ParallaxElement
        className="pointer-events-none absolute top-1/4 left-10 w-40 h-40 rounded-full bg-peach/20 blur-3xl"
        intensity={60}
      >
        <div className="w-full h-full" />
      </ParallaxElement>

      <ParallaxElement
        className="pointer-events-none absolute bottom-1/4 right-10 w-56 h-56 rounded-full bg-burgundy/20 blur-3xl"
        intensity={-50}
      >
        <div className="w-full h-full" />
      </ParallaxElement>

      <div className="pointer-events-none absolute inset-0 noise-texture" />

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8 text-center">
        <ScrollReveal y={20} duration={0.8}>
          <div className="inline-flex items-center gap-2.5 rounded-full bg-ivory/15 backdrop-blur-sm border border-ivory/20 px-4 py-2 mb-8">
            <span className="text-xs font-medium tracking-widest uppercase text-ivory/90">
              Let's Begin
            </span>
          </div>
        </ScrollReveal>

        <AnimatedHeading
          as="h2"
          className="font-display text-section font-bold text-ivory leading-[1.05] text-balance"
          stagger={0.12}
        >
          <Line>Let's create something</Line>

          <Line>
            <span className="italic font-light">
              remarkable.
            </span>
          </Line>
        </AnimatedHeading>

        <ScrollReveal
          y={30}
          delay={0.15}
          duration={0.9}
        >
          <p className="mt-8 max-w-xl mx-auto text-lg md:text-xl text-ivory/90 leading-relaxed">
            Whether you're redefining your social presence or building
            something entirely new, we'd love to hear your vision.
          </p>
        </ScrollReveal>

        <ScrollReveal
          y={30}
          delay={0.3}
          duration={0.9}
        >
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton
              href="mailto:hello@matjrnaa.com"
              strength={0.2}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-ivory px-8 py-4 text-base font-semibold text-burgundy shadow-2xl transition-all duration-300 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ivory"
            >
              Let's Talk

              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MagneticButton>

            <MagneticButton
              onClick={() => scrollToSection('#home')}
              strength={0.12}
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-ivory/30 px-8 py-4 text-base font-medium text-ivory transition-all duration-300 hover:bg-ivory/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ivory"
            >
              Back to Top
            </MagneticButton>
          </div>
        </ScrollReveal>

        <ScrollReveal
          y={20}
          delay={0.4}
          duration={0.8}
        >
          <div className="mt-14 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-ivory/20" />

            <span
              className="font-arabic text-lg text-ivory/60"
              dir="rtl"
            >
              لنصنع شيئاً استثنائياً
            </span>

            <div className="h-px w-16 bg-ivory/20" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}