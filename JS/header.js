document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-bar a');
    const contentContainer = document.getElementById('content');

    function loadContent(url) {
        console.log('Loading content from:', url); // Debugging
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                return response.text();
            })
            .then(html => {
                contentContainer.innerHTML = html;
            })
            .catch(error => {
                console.error('Error loading content:', error); // Log the full error
                contentContainer.innerHTML = '<p>Error loading content. Please try again later.</p>';
            });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1); // Get category name
            loadContent(`content/${targetId}.html`); // Adjusted relative path
        });
    });

    // Default content load
    loadContent('content/home.html'); // Adjusted relative path
});
