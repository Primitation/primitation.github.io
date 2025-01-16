document.addEventListener('DOMContentLoaded', () => {
    tsParticles.load('particles-js', {
        fullScreen: false,
        background: { color: "transparent" },
        particles: {
            number: { value: 100, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            move: {
                enable: true,
                speed: 1,
                direction: "none",
                random: false,
                straight: false,
                outModes: { default: "bounce" },
                attract: { enable: true, rotateX: 600, rotateY: 1200 },
            },
        },
        interactivity: {
            events: {
                onHover: { enable: true, mode: "attract" },
                onClick: { enable: false },
            },
            modes: {
                attract: { distance: 200, duration: 0.4 },
            },
        },
    });
});
