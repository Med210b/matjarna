import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollStore } from '@/lib/gsapSetup';

/**
 * RibbonSculpture — a custom sculptural M-inspired ribbon.
 *
 * The form is built from a CatmullRom curve that traces an M-like path
 * in 3D space with height variation, then extruded with a rounded profile
 * to give real dimensional thickness. Two intertwined layers create depth.
 *
 * Scroll integration: reads scrollStore.heroProgress (0→1) and interpolates
 * position, rotation, and scale across three phases:
 *   Phase A (0–0.2): gentle rotation begins
 *   Phase B (0.2–0.65): rotates to new orientation, moves toward center
 *   Phase C (0.65–1.0): moves to final transition position
 */

interface RibbonSculptureProps {
  scale?: number;
  reducedMotion?: boolean;
}

// Smooth interpolation helper
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (t: number) => Math.max(0, Math.min(1, t));
// Scale a value within a sub-range of 0–1
const rangeLerp = (val: number, start: number, end: number, from: number, to: number) => {
  if (val <= start) return from;
  if (val >= end) return to;
  return lerp(from, to, (val - start) / (end - start));
};

export default function RibbonSculpture({ scale = 1, reducedMotion = false }: RibbonSculptureProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ribbon1Ref = useRef<THREE.Mesh>(null);
  const ribbon2Ref = useRef<THREE.Mesh>(null);
  const entranceRef = useRef(0);
  const breatheRef = useRef(0);

  // Smoothed scroll progress for stable interpolation
  const smoothProgress = useRef(0);

  // M-inspired curve points — traces an M shape with depth variation
  const { geometry1, geometry2 } = useMemo(() => {
    const points1: THREE.Vector3[] = [];
    const mPath = [
      { x: -2.2, y: 1.4, z: 0.15 },
      { x: -1.8, y: 1.2, z: 0.25 },
      { x: -1.4, y: -0.8, z: 0.35 },
      { x: -1.0, y: -1.0, z: 0.3 },
      { x: -0.5, y: 0.3, z: 0.1 },
      { x: 0.0, y: 0.8, z: 0.0 },
      { x: 0.5, y: 0.3, z: -0.1 },
      { x: 1.0, y: -1.0, z: -0.3 },
      { x: 1.4, y: -0.8, z: -0.35 },
      { x: 1.8, y: 1.2, z: -0.25 },
      { x: 2.2, y: 1.4, z: -0.15 },
    ];

    for (let i = 0; i < mPath.length; i++) {
      const p = mPath[i];
      points1.push(new THREE.Vector3(p.x, p.y, p.z));
    }

    const curve1 = new THREE.CatmullRomCurve3(points1, false, 'catmullrom', 0.5);

    const points2: THREE.Vector3[] = [];
    const mPath2 = [
      { x: -2.0, y: 1.0, z: -0.2 },
      { x: -1.5, y: 0.5, z: -0.3 },
      { x: -1.2, y: -0.6, z: -0.15 },
      { x: -0.7, y: -0.3, z: 0.1 },
      { x: -0.3, y: 0.6, z: 0.2 },
      { x: 0.0, y: 1.1, z: 0.15 },
      { x: 0.3, y: 0.6, z: 0.2 },
      { x: 0.7, y: -0.3, z: 0.1 },
      { x: 1.2, y: -0.6, z: -0.15 },
      { x: 1.5, y: 0.5, z: -0.3 },
      { x: 2.0, y: 1.0, z: -0.2 },
    ];

    for (let i = 0; i < mPath2.length; i++) {
      const p = mPath2[i];
      points2.push(new THREE.Vector3(p.x, p.y, p.z));
    }

    const curve2 = new THREE.CatmullRomCurve3(points2, false, 'catmullrom', 0.5);

    const profileShape = new THREE.Shape();
    const pw = 0.18;
    const ph = 0.06;
    const cornerR = 0.04;
    profileShape.moveTo(-pw + cornerR, -ph);
    profileShape.lineTo(pw - cornerR, -ph);
    profileShape.quadraticCurveTo(pw, -ph, pw, -ph + cornerR);
    profileShape.lineTo(pw, ph - cornerR);
    profileShape.quadraticCurveTo(pw, ph, pw - cornerR, ph);
    profileShape.lineTo(-pw + cornerR, ph);
    profileShape.quadraticCurveTo(-pw, ph, -pw, ph - cornerR);
    profileShape.lineTo(-pw, -ph + cornerR);
    profileShape.quadraticCurveTo(-pw, -ph, -pw + cornerR, -ph);

    const extrudeSettings1: THREE.ExtrudeGeometryOptions = {
      steps: 200,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.025,
      bevelSegments: 4,
      curveSegments: 12,
      extrudePath: curve1,
    };

    const extrudeSettings2: THREE.ExtrudeGeometryOptions = {
      steps: 200,
      bevelEnabled: true,
      bevelThickness: 0.025,
      bevelSize: 0.02,
      bevelSegments: 3,
      curveSegments: 10,
      extrudePath: curve2,
    };

    const geo1 = new THREE.ExtrudeGeometry(profileShape, extrudeSettings1);
    const geo2 = new THREE.ExtrudeGeometry(profileShape, extrudeSettings2);

    geo1.computeVertexNormals();
    geo2.computeVertexNormals();

    return { geometry1: geo1, geometry2: geo2 };
  }, []);

  const burgundyMetal = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#85052D'),
        metalness: 0.85,
        roughness: 0.28,
        clearcoat: 0.4,
        clearcoatRoughness: 0.3,
        envMapIntensity: 1.2,
      }),
    []
  );

  const peachGlass = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#FFC29D'),
        metalness: 0.1,
        roughness: 0.15,
        transmission: 0.6,
        thickness: 0.5,
        ior: 1.4,
        transparent: true,
        opacity: 0.75,
        envMapIntensity: 1.5,
        clearcoat: 0.8,
        clearcoatRoughness: 0.1,
      }),
    []
  );

  useEffect(() => {
    return () => {
      geometry1.dispose();
      geometry2.dispose();
      burgundyMetal.dispose();
      peachGlass.dispose();
    };
  }, [geometry1, geometry2, burgundyMetal, peachGlass]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const dt = Math.min(delta, 0.1);

    // Smooth scroll progress toward target
    const targetProgress = scrollStore.heroProgress;
    smoothProgress.current = lerp(smoothProgress.current, targetProgress, 1 - Math.exp(-4 * dt));
    const sp = smoothProgress.current;

    // Entrance animation: scale from 0.7 to 1.0 with eased ramp
    if (entranceRef.current < 1) {
      entranceRef.current = Math.min(1, entranceRef.current + dt * 0.8);
    }
    const entranceE = easeOutCubic(entranceRef.current);

    // Breathing motion
    breatheRef.current += dt;
    const breathe = reducedMotion ? 0 : Math.sin(breatheRef.current * 0.6) * 0.02;

    // === Scroll-driven transforms ===
    // Phase A (0–0.2): gentle rotation begins, subtle position shift
    // Phase B (0.2–0.65): rotate to new orientation, move toward center, scale slightly
    // Phase C (0.65–1.0): move to final transition position

    // Rotation Y: 0 → 0.3 → 1.2 → 2.0
    const scrollRotY = reducedMotion
      ? 0
      : sp < 0.2
      ? rangeLerp(sp, 0, 0.2, 0, 0.3)
      : sp < 0.65
      ? rangeLerp(sp, 0.2, 0.65, 0.3, 1.2)
      : rangeLerp(sp, 0.65, 1.0, 1.2, 2.0);

    // Rotation X: subtle tilt
    const scrollRotX = reducedMotion
      ? 0
      : sp < 0.2
      ? rangeLerp(sp, 0, 0.2, 0, 0.05)
      : sp < 0.65
      ? rangeLerp(sp, 0.2, 0.65, 0.05, 0.15)
      : rangeLerp(sp, 0.65, 1.0, 0.15, 0.1);

    // Position X: move toward center then left
    const scrollPosX = reducedMotion
      ? 0
      : sp < 0.2
      ? 0
      : sp < 0.65
      ? rangeLerp(sp, 0.2, 0.65, 0, -0.5)
      : rangeLerp(sp, 0.65, 1.0, -0.5, -1.0);

    // Position Y: float down slightly then up
    const scrollPosY = reducedMotion
      ? 0
      : sp < 0.2
      ? 0
      : sp < 0.65
      ? rangeLerp(sp, 0.2, 0.65, 0, -0.3)
      : rangeLerp(sp, 0.65, 1.0, -0.3, 0.2);

    // Scale: slight increase then decrease for depth feel
    const scrollScale = reducedMotion
      ? 1
      : sp < 0.2
      ? rangeLerp(sp, 0, 0.2, 1, 1.05)
      : sp < 0.65
      ? rangeLerp(sp, 0.2, 0.65, 1.05, 1.15)
      : rangeLerp(sp, 0.65, 1.0, 1.15, 0.9);

    // Apply transforms
    const idleY = reducedMotion ? 0 : Math.sin(breatheRef.current * 0.4) * 0.08;
    const idleRotZ = reducedMotion ? 0 : Math.sin(breatheRef.current * 0.25) * 0.03;

    groupRef.current.position.x = scrollPosX;
    groupRef.current.position.y = scrollPosY + idleY;
    groupRef.current.rotation.y = scrollRotY;
    groupRef.current.rotation.x = scrollRotX;
    groupRef.current.rotation.z = idleRotZ;

    const finalScale =
      (entranceRef.current < 1 ? 0.7 + 0.3 * entranceE : 1) *
      scale *
      scrollScale *
      (1 + breathe);
    groupRef.current.scale.setScalar(finalScale);

    // Subtle independent rotation on secondary ribbon
    if (ribbon2Ref.current && !reducedMotion) {
      ribbon2Ref.current.rotation.z = Math.sin(breatheRef.current * 0.35) * 0.025;
    }
  });

  return (
    <group ref={groupRef} scale={scale * 0.7}>
      <mesh ref={ribbon1Ref} geometry={geometry1} material={burgundyMetal} castShadow />
      <mesh ref={ribbon2Ref} geometry={geometry2} material={peachGlass} />
    </group>
  );
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}
