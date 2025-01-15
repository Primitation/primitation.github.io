document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-bar a');
    const contentContainer = document.getElementById('content');

    // Function to load content dynamically
    function loadContent(url) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                return response.text();
            })
            .then(html => {
                // Wrap the content in a box
                contentContainer.innerHTML = `<div class="content-box">${html}</div>`;
            })
            .catch(error => {
                console.error('Error loading content:', error);
                contentContainer.innerHTML = '<div class="content-box"><p>Error loading content. Please try again later.</p></div>';
            });
    }

    // Event listeners for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1); // Get category name
            loadContent(`content/${targetId}.html`); // Load the corresponding file
        });
    });

    // Default content load
    loadContent('content/home.html'); // Default to home content
});
