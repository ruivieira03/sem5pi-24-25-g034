import React, { useEffect, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import RoomComponent from '../Room/RoomComponent.tsx'; // Adjust path as necessary
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
  const spotlightRef = useRef<THREE.SpotLight>(null);
  const [selectedRoom, setSelectedRoom] = useState<[number, number, number] | null>(null);

  useEffect(() => {
    fetch('/hospital.json')
      .then((response) => response.json())
      .then((data) => {
        setRooms(data.hospitalFloor.rooms || []);
      })
      .catch((error) => console.error('Error loading hospital data:', error));
  }, []);

  const handleLeftClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cameraRef.current) return;

    const { clientX, clientY } = event;
    const canvas = event.target as HTMLCanvasElement;
    const rect = canvas.getBoundingClientRect();
    const mouse = new THREE.Vector2(
      ((clientX - rect.left) / rect.width) * 2 - 1,
      -((clientY - rect.top) / rect.height) * 2 + 1
    );

    raycaster.current.setFromCamera(mouse, cameraRef.current);

    const intersects = raycaster.current.intersectObjects(
      cameraRef.current?.parent?.children || [],
      true
    );

    if (intersects.length > 0) {
      const clickedObject = intersects[0].object;
      const room = rooms.find((r) => clickedObject.name === `surgical-table-${r.id}`);
      if (room) {
        setSelectedRoom(room.position);
        moveCameraToRoom(room.position);
      }
    }
  };

  const moveCameraToRoom = (roomPosition: [number, number, number]) => {
    if (!cameraRef.current || !spotlightRef.current) return;

    const newCameraPosition = [roomPosition[0], roomPosition[1] + 10, roomPosition[2] + 15];
    const spotlight = spotlightRef.current;

    gsap.to(cameraRef.current.position, {
      x: newCameraPosition[0],
      y: newCameraPosition[1],
      z: newCameraPosition[2],
      duration: 1.5,
      onUpdate: () => {
        spotlight.position.copy(cameraRef.current!.position);
        spotlight.target.position.set(roomPosition[0], roomPosition[1], roomPosition[2]);
        spotlight.target.updateMatrixWorld();
      },
    });

    gsap.to(
      {
        x: cameraRef.current.rotation.x,
        y: cameraRef.current.rotation.y,
        z: cameraRef.current.rotation.z,
      },
      {
        x: roomPosition[0],
        y: roomPosition[1],
        z: roomPosition[2],
        duration: 1.5,
      }
    );
  };

  return (
    <div className="scene-canvas" onClick={handleLeftClick}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight
          ref={spotlightRef}
          intensity={1}
          angle={Math.PI / 6}
          penumbra={0.5}
          position={[0, 10, 20]}
          castShadow
        />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />

        <perspectiveCamera ref={cameraRef} position={[0, 15, 25]} />

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

        <OrbitControls enableDamping={true} dampingFactor={0.1} />
      </Canvas>
    </div>
  );
};

export default SceneComponent;
