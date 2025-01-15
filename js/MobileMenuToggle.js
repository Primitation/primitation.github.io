document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    // Toggle mobile menu visibility
    menuButton.addEventListener('click', () => {
        mobileMenu.style.display = mobileMenu.style.display === 'flex' ? 'none' : 'flex';
    });

    // Hide the menu when a link is clicked
    mobileMenu.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            mobileMenu.style.display = 'none';
        }
    });
});
