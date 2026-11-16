import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

import { NAV_LINKS } from '@/lib/content';
import { scrollToSection } from '@/lib/navigation';

const NAVBAR_LOGO_URL =
  'https://res.cloudinary.com/bfmgkwu3/image/upload/v1794848230/file_000000000a88821193b9c88624006446_khokqq.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((link) =>
      document.querySelector(link.href)
    ).filter(Boolean) as Element[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-40% 0px -50% 0px',
        threshold: 0,
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    scrollToSection(href);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div
            className={`flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${
              scrolled
                ? 'glass-nav shadow-cinematic'
                : 'bg-transparent'
            }`}
          >
            <a
              href="#home"
              onClick={(event) => {
                event.preventDefault();
                handleNavClick('#home');
              }}
              className="group inline-flex shrink-0 items-center"
              aria-label="Matjrnaa — Home"
            >
              <img
                src={NAVBAR_LOGO_URL}
                alt="Matjrnaa"
                className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </a>

            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(event) => {
                      event.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 group ${
                      isActive
                        ? 'text-burgundy'
                        : 'text-espresso/70 hover:text-burgundy'
                    }`}
                  >
                    {link.label}

                    <span
                      className={`absolute bottom-1 left-1/2 h-px bg-gradient-to-r from-burgundy to-coral transition-all duration-300 ${
                        isActive
                          ? 'w-[calc(100%-2rem)] -translate-x-1/2'
                          : 'w-0 group-hover:w-[calc(100%-2rem)] group-hover:-translate-x-1/2'
                      }`}
                    />
                  </a>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <a
                href="#contact"
                onClick={(event) => {
                  event.preventDefault();
                  handleNavClick('#contact');
                }}
                className="hidden sm:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-burgundy to-cherry px-5 py-2.5 text-sm font-medium text-ivory shadow-glow-burgundy transition-all duration-300 hover:shadow-lg hover:scale-105 hover:from-cherry hover:to-burgundy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy"
              >
                Let's Talk
                <ArrowUpRight className="h-4 w-4" />
              </a>

              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden flex items-center justify-center h-10 w-10 rounded-xl bg-espresso/5 text-espresso transition-colors hover:bg-burgundy hover:text-ivory"
                aria-label="Toggle menu"
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
              >
                {isOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        id="mobile-navigation"
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isOpen
            ? 'opacity-100 visible'
            : 'opacity-0 invisible'
        }`}
      >
        <div
          className="absolute inset-0 bg-espresso/40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        <div
          className={`absolute right-0 top-0 h-full w-[80%] max-w-sm bg-ivory shadow-2xl transition-transform duration-500 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col p-8 pt-24">
            {NAV_LINKS.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => {
                  event.preventDefault();
                  handleNavClick(link.href);
                }}
                className="group flex items-center justify-between py-4 border-b border-burgundy/10"
                style={{
                  animation: isOpen
                    ? `fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) ${
                        0.1 + index * 0.08
                      }s forwards`
                    : 'none',
                  opacity: isOpen ? undefined : 0,
                }}
              >
                <span className="font-display text-2xl font-medium text-espresso group-hover:text-burgundy transition-colors">
                  {link.label}
                </span>

                <ArrowUpRight className="h-5 w-5 text-burgundy/40 group-hover:text-burgundy group-hover:translate-x-1 transition-all" />
              </a>
            ))}

            <a
              href="#contact"
              onClick={(event) => {
                event.preventDefault();
                handleNavClick('#contact');
              }}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-burgundy to-cherry px-6 py-3.5 text-base font-medium text-ivory shadow-glow-burgundy"
            >
              Let's Talk
              <ArrowUpRight className="h-5 w-5" />
            </a>

            <div className="mt-auto pt-8">
              <p className="text-sm text-espresso/50">
                Dubai, UAE
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}