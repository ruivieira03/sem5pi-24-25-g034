import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import RoomComponent from '../Room/RoomComponent.tsx';
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

  useEffect(() => {
    // Fetch hospital floor data
    fetch('/hospital.json')
      .then((response) => response.json())
      .then((data) => {
        setRooms(data.hospitalFloor.rooms || []);
      })
      .catch((error) => console.error('Error loading hospital data:', error));
  }, []);

  return (
    <div className="scene-canvas">
      <Canvas>
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        {/* Render All Rooms */}
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

        {/* Controls */}
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default SceneComponent;
