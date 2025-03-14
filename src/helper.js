import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

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
 * Create a 3D loading throbber (e.g., rotating and pulsing sphere).
 * @param {THREE.Scene} scene - The Three.js scene to add the throbber to.
 * @returns {THREE.Mesh} - The throbber mesh for removal later.
 */
export function createThrobber(scene) {
    const geometry = new THREE.SphereGeometry(0.5, 32, 32);
    const material = new THREE.MeshStandardMaterial({
        color: 0xff9900,
        emissive: 0xff9900,
        emissiveIntensity: 1,
    });

    const throbber = new THREE.Mesh(geometry, material);
    scene.add(throbber);

    // Animate the throbber (rotation + pulsing)
    let scaleDirection = 1; // 1 for increasing size, -1 for decreasing

    function animateThrobber() {
        throbber.rotation.y += 0.05; // Rotate
        throbber.rotation.x += 0.03;

        // Pulsing effect (scaling up and down)
        throbber.scale.x += 0.01 * scaleDirection;
        throbber.scale.y += 0.01 * scaleDirection;
        throbber.scale.z += 0.01 * scaleDirection;

        // Reverse scale direction if throbber reaches size limits
        if (throbber.scale.x > 1.2 || throbber.scale.x < 0.8) {
            scaleDirection *= -1;
        }

        // Continue animation if the throbber is still part of the scene
        if (scene.children.includes(throbber)) {
            requestAnimationFrame(animateThrobber);
        }
    }
    animateThrobber();

    return throbber;
}

/**
 * Create a 3D error indicator (e.g., a red "X" or exclamation mark).
 * @param {THREE.Scene} scene - The Three.js scene to add the error indicator to.
 */
export function createErrorIndicator(scene) {
    const geometry = new THREE.TorusGeometry(0.5, 0.1, 16, 100);
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000, emissive: 0xff0000, emissiveIntensity: 1 });
    const errorIndicator = new THREE.Mesh(geometry, material);

    errorIndicator.rotation.x = Math.PI / 2; // Rotate to form a ring
    scene.add(errorIndicator);

    return errorIndicator;
}

/**
 * Load a GLB model with a 3D throbber and error indicator.
 * @param {THREE.Scene} scene - The Three.js scene to add the model to.
 * @param {string} modelPath - The path to the GLB model.
 * @returns {Promise} - Resolves when the model is loaded and added to the scene.
 */
export function loadGLBModelWithThrobber(scene, modelPath) {
    const loader = new GLTFLoader();

    // Create a loading throbber
    const throbber = createThrobber(scene);

    return new Promise((resolve, reject) => {
        loader.load(
            modelPath,
            (gltf) => {
                scene.remove(throbber); // Remove throbber on success
                scene.add(gltf.scene); // Add the loaded model to the scene
                console.log('Model loaded successfully:', modelPath);
                resolve(gltf.scene);
            },
            undefined,
            (error) => {
                scene.remove(throbber); // Remove throbber on error
                createErrorIndicator(scene); // Show error indicator
                console.error('Error loading model:', error);
                reject(error);
            }
        );
    });
}

/**
 * Capture a screenshot of the current WebGL canvas and create a blurred overlay with a throbber.
 * @param {THREE.WebGLRenderer} renderer - The WebGL renderer.
 * @param {Function} onComplete - Callback function called when the transition ends.
 * @returns {void}
 */
export function createSceneTransition(renderer, onComplete) {
    // Capture the current frame as a data URL
    const screenshot = renderer.domElement.toDataURL('image/png');

    // Create a fullscreen overlay
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundImage = `url(${screenshot})`;
    overlay.style.backgroundSize = 'cover';
    overlay.style.filter = 'blur(10px)';
    overlay.style.zIndex = '1000';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';

    // Add a 3D throbber
    const throbber = document.createElement('div');
    throbber.style.width = '50px';
    throbber.style.height = '50px';
    throbber.style.border = '5px solid rgba(255, 255, 255, 0.3)';
    throbber.style.borderTop = '5px solid white';
    throbber.style.borderRadius = '50%';
    throbber.style.animation = 'spin 1s linear infinite';

    overlay.appendChild(throbber);
    document.body.appendChild(overlay);

    // CSS animation for the throbber
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // Simulate a loading delay for the transition
    setTimeout(() => {
        // Remove the overlay and call the onComplete callback
        overlay.remove();
        style.remove();
        if (onComplete) onComplete();
    }, 2000); // 2 seconds transition duration
}
