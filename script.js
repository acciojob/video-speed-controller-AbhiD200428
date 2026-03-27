const video = document.querySelector(".viewer");
const toggle = document.querySelector(".toggle");
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress__filled");
const ranges = document.querySelectorAll('input[type="range"]');
const skipButtons = document.querySelectorAll("[data-skip]");

// Play / Pause
function togglePlay() {
  video.paused ? video.play() : video.pause();
}

// Update button icon
function updateButton() {
  toggle.textContent = video.paused ? "►" : "❚ ❚";
}

// Progress bar update
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = percent + "%";
}

// Scrub
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Volume & Speed
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// Skip
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Events
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);

ranges.forEach(r => r.addEventListener("input", handleRangeUpdate));

skipButtons.forEach(btn => btn.addEventListener("click", skip));

// Progress click
let mousedown = false;

progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", e => mousedown && scrub(e));
progress.addEventListener("mousedown", () => mousedown = true);
progress.addEventListener("mouseup", () => mousedown = false);