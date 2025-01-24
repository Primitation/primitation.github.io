import * as THREE from 'three';
import { loadGLBModelWithThrobber, createLight } from '../helper.js';

export function createScene4() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x222222); // Dark gray background

    // Create a perspective camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(5, 0, 0); // Set initial camera position

    // Add a light source
    const light = createLight(0xffffff, 100, new THREE.Vector3(10, 10, 10));
    scene.add(light);

    // Load the GLB model asynchronously
    loadGLBModelWithThrobber(
        scene,
        './assets/models/ferrary/scene.gltf',
        (model) => {
            console.log('Model successfully loaded:', model);
        },
        (error) => {
            console.error('Failed to load model:', error);
        }
    );

    return { scene, camera };
}