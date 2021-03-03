const canvas = document.querySelector("#draw");
const ctx = canvas.getContext("2d");
const brushWidthSlider = document.getElementById("brushWidthSlider");
const bushColorPicker = document.getElementById("color");
const backgroundColor = document.getElementById("background");
const resetBtn = document.getElementById("reset");

canvas.width = innerWidth;
canvas.height = innerHeight;

ctx.lineWidth = brushWidthSlider.value;
ctx.strokeStyle = bushColorPicker.value;
ctx.lineJoin = "round";
ctx.lineCap = "round";

let isDrawing = false;
let lastX = 0;
let lastY = 0;

function changeColor() {
  document.documentElement.style.setProperty("--background", this.value);
}

function Draw(e) {
  if (!isDrawing) return;
  ctx.strokeStyle = bushColorPicker.value;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
}

backgroundColor.addEventListener("change", changeColor);

brushWidthSlider.addEventListener("change", () => {
  ctx.lineWidth = brushWidthSlider.value;
});

bushColorPicker.addEventListener("change", () => {
  ctx.strokeStyle = bushColorPicker.value;
});

resetBtn.addEventListener("click", () => {
  document.documentElement.style.setProperty("--background", this.value);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener("mousemove", Draw);
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));
