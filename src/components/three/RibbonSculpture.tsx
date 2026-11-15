import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';

import { scrollStore } from '@/lib/gsapSetup';

interface SculptureProps {
  scale?: number;
  reducedMotion?: boolean;
}

export default function RibbonSculpture({
  scale = 1,
  reducedMotion = false,
}: SculptureProps) {
  const group = useRef<Group>(null);
  const progress = useRef(0);
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    const object = group.current;

    if (!object) return;

    const dt = Math.min(delta, 0.05);

    elapsed.current += dt;

    const target = reducedMotion
      ? 0
      : scrollStore.heroProgress;

    progress.current +=
      (target - progress.current) *
      (1 - Math.exp(-5 * dt));

    const motion = reducedMotion ? 0 : 1;

    object.rotation.set(
      0.46 +
        Math.sin(elapsed.current * 0.24) *
          0.06 *
          motion,

      0.28 +
        progress.current * 0.65 +
        Math.sin(elapsed.current * 0.18) *
          0.08 *
          motion,

      -0.32
    );

    object.position.y =
      Math.sin(elapsed.current * 0.5) *
      0.035 *
      motion;

    object.scale.setScalar(
      scale *
        0.92 *
        (1 - progress.current * 0.08)
    );
  });

  return (
    <group
      ref={group}
      scale={scale * 0.92}
      rotation={[0.46, 0.28, -0.32]}
    >
      <mesh scale={[1, 1.13, 1]}>
        <torusGeometry
          args={[0.9, 0.23, 40, 160]}
        />

        <meshPhysicalMaterial
          color="#92394f"
          metalness={0.22}
          roughness={0.3}
          clearcoat={0.45}
          clearcoatRoughness={0.28}
          envMapIntensity={0.85}
        />
      </mesh>
    </group>
  );
}