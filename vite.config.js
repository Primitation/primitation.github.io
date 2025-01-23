import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        assetsInclude: ['src/**/*.glb'], // Include .glb files in the build process
        emptyOutDir: true, // also necessary
    },
}
);
