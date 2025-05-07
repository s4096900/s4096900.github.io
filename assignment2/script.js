// setting the initial dom elements
const glyphButtons = document.querySelectorAll(".glyph-button");
const glyphDisplay = document.querySelector("#glyph-display");
const playPauseButton = document.querySelector("#play-pause-button");
const playPauseImg = document.querySelector("#play-pause-img");
const progressBar = document.querySelector("#progress-bar");
const verticalSliders = document.querySelectorAll(".vertical-slider");
const volumeDisplays = document.querySelectorAll(".volume-display");

// controlls the audio tracks
const audio1 = document.querySelector("#audio-1");
const audio2 = document.querySelector("#audio-2");
const audio3 = document.querySelector("#audio-3");

const controllableAudios = [audio1, audio2, audio3].filter(
  (audio) => audio !== null
);

// sets up the audio
controllableAudios.forEach((audio, index) => {
  if (audio) {
    // makes it so that the audio is set to 50% like the visuals in the html
    audio.volume = 0.5;
    audio.preload = "auto";
    if (index > 0) {
      audio.loop = true;
    }
    // --- Optional Debugging: Verify initial volume ---
    // console.log(`Initial volume set for ${audio.id}: ${audio.volume}`);
  }
});
// soruces for the gifs(glyphs)
const glyphSources = [
  "https://cdnb.artstation.com/p/assets/images/images/043/163/227/original/augustin-cart-gif-lofi-final.gif?1636484521",
  "https://media1.tenor.com/m/ZSRfK14Kek8AAAAd/lofi-vaporwave.gif",
  "https://i.gifer.com/PPy.gif",
];
// set the start glyph
let currentGlyphIndex = 0;

// loadGlyph: Only changes the image source
function loadGlyph(index) {
  if (index >= 0 && index < glyphSources.length) {
    glyphDisplay.src = glyphSources[index];
  } else {
    console.error("Invalid glyph index:", index);
  }
}

function togglePlay() {
  if (audio1 && audio1.paused) {
    playGlyph();
  } else if (audio1) {
    pauseGlyph();
  }
}

// the play pause button code
function updatePlayPauseButton() {
  if (audio1 && audio1.paused) {
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v2.png";
    playPauseImg.alt = "Play";
  } else if (audio1) {
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v1.png";
    playPauseImg.alt = "Pause";
  }
}
// changes the gif
glyphButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    if (index >= 0 && index < glyphSources.length) {
      currentGlyphIndex = index;
      loadGlyph(currentGlyphIndex);
    } else {
      console.warn(`Glyph button clicked with out-of-bounds index: ${index}`);
    }
  });
});

playPauseButton.addEventListener("click", togglePlay);

//vertical slider code
verticalSliders.forEach((slider, index) => {
  if (index < 3) {
    slider.addEventListener("input", function () {
      const volume = this.value / 100;
      const currentValue = this.value;

      if (index === 0) {
        if (audio1) audio1.volume = volume;
        else console.warn("audio-1 not found");
        if (volumeDisplays[0])
          volumeDisplays[0].textContent = `${currentValue}%`;
        else console.warn("volumeDisplays[0] not found");
      } else if (index === 1) {
        if (audio2) audio2.volume = volume;
        else console.warn("audio-2 not found");
        if (volumeDisplays[1])
          volumeDisplays[1].textContent = `${currentValue}%`;
        else console.warn("volumeDisplays[1] not found");
      } else if (index === 2) {
        if (audio3) audio3.volume = volume;
        else console.warn("audio-3 not found");
        if (volumeDisplays[2])
          volumeDisplays[2].textContent = `${currentValue}%`;
        else console.warn("volumeDisplays[2] not found");
      }
    });
  } else {
    console.warn(`Slider at index ${index} found, but no mapping defined.`);
    slider.disabled = true;
  }
});

// allows for the sliders volume level to effect the displayed text
window.addEventListener("DOMContentLoaded", () => {
  verticalSliders.forEach((slider, index) => {
    let targetAudio = null;
    if (index === 0) targetAudio = audio1;
    else if (index === 1) targetAudio = audio2;
    else if (index === 2) targetAudio = audio3;

    if (targetAudio) {
      slider.value = targetAudio.volume * 100;
      if (volumeDisplays[index]) {
        volumeDisplays[index].textContent = `${slider.value}%`;
      }
    } else {
      slider.value = 0;
      slider.disabled = true;
      if (volumeDisplays[index]) {
        volumeDisplays[index].textContent = `N/A`;
      }
    }
  });
});

// progress bar
if (audio1) {
  audio1.addEventListener("play", updatePlayPauseButton);
  audio1.addEventListener("pause", updatePlayPauseButton);

  audio1.addEventListener("timeupdate", () => {
    if (audio1.duration && isFinite(audio1.duration)) {
      const progress = (audio1.currentTime / audio1.duration) * 100;
      progressBar.style.width = `${progress}%`;
    } else {
      progressBar.style.width = "0%";
    }
  });

  audio1.addEventListener("ended", () => {
    pauseGlyph();
    progressBar.style.width = "0%";
    audio1.currentTime = 0;
  });
}

function playGlyph() {
  console.log("Attempting to play all audio...");
  let playPromises = controllableAudios.map((audio) => {
    if (audio) {
      return audio.play().catch((error) => {
        const audioId =
          audio.id || `AudioAtIndex${controllableAudios.indexOf(audio)}`;
        console.error(`Playback failed for ${audioId}:`, error);
        return Promise.resolve();
      });
    }
    return Promise.resolve();
  });

  Promise.all(playPromises).then(() => {
    if (audio1 && audio1.paused) {
      updatePlayPauseButton();
    }
  });
}

// makes it so the play and pause button effects all audio
function pauseGlyph() {
  console.log("Attempting to pause all audio...");
  controllableAudios.forEach((audio) => {
    if (audio) {
      audio.pause();
    }
  });
  if (audio1) {
    updatePlayPauseButton();
  }
}

// spacebar controll for play and pause
document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    const targetTagName = event.target.tagName;
    if (targetTagName === "INPUT" || targetTagName === "BUTTON") {
      return;
    }

    // checks if the pop is open and wont work if it is
    const popup = document.getElementById("intro-popup");
    if (popup && popup.style.display !== "none") {
      event.preventDefault();
      return;
    }

    // stops the spacebars deafult function
    event.preventDefault();

    togglePlay();
  }
});

// Initial setup
loadGlyph(currentGlyphIndex);
if (audio1) {
  updatePlayPauseButton(); // Set initial button state based on audio1's default (paused)
}

// Function to close the popup
function closePopup() {
  document.getElementById("intro-popup").style.display = "none";
  document.getElementById("popup-backdrop").style.display = "none";
}

// Function to show the popup
function showPopup() {
  document.getElementById("intro-popup").style.display = "flex";
  document.getElementById("popup-backdrop").style.display = "block";
}

// show popup when page loads
window.addEventListener("load", function () {
  setTimeout(function () {
    showPopup();
  }, 500);
});
