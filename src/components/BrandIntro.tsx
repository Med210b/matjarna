import { Sparkles } from 'lucide-react';
import ScrollReveal from './animations/ScrollReveal';
import ParallaxElement from './animations/ParallaxElement';
import AnimatedHeading, { Line } from './animations/AnimatedHeading';

export default function BrandIntro() {
  return (
    <section
      id="about"
      className="relative w-full bg-espresso overflow-hidden noise-texture py-24 md:py-32"
    >
      {/* Ambient gradients with parallax */}
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
          {/* Left: Editorial headline */}
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
              <Line>
                Where ideas become{' '}
                <span className="text-gradient-coral">digital experiences.</span>
              </Line>
            </AnimatedHeading>

            <ScrollReveal y={30} delay={0.1} duration={0.9}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-ivory/50">
                Matjrnaa is a creative digital studio based in Dubai, specializing
                in social media applications development and management. We exist
                at the intersection of art and technology — where strategy meets
                storytelling, and where brands find their voice in the digital
                landscape.
              </p>
            </ScrollReveal>

            <ScrollReveal y={30} delay={0.2} duration={0.9}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/40">
                We believe in the power of meaningful connection. Every project we
                undertake is an opportunity to craft something that resonates,
                engages, and endures. From the first concept to the final pixel,
                we are committed to excellence.
              </p>
            </ScrollReveal>

            <ScrollReveal y={20} delay={0.3} duration={0.8}>
              <div className="mt-10 flex items-center gap-4">
                <div className="h-px w-12 bg-coral/40" />
                <span className="font-arabic text-xl text-rose/70" dir="rtl">
                  نحوّل الأفكار إلى تجارب رقمية
                </span>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Visual accent */}
          <div className="lg:col-span-5">
            <ScrollReveal y={50} duration={1.1} start="top 80%">
              <div className="relative aspect-[4/5] max-w-sm mx-auto">
                {/* Layered card composition */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-90"
                  style={{
                    background:
                      'linear-gradient(160deg, #85052D 0%, #A91442 40%, #30130F 100%)',
                    boxShadow: '0 40px 100px -20px rgba(0,0,0,0.6)',
                  }}
                >
                  <div className="absolute inset-0 rounded-3xl overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-coral/20 blur-2xl" />
                    <div className="absolute bottom-10 left-0 w-32 h-32 rounded-full bg-peach/10 blur-xl" />

                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage:
                          'linear-gradient(rgba(255,248,243,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,248,243,0.1) 1px, transparent 1px)',
                        backgroundSize: '30px 30px',
                      }}
                    />

                    <div className="absolute bottom-8 left-8 right-8">
                      <div className="font-display text-7xl font-bold text-ivory/10 leading-none">
                        01
                      </div>
                      <div className="mt-3 text-sm tracking-widest uppercase text-coral/60">
                        Creative Studio
                      </div>
                      <div className="mt-1 font-display text-lg text-ivory/80">
                        Dubai, UAE
                      </div>
                    </div>
                  </div>
                </div>

                {/* Offset accent layer */}
                <div
                  className="absolute -top-4 -right-4 w-full h-full rounded-3xl border border-coral/20 -z-10"
                  style={{ transform: 'translate(12px, 12px)' }}
                />

                {/* Floating tag */}
                <div className="absolute -left-6 top-1/3 glass-card rounded-2xl px-5 py-4 shadow-glow-burgundy">
                  <div className="font-display text-2xl font-bold text-ivory">∞</div>
                  <div className="text-xs text-ivory/60 mt-1">Imagination</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
