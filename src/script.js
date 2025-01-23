import * as THREE from 'three';

import { initializeRenderer, loadScene, getRenderer } from './scenes.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { handleResize } from './helper.js';

let currentSceneIndex = 0;
const sceneNames = ['scene1', 'scene2', 'scene3', 'scene4'];
let currentScene = null;

let currentCameraPositionIndex = 0; // Current index for camera positions
let transitioning = false; // Prevent input during transitions
const transitionSpeed = 0.05; // Speed of SLERP transition

initializeRenderer();
const renderer = getRenderer();


// Enable resizing
function enableResize(camera) {
    handleResize(renderer, camera);
}

// SLERP transition between two points
function slerpCameraTransition(targetPosition) {
    const { camera } = currentScene;
    const start = camera.position.clone();
    const end = targetPosition.clone();

    let t = 0; // Transition progress
    transitioning = true;

    function animateTransition() {
        t += transitionSpeed;
        if (t >= 1) {
            t = 1;
            transitioning = false;
        }

        // Perform SLERP interpolation
        const interpolated = new THREE.Vector3().copy(start).lerp(end, t);
        camera.position.copy(interpolated);
        camera.lookAt(0, 0, 0); // Keep the camera focused on the origin

        if (transitioning) {
            requestAnimationFrame(animateTransition);
        }
    }

    animateTransition();
}

// Switch scenes dynamically
async function switchScene(index) {
    currentSceneIndex = index;
    currentScene = await loadScene(sceneNames[currentSceneIndex]);

    // Enable resizing for the new camera
    enableResize(currentScene.camera);

    // Add OrbitControls for free camera rotation
    const controls = new OrbitControls(currentScene.camera, renderer.domElement);
    controls.enableDamping = true; // Smooth rotation
    controls.dampingFactor = 0.05;
    controls.update();

    // Update animation loop for controls
    const animateControls = () => {
        requestAnimationFrame(animateControls);
        controls.update(); // Ensure controls are updated
    };
    animateControls();
}
// Handle keyboard input
window.addEventListener('keydown', (event) => {
    if (transitioning || !currentScene) return;

    if (event.key === 'ArrowUp') {
        // Move to the next camera position
        const positions = currentScene.cameraPositions;
        currentCameraPositionIndex = (currentCameraPositionIndex + 1) % positions.length;
        slerpCameraTransition(positions[currentCameraPositionIndex]);
    } else if (event.key === 'ArrowDown') {
        // Move to the previous camera position
        const positions = currentScene.cameraPositions;
        currentCameraPositionIndex = (currentCameraPositionIndex - 1 + positions.length) % positions.length;
        slerpCameraTransition(positions[currentCameraPositionIndex]);
    } else if (event.key === 'ArrowRight') {
        // Switch to the next scene
        const nextIndex = (currentSceneIndex + 1) % sceneNames.length;
        switchScene(nextIndex);
    } else if (event.key === 'ArrowLeft') {
        // Switch to the previous scene
        const prevIndex = (currentSceneIndex - 1 + sceneNames.length) % sceneNames.length;
        switchScene(prevIndex);
    }
});

// Animation loop
async function animate() {
    requestAnimationFrame(animate);
    if (currentScene) {
        const { scene, camera } = currentScene;
        renderer.render(scene, camera);
    }
}

switchScene(0); // Load the first scene
animate();