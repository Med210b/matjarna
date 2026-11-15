import {
  Component,
  lazy,
  Suspense,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

import HeroSceneFallback from './three/HeroSceneFallback';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const HeroScene = lazy(() => import('./three/HeroScene'));

class SceneBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = {
    failed: false,
  };

  static getDerivedStateFromError() {
    return {
      failed: true,
    };
  }

  render() {
    if (this.state.failed) {
      return <HeroSceneFallback />;
    }

    return this.props.children;
  }
}

export default function HeroVisual() {
  const reduced = useReducedMotion();
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)');

    const update = () => {
      setDesktop(media.matches);
    };

    update();

    media.addEventListener('change', update);

    return () => {
      media.removeEventListener('change', update);
    };
  }, []);

  if (!desktop || reduced) {
    return <HeroSceneFallback />;
  }

  return (
    <SceneBoundary>
      <Suspense fallback={<HeroSceneFallback />}>
        <HeroScene />
      </Suspense>
    </SceneBoundary>
  );
}