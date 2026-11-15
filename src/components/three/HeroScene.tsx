import {
  Suspense,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Canvas,
  useFrame,
} from '@react-three/fiber';

import {
  ContactShadows,
  Environment,
  Lightformer,
} from '@react-three/drei';

import * as THREE from 'three';

import RibbonSculpture from './RibbonSculpture';
import SceneLighting from './SceneLighting';
import CameraRig from './CameraRig';
import HeroSceneFallback from './HeroSceneFallback';

function FrameReady({
  onReady,
}: {
  onReady: () => void;
}) {
  const frames = useRef(0);
  const reported = useRef(false);

  useFrame(() => {
    frames.current += 1;

    if (
      frames.current >= 3 &&
      !reported.current
    ) {
      reported.current = true;
      onReady();
    }
  });

  return null;
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

function SceneContent({
  onReady,
}: {
  onReady: () => void;
}) {
  return (
    <>
      <SceneLighting />

      <CameraRig />

      <RibbonSculpture />

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

      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.09}
        scale={5}
        blur={3}
        far={3}
        color="#85052D"
      />

      <FrameReady onReady={onReady} />
    </>
  );
}

export default function HeroScene({
  onReady,
}: {
  onReady: () => void;
}) {
  const host = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(true);

  const [pageVisible, setPageVisible] =
    useState(!document.hidden);

  const [lost, setLost] = useState(false);

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

    document.addEventListener(
      'visibilitychange',
      update
    );

    return () => {
      observer.disconnect();

      document.removeEventListener(
        'visibilitychange',
        update
      );
    };
  }, []);

  if (lost) {
    return <ReadyFallback onReady={onReady} />;
  }

  return (
    <div
      ref={host}
      className="h-full w-full"
    >
      <Canvas
        frameloop={
          visible && pageVisible
            ? 'always'
            : 'never'
        }
        camera={{
          fov: 35,
          position: [0, 0.5, 8],
          near: 0.1,
          far: 50,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        fallback={
          <ReadyFallback onReady={onReady} />
        }
        style={{
          background: 'transparent',
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);

          gl.domElement.addEventListener(
            'webglcontextlost',
            () => {
              setLost(true);
            },
            {
              once: true,
            }
          );
        }}
      >
        <Suspense fallback={null}>
          <SceneContent onReady={onReady} />
        </Suspense>
      </Canvas>
    </div>
  );
}