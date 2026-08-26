import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";

const setCharacter = (
  _renderer: THREE.WebGLRenderer,
  _scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loadCharacter = (): Promise<GLTF | null> => {
    return new Promise<GLTF | null>((resolve) => {
      const gltf = create3DDeveloperScene(camera);
      resolve(gltf);
    });
  };

  return { loadCharacter };
};

// Create a high-end, futuristic 3D Developer Workspace & Avatar
function create3DDeveloperScene(camera: THREE.PerspectiveCamera): GLTF {
  const group = new THREE.Group();
  group.name = "Developer3DScene";
  group.position.set(0, -1, 0);

  // 1. Futuristic Cyber Desk
  const deskTopGeo = new THREE.BoxGeometry(7, 0.25, 3.5);
  const deskMat = new THREE.MeshStandardMaterial({
    color: "#080e1c",
    metalness: 0.85,
    roughness: 0.2,
  });
  const deskTop = new THREE.Mesh(deskTopGeo, deskMat);
  deskTop.position.set(0, 1.8, 0);
  group.add(deskTop);

  // Desk Neon Edge Strip
  const stripGeo = new THREE.BoxGeometry(7.05, 0.05, 0.05);
  const stripMat = new THREE.MeshStandardMaterial({
    color: "#22d3ee",
    emissive: "#22d3ee",
    emissiveIntensity: 2,
  });
  const strip = new THREE.Mesh(stripGeo, stripMat);
  strip.position.set(0, 1.9, 1.75);
  group.add(strip);

  // Desk Legs
  const legGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.8, 16);
  const legMat = new THREE.MeshStandardMaterial({ color: "#020408", metalness: 0.9, roughness: 0.3 });
  const positions = [
    [-3.2, 0.9, -1.4],
    [3.2, 0.9, -1.4],
    [-3.2, 0.9, 1.4],
    [3.2, 0.9, 1.4],
  ];
  positions.forEach(([x, y, z]) => {
    const leg = new THREE.Mesh(legGeo, legMat);
    leg.position.set(x, y, z);
    group.add(leg);
  });

  // 2. Ultrawide Curved Monitor
  const monitorStandGeo = new THREE.CylinderGeometry(0.08, 0.15, 1.2, 16);
  const monitorStand = new THREE.Mesh(monitorStandGeo, legMat);
  monitorStand.position.set(0, 2.4, -0.8);
  group.add(monitorStand);

  const monitorFrameGeo = new THREE.BoxGeometry(5.2, 2.2, 0.15);
  const monitorFrameMat = new THREE.MeshStandardMaterial({
    color: "#020408",
    roughness: 0.1,
    metalness: 0.9,
  });
  const monitor = new THREE.Mesh(monitorFrameGeo, monitorFrameMat);
  monitor.name = "Plane004";
  monitor.position.set(0, 3.4, -0.8);

  // Curved Screen Texture Canvas
  const screenCanvas = document.createElement("canvas");
  screenCanvas.width = 1024;
  screenCanvas.height = 512;
  const sCtx = screenCanvas.getContext("2d")!;
  sCtx.fillStyle = "#040711";
  sCtx.fillRect(0, 0, 1024, 512);

  // Code editor lines
  sCtx.fillStyle = "#22d3ee";
  sCtx.font = "bold 20px 'JetBrains Mono', monospace";
  sCtx.fillText("const developer = { name: 'Piyush Gupta', role: 'Full-Stack' };", 40, 60);
  sCtx.fillStyle = "#818cf8";
  sCtx.fillText("function buildNextGenAI() { return 'Gemini + React + Three.js'; }", 40, 100);
  sCtx.fillStyle = "#38bdf8";
  sCtx.fillText("// BNN CS Study Hub • Flash Crush-Files • StressSense", 40, 140);
  sCtx.fillStyle = "#22c55e";
  sCtx.fillText("status: 'Online & Ready for Impact' [100% OK]", 40, 180);

  const screenTex = new THREE.CanvasTexture(screenCanvas);
  const screenGeo = new THREE.PlaneGeometry(5, 2);
  const screenMat = new THREE.MeshStandardMaterial({
    map: screenTex,
    color: "#ffffff",
    emissive: "#22d3ee",
    emissiveIntensity: 0.8,
    roughness: 0.2,
  });
  const screen = new THREE.Mesh(screenGeo, screenMat);
  screen.name = "screenlight";
  screen.position.set(0, 0, 0.08);
  monitor.add(screen);
  group.add(monitor);

  // 3. Mechanical Keyboard & Mouse
  const kbGeo = new THREE.BoxGeometry(2.4, 0.1, 0.9);
  const kbMat = new THREE.MeshStandardMaterial({
    color: "#0c1428",
    emissive: "#22d3ee",
    emissiveIntensity: 0.3,
  });
  const kb = new THREE.Mesh(kbGeo, kbMat);
  kb.position.set(0, 1.96, 0.4);
  group.add(kb);

  const mouseGeo = new THREE.BoxGeometry(0.3, 0.08, 0.5);
  const mouseMat = new THREE.MeshStandardMaterial({
    color: "#020408",
    emissive: "#818cf8",
    emissiveIntensity: 0.4,
  });
  const mouseMesh = new THREE.Mesh(mouseGeo, mouseMat);
  mouseMesh.position.set(1.8, 1.96, 0.4);
  group.add(mouseMesh);

  // 4. Developer Avatar (Seated Character)
  const avatarGroup = new THREE.Group();
  avatarGroup.position.set(0, 0, 1.3);

  // Gaming Chair
  const chairBackGeo = new THREE.BoxGeometry(1.6, 2.4, 0.2);
  const chairMat = new THREE.MeshStandardMaterial({
    color: "#0c1428",
    roughness: 0.4,
  });
  const chairBack = new THREE.Mesh(chairBackGeo, chairMat);
  chairBack.position.set(0, 2.5, 0.6);
  avatarGroup.add(chairBack);

  const chairSeatGeo = new THREE.BoxGeometry(1.6, 0.2, 1.4);
  const chairSeat = new THREE.Mesh(chairSeatGeo, chairMat);
  chairSeat.position.set(0, 1.4, 0.1);
  avatarGroup.add(chairSeat);

  // Character Body / Torso (Wearing Cyber Jacket)
  const bodyGeo = new THREE.CylinderGeometry(0.55, 0.5, 1.4, 16);
  const bodyMat = new THREE.MeshStandardMaterial({
    color: "#0ea5e9",
    roughness: 0.3,
  });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.name = "BODY.SHIRT";
  body.position.set(0, 2.2, 0.1);
  avatarGroup.add(body);

  // Neck
  const neckGeo = new THREE.CylinderGeometry(0.18, 0.2, 0.3, 16);
  const neckMat = new THREE.MeshStandardMaterial({ color: "#f8fafc", roughness: 0.5 });
  const neck = new THREE.Mesh(neckGeo, neckMat);
  neck.name = "spine005";
  neck.position.set(0, 2.95, 0.1);
  avatarGroup.add(neck);

  // Head (Spine006 — tracks mouse movement)
  const headGeo = new THREE.SphereGeometry(0.42, 24, 24);
  const headMat = new THREE.MeshStandardMaterial({ color: "#e2e8f0", roughness: 0.4 });
  const head = new THREE.Mesh(headGeo, headMat);
  head.name = "spine006";
  head.position.set(0, 3.4, 0.1);

  // Glowing Cyber Visor
  const visorGeo = new THREE.BoxGeometry(0.55, 0.16, 0.25);
  const visorMat = new THREE.MeshStandardMaterial({
    color: "#22d3ee",
    emissive: "#22d3ee",
    emissiveIntensity: 2.5,
    roughness: 0.1,
  });
  const visor = new THREE.Mesh(visorGeo, visorMat);
  visor.position.set(0, 0.05, -0.32);
  head.add(visor);

  // Headphones
  const hpBandGeo = new THREE.TorusGeometry(0.45, 0.05, 12, 24, Math.PI);
  const hpBandMat = new THREE.MeshStandardMaterial({ color: "#040711", metalness: 0.9 });
  const hpBand = new THREE.Mesh(hpBandGeo, hpBandMat);
  hpBand.rotation.x = -Math.PI / 2;
  hpBand.position.set(0, 0.1, 0);
  head.add(hpBand);

  avatarGroup.add(head);

  // Arms typing at keyboard
  const armMat = new THREE.MeshStandardMaterial({ color: "#0ea5e9", roughness: 0.3 });
  
  // Left arm
  const armLGeo = new THREE.CylinderGeometry(0.14, 0.12, 1.2, 12);
  const armL = new THREE.Mesh(armLGeo, armMat);
  armL.position.set(-0.7, 2.1, -0.2);
  armL.rotation.x = Math.PI / 3;
  armL.rotation.z = -Math.PI / 6;
  avatarGroup.add(armL);

  // Right arm
  const armRGeo = new THREE.CylinderGeometry(0.14, 0.12, 1.2, 12);
  const armR = new THREE.Mesh(armRGeo, armMat);
  armR.position.set(0.7, 2.1, -0.2);
  armR.rotation.x = Math.PI / 3;
  armR.rotation.z = Math.PI / 6;
  avatarGroup.add(armR);

  group.add(avatarGroup);

  setCharTimeline(group, camera);
  setAllTimeline();

  return {
    scene: group,
    scenes: [group],
    cameras: [],
    animations: [],
    asset: {},
    userData: {},
  } as unknown as GLTF;
}

export default setCharacter;
