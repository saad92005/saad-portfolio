"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles, Environment, Lightformer } from "@react-three/drei";
import type { Group, Mesh } from "three";

function Orb() {
  const group = useRef<Group>(null);
  const ring = useRef<Mesh>(null);
  const ring2 = useRef<Mesh>(null);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    // ease toward the pointer for a parallax tilt
    g.rotation.y += (state.pointer.x * 0.6 - g.rotation.y) * 0.05;
    g.rotation.x += (-state.pointer.y * 0.4 - g.rotation.x) * 0.05;
    if (ring.current) ring.current.rotation.z += delta * 0.25;
    if (ring2.current) ring2.current.rotation.z -= delta * 0.18;
  });

  return (
    <group ref={group}>
      <Float speed={1.6} rotationIntensity={0.6} floatIntensity={1.2}>
        <mesh>
          <icosahedronGeometry args={[1.35, 64]} />
          <MeshDistortMaterial
            color="#6d4aff"
            emissive="#2b0f7a"
            emissiveIntensity={0.6}
            roughness={0.12}
            metalness={0.85}
            distort={0.42}
            speed={2.2}
          />
        </mesh>
        <mesh scale={1.75}>
          <icosahedronGeometry args={[1, 2]} />
          <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.12} />
        </mesh>
      </Float>
      <mesh ref={ring} rotation={[1.2, 0.2, 0]}>
        <torusGeometry args={[2.45, 0.012, 16, 200]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.7} />
      </mesh>
      <mesh ref={ring2} rotation={[1.6, -0.5, 0.3]}>
        <torusGeometry args={[2.85, 0.008, 16, 200]} />
        <meshBasicMaterial color="#f472b6" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6.2], fov: 45 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 3, 4]} intensity={60} color="#22d3ee" />
      <pointLight position={[-4, -2, 3]} intensity={50} color="#f472b6" />
      {/* built-in light rig: no HDR download from a CDN */}
      <Environment resolution={256}>
        <Lightformer intensity={3} color="#22d3ee" position={[3, 2, 2]} scale={[4, 2, 1]} />
        <Lightformer intensity={3} color="#f472b6" position={[-3, -1, 2]} scale={[4, 2, 1]} />
        <Lightformer intensity={1.5} color="#ffffff" position={[0, 4, -2]} scale={[6, 1, 1]} />
      </Environment>
      <Orb />
      <Sparkles count={120} scale={[10, 6, 4]} size={2.2} speed={0.35} color="#a5f3fc" />
    </Canvas>
  );
}
