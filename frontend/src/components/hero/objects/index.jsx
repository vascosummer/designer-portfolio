import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * The 5 floating objects:
 *  01 Monolith — graphite anchor, holds the right edge
 *  02 Lens     — bone-white torus, the focal point
 *  03 Shard    — frosted obsidian, tumbling disruption
 *  04 Ribbon   — copper-edged plane, the gesture
 *  05 Motes    — bone-white dust cluster, drifting
 */

export const Monolith = ({ mouse }) => {
  const ref = useRef(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = Math.sin((t / 12) * Math.PI * 2) * 0.026;
    ref.current.position.x = 2.6 + mouse.x * 0.08;
    ref.current.position.y = -0.2 + mouse.y * -0.05;
  });
  return (
    <mesh ref={ref} position={[2.6, -0.2, -1.2]} castShadow>
      <boxGeometry args={[0.42, 4.6, 0.42]} />
      <meshStandardMaterial color="#1E1E22" metalness={0.65} roughness={0.42} envMapIntensity={0.8} />
    </mesh>
  );
};

export const Lens = ({ mouse }) => {
  const ref = useRef(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += delta * 0.14;
    ref.current.rotation.x = 1.2 + mouse.y * 0.18;
    ref.current.rotation.y = mouse.x * 0.22;
    ref.current.position.x = 1.1 + mouse.x * 0.22;
    ref.current.position.y = 0.4 + mouse.y * -0.12;
  });
  return (
    <mesh ref={ref} position={[1.1, 0.4, 0]} rotation={[1.2, 0, 0]}>
      <torusGeometry args={[0.7, 0.022, 64, 128]} />
      <meshStandardMaterial color="#F2EBDD" metalness={0.2} roughness={0.18} emissive="#F2EBDD" emissiveIntensity={0.06} />
    </mesh>
  );
};

export const Shard = ({ mouse }) => {
  const ref = useRef(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = (t / 28) * Math.PI * 2;
    ref.current.rotation.y = (t / 28) * Math.PI * 2.3;
    ref.current.rotation.z = (t / 28) * Math.PI * 1.7;
    ref.current.position.x = 2.0 + mouse.x * 0.1;
    ref.current.position.y = 1.4 + mouse.y * -0.08;
  });
  return (
    <mesh ref={ref} position={[2.0, 1.4, -0.4]}>
      <tetrahedronGeometry args={[0.32, 0]} />
      <meshStandardMaterial color="#0F0F12" metalness={0.3} roughness={0.85} flatShading />
    </mesh>
  );
};

export const Ribbon = ({ mouse }) => {
  const ref = useRef(null);
  const geoRef = useRef(null);

  useFrame((state) => {
    if (!ref.current || !geoRef.current) return;
    const t = state.clock.elapsedTime;
    const pos = geoRef.current.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const wave = Math.sin((x * 3) + (t / 6) * Math.PI * 2) * 0.12;
      pos.setZ(i, wave);
    }
    pos.needsUpdate = true;
    ref.current.rotation.x = Math.sin((t / 6) * Math.PI * 2) * 0.035;
    ref.current.position.x = 1.6 + mouse.x * 0.14;
    ref.current.position.y = -1.2 + mouse.y * -0.08;
  });

  return (
    <mesh ref={ref} position={[1.6, -1.2, -0.2]} rotation={[0.1, 0.4, -0.2]}>
      <planeGeometry args={[2.4, 0.06, 64, 1]} ref={geoRef} />
      <meshStandardMaterial color="#A8643C" metalness={0.85} roughness={0.28} side={THREE.DoubleSide} emissive="#A8643C" emissiveIntensity={0.04} />
    </mesh>
  );
};

export const Motes = ({ mouse }) => {
  const ref = useRef(null);
  const count = 60;

  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
    seeds[i] = Math.random();
  }

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const pos = ref.current.geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const baseY = positions[i * 3 + 1];
      const drift = ((t * 0.06) + seeds[i]) % 1;
      const y = baseY + drift * 4 - 2;
      pos.setY(i, y);
    }
    pos.needsUpdate = true;
    ref.current.position.x = mouse.x * 0.4;
    ref.current.position.y = mouse.y * -0.25;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.018} color="#F2EBDD" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};
