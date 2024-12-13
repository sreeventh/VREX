import { StandardReality, LostWorld, Model, HDRI } from "spacesvr";
import { useLoader } from "@react-three/fiber";
import { Plane } from "@react-three/drei";
import { TextureLoader, RepeatWrapping } from "three";

export default function World() {
  const groundTexture = useLoader(TextureLoader, "./textures/crack.jpg");
  groundTexture.wrapS = groundTexture.wrapT = RepeatWrapping;
  groundTexture.repeat.set(100, 100);
  return (
    <StandardReality>
      {/* <LostWorld /> // an example world with a floor, skybox, and fog */}
      <Plane
        args={[100, 100]}
        position={[0, 0.1, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial map={groundTexture} />
      </Plane>
      <Model
        src="public/buildings/vrShowcaseGlassFixed.glb"
        scale={0.005}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.2, 0]}
      />
      <HDRI src="public/hdri/cyberpunk-urban-scenery.hdr" />
    </StandardReality>
  );
}
