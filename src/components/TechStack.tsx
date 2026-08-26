import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  BallCollider,
  Physics,
  RigidBody,
  RapierRigidBody,
} from "@react-three/rapier";
import {
  FaReact,
  FaJs,
  FaPython,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
} from "react-icons/fa6";
import { SiFirebase, SiVite } from "react-icons/si";
import { BsStars } from "react-icons/bs";

interface TechItem {
  name: string;
  category: "frontend" | "backend" | "ai";
  color: string;
  bg: string;
  icon: JSX.Element;
  desc: string;
  level: string;
}

const techItems: TechItem[] = [
  {
    name: "React.js",
    category: "frontend",
    color: "#22d3ee",
    bg: "#061b2e",
    icon: <FaReact />,
    desc: "Component Architecture, Hooks, State & Virtual DOM",
    level: "Advanced",
  },
  {
    name: "JavaScript (ES6+)",
    category: "frontend",
    color: "#facc15",
    bg: "#241e05",
    icon: <FaJs />,
    desc: "Async/Await, Modern ESNext, Closures & DOM APIs",
    level: "Advanced",
  },
  {
    name: "Python",
    category: "ai",
    color: "#38bdf8",
    bg: "#0b1c33",
    icon: <FaPython />,
    desc: "AI Scripts, Data Automation & Backend Logic",
    level: "Intermediate",
  },
  {
    name: "Firebase Auth & DB",
    category: "backend",
    color: "#f59e0b",
    bg: "#261902",
    icon: <SiFirebase />,
    desc: "Realtime Firestore, Google OAuth & Security Rules",
    level: "Advanced",
  },
  {
    name: "Node.js",
    category: "backend",
    color: "#22c55e",
    bg: "#042211",
    icon: <FaNodeJs />,
    desc: "Serverless Functions, REST APIs & Backend Runtime",
    level: "Intermediate",
  },
  {
    name: "Vite",
    category: "frontend",
    color: "#a855f7",
    bg: "#1e0b33",
    icon: <SiVite />,
    desc: "Ultra-Fast ESM Bundling & Modern Build Tooling",
    level: "Advanced",
  },
  {
    name: "Gemini API",
    category: "ai",
    color: "#c084fc",
    bg: "#22083d",
    icon: <BsStars />,
    desc: "LLM Multi-Modal Reasoning, Prompt Architecture & Vibe Coding",
    level: "Advanced",
  },
  {
    name: "HTML5 & CSS3",
    category: "frontend",
    color: "#f97316",
    bg: "#2b1003",
    icon: <FaHtml5 />,
    desc: "Semantic Structure, Glassmorphism, Responsive Grids",
    level: "Advanced",
  },
  {
    name: "CSS Animations",
    category: "frontend",
    color: "#3b82f6",
    bg: "#051633",
    icon: <FaCss3Alt />,
    desc: "Keyframe Dynamics, Transitions & Micro-Interactions",
    level: "Advanced",
  },
  {
    name: "Git & GitHub",
    category: "ai",
    color: "#ef4444",
    bg: "#290808",
    icon: <FaGitAlt />,
    desc: "Version Control, Branching, Pull Requests & Releases",
    level: "Advanced",
  },
];

// Helper to create crisp, high-contrast sphere textures with bright glowing text & borders
function createCrispTechTexture(name: string, color: string): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  // Deep cyber glass background
  ctx.fillStyle = "#040714";
  ctx.fillRect(0, 0, 1024, 512);

  // Draw front badge
  drawBadge(ctx, 256, 256, name, color);
  // Draw back badge (so ball is readable from both sides)
  drawBadge(ctx, 768, 256, name, color);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function drawBadge(ctx: CanvasRenderingContext2D, x: number, y: number, text: string, color: string) {
  // Glowing ambient halo
  const grad = ctx.createRadialGradient(x, y, 40, x, y, 190);
  grad.addColorStop(0, color + "60");
  grad.addColorStop(0.7, color + "15");
  grad.addColorStop(1, "transparent");
  ctx.fillStyle = grad;
  ctx.fillRect(x - 200, y - 200, 400, 400);

  // Outer glowing neon ring
  ctx.strokeStyle = color;
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.arc(x, y, 175, 0, Math.PI * 2);
  ctx.stroke();

  // Inner border ring
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(x, y, 155, 0, Math.PI * 2);
  ctx.stroke();

  // Dark badge center
  ctx.fillStyle = "rgba(4, 7, 17, 0.9)";
  ctx.beginPath();
  ctx.arc(x, y, 150, 0, Math.PI * 2);
  ctx.fill();

  // Text label
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 52px 'Outfit', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Split multi-word text if needed
  if (text.includes(" ")) {
    const parts = text.split(" ");
    ctx.fillText(parts[0], x, y - 28);
    ctx.fillStyle = color;
    ctx.font = "bold 44px 'Outfit', sans-serif";
    ctx.fillText(parts.slice(1).join(" "), x, y + 32);
  } else {
    ctx.fillText(text, x, y);
  }
}

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

type SphereProps = {
  scale: number;
  material: THREE.MeshStandardMaterial;
  isActive: boolean;
  initialPos: [number, number, number];
};

