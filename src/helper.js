import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

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
 * Load a GLB file.
 * @param {string} url - Path to the GLB file.
 * @returns {Promise<THREE.Group>} - A promise resolving to the loaded GLB model.
 */
export async function createGLB(url) {
    const loader = new GLTFLoader();
    return new Promise((resolve, reject) => {
        loader.load(
            url,
            (gltf) => resolve(gltf.scene),
            undefined,
            (error) => reject(error)
        );
    });
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