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

                // After content is loaded, run WidgetLoader.js
                const widgetLoaderScript = document.createElement('script');
                widgetLoaderScript.src = '/js/WidgetLoader.js';
                document.body.appendChild(widgetLoaderScript);
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


function loadMarmosetViewer(containerId, modelPath) {
    const container = document.querySelector(containerId);
    if (!container) {
        console.error(`Container with ID ${containerId} not found.`);
        return;
    }

    // Fetch the widget template
    fetch('widgets/MarmosetViewer.html')
        .then(response => response.text())
        .then(html => {
            // Insert the widget template into the container
            container.innerHTML = html;

            // Update the `src` attribute of the iframe with the provided modelPath
            const iframe = container.querySelector('iframe');
            if (iframe) {
                iframe.src = modelPath;
            } else {
                console.error('No iframe found in the Marmoset Viewer widget.');
            }
        })
        .catch(error => {
            console.error('Error loading the Marmoset Viewer widget:', error);
        });
}