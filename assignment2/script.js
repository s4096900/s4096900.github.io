const glyph1 = document.querySelector("#glyph1");
const glyph2 = document.querySelector("#glyph2");
const glyph3 = document.querySelector("#glyph3");
const glyphImages = document.querySelectorAll(".glyph-image");
const progressBar = document.querySelector("#progress-bar");
const playPauseButton = document.querySelector("#play-pause-button");
const playPauseImg = document.querySelector("#play-pause-img");
const glyph1Button = document.querySelector("#glyph1-button");
const glyph2Button = document.querySelector("#glyph2-button");
const glyph3Button = document.querySelector("#glyph3-button");
const fullscreenButton = document.querySelector("#fullscreen-button");
const volumeSlider = document.querySelector("#volume-slider");

glyph1Button.addEventListener("click", function () {
  showGlyph(0);
});

glyph2Button.addEventListener("click", function () {
  showGlyph(1);
});

glyph3Button.addEventListener("click", function () {
  showGlyph(2);
});

// Modified function to show the selected glyph
function showGlyph(index) {
  glyphImages.forEach((img) => (img.style.display = "none")); // Hide all images
  glyphImages[index].style.display = "block"; // Show the selected image
}
