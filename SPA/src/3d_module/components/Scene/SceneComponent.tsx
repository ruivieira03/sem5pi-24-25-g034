import React, { useEffect, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import RoomComponent from '../Room/RoomComponent.tsx'; // Adjust path as necessary
import CameraControls from '../Camera/CameraControls.tsx'; // Adjust path as necessary
import './SceneComponent.css';

type Room = {
  id: number;
  width: number;
  height: number;
  depth: number;
  position: [number, number, number];
  occupied: boolean;
};

const SceneComponent = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const raycaster = useRef(new THREE.Raycaster());
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const [targetRoom, setTargetRoom] = useState<[number, number, number] | null>(null);

  useEffect(() => {
    fetch('/hospital.json')
      .then((response) => response.json())
      .then((data) => {
        setRooms(data.hospitalFloor.rooms || []);
      })
      .catch((error) => console.error('Error loading hospital data:', error));
  }, []);

  const handleLeftClick = (clickPosition: THREE.Vector2) => {
    if (!cameraRef.current) return;

    raycaster.current.setFromCamera(clickPosition, cameraRef.current);

    // Get intersected objects
    const intersects = raycaster.current.intersectObjects(cameraRef.current?.parent?.children || [], true);

    if (intersects.length > 0) {
      const clickedObject = intersects[0].object;
      const room = rooms.find((r) => clickedObject.name === `surgical-table-${r.id}`);
      if (room) {
        setTargetRoom(room.position);
      }
    }
  };

  return (
    <div className="scene-canvas">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        <perspectiveCamera ref={cameraRef} position={[0, 10, 20]} />

        {rooms.map((room) => (
          <RoomComponent
            key={room.id}
            width={room.width}
            height={room.height}
            depth={room.depth}
            position={room.position}
            occupied={room.occupied}
          />
        ))}

        {/* Pass `handleLeftClick` directly to CameraControls */}
        <CameraControls onLeftClick={handleLeftClick} />
      </Canvas>
    </div>
  );
};

export default SceneComponent;
