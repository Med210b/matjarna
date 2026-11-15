import { useMemo } from 'react';

/**
 * SceneLighting — cinematic warm lighting setup.
 *
 * Soft ambient base + large key light + peach rim + burgundy fill.
 * Uses point lights and a directional light for controlled, premium look.
 */
export default function SceneLighting() {
  const lights = useMemo(
    () => [
      // Soft ambient base
      <ambientLight key="ambient" intensity={0.35} color="#FFF8F3" />,

      // Large soft key light from upper-left
      <directionalLight
        key="key"
        position={[5, 8, 5]}
        intensity={1.2}
        color="#FFF8F3"
      />,

      // Warm peach rim light from upper-right
      <pointLight
        key="rim-peach"
        position={[-4, 3, -3]}
        intensity={30}
        color="#FFC29D"
        distance={20}
        decay={1.5}
      />,

      // Burgundy fill from lower-left
      <pointLight
        key="fill-burgundy"
        position={[4, -2, 2]}
        intensity={15}
        color="#A91442"
        distance={15}
        decay={1.8}
      />,

      // Coral accent from behind
      <pointLight
        key="accent-coral"
        position={[0, 2, -5]}
        intensity={12}
        color="#EE8B78"
        distance={18}
        decay={1.5}
      />,
    ],
    []
  );

  return <>{lights}</>;
}
