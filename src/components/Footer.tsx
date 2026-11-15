import { MapPin } from 'lucide-react';
import { NAV_LINKS, LOGO_URL } from '@/lib/content';
import ScrollReveal from './animations/ScrollReveal';
import { lenisRef } from '@/lib/gsapSetup';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el as HTMLElement, { offset: 0 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative w-full bg-espresso-dark overflow-hidden">
      {/* Top gradient line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-burgundy/40 to-transparent" />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-burgundy/8 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 py-16 md:py-20">
        <ScrollReveal staggerChildren stagger={0.1} y={30} duration={0.8} start="top 90%">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Brand */}
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <img
                  src={LOGO_URL}
                  alt="Matjrnaa Logo"
                  className="h-10 w-auto"
                />
                <div className="flex flex-col leading-none">
                  <span className="font-display text-xl font-semibold text-ivory">
                    Matjrnaa
                  </span>
                  <span className="font-arabic text-sm text-rose/60 mt-1">
                    متجرنا
                  </span>
                </div>
              </div>

              <p className="max-w-sm text-sm leading-relaxed text-ivory/40">
                Social Media Applications Development & Management. Shaping
                meaningful digital experiences from Dubai to the world.
              </p>

              <div className="mt-6 flex items-center gap-2 text-ivory/50">
                <MapPin className="h-4 w-4 text-coral/70" />
                <span className="text-sm">Dubai, UAE</span>
              </div>
            </div>

            {/* Navigation */}
            <div className="md:col-span-4">
              <h4 className="text-xs font-medium tracking-widest uppercase text-ivory/30 mb-5">
                Navigation
              </h4>
              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-sm text-ivory/60 transition-colors hover:text-coral"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Brand info */}
            <div className="md:col-span-3">
              <h4 className="text-xs font-medium tracking-widest uppercase text-ivory/30 mb-5">
                Studio
              </h4>
              <p className="text-sm text-ivory/60 leading-relaxed">
                Creative digital studio specializing in social media excellence
                and immersive brand experiences.
              </p>
              <div className="mt-5 font-arabic text-base text-rose/50" dir="rtl">
                تطوير وإدارة تطبيقات التواصل الاجتماعي
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Bottom bar */}
        <ScrollReveal y={20} delay={0.2} duration={0.7} start="top 95%">
          <div className="mt-16 pt-8 border-t border-ivory/8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm text-ivory/35">
                © {currentYear} Matjrnaa. All rights reserved.
              </span>
            </div>
            <div className="flex items-center gap-2 text-ivory/30">
              <span className="text-sm font-display">Matjrnaa</span>
              <span className="text-ivory/15">·</span>
              <span className="font-arabic text-sm" dir="rtl">متجرنا</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
