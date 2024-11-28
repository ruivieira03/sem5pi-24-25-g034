
import React, { useState } from 'react';
import { useLoader } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

type RoomProps = {
  width: number;
  height: number;
  depth: number;
  position: [number, number, number];
  occupied: boolean;
};

const RoomComponent: React.FC<RoomProps> = ({ width, height, depth, position, occupied }) => {
  const [isDoorOpen, setIsDoorOpen] = useState(false);

  const wallTexture = useLoader(THREE.TextureLoader, '/textures/wall.jpg');
  const floorTexture = useLoader(THREE.TextureLoader, '/textures/floor.jpg');
  const tableModel = useGLTF('/models/surgical_table.glb').scene.clone();
  const humanModel = useGLTF('/models/human.glb').scene.clone();

  // Configure texture wrapping
  wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
  wallTexture.repeat.set(1, 1);

  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(2, 2);

  const handleDoorClick = () => {
    setIsDoorOpen((prev) => !prev);
  };

  return (
    <group position={position}>
      {/* Floor */} 
      <mesh position={[0, -height / 2, 0]}>
        <boxGeometry args={[width, 0.1, depth]} />
        <meshStandardMaterial map={floorTexture} />
      </mesh>

      {/* Walls */}
      <mesh position={[0, 0, -depth / 2]}>
        <boxGeometry args={[width, height, 0.1]} />
        <meshStandardMaterial map={wallTexture} />
      </mesh>
      <mesh position={[0, 0, depth / 2]}>
        <boxGeometry args={[width, height, 0.1]} />
        <meshStandardMaterial map={wallTexture} />
      </mesh>
      <mesh position={[width / 2, 0, 0]}>
        <boxGeometry args={[0.1, height, depth]} />
        <meshStandardMaterial map={wallTexture} />
      </mesh>
      <mesh position={[-width / 2, 0, 0]}>
        <boxGeometry args={[0.1, height, depth]} />
        <meshStandardMaterial map={wallTexture} />
      </mesh>

      {/* Door */}
      <group
        position={[0, -height / 4, -depth / 2 + 0.05]} // Place the door at the wall
        rotation={[0, isDoorOpen ? Math.PI / 2 : 0, 0]} // Rotate door on Y-axis
        onClick={handleDoorClick} // Toggle door open/close on click
      >
        <mesh>
          <boxGeometry args={[2, height / 2, 0.1]} />
          <meshStandardMaterial color="brown" />
        </mesh>
      </group>

    {/* Surgical Table */}
    <primitive
        object={tableModel}
        position={[0, -height / 2, 0]} // Position table above the floor
        scale={[0.7, 0.7, 0.7]} // Ensure table fits well
      />

      {/* Human Body (if occupied) */}
      {occupied && (
        <primitive
          object={humanModel}
          position={[-1, -height / 3, 0]} // Move human up slightly onto the table
          rotation={[1.5, 3, 1.55]} // Ensure the human is lying flat (parallel to the table)
          scale={[0.9, 0.9, 0.9]} // Slightly increase size of the human model
        />
      )}
    </group>
  );
};

export default RoomComponent;
