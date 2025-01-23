import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

/**
 * Perform a circular interpolation between two points.
 * @param {THREE.Vector3} start - Starting position.
 * @param {THREE.Vector3} end - Target position.
 * @param {number} t - Interpolation factor (0 to 1).
 * @returns {THREE.Vector3} - Interpolated position.
 */
export function circularLerp(start, end, t) {
    const radius = start.distanceTo(end);
    const angle = t * Math.PI * 2; // Full circular movement
    const x = Math.cos(angle) * radius + start.x;
    const y = Math.sin(angle) * radius + start.y;
    const z = (1 - t) * start.z + t * end.z; // Linear interpolation along z-axis
    return new THREE.Vector3(x, y, z);
}

/**
 * Resize renderer and camera on window resize.
 * @param {THREE.WebGLRenderer} renderer - The renderer to update.
 * @param {THREE.PerspectiveCamera} camera - The camera to update.
 */
export function handleResize(renderer, camera) {
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
}

/**
 * Create a standard perspective camera.
 * @param {number} fov - Field of view.
 * @param {number} aspect - Aspect ratio.
 * @param {number} near - Near clipping plane.
 * @param {number} far - Far clipping plane.
 * @param {THREE.Vector3} position - Initial camera position.
 * @returns {THREE.PerspectiveCamera} - Created camera.
 */
export function createCamera(fov, aspect, near, far, position = new THREE.Vector3(0, 0, 5)) {
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.copy(position);
    return camera;
}

/**
 * Create a standard point light with a given intensity and position.
 * @param {number} color - Light color.
 * @param {number} intensity - Light intensity.
 * @param {THREE.Vector3} position - Light position.
 * @returns {THREE.PointLight} - Created light.
 */
export function createLight(color, intensity, position = new THREE.Vector3(0, 10, 0)) {
    const light = new THREE.PointLight(color, intensity);
    light.position.copy(position);
    return light;
}

/**
 * Create a simple cube for demonstration purposes.
 * @param {number} size - Cube size.
 * @param {number} color - Cube color.
 * @returns {THREE.Mesh} - Created cube mesh.
 */
export function createCube(size = 1, color = 0xff0000) {
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshStandardMaterial({ color });
    return new THREE.Mesh(geometry, material);
}

/**
 * Create a sphere mesh.
 * @param {number} radius - Sphere radius.
 * @param {number} widthSegments - Number of horizontal segments.
 * @param {number} heightSegments - Number of vertical segments.
 * @param {number} color - Sphere color.
 * @returns {THREE.Mesh} - Created sphere mesh.
 */
export function createSphere(radius = 1, widthSegments = 32, heightSegments = 32, color = 0x00ff00) {
    const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    const material = new THREE.MeshStandardMaterial({ color });
    return new THREE.Mesh(geometry, material);
}

/**
 * Create a cone mesh.
 * @param {number} radius - Radius of the cone base.
 * @param {number} height - Height of the cone.
 * @param {number} radialSegments - Number of segmented faces around the circumference.
 * @param {number} color - Cone color.
 * @returns {THREE.Mesh} - Created cone mesh.
 */
export function createCone(radius = 1, height = 2, radialSegments = 32, color = 0x0000ff) {
    const geometry = new THREE.ConeGeometry(radius, height, radialSegments);
    const material = new THREE.MeshStandardMaterial({ color });
    return new THREE.Mesh(geometry, material);
}

/**
 * Load a GLB model and add it to the scene asynchronously.
 * @param {THREE.Scene} scene - The Three.js scene to add the model to.
 * @param {string} modelPath - The path to the GLB model.
 * @param {Function} [onLoad] - Callback function when the model is successfully loaded.
 * @param {Function} [onError] - Callback function when there's an error loading the model.
 */
export function loadGLBModel(scene, modelPath, onLoad, onError) {
    const loader = new GLTFLoader();
    loader.load(
        modelPath,
        (gltf) => {
            scene.add(gltf.scene); // Add the model to the scene
            console.log('Model loaded successfully:', modelPath);
            if (onLoad) onLoad(gltf.scene); // Call the onLoad callback
        },
        undefined,
        (error) => {
            console.error('Error loading model:', error);
            if (onError) onError(error); // Call the onError callback
        }
    );
}
