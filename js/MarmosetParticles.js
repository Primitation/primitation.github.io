// Step 1: Basic Particle Initialization
document.addEventListener('DOMContentLoaded', () => {
    const viewerContainer = document.querySelector('.viewer-container');
    const viewerBounds = viewerContainer.getBoundingClientRect(); // Get element bounds

    tsParticles.load("particles-js", {
        fullScreen: false, // Particles stay within the container
        background: {
            color: "transparent", // Transparent background for particles
        },
        particles: {
            number: {
                value: 100, // Number of particles
                density: {
                    enable: false, // Keep fixed particle count
                },
            },
            color: {
                value: "#FFC107", // Yellow particles for visibility
            },
            shape: {
                type: "circle", // Particle shape
            },
            opacity: {
                value: 0.7, // Semi-transparent
                random: true, // Random opacity for variation
            },
            size: {
                value: 3, // Small particles
                random: true, // Randomize size
            },
            move: {
                enable: true,
                speed: 1, // Movement speed
                direction: "none", // Randomized direction
                outModes: {
                    default: "bounce", // Bounce within bounds
                },
            },
        },
        interactivity: {
            detect_on: "canvas", // Detect interactions only within canvas
            events: {
                onHover: {
                    enable: true,
                    mode: "attract", // Attract particles when hovering
                },
            },
            modes: {
                attract: {
                    distance: 150, // Attraction distance
                    duration: 0.4, // Smooth transition
                    factor: 3, // Stronger pull effect
                },
            },
        },
        emitters: [
            {
                position: {
                    x: viewerBounds.left + viewerBounds.width / 2,
                    y: viewerBounds.top + viewerBounds.height / 2,
                },
                size: {
                    width: viewerBounds.width,
                    height: viewerBounds.height,
                },
                rate: {
                    quantity: 3, // Emit particles over time
                    delay: 0.2, // Emit delay
                },
            },
        ],
    });
});
