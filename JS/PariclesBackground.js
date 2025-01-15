// Canvas setup
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Mouse tracker
const mouse = {
    x: canvas.width / 2, // Default to canvas center
    y: canvas.height / 2
};

// Log mouse coordinates (for debugging)
document.addEventListener('mousemove', function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    console.log('Mouse X:', mouse.x, 'Mouse Y:', mouse.y); // Debugging
});

// Particle array
const particles = [];
const particleCount = 150; // Number of particles

// Particle constructor
class Particle {
    constructor(x, y, radius, xSpeed, ySpeed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
    }

    // Update particle position
    update() {
        // Calculate distance to mouse
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Attraction logic
        if (distance < 150) { // Attraction range
            this.x += dx * 0.03; // Adjust attraction strength here
            this.y += dy * 0.03;
        }

        // Update particle's position
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        // Bounce particles off edges
        if (this.x < 0 || this.x > canvas.width) this.xSpeed *= -1;
        if (this.y < 0 || this.y > canvas.height) this.ySpeed *= -1;
    }

    // Draw particle on canvas
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 193, 7, 0.8)'; // Yellow color
        ctx.fill();
    }
}

// Initialize particles
for (let i = 0; i < particleCount; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random() * 3 + 2;
    const xSpeed = (Math.random() - 0.5) * 2;
    const ySpeed = (Math.random() - 0.5) * 2;
    particles.push(new Particle(x, y, radius, xSpeed, ySpeed));
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    particles.forEach(particle => {
        particle.update(); // Update position
        particle.draw();   // Draw on canvas
    });
    requestAnimationFrame(animate); // Loop the animation
}

// Adjust canvas size on resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Start animation
animate();
