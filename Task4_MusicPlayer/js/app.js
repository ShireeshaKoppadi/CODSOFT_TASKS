// ================================
// App Initialization
// ================================

// Set default volume
audio.volume = 1;

// Keyboard Shortcuts
document.addEventListener("keydown", (e) => {

    // Space = Play / Pause
    if (e.code === "Space") {
        e.preventDefault();

        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    }

    // Right Arrow = Next
    if (e.code === "ArrowRight") {
        nextBtn.click();
    }

    // Left Arrow = Previous
    if (e.code === "ArrowLeft") {
        prevBtn.click();
    }

});

// Show Playlist
updatePlaylist();