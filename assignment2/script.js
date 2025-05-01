const glyphButtons = document.querySelectorAll(".glyph-button");
const glyphDisplay = document.querySelector("#glyph-display");
const playPauseButton = document.querySelector("#play-pause-button");
const playPauseImg = document.querySelector("#play-pause-img");
const progressBar = document.querySelector("#progress-bar");
const volumeSlider = document.querySelector("#volume-slider");
const verticalSliders = document.querySelectorAll(".vertical-slider");

const glyphSources = [
  "https://cdnb.artstation.com/p/assets/images/images/043/163/227/original/augustin-cart-gif-lofi-final.gif?1636484521",
  "https://media1.tenor.com/m/ZSRfK14Kek8AAAAd/lofi-vaporwave.gif",
  "https://i.gifer.com/PPy.gif",
];

let currentGlyphIndex = 0;
let isPlaying = false;
let animationFrameId;

function loadGlyph(index) {
  glyphDisplay.src = glyphSources[index];
  progressBar.style.width = "0%";
}

function playGlyph() {
  isPlaying = true;
  playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v1.png";
  animateProgressBar();
}

function pauseGlyph() {
  isPlaying = false;
  playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v2.png";
  cancelAnimationFrame(animationFrameId);
}

function togglePlay() {
  if (isPlaying) {
    pauseGlyph();
  } else {
    playGlyph();
  }
}

function animateProgressBar() {
  let width = parseFloat(progressBar.style.width) || 0;
  const increment = 0.1; // Adjust for speed
  if (width < 100 && isPlaying) {
    width += increment;
    progressBar.style.width = width + "%";
    animationFrameId = requestAnimationFrame(animateProgressBar);
  } else if (width >= 100) {
    pauseGlyph();
    progressBar.style.width = "0%"; // Reset after completion
  }
}

glyphButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    currentGlyphIndex = index;
    loadGlyph(currentGlyphIndex);
    pauseGlyph();
  });
});

playPauseButton.addEventListener("click", togglePlay);

volumeSlider.addEventListener("input", function () {
  // Still no direct effect on GIFs
  // console.log("Volume:", this.value);
});

verticalSliders.forEach((slider) => {
  slider.addEventListener("input", function () {
    // Basic logging for now - you'll likely want to connect these to some visual or functional aspect
    console.log("Vertical Slider Value:", this.value);
  });
});

// Load the initial glyph
loadGlyph(currentGlyphIndex);
