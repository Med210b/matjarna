import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsapSetup';
import { scrollStore } from '@/lib/gsapSetup';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * ScrollStorytelling — sets up a ScrollTrigger that tracks the hero
 * section's scroll progress and writes it to scrollStore.heroProgress.
 * This value is read by the R3F useFrame loop to drive 3D transforms.
 *
 * Also handles the hero text choreography:
 *   Phase A: typography moves upward, background layers respond
 *   Phase B: headline fades/masks out
 *   Phase C: final transition
 *
 * Uses gsap.matchMedia for responsive behavior:
 *   Desktop: full scrubbed choreography
 *   Tablet: reduced intensity
 *   Mobile: simplified non-scrubbed fade
 */
export default function ScrollStorytelling() {
  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = document.getElementById('home');
    if (!hero) return;

    const mm = gsap.matchMedia();

    // --- Desktop & Tablet: scrubbed choreography ---
    mm.add(
      {
        isDesktop: '(min-width: 1024px)',
        isTablet: '(min-width: 768px) and (max-width: 1023px)',
        isMobile: '(max-width: 767px)',
        reduce: reduced,
      },
      (context) => {
        const { isDesktop, isTablet, isMobile, reduce } = context.conditions as {
          isDesktop: boolean;
          isTablet: boolean;
          isMobile: boolean;
          reduce: boolean;
        };

        // 1. Write scroll progress to shared store for R3F
        const progressTrigger = ScrollTrigger.create({
          trigger: hero,
          start: 'top top',
          end: isMobile ? 'bottom top' : '+=120%',
          scrub: 1,
          onUpdate: (self) => {
            scrollStore.heroProgress = self.progress;
          },
        });

        if (reduce) return;

        // 2. Hero text choreography
        const heroContent = hero.querySelector('[data-hero-content]');
        const heroEyebrow = hero.querySelector('[data-hero-eyebrow]');
        const heroHeadline = hero.querySelector('[data-hero-headline]');
        const heroSupport = hero.querySelector('[data-hero-support]');
        const heroCtas = hero.querySelector('[data-hero-ctas]');
        const heroStats = hero.querySelector('[data-hero-stats]');
        const scrollIndicator = hero.querySelector('[data-hero-scroll-indicator]');
        const bgOrbs = hero.querySelectorAll('[data-hero-bg]');

        const textIntensity = isMobile ? 0.5 : isTablet ? 0.7 : 1;

        if (heroContent) {
          // Phase A + B: text moves up and fades
          gsap.to(heroContent, {
            y: -120 * textIntensity,
            opacity: 0,
            ease: 'power2.in',
            scrollTrigger: {
              trigger: hero,
              start: 'top top',
              end: isMobile ? '60% top' : '50% top',
              scrub: 1,
            },
          });
        }

        // Background orbs respond to scroll
        bgOrbs.forEach((orb, i) => {
          gsap.to(orb, {
            y: (i % 2 === 0 ? 80 : -60) * textIntensity,
            opacity: 0.3,
            ease: 'none',
            scrollTrigger: {
              trigger: hero,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.5,
            },
          });
        });

        // Scroll indicator fades early
        if (scrollIndicator) {
          gsap.to(scrollIndicator, {
            opacity: 0,
            ease: 'power2.in',
            scrollTrigger: {
              trigger: hero,
              start: 'top top',
              end: '15% top',
              scrub: 1,
            },
          });
        }

        // Individual element parallax for depth
        if (heroEyebrow) {
          gsap.to(heroEyebrow, {
            y: -40 * textIntensity,
            ease: 'none',
            scrollTrigger: {
              trigger: hero,
              start: 'top top',
              end: '40% top',
              scrub: 1,
            },
          });
        }

        if (heroStats) {
          gsap.to(heroStats, {
            y: -80 * textIntensity,
            ease: 'none',
            scrollTrigger: {
              trigger: hero,
              start: 'top top',
              end: '50% top',
              scrub: 1,
            },
          });
        }

        return () => {
          progressTrigger.kill();
        };
      }
    );

    return () => mm.revert();
  }, [reduced]);

  return null;
}
