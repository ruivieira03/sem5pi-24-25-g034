import React from 'react';
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
  const wallTexture = useLoader(THREE.TextureLoader, '/textures/wall.jpg');
  const floorTexture = useLoader(THREE.TextureLoader, '/textures/floor.jpg');
  const tableModel = useGLTF('/models/surgical_table.glb').scene.clone();
  const humanModel = useGLTF('/models/human.glb').scene.clone();

  // Configure texture wrapping
  wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
  wallTexture.repeat.set(1, 1);

  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(2, 2);

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

      {/* Surgical Table */}
      <primitive
        object={tableModel}
        name={`surgical-table-${position[0]}`} // Unique name for raycasting
        position={[0, -height / 2, 0]}
        scale={[0.7, 0.7, 0.7]}
      />

      {/* Human Body (if occupied) */}
      {occupied && (
        <primitive
          object={humanModel}
          position={[-1, -height / 3, 0]}  // Move human up slightly onto the table
          rotation={[1.5, 3, 1.55]} // Ensure the human is lying flat (parallel to the table)
          scale={[0.9, 0.9, 0.9]} // Adjust scaling
          />
      )}
    </group>
  );
};

export default RoomComponent;
