import * as THREE from 'three';
import { createCone } from '../helper.js';

export function createScene3() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xff00ff); // Purple background

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(5, 0, 0); // Initial camera position

    // Predefined camera positions
    const cameraPositions = [
        new THREE.Vector3(5, 0, 0),    // Position 1
        new THREE.Vector3(0, 5, 0),    // Position 2
        new THREE.Vector3(-5, 0, 0),   // Position 3
        new THREE.Vector3(0, -5, 0),   // Position 4
    ];

    const cone = createCone(1, 2, 32, 0x00ff00); // Green cone
    scene.add(cone);

    const light = new THREE.PointLight(0xffffff, 100);
    light.position.set(5, 5, 5);
    scene.add(light);

    return { scene, camera, cameraPositions};
}
