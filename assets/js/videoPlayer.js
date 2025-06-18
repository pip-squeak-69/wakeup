const videoData = {
    "perturbation_1": {
        title: "Perturbation Theory: Theorem 1",
        path: "perturbation_theorem_1.mp4"
    }
};

function loadVideo(videoCode) {
    const video = videoData[videoCode];
    if (video) {
        // Update the title
        document.getElementById('videoTitle').textContent = video.title;

        // Display the video screen
        const videoZone = document.getElementById("videoZone");
        videoZone.style.display = "block";

        // Get the video element and update the source
        const videoPlayer = document.getElementById('videoPlayer');
        const videoSource = document.getElementById('videoSource');

        // Log the video path for debugging
        console.log("Loading video from path:", video.path);

        // Update video source
        videoSource.src = video.path;
        
        // Add error handling with detailed logging
        videoPlayer.onerror = function(e) {
            console.error("Video error details:", {
                error: videoPlayer.error,
                networkState: videoPlayer.networkState,
                readyState: videoPlayer.readyState,
                src: videoSource.src
            });
            alert("Error loading video. Please check the console for details.");
        };

        // Add load event listener
        videoPlayer.onloadeddata = function() {
            console.log("Video data loaded successfully");
        };

        // Add canplay event listener
        videoPlayer.oncanplay = function() {
            console.log("Video can play");
        };

        // Reload and play the video
        videoPlayer.load();
        videoPlayer.play().then(function() {
            console.log("Video started playing");
        }).catch(function(error) {
            console.error("Failed to play video:", error);
            alert("Unable to play video. Please check your browser settings and console for details.");
        });
    } else {
        alert("Video not found!");
    }
}

// Function to get timestamp to the textarea
function getTimestamp() {
    const videoPlayer = document.getElementById('videoPlayer');
    const timestamp = videoPlayer.currentTime;
    
    // Format the timestamp as mm:ss
    const minutes = Math.floor(timestamp / 60);
    const seconds = Math.floor(timestamp % 60);
    const formattedTimestamp = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

    // Get the current cursor position in the textarea
    const notes = document.getElementById('notes');
    const cursorPos = notes.selectionStart;

    // Insert the timestamp at the cursor position
    const textBefore = notes.value.substring(0, cursorPos);
    const textAfter = notes.value.substring(cursorPos);

    // Update the textarea with the timestamp at the cursor
    notes.value = textBefore + `[${formattedTimestamp}] ` + textAfter;

    // Move the cursor position after the inserted timestamp
    notes.selectionStart = notes.selectionEnd = cursorPos + formattedTimestamp.length + 4;
    notes.focus();
}

function saveNotes() {
    const notes = document.getElementById('notes');
    const text = notes.value;

    // Create blob with notes text
    const blob = new Blob([text], {type: 'text/plain'});
    const link = document.createElement('a');

    // Create URL
    link.download = 'notes.txt';
    link.href = URL.createObjectURL(blob);

    // Trigger download
    link.click();
} 