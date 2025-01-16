// WidgetLoader: Dynamically loads widgets into placeholders
document.addEventListener('DOMContentLoaded', () => {
    // Find all elements with the "data-widget" attribute
    const widgetPlaceholders = document.querySelectorAll('[data-widget]');

    widgetPlaceholders.forEach(placeholder => {
        const widgetName = placeholder.getAttribute('data-widget'); // Widget name
        const widgetPath = `/widgets/${widgetName}.html`; // Path to the widget HTML

        // Fetch and insert the widget's HTML
        fetch(widgetPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load widget: ${widgetName}`);
                }
                return response.text();
            })
            .then(widgetHTML => {
                placeholder.innerHTML = widgetHTML;

                // Dynamically load widget-specific scripts
                if (widgetName === 'ThreeDViewer') {
                    const script = document.createElement('script');
                    script.src = '/js/ThreeDViewer.js';
                    document.body.appendChild(script);
                }
            })
            .catch(error => {
                console.error(error);
                placeholder.innerHTML = `<p>Error loading widget: ${widgetName}</p>`;
            });
    });
});
