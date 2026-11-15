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

const HeroScene = lazy(
  () => import('./three/HeroScene')
);

interface VisualProps {
  onReady: () => void;
  forceFallback?: boolean;
}

function ReadyFallback({
  onReady,
}: {
  onReady: () => void;
}) {
  useEffect(() => {
    onReady();
  }, [onReady]);

  return <HeroSceneFallback />;
}

class SceneBoundary extends Component<
  {
    children: ReactNode;
    onReady: () => void;
  },
  {
    failed: boolean;
  }
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
      return (
        <ReadyFallback
          onReady={this.props.onReady}
        />
      );
    }

    return this.props.children;
  }
}

export default function HeroVisual({
  onReady,
  forceFallback = false,
}: VisualProps) {
  const reduced = useReducedMotion();

  const [desktop, setDesktop] = useState(
    () =>
      window.matchMedia(
        '(min-width: 768px)'
      ).matches
  );

  useEffect(() => {
    const media = window.matchMedia(
      '(min-width: 768px)'
    );

    const update = () => {
      setDesktop(media.matches);
    };

    update();

    media.addEventListener('change', update);

    return () => {
      media.removeEventListener(
        'change',
        update
      );
    };
  }, []);

  if (
    !desktop ||
    reduced ||
    forceFallback
  ) {
    return (
      <ReadyFallback onReady={onReady} />
    );
  }

  return (
    <SceneBoundary onReady={onReady}>
      <Suspense
        fallback={<HeroSceneFallback />}
      >
        <HeroScene onReady={onReady} />
      </Suspense>
    </SceneBoundary>
  );
}