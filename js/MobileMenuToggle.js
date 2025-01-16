document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const contentContainer = document.getElementById('content');
    const navLinks = document.querySelectorAll('.nav-bar a, #mobile-menu a'); // Includes both desktop and mobile links

    // Toggle mobile menu visibility
    menuButton.addEventListener('click', () => {
        mobileMenu.style.display = mobileMenu.style.display === 'flex' ? 'none' : 'flex';
    });

    
    // Central function to initialize all scripts in the loaded content
    function initializeScripts() {
        console.log('Initializing content scripts...');
        initializeParticles(); // Call the particle initialization function
        // Add other script initializations as needed
    }

    // Load content dynamically
    function loadContent(url) {
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error('Failed to fetch content');
                return response.text();
            })
            .then(html => {
                contentContainer.innerHTML = `<div class="content-box">${html}</div>`;
                initializeScripts(); // Initialize scripts after loading content
            })
            .catch(error => {
                console.error(error);
                contentContainer.innerHTML = '<p>Error loading content.</p>';
            });
    }

    // Add click listeners for all navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            loadContent(`content/${targetId}.html`);

            // Hide mobile menu when a link is clicked
            if (mobileMenu.style.display === 'flex') {
                mobileMenu.style.display = 'none';
            }
        });
    });

    // Load default content
    loadContent('content/home.html');
});
