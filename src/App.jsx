import React, { Suspense } from "react";
import { useState } from "react";
import { StandardReality, HDRI, Model, LostWorld, Camera } from "spacesvr";
import { Plane } from "@react-three/drei";
import Machineplode from "../public/MachinePlode.jsx";

function World() {
  const [exploded, setExploded] = useState(false);

  const toggleExplode = () => {
    setExploded(!exploded);
  };
  console.log(toggleExplode)
  return (
    <StandardReality>
      <Plane
        args={[100, 100]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.01, 0]}
      >
        <meshStandardMaterial color="#fafafa"/>
      </Plane>
      {/* <LostWorld /> */}
      <HDRI
        src="./cyberpunk-urban-scenery.hdr"
        disableBackground={false}
        disableEnvironment={false}
      />
      <Model
        src="./vrShowcaseGlassFixed.glb"
        scale={0.007}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.03, 0]}
      />
      {/* <Model scale={0.003} position={[0, 0.7, 0.09]} src="./machine.gltf" /> */}
      <Suspense fallback={null}>
        <Machineplode
          position={[0, 0.8, 0.09]}
          scale={0.003}
          toggleExplode={toggleExplode}
        />
      </Suspense>
      {/* <Camera/> */}
    </StandardReality>
  );
}

export default World;
