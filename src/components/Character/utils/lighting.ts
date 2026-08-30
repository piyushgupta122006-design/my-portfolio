import * as THREE from "three";
import { RGBELoader } from "three-stdlib";
import { gsap } from "gsap";

const setLighting = (scene: THREE.Scene) => {
  // Ambient base light
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
  directionalLight.intensity = 1.2;
  directionalLight.position.set(-0.47, 1.2, 2);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 50;
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0xff90e8, 0, 100, 3);
  pointLight.position.set(3, 12, 4);
  pointLight.castShadow = true;
  scene.add(pointLight);

  // Load HDR environment map
  try {
    new RGBELoader()
      .setPath("/models/")
      .load(
        "char_enviorment.hdr",
        function (texture) {
          texture.mapping = THREE.EquirectangularReflectionMapping;
          scene.environment = texture;
          scene.environmentIntensity = 0.64;
          scene.environmentRotation.set(5.76, 85.85, 1);
        },
        undefined,
        (err) => {
          console.warn("HDR load warning:", err);
        }
      );
  } catch (err) {
    console.warn("RGBELoader error:", err);
  }

  function setPointLight(screenLight: any) {
    if (screenLight && screenLight.material && screenLight.material.opacity > 0.9) {
      pointLight.intensity = (screenLight.material.emissiveIntensity || 1) * 20;
    } else {
      pointLight.intensity = 0;
    }
  }

  function turnOnLights() {
    scene.environmentIntensity = 0.64;
    directionalLight.intensity = 1.2;
    gsap.to(".character-rim", {
      y: "55%",
      opacity: 1,
      duration: 0.5,
    });
  }

  return { setPointLight, turnOnLights };
};

export default setLighting;
