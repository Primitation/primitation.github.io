import * as THREE from 'three';

let currentScene = null;
let renderer = null;

// Initialize the shared renderer
export function initializeRenderer() {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

// Load a scene dynamically
export async function loadScene(sceneName) {
    if (sceneName === 'scene1') {
        const { createScene1 } = await import('./scenes/scene1.js');
        return createScene1();
    } else if (sceneName === 'scene2') {
        const { createScene2 } = await import('./scenes/scene2.js');
        return createScene2();
    } else if (sceneName === 'scene3') {
        const { createScene3 } = await import('./scenes/scene3.js');
        return createScene3();
    }else if (sceneName === 'scene4') {
        const { createScene4 } = await import('./scenes/scene4.js');
        return createScene4(renderer);
    }
    throw new Error(`Scene ${sceneName} not found`);
}

// Get the shared renderer
export function getRenderer() {
    return renderer;
}
