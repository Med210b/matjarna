import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * FloatingAccents — a small number of carefully positioned rings
 * and accent shapes that add visual depth around the main sculpture.
 */

interface FloatingAccentsProps {
  reducedMotion?: boolean;
}

export default function FloatingAccents({ reducedMotion = false }: FloatingAccentsProps) {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const orbRef = useRef<THREE.Mesh>(null);
  const diamondRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  // Shared geometries
  const ringGeo = useMemo(() => new THREE.TorusGeometry(0.5, 0.015, 16, 100), []);
  const ringGeo2 = useMemo(() => new THREE.TorusGeometry(0.35, 0.012, 16, 100), []);
  const orbGeo = useMemo(() => new THREE.SphereGeometry(0.08, 32, 32), []);
  const diamondGeo = useMemo(() => new THREE.OctahedronGeometry(0.08, 0), []);

  // Materials
  const roseGoldMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#DF7084'),
        metalness: 0.9,
        roughness: 0.25,
        clearcoat: 0.5,
        envMapIntensity: 1.3,
      }),
    []
  );

  const coralMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#EE8B78'),
        metalness: 0.3,
        roughness: 0.2,
        transparent: true,
        opacity: 0.8,
        envMapIntensity: 1.5,
      }),
    []
  );

  const peachOrbMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#FFC29D'),
        metalness: 0.1,
        roughness: 0.1,
        transmission: 0.5,
        thickness: 0.3,
        transparent: true,
        opacity: 0.85,
        envMapIntensity: 1.4,
      }),
    []
  );

  const burgundyDiamondMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#A91442'),
        metalness: 0.8,
        roughness: 0.2,
        envMapIntensity: 1.2,
      }),
    []
  );

  // Cleanup geometries and materials on unmount
  useEffect(() => {
    return () => {
      ringGeo.dispose();
      ringGeo2.dispose();
      orbGeo.dispose();
      diamondGeo.dispose();
      roseGoldMat.dispose();
      coralMat.dispose();
      peachOrbMat.dispose();
      burgundyDiamondMat.dispose();
    };
  }, [ringGeo, ringGeo2, orbGeo, diamondGeo, roseGoldMat, coralMat, peachOrbMat, burgundyDiamondMat]);

  useFrame((_, delta) => {
    timeRef.current += delta;
    const t = timeRef.current;

    if (reducedMotion) return;

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.15;
      ring1Ref.current.rotation.y = t * 0.1;
      ring1Ref.current.position.y = 1.8 + Math.sin(t * 0.5) * 0.1;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -t * 0.12;
      ring2Ref.current.rotation.z = t * 0.08;
      ring2Ref.current.position.y = -1.5 + Math.cos(t * 0.4) * 0.08;
    }

    if (orbRef.current) {
      orbRef.current.position.y = 0.5 + Math.sin(t * 0.6) * 0.15;
      orbRef.current.position.x = 2.3 + Math.cos(t * 0.3) * 0.1;
    }

    if (diamondRef.current) {
      diamondRef.current.rotation.x = t * 0.2;
      diamondRef.current.rotation.y = t * 0.15;
      diamondRef.current.position.y = -0.8 + Math.sin(t * 0.45 + 1) * 0.12;
    }
  });

  return (
    <group>
      {/* Large rose gold ring — upper area */}
      <mesh
        ref={ring1Ref}
        geometry={ringGeo}
        material={roseGoldMat}
        position={[1.5, 1.8, -0.5]}
        rotation={[Math.PI / 3, 0, Math.PI / 6]}
      />

      {/* Smaller coral ring — lower area */}
      <mesh
        ref={ring2Ref}
        geometry={ringGeo2}
        material={coralMat}
        position={[-1.8, -1.5, 0.3]}
        rotation={[Math.PI / 4, Math.PI / 3, 0]}
      />

      {/* Peach glass orb — right side */}
      <mesh
        ref={orbRef}
        geometry={orbGeo}
        material={peachOrbMat}
        position={[2.3, 0.5, 0.5]}
      />

      {/* Burgundy diamond — left-lower */}
      <mesh
        ref={diamondRef}
        geometry={diamondGeo}
        material={burgundyDiamondMat}
        position={[-2.2, -0.8, -0.3]}
        scale={0.8}
      />
    </group>
  );
}
