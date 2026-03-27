const video = document.querySelector(".viewer");
const toggle = document.querySelector(".toggle");
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress__filled");
const ranges = document.querySelectorAll('input[type="range"]');
const skipButtons = document.querySelectorAll("[data-skip]");

function togglePlay() {
  video.paused ? video.play() : video.pause();
}

function updateButton() {
  toggle.textContent = video.paused ? "►" : "❚ ❚";
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = percent + "%";
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);

ranges.forEach(input => input.addEventListener("input", handleRangeUpdate));

skipButtons.forEach(button => button.addEventListener("click", skip));

let mousedown = false;

progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => mousedown = true);
progress.addEventListener("mouseup", () => mousedown = false);