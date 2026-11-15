import { ArrowUpRight, Rocket } from 'lucide-react';

import { FUTURE_EXPERIENCES } from '@/lib/content';

import ScrollReveal from './animations/ScrollReveal';
import ParallaxElement from './animations/ParallaxElement';

import AnimatedHeading, {
  Line,
} from './animations/AnimatedHeading';

export default function FutureExperiences() {
  return (
    <section
      id="future"
      className="relative w-full overflow-hidden py-24 md:py-32"
      style={{
        background:
          'linear-gradient(170deg, #30130F 0%, #3d1812 50%, #2a100d 100%)',
      }}
    >
      <ParallaxElement
        className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-cherry/10 blur-3xl"
        intensity={50}
      >
        <div className="w-full h-full" />
      </ParallaxElement>

      <ParallaxElement
        className="pointer-events-none absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full bg-coral/8 blur-3xl"
        intensity={-40}
      >
        <div className="w-full h-full" />
      </ParallaxElement>

      <div
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,248,243,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,248,243,0.15) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <ScrollReveal y={20} duration={0.8}>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-coral/20 bg-coral/5 px-4 py-2 mb-8">
              <Rocket className="h-4 w-4 text-coral" />

              <span className="text-xs font-medium tracking-widest uppercase text-coral/80">
                Coming Soon
              </span>
            </div>
          </ScrollReveal>

          <AnimatedHeading
            as="h2"
            className="font-display text-section font-bold text-ivory leading-tight"
            stagger={0.1}
          >
            <Line>
              The next chapter{' '}
              <span className="text-gradient-warm">
                is coming.
              </span>
            </Line>
          </AnimatedHeading>

          <ScrollReveal
            y={30}
            delay={0.15}
            duration={0.9}
          >
            <p className="mt-6 text-lg text-ivory/70 leading-relaxed">
              We are building the future of digital and shopping
              experiences. These are conceptual directions we are
              exploring — not yet available, but on the horizon.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal
          staggerChildren
          stagger={0.15}
          y={50}
          duration={0.9}
          start="top 80%"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FUTURE_EXPERIENCES.map((experience, index) => (
              <article
                key={experience.title}
                className="group relative rounded-3xl border border-ivory/8 overflow-hidden transition-all duration-500 hover:border-coral/20"
                style={{
                  background:
                    'linear-gradient(160deg, rgba(255,248,243,0.04) 0%, rgba(255,248,243,0.01) 100%)',
                }}
              >
                <div className="relative h-48 overflow-hidden">
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                    style={{
                      background:
                        index === 0
                          ? 'radial-gradient(circle at 70% 30%, #EE8B78 0%, #A91442 40%, #30130F 80%)'
                          : index === 1
                            ? 'radial-gradient(circle at 30% 70%, #FFC29D 0%, #DF7084 40%, #30130F 80%)'
                            : 'radial-gradient(circle at 50% 50%, #A91442 0%, #85052D 40%, #30130F 80%)',
                    }}
                  />

                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(255,248,243,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,248,243,0.1) 1px, transparent 1px)',
                      backgroundSize: '24px 24px',
                    }}
                  />

                  <div className="absolute top-4 left-4 rounded-full bg-espresso/60 backdrop-blur-sm px-3 py-1 text-[10px] font-medium tracking-widest uppercase text-ivory/80">
                    {experience.tag}
                  </div>

                  <div className="absolute bottom-4 right-5 font-display text-5xl font-bold text-ivory/15">
                    0{index + 1}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-coral/40 to-transparent" />
                </div>

                <div className="p-7">
                  <h3 className="font-display text-xl font-semibold text-ivory">
                    {experience.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-ivory/75">
                    {experience.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-coral/60 group-hover:text-coral transition-colors">
                    <span className="text-sm font-medium">
                      In Development
                    </span>

                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal
          y={20}
          delay={0.3}
          duration={0.8}
          start="top 90%"
        >
          <p className="mt-12 text-center text-sm text-ivory/60 max-w-2xl mx-auto">
            These concepts represent our creative direction for future
            digital experiences. They are not currently available as
            commercial services.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}