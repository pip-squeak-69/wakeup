const videoData = {
    "perturbation_1": {
        title: "Perturbation Theory: Theorem 1",
        file: "wakeup/static/videos/perturbation_theorem_1.mp4"
    },
};

function loadVideo(videoCode) {
    const video = videoData[videoCode];
    if (video) {
        // Update the title
        document.getElementById('videoTitle').textContent = video.title;

        // Update the video source
        document.getElementById('videoSource').src = video.file;

        // Display the video screen
        document.getElementById("videoZone").style.display = "block";

        // Load and play the video
        const videoPlayer = document.getElementById('videoPlayer');
        videoPlayer.load();
        videoPlayer.play();
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