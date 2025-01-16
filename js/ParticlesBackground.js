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
                value: 6, // Default size
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
                    mode: "attract", // Particles move toward mouse
                },
                onClick: {
                    enable: false, // No particle addition on click
                },
            },
            modes: {
                attract: {
                    distance: 150, // Attraction distance from the mouse
                    duration: 0.4,
                },
            },
        },
        detectRetina: true, // Adjust for high-DPI screens
    });
});
