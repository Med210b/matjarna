import { lazy, Suspense, useState, useEffect } from 'react';
import HeroSceneFallback from './three/HeroSceneFallback';

/**
 * HeroVisual — integration point for the 3D hero scene.
 *
 * Lazily loads the R3F Canvas to keep initial bundle lean.
 * Falls back to the static CSS composition during load or
 * if WebGL is unavailable.
 *
 * The surrounding layout in Hero.tsx is designed so this
 * component can be swapped without structural changes.
 */

const HeroScene = lazy(() => import('./three/HeroScene'));

export default function HeroVisual() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <HeroSceneFallback />;
  }

  return (
    <Suspense fallback={<HeroSceneFallback />}>
      <HeroScene />
    </Suspense>
  );
}
