// script.js

document.addEventListener('DOMContentLoaded', function () {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    const slidetext = document.querySelector('.slidetext');

    function changeSlide(direction) {
        currentSlide += direction;

        if (currentSlide < 0) {
            currentSlide = totalSlides - 1;
        } else if (currentSlide >= totalSlides) {
            currentSlide = 0;
        }

        updateSlide();
    }
    function updateSlide() {
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.style.display = 'block';
                slidetext.innerHTML = slide.getAttribute('data-text');
                updateProjectLink(); // Call the function to update project link
            } else {
                slide.style.display = 'none';
            }
        });
    }

    // Array of project links corresponding to each slide
    const projectLinks = [
        'https://drive.google.com/uc?export=download&id=17QgSGuJUDIko77IaKU9nty_bDoVUiuVA', // Link for Slide 1
        // Add more links for additional slides if needed
    ];

    function updateProjectLink() {
        const projectLinkButton = document.querySelector('.btn');
        projectLinkButton.setAttribute('onclick', `window.location='${projectLinks[currentSlide]}'`);
        projectLinkButton.onclick = function () {
            window.location = projectLinks[currentSlide];
        };
    }

    // Event listeners for arrow buttons
    document.querySelector('.arrow-left').addEventListener('click', function () {
        changeSlide(-1);
    });

    document.querySelector('.arrow-right').addEventListener('click', function () {
        changeSlide(1);
    });

    // Update the slide on page load
    updateSlide();
    updateProjectLink(); // Call the function to update project link
});

