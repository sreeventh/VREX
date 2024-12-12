import React, { Suspense } from "react";
import { useState, useEffect } from "react";
import {
  StandardReality,
  HDRI,
  Model,
  Tool,
  FacePlayer,
  Button,
  Collidable,
  Dialogue,
  Camera,
} from "spacesvr";
import { Plane, Html } from "@react-three/drei";
import MachineBut from "../public/MachineBut.jsx";
import DeskModel from "../public/Desk.jsx";
import { TextureLoader, RepeatWrapping } from "three";
import MModel from "../public/M85.jsx";
import { useLoader, useFrame } from "@react-three/fiber";

function World() {
  const [exploded, setExploded] = useState(false);
  const [door, setDoor] = useState(false);
  const groundTexture = new TextureLoader().load("./textures/grass.jpg");
  //   const groundTexture = useLoader(TextureLoader, "./grass.jpg");
  // Set the texture to repeat across the plane
  groundTexture.wrapS = RepeatWrapping;
  groundTexture.wrapT = RepeatWrapping;
  groundTexture.repeat.set(100, 100); // Adjust the numbers to control the tiling
  const toggleExplode = () => {
    setExploded(!exploded);
  };
  const toggleDoor = () => {
    setDoor(!door);
  };

  useEffect(() => {
    // Debugging to check door state on page load
    console.log("Initial door state:", door);
  }, [door]); // Runs when the door state changes

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
      environmentProps={{
        name: "REACT MEETUP #84",
      }}
    >
      <Plane
        args={[100, 100]} // Plane size
        rotation={[-Math.PI / 2, 0, 0]} // Rotate to lie flat
        position={[0, 0.01, 0]} // Slightly above the ground level
      >
        <meshStandardMaterial map={groundTexture} />
      </Plane>
      <HDRI
        src="./hdri/cyberpunk-urban-scenery.hdr"
        disableBackground={false}
        disableEnvironment={false}
      />
      <Collidable enabled={!door}>
        <Model
          src="./buildings/vrShowcaseGlassFixed.glb"
          scale={0.007}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.03, 0]}
        />
      </Collidable>
      {/* <Suspense fallback={null}>
        <MachineBut
          position={[0, 0.8, 0.09]}
          scale={0.003}
          exploded={exploded}
        />
      </Suspense> */}
      <Suspense fallback={null}>
        <DeskModel position={[8, 0, -3]} scale={0.6} />
      </Suspense>
      <Suspense>
        <MModel position={[0, 0, 1]} scale={0.3} exploded={exploded} />
      </Suspense>
      {/* <FacePlayer enabled={true}>
        <Tool name="Explode" pos={[0.8, -0.8]} range={20}>
          <Button
            onClick={toggleExplode}
            color={exploded ? "red" : "green"}
            fontSize={0.1}
            maxWidth={0.5}
          >
            {exploded ? "Implode" : "Explode"}
          </Button>
        </Tool>
      </FacePlayer> */}
      <Button
        onClick={toggleExplode}
        color={exploded ? "red" : "green"}
        fontSize={0.1}
        maxWidth={0.5}
        position={[0, 0.5, 0.188]}
        scale={0.5}
      >
        {exploded ? "Assemble" : "Explode"}
      </Button>
      <Button
        onClick={() => {
          window.location.href = "http://sreeventh.github.io/XplodePOC";
        }}
        color={"yellow"}
        fontSize={0.1}
        maxWidth={0.5}
        position={[0, 0.35, 0.188]}
        scale={0.5}
      >
        View Static 3D
      </Button>
      <Button
        onClick={toggleDoor}
        color={door ? "red" : "green"}
        fontSize={0.1}
        maxWidth={0.5}
        position={[0, 0.6, -3]}
      >
        {door ? "Close Door" : "Open Door"}
      </Button>
      <Button
        onClick={toggleDoor}
        color={door ? "red" : "green"}
        fontSize={0.1}
        maxWidth={0.5}
        scale={0.5}
        position={[0, 0.9, -2.75]}
      >
        {door ? "Close Door" : "Open Door"}
      </Button>
      <Camera />
    </StandardReality>
  );
}

export default World;
