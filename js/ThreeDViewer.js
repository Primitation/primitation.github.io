document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('viewer-container');

    if (!container) {
        console.error('3D Viewer container not found!');
        return;
    }

    // Scene, Camera, and Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.innerHTML = ''; // Clear loading text
    container.appendChild(renderer.domElement);

    // Add Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Soft white light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // Add Orbit Controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Load a 3D Model
    const loader = new THREE.GLTFLoader();
    loader.load(
        '/models/sample.glb', // Path to the model
        (gltf) => {
            const model = gltf.scene;
            model.scale.set(1, 1, 1); // Scale the model
            scene.add(model);
            console.log('Model loaded successfully');
        },
        (xhr) => {
            console.log(`Model loading: ${(xhr.loaded / xhr.total) * 100}%`);
        },
        (error) => {
            console.error('Error loading model:', error);
        }
    );

    // Camera Position
    camera.position.set(0, 2, 5);
    controls.update();

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }

    animate();

    // Handle Resizing
    window.addEventListener('resize', () => {
        renderer.setSize(container.clientWidth, container.clientHeight);
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
    });
});
