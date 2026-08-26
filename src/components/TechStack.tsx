import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";

const techIcons = [
  { name: "React", color: "#61DAFB", bg: "#041528" },
  { name: "JavaScript", color: "#F7DF1E", bg: "#241f02" },
  { name: "Python", color: "#38bdf8", bg: "#0f172a" },
  { name: "Firebase", color: "#FFCA28", bg: "#2a1e05" },
  { name: "Node.js", color: "#22c55e", bg: "#052010" },
  { name: "Vite", color: "#818cf8", bg: "#1e1b4b" },
  { name: "HTML5", color: "#F06529", bg: "#281206" },
  { name: "CSS3", color: "#2965F1", bg: "#061328" },
  { name: "Gemini AI", color: "#a855f7", bg: "#1f0933" },
  { name: "Git", color: "#F1502F", bg: "#2a0d05" },
];

function createTechTexture(name: string, color: string, bg: string): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  // Background
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 512, 512);

  // Border ring
  ctx.strokeStyle = color;
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.arc(256, 256, 230, 0, Math.PI * 2);
  ctx.stroke();

  // Glow circle
  const grad = ctx.createRadialGradient(256, 256, 40, 256, 256, 200);
  grad.addColorStop(0, color + "40");
  grad.addColorStop(1, "transparent");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // Text
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 64px 'Outfit', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(name, 256, 256);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

const spheres = [...Array(24)].map(() => ({
  scale: [0.75, 0.9, 1, 1.1][Math.floor(Math.random() * 4)],
}));

type SphereProps = {
  scale: number;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({ scale, material, isActive }: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);
  const vec = useMemo(() => new THREE.Vector3(), []);

  useFrame((_state, delta) => {
    if (!isActive || !api.current) return;
    const clampedDelta = Math.min(0.1, delta);
    const translation = api.current.translation();
    const impulse = vec
      .copy(translation)
      .normalize()
      .multiply(
        new THREE.Vector3(
          -45 * clampedDelta * scale,
          -120 * clampedDelta * scale,
          -45 * clampedDelta * scale
        )
      );

    api.current.applyImpulse(impulse, true);
  });

  const randSpread = (range: number) => (Math.random() - 0.5) * range;

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.2}
      friction={0.2}
      position={[randSpread(18), randSpread(18) - 15, randSpread(18) - 5]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  isActive: boolean;
};

function Pointer({ isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);
  const vec = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ pointer, viewport }) => {
    if (!isActive || !ref.current) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2.2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const workEl = document.getElementById("work");
      if (workEl) {
        const threshold = workEl.getBoundingClientRect().top;
        setIsActive(threshold < window.innerHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const materials = useMemo(() => {
    return techIcons.map((tech) => {
      const texture = createTechTexture(tech.name, tech.color, tech.bg);
      return new THREE.MeshPhysicalMaterial({
        map: texture,
        emissive: tech.color,
        emissiveMap: texture,
        emissiveIntensity: 0.25,
        metalness: 0.6,
        roughness: 0.3,
        clearcoat: 0.3,
      });
    });
  }, []);

  return (
    <div className="techstack">
      <h2>Tech Stack</h2>

      <Canvas
        shadows
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        className="tech-canvas"
      >
        <ambientLight intensity={1.5} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.3}
          color="#22d3ee"
          intensity={2}
          castShadow
        />
        <directionalLight position={[0, 5, -4]} intensity={1.8} />
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} />
          {spheres.map((props, i) => (
            <SphereGeo
              key={i}
              {...props}
              material={materials[i % materials.length]}
              isActive={isActive}
            />
          ))}
        </Physics>
      </Canvas>
    </div>
  );
};

export default TechStack;
