// Function to get URL parameters
function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Wait for the DOM content to load before executing any DOM manipulation
document.addEventListener("DOMContentLoaded", function() {
    // Get videoTitle and timestamp from the URL parameters
    const videoTitle = getURLParameter("videoTitle");
    const timestamp = getURLParameter("timestamp");

    if (videoTitle) {
        document.getElementById("videoTitle").textContent = `Video: ${videoTitle}`;
    }

    if (timestamp) {
        document.getElementById("question").value = "[" + timestamp + "] ";
    }
});

// Handle form submission
document.getElementById('questionForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const question = document.getElementById('question').value;
    const videoTitle = getURLParameter("videoTitle");
    const timestamp = getURLParameter("timestamp");
});