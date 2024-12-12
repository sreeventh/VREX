import { StandardReality, LostWorld } from "spacesvr";
import React, { Suspense } from "react";
import DeskModel from "../public/Desk.jsx";
import { useState, useEffect } from "react";
import { TextureLoader, RepeatWrapping } from "three";
import { Plane, Html } from "@react-three/drei";
export default function World() {
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
      }}
      environmentProps={{
        name: "REACT MEETUP #84",
      }}
    >
      <LostWorld /> // an example world with a floor, skybox, and fog
      <Plane
        args={[100, 100]} // Plane size
        rotation={[-Math.PI / 2, 0, 0]} // Rotate to lie flat
        position={[0, 0.05, 0]} // Slightly above the ground level
      >
        <meshStandardMaterial map={groundTexture} />
      </Plane>
      <Suspense fallback={null}>
        <DeskModel position={[8, 0, -3]} scale={0.6} />
      </Suspense>
    </StandardReality>
  );
}