function FloatingSphere({ scale, material, isActive, initialPos }: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);
  const vec = useMemo(() => new THREE.Vector3(), []);

  useFrame((_state, delta) => {
    if (!isActive || !api.current) return;
    const clampedDelta = Math.min(0.08, delta);
    const translation = api.current.translation();

    // Gentle inward spring force to keep balls floating in view without clumping
    const forceX = -translation.x * 12 * clampedDelta * scale;
    const forceY = -(translation.y - 0.5) * 15 * clampedDelta * scale;
    const forceZ = -translation.z * 10 * clampedDelta * scale;

    api.current.applyImpulse(vec.set(forceX, forceY, forceZ), true);
  });

  return (
    <RigidBody
      linearDamping={1.2}
      angularDamping={0.6}
      friction={0.3}
      restitution={0.7}
      position={initialPos}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.1, Math.random() * Math.PI, 0]}
      />
    </RigidBody>
  );
}

function Pointer({ isActive }: { isActive: boolean }) {
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
      0.25
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
      <BallCollider args={[2.5]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "frontend" | "backend" | "ai">("all");
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth > 768 : true
  );

  useEffect(() => {
    const handleCheckDesktop = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    window.addEventListener("resize", handleCheckDesktop);
    return () => window.removeEventListener("resize", handleCheckDesktop);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const workEl = document.getElementById("work");
      if (workEl) {
        const threshold = workEl.getBoundingClientRect().top;
        setIsActive(threshold < window.innerHeight * 1.2);
      }
    };


    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const materials = useMemo(() => {
    return techItems.map((tech) => {
      const texture = createCrispTechTexture(tech.name, tech.color);
      return new THREE.MeshStandardMaterial({
        map: texture,
        color: "#ffffff",
        emissive: tech.color,
        emissiveMap: texture,
        emissiveIntensity: 0.35,
        roughness: 0.2,
        metalness: 0.1,
      });
    });
  }, []);

  const spheresData = useMemo(() => {
    return techItems.map((_, i) => {
      const angle = (i / techItems.length) * Math.PI * 2;
      const radius = 6 + (i % 3) * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * (radius * 0.5) + (i % 2 === 0 ? 1 : -1);
      const z = (Math.random() - 0.5) * 4;
      const scale = 1.05 + (i % 3) * 0.12;
      return {
        scale,
        initialPos: [x, y, z] as [number, number, number],
      };
    });
  }, []);

  const filteredItems = useMemo(() => {
    if (activeTab === "all") return techItems;
    return techItems.filter((item) => item.category === activeTab);
  }, [activeTab]);

  return (
    <div className="techstack-section" id="techstack">
      <div className="techstack-container">
        
        {/* Section Header */}
        <div className="techstack-header">
          <span className="techstack-tag">SKILLS &amp; ARSENAL</span>
          <h2 className="techstack-title">Tech Stack</h2>
          <p className="techstack-subtitle">
            Interactive 3D physics playground + verified technical proficiencies
          </p>
        </div>

        {/* 3D Interactive Physics Canvas (Desktop / Tablet only) */}
        {isDesktop && (
          <div className="tech-3d-wrapper">
            <div className="tech-canvas-badge">
              <span className="pulse-dot"></span> Interactive 3D Canvas — Move cursor to collide &amp; bounce
            </div>
            <Canvas
              shadows
              gl={{ alpha: true, antialias: true }}
              camera={{ position: [0, 0, 18], fov: 36, near: 1, far: 100 }}
              className="tech-canvas"
            >
              <ambientLight intensity={2.2} />
              <directionalLight position={[0, 8, 12]} intensity={2.5} />
              <directionalLight position={[-8, -4, -6]} intensity={1.5} color="#22d3ee" />
              <pointLight position={[0, 0, 5]} intensity={1.8} color="#ffffff" />
              <Physics gravity={[0, 0, 0]}>
                <Pointer isActive={isActive} />
                {spheresData.map((data, i) => (
                  <FloatingSphere
                    key={i}
                    scale={data.scale}
                    material={materials[i % materials.length]}
                    isActive={isActive}
                    initialPos={data.initialPos}
                  />
                ))}
              </Physics>
            </Canvas>
          </div>
        )}


        {/* Interactive Filter Pills */}
        <div className="tech-filter-tabs">
          <button
            className={`filter-btn ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All Technologies ({techItems.length})
          </button>
          <button
            className={`filter-btn ${activeTab === "frontend" ? "active" : ""}`}
            onClick={() => setActiveTab("frontend")}
          >
            Frontend Engineering
          </button>
          <button
            className={`filter-btn ${activeTab === "backend" ? "active" : ""}`}
            onClick={() => setActiveTab("backend")}
          >
            Backend &amp; Cloud
          </button>
          <button
            className={`filter-btn ${activeTab === "ai" ? "active" : ""}`}
            onClick={() => setActiveTab("ai")}
          >
            AI &amp; Developer Tooling
          </button>
        </div>

        {/* Crystal Clear Tech Arsenal Grid */}
        <div className="tech-grid">
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              className="tech-card"
              style={{
                borderColor: `${item.color}35`,
              }}
            >
              <div className="tech-card-header">
                <div
                  className="tech-icon-box"
                  style={{
                    color: item.color,
                    backgroundColor: `${item.color}15`,
                    borderColor: `${item.color}40`,
                  }}
                >
                  {item.icon}
                </div>
                <span
                  className="tech-level-pill"
                  style={{
                    color: item.color,
                    borderColor: `${item.color}30`,
                    backgroundColor: `${item.color}10`,
                  }}
                >
                  {item.level}
                </span>
              </div>
              <h3 className="tech-name">{item.name}</h3>
              <p className="tech-desc">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default TechStack;
