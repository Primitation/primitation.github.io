function initializeParticles() {
    const viewerContainer = document.querySelector('.viewer-container');
    const particleContainer = document.getElementById('particles-js');

    if (!viewerContainer || !particleContainer) {
        console.log('Particles not initialized: .viewer-container or #particles-js not found');
        return;
    }

    // Get container bounds
    const viewerBounds = viewerContainer.getBoundingClientRect();

    // Initialize tsParticles
    tsParticles.load("particles-js", {
        fullScreen: false, // Particles stay within the container
        background: {
            color: "transparent", // Transparent background
        },
        particles: {
            number: {
                value: 150, // Number of particles
                density: {
                    enable: false, // Fixed particle count
                },
            },
            color: {
                value: "#FF0000", // RED particles for visibility
            },
            shape: {
                type: "circle", // Circular particles
            },
            opacity: {
                value: 0.9, // Make particles clearly visible
                random: false, // Consistent opacity
            },
            size: {
                value: 5, // Larger particles for better visibility
                random: false, // Consistent size
            },
            move: {
                enable: true,
                speed: 1.5, // Particle speed
                direction: "none", // Free movement
                outModes: {
                    default: "out", // Allow particles to move freely outside container
                },
            },
        },
        interactivity: {
            detect_on: "canvas", // Detect interactions within canvas
            events: {
                onHover: {
                    enable: false, // Disable mouse hover interactivity
                },
            },
        },
        emitters: {
            position: {
                x: 50, // Center x
                y: 50, // Center y
            },
            size: {
                width: viewerBounds.width + 200, // Extend width significantly beyond container
                height: viewerBounds.height + 200, // Extend height significantly beyond container
            },
            rate: {
                quantity: 5, // Number of particles emitted
                delay: 0.2, // Delay between emissions
            },
        },
    });

    // Apply custom boundary repulsion logic
    const containerBounds = {
        top: viewerBounds.top,
        bottom: viewerBounds.bottom,
        left: viewerBounds.left,
        right: viewerBounds.right,
    };

    const instance = tsParticles.domItem(0);
    instance?.particles.array.forEach((particle) => {
        // Check if the particle is inside the viewer-container bounds
        if (
            particle.position.x > containerBounds.left &&
            particle.position.x < containerBounds.right &&
            particle.position.y > containerBounds.top &&
            particle.position.y < containerBounds.bottom
        ) {
            const force = 5; // Repulsion strength
            const dx =
                particle.position.x -
                (containerBounds.left + containerBounds.right) / 2;
            const dy =
                particle.position.y -
                (containerBounds.top + containerBounds.bottom) / 2;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Apply repulsion force if particle is too close
            if (distance < 100) {
                particle.velocity.horizontal += (dx / distance) * force;
                particle.velocity.vertical += (dy / distance) * force;
            }
        }
    });
}
