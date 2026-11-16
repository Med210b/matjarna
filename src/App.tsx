import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import BrandIntro from '@/components/BrandIntro';
import Services from '@/components/Services';
import FutureExperiences from '@/components/FutureExperiences';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import Preloader from '@/components/Preloder';

import SmoothScrollProvider from '@/components/animations/SmoothScrollProvider';
import ScrollProgress from '@/components/animations/ScrollProgress';
import PageTransitions from '@/components/animations/PageTransitions';
import MobileMotion from '@/components/animations/MobileMotion';

import {
  ScrollTrigger,
  lenisRef,
} from '@/lib/gsapSetup';

import '@/styles/cinematic.css';
import '@/styles/intro-refinement.css';
import '@/styles/journey.css';

export default function App() {
  const [bypass] = useState(() =>
    Boolean(
      window.location.hash &&
      window.location.hash !== '#home'
    )
  );

  const [loading, setLoading] = useState(!bypass);
  const [introStarted, setIntroStarted] = useState(bypass);
  const [fontsReady, setFontsReady] = useState(false);
  const [visualReady, setVisualReady] = useState(false);
  const [fallback, setFallback] = useState(false);

  const content = useRef<HTMLDivElement>(null);
  const main = useRef<HTMLElement>(null);

  const resetScroll = useCallback(() => {
    if (bypass) return;

    lenisRef.current?.scrollTo(0, {
      immediate: true,
      force: true,
    });

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });

    ScrollTrigger.refresh();
    ScrollTrigger.update();
  }, [bypass]);

  useLayoutEffect(() => {
    if (bypass) return;

    const previous =
      window.history.scrollRestoration;

    window.history.scrollRestoration = 'manual';

    resetScroll();

    const frame =
      requestAnimationFrame(resetScroll);

    return () => {
      cancelAnimationFrame(frame);

      window.history.scrollRestoration =
        previous;
    };
  }, [bypass, resetScroll]);

  const markVisualReady = useCallback(() => {
    setVisualReady(true);
  }, []);

  const reveal = useCallback(() => {
    resetScroll();
    setIntroStarted(true);
  }, [resetScroll]);

  const complete = useCallback(() => {
    setLoading(false);
  }, []);

  const skip = useCallback(() => {
    resetScroll();

    setFallback(true);
    setFontsReady(true);
    setVisualReady(true);
    setIntroStarted(true);
    setLoading(false);
  }, [resetScroll]);

  useEffect(() => {
    let active = true;

    const timer = window.setTimeout(() => {
      if (active) {
        setFontsReady(true);
      }
    }, 2500);

    document.fonts.ready
      .then(() => {
        if (active) {
          setFontsReady(true);
        }
      })
      .catch(() => {
        if (active) {
          setFontsReady(true);
        }
      });

    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (visualReady || !loading) return;

    const timer = window.setTimeout(() => {
      setFallback(true);
    }, 8000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [visualReady, loading]);

  useEffect(() => {
    const element = content.current;

    if (element) {
      element.inert = loading;
    }

    if (!loading) {
      ScrollTrigger.refresh();

      if (!bypass) {
        main.current?.focus({
          preventScroll: true,
        });
      }
    }

    return () => {
      if (element) {
        element.inert = false;
      }
    };
  }, [loading, bypass]);

  return (
    <SmoothScrollProvider>
      <div
        ref={content}
        aria-hidden={loading}
        className="min-h-screen bg-ivory"
      >
        <ScrollProgress />
        <Navbar />

        <main
          ref={main}
          tabIndex={-1}
          className="cinema-main"
        >
          <Hero
            introStarted={introStarted}
            forceFallback={fallback}
            onVisualReady={markVisualReady}
          />

          <div
            className="journey-about"
            data-journey-about
          >
            <BrandIntro />
          </div>

          <div
            className="journey-services"
            data-journey-services
          >
            <Services />
          </div>

          <FutureExperiences />

          <div
            className="journey-contact"
            data-journey-contact
          >
            <FinalCTA />
          </div>
        </main>

        <div
          className="journey-footer"
          data-journey-footer
        >
          <Footer />
        </div>

        <PageTransitions enabled={!loading} />
        <MobileMotion enabled={!loading} />
      </div>

      {loading && (
        <Preloader
          fontsReady={fontsReady}
          visualReady={visualReady}
          onReveal={reveal}
          onComplete={complete}
          onSkip={skip}
        />
      )}
    </SmoothScrollProvider>
  );
}