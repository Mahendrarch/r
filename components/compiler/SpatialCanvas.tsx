'use client';

import { useEffect, useRef } from 'react';
import { useCompilerStore } from '@/lib/store';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useScrollVelocity } from '@/hooks/useScrollVelocity';

// Lazy load R3F components to avoid blocking initial render
let Canvas: any;
let PerspectiveCamera: any;
let AmbientLight: any;
let DirectionalLight: any;
let Float: any;
let Icosahedron: any;
let TorusKnot: any;

if (typeof window !== 'undefined') {
  import('@react-three/fiber').then((module) => {
    Canvas = module.default;
    PerspectiveCamera = module.PerspectiveCamera;
    AmbientLight = module.AmbientLight;
    DirectionalLight = module.DirectionalLight;
    Float = module.Float;
    Icosahedron = module.Icosahedron;
    TorusKnot = module.TorusKnot;
  });
}

/**
 * Procedural floating geometry component ("data crystals").
 */
function DataCrystals() {
  const meshRef1 = useRef<any>(null);
  const meshRef2 = useRef<any>(null);
  const meshRef3 = useRef<any>(null);

  useEffect(() => {
    // Subtle rotation animation
    const animate = () => {
      if (meshRef1.current) {
        meshRef1.current.rotation.x += 0.001;
        meshRef1.current.rotation.y += 0.002;
      }
      if (meshRef2.current) {
        meshRef2.current.rotation.x -= 0.0015;
        meshRef2.current.rotation.z += 0.001;
      }
      if (meshRef3.current) {
        meshRef3.current.rotation.y -= 0.001;
        meshRef3.current.rotation.z -= 0.002;
      }
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <>
      {Float && Icosahedron && (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <Icosahedron ref={meshRef1} args={[1, 0]} position={[-3, 2, -5]}>
            <meshStandardMaterial
              color="#00ff9d"
              wireframe
              transparent
              opacity={0.3}
            />
          </Icosahedron>
        </Float>
      )}

      {Float && TorusKnot && (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
          <TorusKnot ref={meshRef2} args={[0.8, 0.3, 128, 16]} position={[3, -1, -4]}>
            <meshStandardMaterial
              color="#7b61ff"
              wireframe
              transparent
              opacity={0.25}
            />
          </TorusKnot>
        </Float>
      )}

      {Float && Icosahedron && (
        <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1.2}>
          <Icosahedron ref={meshRef3} args={[0.6, 1]} position={[0, 3, -6]}>
            <meshStandardMaterial
              color="#ff6b6b"
              wireframe
              transparent
              opacity={0.2}
            />
          </Icosahedron>
        </Float>
      )}
    </>
  );
}

/**
 * Fallback for mobile/reduced motion - CSS parallax layer.
 */
function CSSParallaxFallback() {
  const scrollProgress = useScrollVelocity();
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute w-32 h-32 border border-compiler-primary/20 rounded-full"
        style={{
          left: '10%',
          top: '20%',
          transform: `translateY(${scrollProgress * 20}px)`,
        }}
      />
      <div
        className="absolute w-24 h-24 border border-compiler-secondary/20 rounded-full"
        style={{
          right: '15%',
          top: '40%',
          transform: `translateY(${-scrollProgress * 15}px)`,
        }}
      />
      <div
        className="absolute w-40 h-40 border border-compiler-accent/10 rounded-full"
        style={{
          left: '50%',
          bottom: '10%',
          transform: `translateX(-50%) translateY(${scrollProgress * 10}px)`,
        }}
      />
    </div>
  );
}

interface SpatialCanvasProps {
  visible?: boolean;
}

/**
 * R3F canvas wrapper with perspective camera, lights, and fog.
 * Syncs camera position with Lenis scroll velocity.
 * Gracefully falls back to CSS parallax on mobile/reduced-motion.
 */
export function SpatialCanvas({ visible = true }: SpatialCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const scrollVelocity = useScrollVelocity();
  const cameraRef = useRef<any>(null);

  // Sync camera with scroll velocity
  useEffect(() => {
    if (cameraRef.current && !prefersReducedMotion) {
      const targetY = scrollVelocity * 0.5;
      cameraRef.current.position.y += (targetY - cameraRef.current.position.y) * 0.05;
    }
  }, [scrollVelocity, prefersReducedMotion]);

  // Show CSS fallback for reduced motion or mobile
  if (prefersReducedMotion || typeof window === 'undefined' || !Canvas) {
    return <CSSParallaxFallback />;
  }

  if (!visible) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 8], fov: 50 }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} ref={cameraRef} />
        
        {/* Lighting */}
        <AmbientLight intensity={0.5} />
        <DirectionalLight position={[10, 10, 5]} intensity={1} />
        <DirectionalLight position={[-10, -10, -5]} intensity={0.3} color="#7b61ff" />
        
        {/* Fog for depth */}
        <fog attach="fog" args={['#0a0a0f', 5, 20]} />
        
        {/* Procedural geometry */}
        <DataCrystals />
      </Canvas>
    </div>
  );
}
