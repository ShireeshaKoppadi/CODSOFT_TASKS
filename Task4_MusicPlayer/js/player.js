// ================================
// Music Player Elements
// ================================

const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const progress = document.getElementById("progress");

const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const volume = document.getElementById("volume");
const muteBtn = document.getElementById("mute");

const playlist = document.getElementById("playlist");

const shuffleBtn = document.getElementById("shuffle");
const repeatBtn = document.getElementById("repeat");
const favoriteBtn = document.getElementById("favorite");

let currentSong = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;

// ================================
// Load Song
// ================================

function loadSong(index){

    const song = songs[index];

    title.textContent = song.title;
    artist.textContent = song.artist;

    cover.src = song.cover;
    audio.src = song.src;

    updatePlaylist();
}

loadSong(currentSong);

// ================================
// Play Song
// ================================

function playSong(){

    audio.play();

    isPlaying = true;

    playBtn.innerHTML =
    '<i class="fa-solid fa-pause"></i>';

    cover.classList.add("playing");
}

// ================================
// Pause Song
// ================================

function pauseSong(){

    audio.pause();

    isPlaying = false;

    playBtn.innerHTML =
    '<i class="fa-solid fa-play"></i>';

    cover.classList.remove("playing");
}

// ================================
// Play Button
// ================================

playBtn.addEventListener("click",()=>{

    if(isPlaying){

        pauseSong();

    }else{

        playSong();

    }

});

// ================================
// Next
// ================================

nextBtn.addEventListener("click",()=>{

    if(isShuffle){

        currentSong =
        Math.floor(Math.random()*songs.length);

    }else{

        currentSong++;

        if(currentSong>=songs.length){

            currentSong=0;

        }

    }

    loadSong(currentSong);

    playSong();

});

// ================================
// Previous
// ================================

prevBtn.addEventListener("click",()=>{

    currentSong--;

    if(currentSong<0){

        currentSong=songs.length-1;

    }

    loadSong(currentSong);

    playSong();

});

// ================================
// Progress Bar
// ================================

audio.addEventListener("timeupdate",()=>{

    const percent =
    (audio.currentTime/audio.duration)*100;

    progress.value = percent || 0;

    currentTime.textContent =
    formatTime(audio.currentTime);

});

progress.addEventListener("input",()=>{

    audio.currentTime =
    (progress.value/100)*audio.duration;

});

// ================================
// Duration
// ================================

audio.addEventListener("loadedmetadata",()=>{

    duration.textContent =
    formatTime(audio.duration);

});

// ================================
// Format Time
// ================================

function formatTime(time){

    const min=Math.floor(time/60);

    const sec=Math.floor(time%60);

    return `${min}:${sec<10?"0":""}${sec}`;

}

// ================================
// Volume
// ================================

volume.addEventListener("input",()=>{

    audio.volume=volume.value;

});

// ================================
// Mute
// ================================

muteBtn.addEventListener("click",()=>{

    audio.muted=!audio.muted;

    if(audio.muted){

        muteBtn.className="fa-solid fa-volume-xmark";

    }else{

        muteBtn.className="fa-solid fa-volume-high";

    }

});

// ================================
// Playlist
// ================================

function updatePlaylist(){

    playlist.innerHTML="";

    songs.forEach((song,index)=>{

        const li=document.createElement("li");

        li.innerHTML=
        `🎵 ${song.title} - ${song.artist}`;

        if(index===currentSong){

            li.classList.add("active-song");

        }

        li.onclick=()=>{

            currentSong=index;

            loadSong(currentSong);

            playSong();

        };

        playlist.appendChild(li);

    });

}

// ================================
// Shuffle
// ================================

shuffleBtn.onclick=()=>{

    isShuffle=!isShuffle;

    shuffleBtn.style.background=
    isShuffle?"#FF4D6D":"#333";

};

// ================================
// Repeat
// ================================

repeatBtn.onclick=()=>{

    isRepeat=!isRepeat;

    repeatBtn.style.background=
    isRepeat?"#FF4D6D":"#333";

};

// ================================
// Favorite
// ================================

favoriteBtn.onclick=()=>{

    favoriteBtn.innerHTML=
    favoriteBtn.innerHTML.includes("regular")
    ?'<i class="fa-solid fa-heart"></i>'
    :'<i class="fa-regular fa-heart"></i>';

};

// ================================
// Auto Next
// ================================

audio.addEventListener("ended",()=>{

    if(isRepeat){

        playSong();

        return;

    }

    nextBtn.click();

});