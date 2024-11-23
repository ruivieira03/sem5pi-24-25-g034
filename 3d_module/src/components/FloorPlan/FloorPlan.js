// src/components/FloorPlan/FloorPlan.js
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import './FloorPlan.css'; // Import the CSS file

const FloorPlan = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Load room data from JSON
        fetch('/rooms.json')
            .then(response => response.json())
            .then(data => {
                data.forEach(room => {
                    createRoom(room);
                });
            });

        function createRoom(room) {
            // Create room walls
            const wallGeometry = new THREE.BoxGeometry(4, 2, 0.1); // Room dimensions
            const wallMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
            const roomMesh = new THREE.Mesh(wallGeometry, wallMaterial);
            roomMesh.position.set(room.position.x, room.position.y, room.position.z);
            scene.add(roomMesh);

            // Create door
            const doorGeometry = new THREE.BoxGeometry(0.5, 1, 0.1);
            const doorMaterial = new THREE.MeshBasicMaterial({ color: 0x654321 });
            const doorMesh = new THREE.Mesh(doorGeometry, doorMaterial);
            doorMesh.position.set(room.position.x, room.position.y, room.position.z + 2.1); // Position the door
            scene.add(doorMesh);

            // Create surgical table
            const tableGeometry = new THREE.BoxGeometry(1, 0.1, 2);
            const tableMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
            const tableMesh = new THREE.Mesh(tableGeometry, tableMaterial);
            tableMesh.position.set(room.position.x, room.position.y + 0.5, room.position.z); // Position the table
            scene.add(tableMesh);

            // If the room is occupied, add a human body model
            if (room.isOccupied) {
                loadHumanModel(room.position);
            }
        }

        function loadHumanModel(position) {
            const loader = new GLTFLoader();
            loader.load('/path/to/human_model.glb', (gltf) => {
                const humanModel = gltf.scene;
                humanModel.position.set(position.x, position.y + 0.5, position.z); // Position the model on the table
                scene.add(humanModel);
            }, undefined, (error) => {
                console.error('An error occurred while loading the human model:', error);
            });
        }

        camera.position.z = 10;

        const animate = function () {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };

        animate();

        // Clean up on component unmount
        return () => {
            mountRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} className="floorplan-container" />;
};

export default FloorPlan;