import React, { useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";

export default function M85Comp(props) {
  const { nodes, materials } = useGLTF("/m85Comp.glb");
  const [transparentParts, setTransparentParts] = useState({});

  const handleClick = (e) => {
    e.stopPropagation();
    if (localStorage.getItem("cursor") === "crosshair") {
      const name = e.object.name;
      setTransparentParts((prev) => ({
        ...prev,
        [name]: !prev[name],
      }));
    }
  };

  const getExplodedPosition = (index) => {
    return [
      (Math.random() - 0.5) * 1000,
      (Math.random() - 0.5) * 600,
      (Math.random() - 0.5) * 1500,
    ];
  };

  return (
    <group
      {...props}
      onClick={handleClick}
      onPointerDown={(e) => e.stopPropagation()}
      onPointerUp={(e) => e.stopPropagation()}
      dispose={null}
      position={props.position}
      scale={props.scale}
    >
      <group rotation={[-Math.PI / 2, 0, Math.PI / 2]} scale={1}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.001}>
          {Object.entries(nodes).map(([name, node], index) => {
            if (node.geometry) {
              const targetPosition = getExplodedPosition(index);
              const { position } = useSpring({
                position: props.exploded ? targetPosition : [0, 0, 0],
                config: { mass: 1, tension: 180, friction: 12, duration: 1000 },
              });

              const material =
                materials[node.material?.name || "default"].clone();
              if (transparentParts[name]) {
                material.transparent = true;
                material.opacity = 0.5;
              }

              return (
                <animated.mesh
                  key={name}
                  geometry={node.geometry}
                  material={material}
                  position={position}
                  name={name}
                />
              );
            }
            return null;
          })}
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/m85Comp.glb");
