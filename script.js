// script.js
document.getElementById('downloadImage').addEventListener('click', function () {
    var tempLink = document.createElement('a');
    tempLink.href = 'https://drive.google.com/uc?id=YOUR_FILE_ID';
    tempLink.setAttribute('download', 'FileName');

    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
});