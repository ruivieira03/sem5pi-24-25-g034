import React, { useEffect, useState, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, SpotLight } from '@react-three/drei';
import RoomComponent from '../Room/RoomComponent.tsx';
import SceneControls from '../Scene/SceneControls.tsx'; // Import SceneControls
import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import './SceneComponent.css';

type RoomStatus = 'free' | 'maintenance' | 'occupied';

type Room = {
  id: number;
  width: number;
  height: number;
  depth: number;
  position: [number, number, number];
  status: RoomStatus;
  patients: number;
};

const SceneContent: React.FC<{
  rooms: Room[];
  handleRoomSelect: (room: Room, camera: THREE.PerspectiveCamera) => void;
  spotlightRef: React.RefObject<THREE.SpotLight>;
}> = ({ rooms, handleRoomSelect, spotlightRef }) => {
  const { camera, scene } = useThree();
  const spotlightTargetRef = useRef(new THREE.Object3D());

  useEffect(() => {
    // Ensure spotlight target is added to the scene
    if (spotlightTargetRef.current) {
      scene.add(spotlightTargetRef.current);
    }
  }, [scene]);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      {/* Spotlight */}
      <SpotLight
        ref={spotlightRef}
        position={camera.position.toArray()}
        angle={Math.PI / 6}
        penumbra={0.5}
        intensity={2}
        castShadow
        target={spotlightTargetRef.current}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Render all rooms */}
      {rooms.map((room) => (
        <RoomComponent
          key={room.id}
          width={room.width}
          height={room.height}
          depth={room.depth}
          position={room.position}
          occupied={room.occupied}
          onSelect={() => handleRoomSelect(room, camera)}
        />
      ))}

      {/* Controls */}
      <OrbitControls />
    </>
  );
};

const SceneComponent = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null); // Track selected room
  const tweenGroup = new TWEEN.Group();
  const spotlightRef = useRef<THREE.SpotLight>(null);
  const spotlightTargetRef = useRef(new THREE.Object3D());

  useEffect(() => {
    // Fetch hospital floor data
    fetch('/hospital.json')
      .then((response) => response.json())
      .then((data) => {
        setRooms(data.hospitalFloor.rooms || []);
      })
      .catch((error) => console.error('Error loading hospital data:', error));
  }, []);

  const handleRoomSelect = (room: Room, camera: THREE.PerspectiveCamera) => {
    console.log('Selected Room:', room);

    if (!camera) {
      console.error('Camera is undefined!');
      return;
    }

    // Calculate the camera position inside the selected room
    const targetPosition = new THREE.Vector3(
      room.position[0] + 0, // Room center X
      room.position[1] + 2, // Slightly above the center in Y
      room.position[2] - 1 // Slightly in front of the room in Z
    );

    const tablePosition = new THREE.Vector3(
      room.position[0],
      room.position[1],
      room.position[2]
    );

    new TWEEN.Tween(camera.position, tweenGroup)
      .to({ x: targetPosition.x, y: targetPosition.y, z: targetPosition.z }, 1000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(() => {
        camera.lookAt(tablePosition);

        if (spotlightTargetRef.current) {
          spotlightTargetRef.current.position.copy(tablePosition);
        }

        if (spotlightRef.current) {
          spotlightRef.current.position.copy(camera.position);
        }
      })
      .onComplete(() => {
        camera.lookAt(tablePosition);
      })
      .start();
  };

  useEffect(() => {
    const animate = (time: number) => {
      tweenGroup.update(time);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [tweenGroup]);

  return (
    <div className="scene-canvas">
      {/* Scene Controls */}
      <SceneControls selectedRoom={selectedRoom} />

      <Canvas shadows camera={{ position: [0, 5, 15] }}>
        <SceneContent
          rooms={rooms}
          handleRoomSelect={(room, camera) => {
            setSelectedRoom(room); // Update the selected room
            handleRoomSelect(room, camera); // Move the camera to the selected room
          }}
          spotlightRef={spotlightRef}
        />
      </Canvas>
    </div>
  );
};

export default SceneComponent;
