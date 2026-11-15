import { useLayoutEffect } from 'react';
import {
  gsap,
  ScrollTrigger,
  scrollStore,
} from '@/lib/gsapSetup';

export default function ScrollStorytelling() {
  useLayoutEffect(() => {
    const hero = document.getElementById('home');

    if (!hero) return;

    const media = gsap.matchMedia();

    media.add(
      {
        all: '(min-width: 0px)',
        desktop: '(min-width: 1024px)',
        reduce: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const { desktop, reduce } = context.conditions!;

        scrollStore.heroProgress = 0;

        if (reduce) return;

        gsap.from(
          hero.querySelectorAll('[data-hero-line]'),
          {
            yPercent: 110,
            rotation: 3,
            opacity: 0,
            stagger: 0.13,
            duration: 1.15,
            ease: 'power4.out',
            clearProps: 'all',
          }
        );

        gsap.from(
          hero.querySelectorAll('[data-hero-enter]'),
          {
            y: 22,
            opacity: 0,
            stagger: 0.1,
            delay: 0.25,
            duration: 0.9,
            ease: 'power3.out',
            clearProps: 'all',
          }
        );

        const progress = ScrollTrigger.create({
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          onUpdate: (self) => {
            scrollStore.heroProgress = self.progress;
          },
          onRefresh: (self) => {
            scrollStore.heroProgress = self.progress;
          },
        });

        scrollStore.heroProgress = progress.progress;

        if (desktop) {
          gsap.to(
            hero.querySelector('[data-hero-content]'),
            {
              y: -55,
              ease: 'none',
              scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom top',
                scrub: 0.7,
              },
            }
          );

          gsap.to(
            hero.querySelector('[data-hero-visual]'),
            {
              y: -85,
              scale: 0.9,
              ease: 'none',
              scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom top',
                scrub: 0.9,
              },
            }
          );

          gsap.to(
            hero.querySelectorAll('[data-hero-bg]'),
            {
              y: 100,
              ease: 'none',
              scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
              },
            }
          );
        }

        return () => {
          scrollStore.heroProgress = 0;
        };
      }
    );

    return () => {
      media.revert();
      scrollStore.heroProgress = 0;
    };
  }, []);

  return null;
}