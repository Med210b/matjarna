import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Canvas } from '@react-three/fiber';

import {
  ContactShadows,
  Environment,
  Lightformer,
} from '@react-three/drei';

import * as THREE from 'three';

import RibbonSculpture from './RibbonSculpture';
import SceneLighting from './SceneLighting';
import FloatingAccents from './FloatingAccents';
import CameraRig from './CameraRig';
import HeroSceneFallback from './HeroSceneFallback';

interface SceneContentProps {
  isMobile: boolean;
  reducedMotion: boolean;
}

function SceneContent({
  isMobile,
  reducedMotion,
}: SceneContentProps) {
  const sculptureScale = isMobile ? 0.55 : 1;

  return (
    <>
      <SceneLighting />

      <CameraRig
        reducedMotion={reducedMotion}
        isMobile={isMobile}
      />

      <RibbonSculpture
        scale={sculptureScale}
        reducedMotion={reducedMotion}
      />

      <FloatingAccents reducedMotion={reducedMotion} />

      <Environment
        resolution={128}
        frames={1}
        environmentIntensity={0.7}
      >
        <Lightformer
          intensity={3}
          position={[0, 5, -4]}
          scale={[8, 3, 1]}
          color="#fff8f3"
        />

        <Lightformer
          intensity={2}
          position={[-5, 0, 2]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[5, 8, 1]}
          color="#ffc29d"
        />

        <Lightformer
          intensity={2}
          position={[5, 2, 1]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[3, 6, 1]}
          color="#df7084"
        />
      </Environment>

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
  const host = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const [webglAvailable, setWebglAvailable] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      {
        rootMargin: '100px',
      }
    );

    if (host.current) {
      observer.observe(host.current);
    }

    const update = () => {
      setPageVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', update);

    update();

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
    };
  }, []);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');

      const context =
        canvas.getContext('webgl2') ||
        canvas.getContext('webgl');

      if (!context) {
        setWebglAvailable(false);
      } else {
        const gl = context as WebGLRenderingContext;
        gl.getExtension('WEBGL_lose_context')?.loseContext();
      }
    } catch {
      setWebglAvailable(false);
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener('resize', checkMobile);

    const media = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    setReducedMotion(media.matches);

    const updateMotion = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    media.addEventListener('change', updateMotion);

    return () => {
      window.removeEventListener('resize', checkMobile);
      media.removeEventListener('change', updateMotion);
    };
  }, []);

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
    <div ref={host} className="h-full w-full">
      <Canvas
        frameloop={visible && pageVisible ? 'always' : 'never'}
        camera={cameraConfig}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        fallback={<HeroSceneFallback />}
        style={{
          background: 'transparent',
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);

          gl.domElement.addEventListener(
            'webglcontextlost',
            () => {
              setWebglAvailable(false);
            },
            {
              once: true,
            }
          );
        }}
        onError={() => {
          setWebglAvailable(false);
        }}
      >
        <Suspense fallback={null}>
          <SceneContent
            isMobile={isMobile}
            reducedMotion={reducedMotion}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}