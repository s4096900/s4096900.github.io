const glyphButtons = document.querySelectorAll(".glyph-button");
const glyphDisplay = document.querySelector("#glyph-display");
const playPauseButton = document.querySelector("#play-pause-button");
const playPauseImg = document.querySelector("#play-pause-img");
const progressBar = document.querySelector("#progress-bar");
const verticalSliders = document.querySelectorAll(".vertical-slider");

// Primary audio element (now plays one persistent track)
const mediaAudio = document.querySelector("#media-audio");

// *** NEW: Set the single audio source for the main player ***
mediaAudio.src =
  "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/erokia_ambient-wave-56-msfxp7-78.mp3"; // Using the first track as the persistent one

// Background audio elements (controlled by sliders)
// *** NOTE: Still needs adjustment to match HTML elements and sliders ***
const backgroundAudios = [
  new Audio(""), // Placeholder: background1.mp3
  new Audio(""), // Placeholder: background2.mp3
];

// Configure background audio defaults
backgroundAudios.forEach((audio) => {
  audio.loop = true;
  audio.volume = 0;
  audio.play().catch((e) => {
    console.warn("Autoplay blocked until user interacts.");
  });
});

const glyphSources = [
  "https://cdnb.artstation.com/p/assets/images/images/043/163/227/original/augustin-cart-gif-lofi-final.gif?1636484521",
  "https://media1.tenor.com/m/ZSRfK14Kek8AAAAd/lofi-vaporwave.gif",
  "https://i.gifer.com/PPy.gif",
];

// *** REMOVED audioSources array as it's no longer used for mediaAudio ***
// const audioSources = [
//   "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/erokia_ambient-wave-56-msfxp7-78.mp3",
//   "https://cdn.freesound.org/previews/621/621181_12574855-hq.mp3",
//   "https://cdn.freesound.org/previews/629/629168_12574855-lq.mp3",
// ];

let currentGlyphIndex = 0;

// Set default volume for mediaAudio
mediaAudio.volume = 0.5; // Starting at 50% volume

// *** UPDATED loadGlyph: Only changes the image source ***
function loadGlyph(index) {
  // Update visual without stopping audio
  glyphDisplay.src = glyphSources[index];
  // No longer changing audio source or resetting progress bar here
}

function togglePlay() {
  if (mediaAudio.paused) {
    playGlyph();
  } else {
    pauseGlyph();
  }
}

function updatePlayPauseButton() {
  if (mediaAudio.paused) {
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v2.png";
    playPauseImg.alt = "Play";
  } else {
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v1.png";
    playPauseImg.alt = "Pause";
  }
}

glyphButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    currentGlyphIndex = index;
    loadGlyph(currentGlyphIndex); // Only loads the image now
  });
});

playPauseButton.addEventListener("click", togglePlay);

// Modified event listeners for vertical sliders
verticalSliders.forEach((slider, index) => {
  slider.addEventListener("input", function () {
    const volume = this.value / 100;

    // First slider controls mediaAudio volume
    if (index === 0) {
      mediaAudio.volume = volume;
    }
    // Other sliders control background audio volumes
    // *** NOTE: This part still assumes only 2 background audios ***
    else if (backgroundAudios[index - 1]) {
      backgroundAudios[index - 1].volume = volume;
    }
  });
});

// Initialize slider positions based on default volumes
window.addEventListener("DOMContentLoaded", () => {
  // Set first slider to match mediaAudio default volume
  if (verticalSliders[0]) {
    verticalSliders[0].value = mediaAudio.volume * 100;
  }

  // Set other sliders to 0 (matching background audio defaults)
  for (let i = 1; i < verticalSliders.length; i++) {
    if (verticalSliders[i]) {
      verticalSliders[i].value = 0; // Assuming background starts at 0
    }
  }
});

mediaAudio.addEventListener("play", updatePlayPauseButton);
mediaAudio.addEventListener("pause", updatePlayPauseButton);

mediaAudio.addEventListener("timeupdate", () => {
  // Ensure duration is a valid number before calculating progress
  if (mediaAudio.duration && isFinite(mediaAudio.duration)) {
    const progress = (mediaAudio.currentTime / mediaAudio.duration) * 100;
    progressBar.style.width = progress + "%";
  } else {
    progressBar.style.width = "0%"; // Handle cases where duration isn't available yet
  }
});

mediaAudio.addEventListener("ended", () => {
  // When the persistent track ends, reset to beginning and pause
  pauseGlyph(); // Update button to 'Play'
  progressBar.style.width = "0%";
  mediaAudio.currentTime = 0;
});

function playGlyph() {
  // Attempt to play and catch any errors (like user needing to interact first)
  mediaAudio.play().catch((error) => {
    console.error("Playback failed:", error);
    // You might want to update UI to indicate playback failed or requires interaction
  });
}

function pauseGlyph() {
  mediaAudio.pause();
}

// Initial setup
loadGlyph(currentGlyphIndex); // Load initial image
updatePlayPauseButton(); // Set initial button state
// No need to call loadGlyph specifically for audio anymore as src is set directly
