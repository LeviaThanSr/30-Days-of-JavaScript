const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const fullScreen = player.querySelector(".expand");
const ranges = player.querySelectorAll(".player__slider");
const volumeCtr = player.querySelector(".volume");

function togglePlay() {
  video[video.paused ? "play" : "pause"]();
}

function updateButton() {
  toggle.innerHTML = this.paused
    ? '<i class="fas fa-play"></i>'
    : '<i class="fas fa-pause"></i>';
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleFullScreen() {
  player.classList.toggle("fullscreen");
  const checkIcon = player.classList.value.includes("fullscreen");
  fullScreen.innerHTML = checkIcon
    ? '<i class="fas fa-compress"></i>'
    : '<i class="fas fa-expand"></i>';
}

function handleRange() {
  video[this.name] = this.value;
  if (video.volume === 0) {
    volumeCtr.innerHTML = `<i class="fas fa-volume-mute"></i>`;
  } else {
    volumeCtr.innerHTML = `<i class="fas fa-volume-up"></i>`;
  }
}

function handleProgress() {
  const value = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${value}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  console.log(e);
  video.currentTime = scrubTime;
}

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);
skipButtons.forEach((button) => button.addEventListener("click", skip));
fullScreen.addEventListener("click", handleFullScreen);

ranges.forEach((range) => range.addEventListener("change", handleRange));
ranges.forEach((range) => range.addEventListener("mousemove", handleRange));

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
