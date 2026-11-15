import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollStore } from '@/lib/gsapSetup';

/**
 * CameraRig — mouse-reactive camera with smooth damping.
 *
 * Combines mouse-based parallax (from Stage 2) with scroll-driven
 * camera changes. The scroll progress adjusts the camera's distance
 * and height to complement the sculpture's choreography.
 *
 * Hierarchy: scroll transforms set the base, mouse adds a subtle
 * parallax offset on top. No fighting over the same values.
 */

interface CameraRigProps {
  reducedMotion?: boolean;
  isMobile?: boolean;
}

const DAMPING = 2.5;
const MAX_ROTATION_X = 0.1;
const MAX_ROTATION_Y = 0.2;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function CameraRig({ reducedMotion = false, isMobile = false }: CameraRigProps) {
  const { camera, gl } = useThree();
  const targetRotX = useRef(0);
  const targetRotY = useRef(0);
  const currentRotX = useRef(0);
  const currentRotY = useRef(0);
  const pointerActive = useRef(false);
  const smoothScroll = useRef(0);

  useEffect(() => {
    const canvas = gl.domElement;

    const handlePointerMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;

      targetRotY.current = x * MAX_ROTATION_Y;
      targetRotX.current = -y * MAX_ROTATION_X;
      pointerActive.current = true;
    };

    const handlePointerLeave = () => {
      targetRotX.current = 0;
      targetRotY.current = 0;
      pointerActive.current = false;
    };

    if (!reducedMotion && !isMobile) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerleave', handlePointerLeave);
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [gl, reducedMotion, isMobile]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    const factor = 1 - Math.exp(-DAMPING * dt);

    // Smooth scroll progress
    smoothScroll.current = lerp(smoothScroll.current, scrollStore.heroProgress, 1 - Math.exp(-4 * dt));
    const sp = smoothScroll.current;

    // Base camera distance varies with scroll: closer as we scroll
    const baseRadius = isMobile ? 10 : 8;
    const scrollRadius = reducedMotion
      ? baseRadius
      : lerp(baseRadius, baseRadius * 0.85, sp);

    // Base camera height shifts with scroll
    const baseHeight = 0.5;
    const scrollHeight = reducedMotion
      ? baseHeight
      : lerp(baseHeight, baseHeight - 0.3, sp);

    if (!reducedMotion) {
      // Idle oscillation when pointer is not active
      if (!pointerActive.current) {
        const t = performance.now() * 0.0003;
        targetRotY.current = Math.sin(t) * 0.06;
        targetRotX.current = Math.cos(t * 0.7) * 0.03;
      }

      currentRotX.current += (targetRotX.current - currentRotX.current) * factor;
      currentRotY.current += (targetRotY.current - currentRotY.current) * factor;

      // Mouse parallax is additive on top of the base position
      camera.position.x = Math.sin(currentRotY.current) * scrollRadius;
      camera.position.z = Math.cos(currentRotY.current) * scrollRadius;
      camera.position.y = scrollHeight + currentRotX.current * scrollRadius * 0.5;
      camera.lookAt(0, 0, 0);
    } else {
      camera.position.set(0, baseHeight, baseRadius);
      camera.lookAt(0, 0, 0);
    }
  });

  return null;
}
