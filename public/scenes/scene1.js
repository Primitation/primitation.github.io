import * as THREE from 'three';
import { createCamera, createLight, createCube } from '../helper.js';

export function createScene1() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0000ff);

    // Create camera
    const camera = createCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(5, 0, 0); // Initial camera position

    // Camera positions for transitions
    const cameraPositions = [
        new THREE.Vector3(5, 0, 0),    // Position 1
        new THREE.Vector3(0, 5, 0),    // Position 2
        new THREE.Vector3(-5, 0, 0),   // Position 3
        new THREE.Vector3(0, -5, 0),   // Position 4
    ];

    // Create objects
    const cube = createCube(1, 0xff0000);
    scene.add(cube);

    // Create light
    const light = createLight(0xffffff, 100, new THREE.Vector3(5, 5, 5));
    scene.add(light);

    return { scene, camera, cameraPositions };
}
