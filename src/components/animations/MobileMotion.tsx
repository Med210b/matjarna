import { useLayoutEffect } from 'react';

import {
  gsap,
  ScrollTrigger,
} from '@/lib/gsapSetup';

export default function MobileMotion({
  enabled,
}: {
  enabled: boolean;
}) {
  useLayoutEffect(() => {
    if (!enabled) return;

    const media = gsap.matchMedia();

    media.add(
      {
        mobile: '(max-width: 1023px)',
        short: '(max-height: 559px)',
        reduce:
          '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        if (context.conditions?.reduce) {
          return;
        }

        const hero =
          document.getElementById('home');

        const board =
          document.querySelector<HTMLElement>(
            '.studio-x-board'
          );

        const services =
          document.getElementById('services');

        const showcase =
          document.getElementById('future');

        const contact =
          document.getElementById('contact');

        const footer =
          document.querySelector<HTMLElement>(
            '[data-journey-footer]'
          );

        // Hero visual responds to scrolling.
        if (hero) {
          const sculpture = hero.querySelector(
            '[data-cinema-sculpture]'
          );

          if (sculpture) {
            gsap.fromTo(
              sculpture,
              {
                y: 12,
                rotation: -3,
              },
              {
                y: -18,
                rotation: 3,
                ease: 'none',
                scrollTrigger: {
                  trigger: sculpture,
                  start: 'top 95%',
                  end: 'bottom 15%',
                  scrub: 0.45,
                },
              }
            );
          }
        }

        // Studio composition: scroll-driven depth.
        if (board) {
          gsap.set(board, {
            transition: 'none',
          });

          gsap.fromTo(
            board,
            {
              rotationX: 3,
              rotationY: -5,
            },
            {
              rotationX: -2,
              rotationY: 5,
              ease: 'none',
              scrollTrigger: {
                trigger: board,
                start: 'top 90%',
                end: 'bottom 20%',
                scrub: 0.45,
              },
            }
          );
        }

        // Services opening.
        if (services) {
          gsap.fromTo(
            services,
            {
              clipPath:
                'inset(0% 3% 0% 3% round 24px)',
            },
            {
              clipPath:
                'inset(0% 0% 0% 0% round 0px)',
              ease: 'none',
              scrollTrigger: {
                trigger: services,
                start: 'top 95%',
                end: 'top 35%',
                scrub: 0.4,
              },
            }
          );
        }

        // Showcase heading and individual visuals.
        if (showcase) {
          const heading = showcase.querySelector(
            '[data-journey-heading]'
          );

          if (heading) {
            gsap.fromTo(
              heading,
              {
                y: 22,
                opacity: 0.7,
              },
              {
                y: 0,
                opacity: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: heading,
                  start: 'top 95%',
                  end: 'top 60%',
                  scrub: 0.4,
                },
              }
            );
          }

          showcase
            .querySelectorAll<HTMLElement>(
              '[data-journey-panel]'
            )
            .forEach((panel, index) => {
              const visual =
                panel.querySelector<HTMLElement>(
                  '.journey-concept-visual'
                );

              if (!visual) return;

              gsap.fromTo(
                visual,
                {
                  y: 25,
                  scale: 0.94,
                  rotation:
                    index % 2 === 0 ? -3 : 3,
                },
                {
                  y: 0,
                  scale: 1,
                  rotation: 0,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: visual,
                    start: 'top 95%',
                    end: 'top 55%',
                    scrub: 0.45,
                  },
                }
              );
            });
        }

        // Contact opening.
        if (contact) {
          gsap.fromTo(
            contact,
            {
              clipPath:
                'inset(0% 3% 0% 3% round 36px)',
            },
            {
              clipPath:
                'inset(0% 0% 0% 0% round 0px)',
              ease: 'none',
              scrollTrigger: {
                trigger: contact,
                start: 'top 95%',
                end: 'top 30%',
                scrub: 0.45,
              },
            }
          );
        }

        // Footer reveal.
        if (footer) {
          gsap.fromTo(
            footer,
            {
              y: 18,
              opacity: 0.8,
            },
            {
              y: 0,
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: footer,
                start: 'top bottom',
                end: 'top 70%',
                scrub: 0.4,
              },
            }
          );
        }

        ScrollTrigger.refresh();
      }
    );

    return () => {
      media.revert();
    };
  }, [enabled]);

  return null;
}