document.addEventListener('DOMContentLoaded', () => {
    const viewerContainer = document.querySelector('.viewer-container');
    const viewerBounds = viewerContainer.getBoundingClientRect(); // Get viewer position

    tsParticles.load("particles-js", {
        fullScreen: false, // Particles stay within the container
        background: {
            color: "transparent",
        },
        particles: {
            number: {
                value: 150, // Number of particles
                density: {
                    enable: false, // Disable area-based scaling
                },
            },
            color: {
                value: "#FFC107", // Yellow particles
            },
            shape: {
                type: "circle",
            },
            opacity: {
                value: 0.7,
                random: true,
            },
            size: {
                value: 3,
                random: true,
            },
            move: {
                enable: true,
                speed: 0.5, // Slow movement for hovering effect
                direction: "none",
                outModes: {
                    default: "bounce", // Bounce within container bounds
                },
                random: false,
                straight: false,
            },
        },
        interactivity: {
            detect_on: "window", // Allow hover events over the window
            events: {
                onHover: {
                    enable: true,
                    mode: "attract", // Pull particles toward the viewer edges
                },
            },
            modes: {
                attract: {
                    distance: 200, // Attraction range to the container edges
                    duration: 0.5, // Smooth transition to edges
                    factor: 5, // Stronger attraction effect
                },
            },
        },
        emitters: {
            position: {
                x: viewerBounds.left + viewerBounds.width / 2,
                y: viewerBounds.top + viewerBounds.height / 2,
            },
            size: {
                width: viewerBounds.width,
                height: viewerBounds.height,
            },
            rate: {
                quantity: 5,
                delay: 0.1,
            },
            particles: {
                move: {
                    direction: "none",
                },
                size: {
                    value: 3,
                },
            },
        },
    });
});
