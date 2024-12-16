import React, { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls as DreiOrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const CameraControls = () => {
  const { camera, gl } = useThree();
  const controls = useRef<React.ElementRef<typeof DreiOrbitControls>>(null);

  useEffect(() => {
    if (controls.current) {
      controls.current.update();
    }
  }, [camera]);

  return (
    <DreiOrbitControls
      ref={controls}
      args={[camera, gl.domElement]}
      enableDamping={true} // Smooth camera motion
      dampingFactor={0.1} // How smooth the motion feels
      rotateSpeed={1} // Speed of camera rotation
      zoomSpeed={0.8} // Speed of zooming
      enablePan={false} // Disable panning
      mouseButtons={{
        LEFT: undefined, // Left button unused for now
        RIGHT: THREE.MOUSE.ROTATE, // Right button for orbiting
        MIDDLE: THREE.MOUSE.DOLLY, // Middle button (or wheel) for zooming
      }}
    />
  );
};

export default CameraControls;
