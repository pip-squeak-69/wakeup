let player;
let currentVideoId = null;

const notes = document.getElementById("notes");


const videoData = {
    "pt-intro": {
        title: "Intro to Perturbation Theory",
        youtubeId: "BNjeAFDjHIU"
    },
    "pt-l1": {
        title: "Triangularizing a Matrix Pair That Cannot be Simultaneously Triangularized",
        youtubeId: "cD9v_HfpkTA"
    }
};

// YouTube Player API callback (required)
function onYouTubeIframeAPIReady() {}

function loadVideo(videoCode) {
    currentVideoId = videoCode;
    const video = videoData[videoCode];

    if (!video) {
        alert("Video not found!");
        return;
    }

    document.getElementById('videoTitle').textContent = video.title;
    document.getElementById("videoZone").style.display = "block";

    const videoPlayer = document.getElementById('videoPlayer');
    videoPlayer.src = `https://www.youtube.com/embed/${video.youtubeId}?enablejsapi=1`;

    player = new YT.Player('videoPlayer', {
        events: {
            'onReady': () => {},
            'onStateChange': () => {}
        }
    });

    notes.value = localStorage.getItem(currentVideoId) || "";
}

function getTimestamp() {
    if (!player || !player.getCurrentTime) {
        alert("Please wait for the video to load completely.");
        return;
    }

    const currentTime = player.getCurrentTime();
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    const formatted = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

    return formatted;
}

function showTimestamp() {
    const time = getTimestamp();
    const cursorPos = notes.selectionStart;

    notes.value = 
        notes.value.substring(0, cursorPos) + 
        `[${time}] ` + 
        notes.value.substring(cursorPos);

    notes.selectionStart = notes.selectionEnd = cursorPos + time.length + 4;
    notes.focus();
}

function saveNotes() {
    if (!currentVideoId) {
        alert("Please select a video first.");
        return;
    }

    localStorage.setItem(currentVideoId, notes.value);
}

function downloadNotes() {
    const blob = new Blob([notes.value], { type: 'text/plain' });
    const link = document.createElement('a');

    link.download = 'notes.txt';
    link.href = URL.createObjectURL(blob);
    link.click();
}

function openWindow() {
    const windowName = "Ask a Question"

    const width = screen.width * 0.5;
    const height = screen.height * 0.6;

    // Calculate the position to center the window
    const left = (screen.width - width) / 2;
    const top = (screen.height - height) / 2;
    
    // Open the new window with specific parameters
    const windowOptions = `width=${width},height=${height},left=${left},top=${top},resizable=no`;
   
    const videoTitle = videoData[currentVideoId].title;
    const timestamp = getTimestamp();
    const url = `../../questions.html?videoTitle=${videoTitle}&timestamp=${timestamp}`;

    const newWindow = window.open(url, windowName, windowOptions);
}
