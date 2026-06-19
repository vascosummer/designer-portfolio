import { Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { Monolith, Lens, Shard, Ribbon, Motes } from "./objects";

const Rig = ({ mouse }) => {
  useFrame((state) => {
    const yaw = mouse.x * 0.06;
    const pitch = mouse.y * -0.04;
    state.camera.position.x += (yaw * 0.8 - state.camera.position.x) * 0.04;
    state.camera.position.y += (pitch * 0.6 - state.camera.position.y) * 0.04;
    state.camera.lookAt(1.4, 0, 0);
  });
  return null;
};

export const HeroScene = ({ mouse }) => {
  return (
    <Canvas
      data-testid="hero-canvas"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.2], fov: 42 }}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <color attach="background" args={["#0A0A0B"]} />
      <fog attach="fog" args={["#0A0A0B", 4, 9]} />

      <directionalLight position={[-3, 4, 2]} intensity={1.4} color="#FFE9C8" castShadow />
      <directionalLight position={[4, -2, 1]} intensity={0.18} color="#7FA7C9" />
      <directionalLight position={[3, 1, -3]} intensity={0.5} color="#A8643C" />
      <ambientLight intensity={0.04} />

      <Suspense fallback={null}>
        <Environment preset="studio" />
        <Monolith mouse={mouse} />
        <Lens mouse={mouse} />
        <Shard mouse={mouse} />
        <Ribbon mouse={mouse} />
        <Motes mouse={mouse} />
      </Suspense>

      <Rig mouse={mouse} />
    </Canvas>
  );
};
