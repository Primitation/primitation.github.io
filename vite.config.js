import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        assetsInclude: ['**/*.glb'], // Include .glb files in the build process
        emptyOutDir: true, // also necessary
    },
});