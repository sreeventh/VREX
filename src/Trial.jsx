import React, { Suspense } from "react";
import { useState, useEffect, useRef } from "react";
import {
  StandardReality,
  HDRI,
  Model,
  usePlayer,
  Environment,
  Physics,
  Player,
} from "spacesvr";
import { Plane, Image } from "@react-three/drei";
import Machineplode from "../public/MachinePlode.jsx";
import DeskModel from "../public/Desk.jsx";
import { TextureLoader, RepeatWrapping } from "three";
import { useLoader, useFrame } from "@react-three/fiber";
import CustomReality from "./CustomReality.jsx";
import PlayerHeightManager from "./PlayerH";

function World() {
  const [exploded, setExploded] = useState(false);
  const groundTexture = new TextureLoader().load("./grass.jpg");
  //   const groundTexture = useLoader(TextureLoader, "./grass.jpg");
  // Set the texture to repeat across the plane
  groundTexture.wrapS = RepeatWrapping;
  groundTexture.wrapT = RepeatWrapping;
  groundTexture.repeat.set(50, 50); // Adjust the numbers to control the tiling

  const toggleExplode = () => {
    setExploded(!exploded);
  };
  const desiredHeight = 10; // Des
  return (
    <StandardReality
      playerProps={{
        pos: [0, 15, 5], // Initial player position [x, y, z]
        rot: 0, // Initial rotation (optional)
        speed: 5, // Movement speed (optional)
        controls: {
          disableGyro: false, // Enable gyroscope for mobile devices (optional)
        },
      }}
    >
      {/* <PlayerHeightManager desiredHeight={desiredHeight} /> */}
      {/* <Image
        url="./grass.jpg"
        scale={[100, 100, 1]} // Scale the image to fit the ground size
        rotation={[-Math.PI / 2, 0, 0]} // Rotate the image to be flat on the ground
        position={[0, 0.01, 0]} // Slightly above the ground level to avoid z-fighting
      /> */}
      <Plane
        args={[100, 100]} // Plane size
        rotation={[-Math.PI / 2, 0, 0]} // Rotate to lie flat
        position={[0, 0.01, 0]} // Slightly above the ground level
      >
        <meshStandardMaterial map={groundTexture} />
      </Plane>
      <HDRI
        src="./751-hdri-skies-com.hdr"
        disableBackground={false}
        disableEnvironment={false}
      />
      {/* <Model
        src="./vrShowcaseGlassFixed.glb"
        scale={0.007}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.03, 0]}
      /> */}
      <Model src="./room_99mb.glb" scale={0.7} position={[0, 0.03, 0]} />
      <Suspense fallback={null}>
        <Machineplode
          position={[3, 0.8, -3]}
          scale={0.003}
          toggleExplode={toggleExplode}
        />
      </Suspense>
      <Suspense fallback={null}>
        <DeskModel position={[8, 0.8, -3]} scale={5} />
      </Suspense>
    </StandardReality>
  );
}

export default World;
