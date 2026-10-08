"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, RoundedBox } from "@react-three/drei";
import { MathUtils, type Group, type Mesh } from "three";

// "Byte" — an original robot mascot. The head and eyes track the pointer,
// it bobs while idle, blinks, and waves its arm every few seconds.
function Robot() {
  const root = useRef<Group>(null);
  const head = useRef<Group>(null);
  const eyes = useRef<Group>(null);
  const leftEye = useRef<Mesh>(null);
  const rightEye = useRef<Mesh>(null);
  const arm = useRef<Group>(null);
  const bulb = useRef<Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const { x, y } = state.pointer;

    if (root.current) {
      root.current.position.y = Math.sin(t * 1.6) * 0.08;
      root.current.rotation.y = MathUtils.lerp(root.current.rotation.y, x * 0.35, 0.05);
    }
    if (head.current) {
      head.current.rotation.y = MathUtils.lerp(head.current.rotation.y, x * 0.6, 0.08);
      head.current.rotation.x = MathUtils.lerp(head.current.rotation.x, -y * 0.35, 0.08);
      head.current.rotation.z = Math.sin(t * 0.8) * 0.04;
    }
    if (eyes.current) {
      eyes.current.position.x = MathUtils.lerp(eyes.current.position.x, x * 0.09, 0.15);
      eyes.current.position.y = MathUtils.lerp(eyes.current.position.y, y * 0.06, 0.15);
    }
    // blink: a quick squash every ~3.5s
    const blink = t % 3.5 < 0.12 ? 0.1 : 1;
    [leftEye.current, rightEye.current].forEach((e) => {
      if (e) e.scale.y = MathUtils.lerp(e.scale.y, blink, 0.5);
    });
    // wave: raise the right arm for ~1.6s every 6s
    if (arm.current) {
      const phase = t % 6;
      const waving = phase < 1.6;
      const target = waving ? -2.4 + Math.sin(phase * 10) * 0.35 : -0.15;
      arm.current.rotation.z = MathUtils.lerp(arm.current.rotation.z, target, 0.12);
    }
    if (bulb.current) {
      const s = 1 + Math.sin(t * 4) * 0.12;
      bulb.current.scale.setScalar(s);
    }
  });

  const shell = { color: "#ece8f5", roughness: 0.3, metalness: 0.1 };
  const dark = { color: "#16121f", roughness: 0.2, metalness: 0.4 };
  const glow = { color: "#e7ddff", emissive: "#9b82ff", emissiveIntensity: 2.4, toneMapped: false };

  return (
    <group ref={root} position={[0, -0.35, 0]}>
      {/* head */}
      <group ref={head} position={[0, 1.05, 0]}>
        <RoundedBox args={[1.7, 1.25, 1.25]} radius={0.38} smoothness={6}>
          <meshStandardMaterial {...shell} />
        </RoundedBox>
        {/* visor */}
        <RoundedBox args={[1.38, 0.78, 0.2]} radius={0.18} smoothness={6} position={[0, 0, 0.58]}>
          <meshStandardMaterial {...dark} />
        </RoundedBox>
        <group ref={eyes} position={[0, 0, 0.7]}>
          <mesh ref={leftEye} position={[-0.3, 0.02, 0]}>
            <capsuleGeometry args={[0.085, 0.16, 8, 16]} />
            <meshStandardMaterial {...glow} />
          </mesh>
          <mesh ref={rightEye} position={[0.3, 0.02, 0]}>
            <capsuleGeometry args={[0.085, 0.16, 8, 16]} />
            <meshStandardMaterial {...glow} />
          </mesh>
        </group>
        {/* ears */}
        {[-1, 1].map((s) => (
          <mesh key={s} position={[s * 0.9, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.2, 0.2, 0.16, 32]} />
            <meshStandardMaterial {...dark} />
          </mesh>
        ))}
        {/* antenna */}
        <mesh position={[0, 0.78, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.35, 12]} />
          <meshStandardMaterial {...dark} />
        </mesh>
        <mesh ref={bulb} position={[0, 1, 0]}>
          <sphereGeometry args={[0.1, 24, 24]} />
          <meshStandardMaterial {...glow} />
        </mesh>
      </group>

      {/* neck + body */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.2, 0.25, 0.2, 24]} />
        <meshStandardMaterial {...dark} />
      </mesh>
      <RoundedBox args={[1.25, 1.05, 0.9]} radius={0.32} smoothness={6} position={[0, -0.35, 0]}>
        <meshStandardMaterial {...shell} />
      </RoundedBox>
      {/* chest light */}
      <mesh position={[0, -0.28, 0.46]}>
        <circleGeometry args={[0.13, 32]} />
        <meshStandardMaterial {...glow} />
      </mesh>

      {/* arms (pivot at shoulder) */}
      <group position={[-0.72, -0.05, 0]} rotation={[0, 0, 0.15]}>
        <mesh position={[0, -0.32, 0]}>
          <capsuleGeometry args={[0.13, 0.42, 8, 16]} />
          <meshStandardMaterial {...shell} />
        </mesh>
      </group>
      <group ref={arm} position={[0.72, -0.05, 0]} rotation={[0, 0, -0.15]}>
        <mesh position={[0, -0.32, 0]}>
          <capsuleGeometry args={[0.13, 0.42, 8, 16]} />
          <meshStandardMaterial {...shell} />
        </mesh>
      </group>
    </group>
  );
}

export default function RobotScene() {
  return (
    <Canvas camera={{ position: [0, 0.4, 5.4], fov: 40 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} />
      <pointLight position={[-3, 1, 2]} intensity={25} color="#c9b8ff" />
      <pointLight position={[3, -1, 2]} intensity={15} color="#ffc2da" />
      {/* local light rig, no HDR download */}
      <Environment resolution={256}>
        <Lightformer intensity={2} color="#ffffff" position={[2, 3, 3]} scale={[4, 4, 1]} />
        <Lightformer intensity={2.5} color="#a66bff" position={[-4, 0, 1]} scale={[3, 6, 1]} />
      </Environment>
      <Robot />
      <ContactShadows position={[0, -1.3, 0]} opacity={0.6} scale={6} blur={2.4} far={3} color="#7c62e0" />
    </Canvas>
  );
}
