import React, { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls as DreiOrbitControls } from '@react-three/drei';
import * as THREE from 'three';

type CameraControlsProps = {
  onLeftClick: (clickPosition: THREE.Vector2) => void;
};

const CameraControls: React.FC<CameraControlsProps> = ({ onLeftClick }) => {
  const { camera, gl } = useThree();
  const controls = useRef<React.ElementRef<typeof DreiOrbitControls>>(null);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (event.button === 0) {
        // Left-click detected
        const canvasBounds = gl.domElement.getBoundingClientRect();
        const clickPosition = new THREE.Vector2(
          ((event.clientX - canvasBounds.left) / canvasBounds.width) * 2 - 1,
          -((event.clientY - canvasBounds.top) / canvasBounds.height) * 2 + 1
        );
        onLeftClick(clickPosition);
      }
    };

    gl.domElement.addEventListener('mousedown', handleMouseDown);
    return () => gl.domElement.removeEventListener('mousedown', handleMouseDown);
  }, [gl.domElement, onLeftClick]);

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
        LEFT: undefined, // Custom handler for left click
        RIGHT: THREE.MOUSE.ROTATE, // Right button for orbiting
        MIDDLE: THREE.MOUSE.DOLLY, // Middle button (or wheel) for zooming
      }}
    />
  );
};

export default CameraControls;
