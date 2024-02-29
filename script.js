// script.js
document.getElementById('downloadImage').addEventListener('click', function () {
    var tempLink = document.createElement('a');
    tempLink.href = 'https://drive.google.com/uc?id=YOUR_FILE_ID';
    tempLink.setAttribute('download', 'FileName');
    // Open the link in a new tab or window
    tempLink.target = '_blank';

    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
});

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
            } else {
                slide.style.display = 'none';
            }
        });
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
});
