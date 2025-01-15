document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-bar a');
    const contentContainer = document.getElementById('content');

    // Function to load content dynamically
    function loadContent(url) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.text();
            })
            .then(html => {
                contentContainer.innerHTML = html;
            })
            .catch(error => {
                console.error('Error loading content:', error);
                contentContainer.innerHTML = '<p>Error loading content. Please try again later.</p>';
            });
    }

    // Event listeners for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1); // Get the category name
            loadContent(`/content/${targetId}.html`); // Load the corresponding file
        });
    });

    // Load default content (Home)
    loadContent('/content/home.html');
});
