// Load tsParticles and configure the background
document.addEventListener('DOMContentLoaded', () => {
    tsParticles.load("backgroundCanvas", {
        fullScreen: {
            enable: true, // Fullscreen background
        },
        particles: {
            number: {
                value: 150, // Number of particles
                density: {
                    enable: true,
                    value_area: 800, // Control how spread out the particles are
                },
            },
            color: {
                value: "#FFC107", // Yellow particles
            },
            shape: {
                type: "circle", // Particle shape
            },
            opacity: {
                value: 0.8, // Slightly transparent
                random: true,
            },
            size: {
                value: 3, // Default size
                random: true,
            },
            move: {
                enable: true,
                speed: 2, // Movement speed
                direction: "none", // Random movement
                outModes: {
                    default: "bounce", // Particles bounce off the edges
                },
            },
        },
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: "repulse", // Repel particles when the mouse is near
                },
                onClick: {
                    enable: true,
                    mode: "push", // Add particles on click
                },
            },
            modes: {
                repulse: {
                    distance: 100, // Distance for repulsion effect
                    duration: 0.4,
                },
                push: {
                    quantity: 5, // Number of particles added on click
                },
            },
        },
        detectRetina: true, // Adjust for high-DPI screens
    });
});
