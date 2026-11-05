import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import type { Group, Mesh } from "three";

const SATELLITE_COUNT = 6;
const SATELLITE_COLORS = ["#60a5fa", "#a78bfa", "#67e8f9", "#60a5fa", "#a78bfa", "#67e8f9"];

/** Normalised pointer position (-1..1) kept outside React state to avoid re-renders. */
function usePointer() {
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return pointer;
}

function DeveloperCore() {
  const group = useRef<Group>(null);
  const shell = useRef<Mesh>(null);
  const ringA = useRef<Mesh>(null);
  const ringB = useRef<Mesh>(null);
  const satellites = useRef<(Mesh | null)[]>([]);
  const pointer = usePointer();

  const satellitePositions = useMemo(
    () =>
      Array.from({ length: SATELLITE_COUNT }, (_, i) => {
        const angle = (i / SATELLITE_COUNT) * Math.PI * 2;
        return { angle, radius: 2.35 + (i % 2) * 0.25, y: Math.sin(i * 1.7) * 0.4 };
      }),
    []
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const g = group.current;
    if (g) {
      // Smooth mouse-responsive tilt
      g.rotation.x += (pointer.current.y * 0.35 - g.rotation.x) * 0.06;
      g.rotation.y += (pointer.current.x * 0.5 - g.rotation.y) * 0.06;
    }
    if (shell.current) {
      shell.current.rotation.y += delta * 0.25;
      shell.current.rotation.x += delta * 0.12;
    }
    if (ringA.current) ringA.current.rotation.z += delta * 0.35;
    if (ringB.current) {
      ringB.current.rotation.x += delta * 0.2;
      ringB.current.rotation.y -= delta * 0.15;
    }
    satellites.current.forEach((mesh, i) => {
      if (!mesh) return;
      const { angle, radius, y } = satellitePositions[i];
      const a = angle + t * 0.45;
      mesh.position.set(Math.cos(a) * radius, y + Math.sin(t * 1.2 + i) * 0.15, Math.sin(a) * radius);
    });
  });

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.6}>
        {/* Wireframe developer shell */}
        <mesh ref={shell}>
          <icosahedronGeometry args={[1.35, 2]} />
          <meshBasicMaterial color="#60a5fa" wireframe transparent opacity={0.55} />
        </mesh>

        {/* Glowing distorted core */}
        <mesh>
          <sphereGeometry args={[0.92, 64, 64]} />
          <MeshDistortMaterial
            color="#4c1d95"
            emissive="#7c3aed"
            emissiveIntensity={0.55}
            roughness={0.15}
            metalness={0.4}
            distort={0.35}
            speed={2}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Orbit rings */}
        <mesh ref={ringA} rotation={[Math.PI / 2.4, 0, 0]}>
          <torusGeometry args={[1.95, 0.012, 16, 160]} />
          <meshBasicMaterial color="#67e8f9" transparent opacity={0.8} />
        </mesh>
        <mesh ref={ringB} rotation={[0.4, 0.6, 0]}>
          <torusGeometry args={[2.25, 0.008, 16, 160]} />
          <meshBasicMaterial color="#a78bfa" transparent opacity={0.6} />
        </mesh>

        {/* Orbiting technology nodes */}
        {satellitePositions.map((_, i) => (
          <mesh
            key={i}
            ref={(el) => {
              satellites.current[i] = el;
            }}
          >
            <sphereGeometry args={[0.1, 24, 24]} />
            <meshBasicMaterial color={SATELLITE_COLORS[i]} />
          </mesh>
        ))}
      </Float>

      <Sparkles count={60} scale={6} size={2.2} speed={0.4} color="#a78bfa" opacity={0.7} />
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-label="Interactive 3D developer core that follows the mouse"
      role="img"
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 4, 4]} intensity={60} color="#60a5fa" />
      <pointLight position={[-4, -3, 2]} intensity={50} color="#a78bfa" />
      <DeveloperCore />
    </Canvas>
  );
}
