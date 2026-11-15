import { Suspense, useState, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import RibbonSculpture from './RibbonSculpture';
import SceneLighting from './SceneLighting';
import FloatingAccents from './FloatingAccents';
import CameraRig from './CameraRig';
import HeroSceneFallback from './HeroSceneFallback';

/**
 * HeroScene — wraps the R3F Canvas with environment, lighting,
 * the ribbon sculpture, floating accents, and the mouse-reactive
 * camera rig. Falls back to a static CSS composition if WebGL
 * is unavailable.
 */

function SceneContent({ isMobile, reducedMotion }: { isMobile: boolean; reducedMotion: boolean }) {
  const sculptureScale = isMobile ? 0.55 : 1;

  return (
    <>
      <SceneLighting />
      <CameraRig reducedMotion={reducedMotion} isMobile={isMobile} />

      {/* Main sculpture */}
      <RibbonSculpture scale={sculptureScale} reducedMotion={reducedMotion} />

      {/* Secondary floating elements */}
      <FloatingAccents reducedMotion={reducedMotion} />

      {/* Environment for reflections — studio preset for warm PBR look */}
      <Environment preset="studio" environmentIntensity={0.4} />

      {/* Soft contact shadow beneath sculpture */}
      {!isMobile && (
        <ContactShadows
          position={[0, -2.2, 0]}
          opacity={0.15}
          scale={10}
          blur={3}
          far={4}
          color="#85052D"
        />
      )}
    </>
  );
}

export default function HeroScene() {
  const [webglAvailable, setWebglAvailable] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) setWebglAvailable(false);
      else {
        const ctx = gl as WebGLRenderingContext;
        ctx.getExtension('debug renderer info');
      }
    } catch {
      setWebglAvailable(false);
    }

    // Responsive detection
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Reduced motion preference
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);

    return () => {
      window.removeEventListener('resize', checkMobile);
      mq.removeEventListener('change', handler);
    };
  }, []);

  // Camera settings
  const cameraConfig = useMemo(
    () => ({
      fov: 35,
      position: [0, 0.5, 8] as [number, number, number],
      near: 0.1,
      far: 50,
    }),
    []
  );

  if (!webglAvailable) {
    return <HeroSceneFallback />;
  }

  return (
    <Canvas
      camera={cameraConfig}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
      }}
      style={{ background: 'transparent' }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
      onError={() => setWebglAvailable(false)}
    >
      <Suspense fallback={null}>
        <SceneContent isMobile={isMobile} reducedMotion={reducedMotion} />
      </Suspense>
    </Canvas>
  );
}
