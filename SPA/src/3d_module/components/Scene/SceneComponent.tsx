import React, { useEffect, useState, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, SpotLight } from '@react-three/drei';
import RoomComponent from '../Room/RoomComponent.tsx';
import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import './SceneComponent.css';

type Room = {
  id: number;
  width: number;
  height: number;
  depth: number;
  position: [number, number, number];
  occupied: boolean;
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
      console.log('Spotlight target added to scene:', spotlightTargetRef.current);
    }
  }, [scene]);

  useEffect(() => {
    // Debugging spotlight position and configuration
    if (spotlightRef.current) {
      console.log('Spotlight initialized:', spotlightRef.current);
    } else {
      console.error('Spotlight reference is null.');
    }
  }, [spotlightRef]);

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
  const tweenGroup = new TWEEN.Group();
  const spotlightRef = useRef<THREE.SpotLight>(null);
  const spotlightTargetRef = useRef(new THREE.Object3D());

  useEffect(() => {
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

    console.log('Camera target position:', targetPosition);
    console.log('Spotlight target position:', tablePosition);

    new TWEEN.Tween(camera.position, tweenGroup)
      .to({ x: targetPosition.x, y: targetPosition.y, z: targetPosition.z }, 1000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(() => {
        camera.lookAt(tablePosition);

        if (spotlightTargetRef.current) {
          // Update spotlight target to the calculated position
          spotlightTargetRef.current.position.copy(tablePosition);
          console.log('Spotlight target updated:', spotlightTargetRef.current.position);
        } else {
          console.error('Spotlight target is null during animation.');
        }

        if (spotlightRef.current) {
          spotlightRef.current.position.copy(camera.position);
          console.log('Spotlight position updated:', spotlightRef.current.position);
        } else {
          console.error('Spotlight is null during animation.');
        }
      })
      .onComplete(() => {
        camera.lookAt(tablePosition);
        console.log('Camera position after animation:', camera.position);
      })
      .start();

    console.log('Tween started for camera movement.');
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
      <Canvas shadows camera={{ position: [0, 5, 15] }}>
        <SceneContent
          rooms={rooms}
          handleRoomSelect={handleRoomSelect}
          spotlightRef={spotlightRef}
        />
      </Canvas>
    </div>
  );
};

export default SceneComponent;
