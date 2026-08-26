import * as THREE from "three";
import { gsap } from "gsap";

const setLighting = (scene: THREE.Scene) => {
  // Ambient light for base visibility
  const ambientLight = new THREE.AmbientLight(0x1e293b, 1.2);
  scene.add(ambientLight);

  // Hemisphere light for natural sky/ground contrast
  const hemiLight = new THREE.HemisphereLight(0x22d3ee, 0x0f172a, 1.5);
  hemiLight.position.set(0, 20, 0);
  scene.add(hemiLight);

  // Primary directional spotlight
  const directionalLight = new THREE.DirectionalLight(0x22d3ee, 0);
  directionalLight.intensity = 0;
  directionalLight.position.set(-2, 8, 6);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  // Neon purple rim light from the back
  const rimLight = new THREE.DirectionalLight(0x818cf8, 0);
  rimLight.position.set(4, 6, -6);
  scene.add(rimLight);

  // Screen interactive point light
  const pointLight = new THREE.PointLight(0x22d3ee, 0, 50, 2);
  pointLight.position.set(0, 3, -1);
  scene.add(pointLight);

  function setPointLight(screenLight: any) {
    if (screenLight && screenLight.material && screenLight.material.opacity > 0.5) {
      pointLight.intensity = (screenLight.material.emissiveIntensity || 1) * 15;
    } else {
      pointLight.intensity = 2;
    }
  }

  const duration = 1.8;
  const ease = "power2.inOut";
  function turnOnLights() {
    gsap.to(directionalLight, {
      intensity: 2.2,
      duration: duration,
      ease: ease,
    });
    gsap.to(rimLight, {
      intensity: 1.8,
      duration: duration,
      ease: ease,
    });
    gsap.to(".character-rim", {
      y: "55%",
      opacity: 1,
      delay: 0.2,
      duration: 2,
    });
  }

  return { setPointLight, turnOnLights };
};

export default setLighting;
