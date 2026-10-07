"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment, Lightformer, ContactShadows } from "@react-three/drei";
import type { Group } from "three";

function Sculpture() {
  const group = useRef<Group>(null);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y += delta * 0.12;
    g.rotation.x += (-state.pointer.y * 0.35 - g.rotation.x) * 0.04;
    g.position.x += (state.pointer.x * 0.25 - g.position.x) * 0.04;
  });

  return (
    <group ref={group}>
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh>
          <torusKnotGeometry args={[1, 0.36, 300, 48, 2, 3]} />
          <MeshDistortMaterial color="#d9d1c3" roughness={0.38} metalness={0.15} distort={0.18} speed={1.4} />
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 42 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} color="#fff4e6" />
      <pointLight position={[-4, -1, 2]} intensity={40} color="#e8582a" />
      {/* local light rig: warm key, orange rim, soft top fill */}
      <Environment resolution={256}>
        <Lightformer intensity={2} color="#fff1df" position={[3, 3, 3]} scale={[4, 4, 1]} />
        <Lightformer intensity={2.5} color="#e8582a" position={[-4, -1, 1]} scale={[3, 6, 1]} />
        <Lightformer intensity={0.6} color="#ffffff" position={[0, 5, -3]} scale={[8, 1, 1]} />
      </Environment>
      <Sculpture />
      <ContactShadows position={[0, -2.1, 0]} opacity={0.5} scale={8} blur={2.6} far={4} color="#000000" />
    </Canvas>
  );
}
