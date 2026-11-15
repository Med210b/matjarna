import { lenisRef } from './gsapSetup';

export function scrollToSection(href: string) {
  const target = document.querySelector<HTMLElement>(href);

  if (!target) return;

  const reduced = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (lenisRef.current && !reduced) {
    lenisRef.current.scrollTo(target, {
      offset: -100,
    });
  } else {
    target.scrollIntoView({
      behavior: reduced ? 'instant' : 'smooth',
      block: 'start',
    });
  }
}