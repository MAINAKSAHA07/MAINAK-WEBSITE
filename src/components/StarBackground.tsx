import React, { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Float, Sphere, Cone, Cylinder, Box, MeshDistortMaterial } from "@react-three/drei";
import * as random from "maath/random";
import type { Points as PointsType, Group } from "three";

export const StarBackground = () => {
  const ref = useRef<PointsType | null>(null);
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(15000), { radius: 1.5 }) as Float32Array
  );

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        stride={3}
        positions={sphere}
        frustumCulled
      >
        <PointMaterial
          transparent
          color="#fff"
          size={0.003}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

// Abstract Moon Component
const FloatingMoon = () => {
  return (
    <Float speed={1.2} rotationIntensity={0.5} floatIntensity={1.5}>
      <Sphere args={[0.25, 32, 32]} position={[1.2, 0.7, -1]}>
        <MeshDistortMaterial
          color="#94a3b8"
          distort={0.15}
          speed={1}
          roughness={0.9}
        />
      </Sphere>
    </Float>
  );
};

// Abstract Spaceship Component
const Spaceship = () => {
  const shipRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (shipRef.current) {
      // Gentle orbit mapping
      shipRef.current.position.y = -0.6 + Math.sin(state.clock.elapsedTime * 0.4) * 0.3;
      shipRef.current.position.x = -1.1 + Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <group ref={shipRef} position={[-1.1, -0.6, -1.5]} rotation={[0.4, 0.8, 0.2]}>
        {/* Main Body */}
        <Cylinder args={[0.06, 0.08, 0.3, 16]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#b49bff" metalness={0.8} roughness={0.2} />
        </Cylinder>
        {/* Nose */}
        <Cone args={[0.06, 0.15, 16]} position={[0, 0, 0.22]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#7042f8" />
        </Cone>
        {/* Wings */}
        <Box args={[0.4, 0.015, 0.15]} position={[0, 0, -0.05]}>
          <meshStandardMaterial color="#fff" metalness={0.9} />
        </Box>
        {/* Engine Glow */}
        <Sphere args={[0.04, 16, 16]} position={[0, 0, -0.16]}>
          <meshBasicMaterial color="#00f3ff" />
        </Sphere>
      </group>
    </Float>
  );
};

// An abstract floating asteroid
const FloatingAsteroid = () => {
  return (
    <Float speed={0.8} rotationIntensity={3} floatIntensity={2}>
      <Sphere args={[0.08, 8, 8]} position={[-0.8, 0.8, -1.2]}>
        <MeshDistortMaterial
          color="#4b5563"
          distort={0.4}
          speed={0.5}
          roughness={1}
        />
      </Sphere>
    </Float>
  );
};

export const StarsCanvas = () => (
  <div className="w-full h-auto fixed inset-0 -z-10 pointer-events-none">
    <Canvas camera={{ position: [0, 0, 1] }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} color="#b49bff" />
      <directionalLight position={[-5, -10, -5]} intensity={1} color="#00f3ff" />
      <Suspense fallback={null}>
        <StarBackground />
        <FloatingMoon />
        <Spaceship />
        <FloatingAsteroid />
      </Suspense>
    </Canvas>
  </div>
);
