import React, { createContext, useContext, useState, ReactNode } from 'react';
import * as THREE from 'three';

// Define the type for the context value
type SceneContextType = {
  scene: THREE.Scene | null;
  setScene: React.Dispatch<React.SetStateAction<THREE.Scene | null>>;
  camera: THREE.Camera | null;
  setCamera: React.Dispatch<React.SetStateAction<THREE.Camera | null>>;
  renderer: THREE.WebGLRenderer | null;
  setRenderer: React.Dispatch<React.SetStateAction<THREE.WebGLRenderer | null>>;
};

// Initialize the context with a proper type
const SceneContext = createContext<SceneContextType | undefined>(undefined);

// Define props type for the provider
type SceneProviderProps = {
  children: ReactNode;
};

// Provider Component
export const SceneProvider = ({ children }: SceneProviderProps) => {
  const [scene, setScene] = useState<THREE.Scene | null>(null);
  const [camera, setCamera] = useState<THREE.Camera | null>(null);
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);

  const value: SceneContextType = {
    scene,
    setScene,
    camera,
    setCamera,
    renderer,
    setRenderer,
  };

  return <SceneContext.Provider value={value}>{children}</SceneContext.Provider>;
};

// Custom hook for accessing the context
export const useScene = () => {
  const context = useContext(SceneContext);
  if (!context) {
    throw new Error('useScene must be used within a SceneProvider');
  }
  return context;
};
