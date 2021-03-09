const slider = document.querySelector(".items");
let isDown = false;
let startX;
let scrollLeft;

function mouseDown(e) {
  isDown = true;
  slider.classList.add("active");
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
}

function mouseMove(e) {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 2;
  slider.scrollLeft = scrollLeft - walk;
}

function mouseUp() {
  isDown = false;
  slider.classList.remove("active");
}

function mouseLeave() {
  isDown = false;
  slider.classList.remove("active");
}

slider.addEventListener("mousedown", mouseDown);
slider.addEventListener("mousemove", mouseMove);
slider.addEventListener("mouseup", mouseUp);
slider.addEventListener("mouseleave", mouseLeave);
