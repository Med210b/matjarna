import { useLayoutEffect } from 'react';

import {
  gsap,
  ScrollTrigger,
  lenisRef,
} from '@/lib/gsapSetup';

export default function PageTransitions({
  enabled,
}: {
  enabled: boolean;
}) {
  useLayoutEffect(() => {
    if (!enabled) return;

    const media = gsap.matchMedia();

    media.add(
      '(min-width: 1024px) and (min-height: 560px) and (prefers-reduced-motion: no-preference)',
      () => {
        const about =
          document.querySelector<HTMLElement>(
            '[data-journey-about]'
          );

        const services =
          document.querySelector<HTMLElement>(
            '[data-journey-services]'
          );

        const showcase =
          document.getElementById('future');

        const viewport =
          showcase?.querySelector<HTMLElement>(
            '[data-journey-viewport]'
          );

        const track =
          showcase?.querySelector<HTMLElement>(
            '[data-journey-track]'
          );

        const progress =
          showcase?.querySelector<HTMLElement>(
            '[data-journey-progress]'
          );

        const indexLabel =
          showcase?.querySelector<HTMLElement>(
            '[data-journey-index]'
          );

        const contact =
          document.querySelector<HTMLElement>(
            '[data-journey-contact]'
          );

        const footer =
          document.querySelector<HTMLElement>(
            '[data-journey-footer]'
          );

        const cleanups: Array<() => void> = [];

        // About → Services.
        if (about && services) {
          gsap.to(about, {
            scale: 0.97,
            opacity: 0.65,
            transformOrigin: 'center bottom',
            ease: 'none',
            scrollTrigger: {
              trigger: services,
              start: 'top bottom',
              end: 'top 25%',
              scrub: 0.7,
            },
          });

          gsap.fromTo(
            services.querySelector('#services'),
            {
              clipPath:
                'inset(0% 4% 0% 4% round 48px)',
            },
            {
              clipPath:
                'inset(0% 0% 0% 0% round 0px)',
              ease: 'none',
              scrollTrigger: {
                trigger: services,
                start: 'top bottom',
                end: 'top 25%',
                scrub: 0.7,
              },
            }
          );
        }

        // Showcase entrance.
        if (showcase) {
          gsap.fromTo(
            showcase.querySelector(
              '[data-journey-heading]'
            ),
            {
              y: 45,
              opacity: 0.3,
            },
            {
              y: 0,
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: showcase,
                start: 'top 90%',
                end: 'top 30%',
                scrub: 0.6,
              },
            }
          );
        }

        // Horizontal showcase.
        if (showcase && viewport && track) {
          const panels = Array.from(
            track.querySelectorAll<HTMLElement>(
              '[data-journey-panel]'
            )
          );

          const buttons = Array.from(
            showcase.querySelectorAll<HTMLButtonElement>(
              '[data-journey-go]'
            )
          );

          let current = -1;

          const updateIndex = (value: number) => {
            if (value === current) return;

            current = value;

            if (indexLabel) {
              indexLabel.textContent =
                String(value + 1).padStart(2, '0');
            }

            buttons.forEach((button, index) => {
              button.setAttribute(
                'aria-pressed',
                String(index === value)
              );
            });
          };

          const sequence = gsap.timeline({
            scrollTrigger: {
              trigger: showcase,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.7,
              invalidateOnRefresh: true,
            },
            onUpdate: function () {
              updateIndex(
                Math.round(
                  this.progress() *
                    (panels.length - 1)
                )
              );
            },
          });

          sequence.to(
            track,
            {
              x: () =>
                -Math.max(
                  0,
                  track.scrollWidth -
                    viewport.clientWidth
                ),
              duration: 1,
              ease: 'none',
            },
            0
          );

          if (progress) {
            sequence.fromTo(
              progress,
              {
                scaleX: 0,
              },
              {
                scaleX: 1,
                duration: 1,
                ease: 'none',
              },
              0
            );
          }

          updateIndex(0);

          buttons.forEach((button, index) => {
            const go = () => {
              const trigger =
                sequence.scrollTrigger;

              if (!trigger) return;

              const destination =
                trigger.start +
                ((trigger.end - trigger.start) *
                  index) /
                  Math.max(
                    1,
                    panels.length - 1
                  );

              if (lenisRef.current) {
                lenisRef.current.scrollTo(
                  destination,
                  {
                    duration: 1,
                  }
                );
              } else {
                window.scrollTo({
                  top: destination,
                  behavior: 'smooth',
                });
              }
            };

            button.addEventListener(
              'click',
              go
            );

            cleanups.push(() => {
              button.removeEventListener(
                'click',
                go
              );
            });
          });

          cleanups.push(() => {
            updateIndex(0);
          });
        }

        // Showcase → Contact.
        if (contact) {
          gsap.fromTo(
            contact.querySelector('#contact'),
            {
              clipPath:
                'circle(65% at 50% 100%)',
            },
            {
              clipPath:
                'circle(150% at 50% 100%)',
              ease: 'none',
              scrollTrigger: {
                trigger: contact,
                start: 'top 95%',
                end: 'top 30%',
                scrub: 0.65,
              },
            }
          );
        }

        // Footer entrance.
        if (footer) {
          gsap.fromTo(
            footer,
            {
              y: 35,
              opacity: 0.6,
            },
            {
              y: 0,
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: footer,
                start: 'top bottom',
                end: 'top 65%',
                scrub: 0.6,
              },
            }
          );
        }

        ScrollTrigger.refresh();

        return () => {
          cleanups.forEach((cleanup) => {
            cleanup();
          });
        };
      }
    );

    return () => {
      media.revert();
    };
  }, [enabled]);

  return null;
}