document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-bar a');
    const contentContainer = document.getElementById('content');

    function loadContent(url) {
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error('Failed to fetch content');
                return response.text();
            })
            .then(html => {
                contentContainer.innerHTML = `<div class="content-box">${html}</div>`;

            })
            .catch(error => {
                console.error(error);
                contentContainer.innerHTML = '<p>Error loading content.</p>';
            });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            loadContent(`content/${targetId}.html`);
        });
    });

    loadContent('content/home.html'); // Default content
});
