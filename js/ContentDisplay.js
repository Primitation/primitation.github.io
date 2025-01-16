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
                // Inject the fetched content
                contentContainer.innerHTML = `<div class="content-box">${html}</div>`;

                // Look for any widgets that need initialization
                initializeWidgets();
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

function initializeWidgets() {
    // Find all Marmoset Viewer placeholders
    const marmosetWidgets = document.querySelectorAll('.marmoset-viewer[data-path]');
    marmosetWidgets.forEach(widget => {
        const modelPath = widget.getAttribute('data-path');
        if (modelPath) {
            const iframe = document.createElement('iframe');
            iframe.width = '100%';
            iframe.height = '500px';
            iframe.src = modelPath;
            iframe.frameBorder = '0';
            iframe.allowFullscreen = true;
            widget.appendChild(iframe);

            // Load Marmoset Viewer script if not already present
            if (!document.querySelector('script[src="https://www.marmoset.co/viewer/viewer.js"]')) {
                const script = document.createElement('script');
                script.src = 'https://www.marmoset.co/viewer/viewer.js';
                document.body.appendChild(script);
            }
        }
    });
}

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