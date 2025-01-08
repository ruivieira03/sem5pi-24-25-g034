import React, { useEffect, useState } from 'react';
import './SceneControls.css';

type SceneControlsProps = {
  selectedRoom: {
    id: number;
    width: number;
    height: number;
    depth: number;
    position: [number, number, number];
    occupied: boolean;
    state: 'Occupied' | 'Free' | 'Maintenance';
    patient?: {
      name: string;
      surgeryType: string;
      scheduledTime: string;
    };
  } | null; // Selected room
};

const SceneControls: React.FC<SceneControlsProps> = ({ selectedRoom }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'i') {
        setIsMenuVisible((prev) => !prev); // Toggle menu visibility
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      {isMenuVisible && selectedRoom && (
        <div className="scene-controls-menu">
          <h3>Room Information</h3>
          <p><strong>ID:</strong> {selectedRoom.id}</p>
          <p><strong>Dimensions:</strong> {selectedRoom.width} x {selectedRoom.height} x {selectedRoom.depth}</p>
          <p><strong>State:</strong> {selectedRoom.state}</p>
          {selectedRoom.state === 'Occupied' && selectedRoom.patient && (
            <>
              <p><strong>Patient Name:</strong> {selectedRoom.patient.name}</p>
              <p><strong>Surgery Type:</strong> {selectedRoom.patient.surgeryType}</p>
              <p><strong>Scheduled Time:</strong> {selectedRoom.patient.scheduledTime}</p>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default SceneControls;