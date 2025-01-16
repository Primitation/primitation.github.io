document.addEventListener('DOMContentLoaded', () => {
    tsParticles.load("particles-js", {
        fullScreen: false, // Particles stay within the container
        background: {
            color: "transparent",
        },
        particles: {
            number: {
                value: 100, // Number of particles around the viewer
                density: {
                    enable: false, // Disable auto-scaling by area
                },
            },
            color: {
                value: "#FFC107", // Yellow particles
            },
            shape: {
                type: "circle", // Particle shape
            },
            opacity: {
                value: 0.7, // Slightly transparent
                random: true,
            },
            size: {
                value: 3, // Particle size
                random: true,
            },
            move: {
                enable: true,
                speed: 1.5, // Movement speed
                direction: "none",
                random: true, // Randomized movement
                straight: false, // Particles move in curves
                outModes: {
                    default: "bounce", // Bounce off edges of the container
                },
                attract: {
                    enable: false, // Disable global attraction
                },
            },
        },
        interactivity: {
            detect_on: "canvas", // Interactivity only on the particle canvas
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
    });
});
