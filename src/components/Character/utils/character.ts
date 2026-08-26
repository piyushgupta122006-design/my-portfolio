import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/gltf/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = (): Promise<GLTF | null> => {
    return new Promise<GLTF | null>((resolve) => {
      loader.load(
        "/models/character.glb",
        async (gltf) => {
          const character = gltf.scene;
          await renderer.compileAsync(character, camera, scene);

          character.traverse((child: any) => {
            if (child.isMesh) {
              const mesh = child as THREE.Mesh;

              // Customize clothing colors for Piyush Gupta's theme
              if (mesh.material) {
                if (mesh.name === "BODY.SHIRT") {
                  const newMat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
                  newMat.color = new THREE.Color("#0ea5e9"); // Piyush Cyan Cyber Jacket
                  mesh.material = newMat;
                } else if (mesh.name === "Pant") {
                  const newMat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
                  newMat.color = new THREE.Color("#040711"); // Dark Cyber Pants
                  mesh.material = newMat;
                }
              }

              child.castShadow = true;
              child.receiveShadow = true;
              mesh.frustumCulled = true;
            }
          });

          setCharTimeline(character, camera);
          setAllTimeline();

          const footR = character.getObjectByName("footR");
          const footL = character.getObjectByName("footL");
          if (footR) footR.position.y = 3.36;
          if (footL) footL.position.y = 3.36;

          dracoLoader.dispose();
          resolve(gltf);
        },
        undefined,
        (error) => {
          console.error("Error loading character.glb:", error);
          resolve(null);
        }
      );
    });
  };

  return { loadCharacter };
};

export default setCharacter;
