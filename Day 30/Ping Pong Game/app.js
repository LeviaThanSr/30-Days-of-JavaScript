const canvas = document.querySelector(".pong");
const ctx = canvas.getContext("2d");

// User Paddle
const user = {
  x: 0,
  y: (canvas.height - 100) / 2,
  width: 10,
  height: 100,
  score: 0,
  color: "white",
};

// Com Paddle
const com = {
  x: canvas.width - 10,
  y: (canvas.height - 100) / 2,
  width: 10,
  height: 100,
  score: 0,
  color: "white",
};

// Net
const net = {
  x: (canvas.width - 3) / 2,
  y: 0,
  height: 10,
  width: 3,
  color: "white",
};

// Ball object
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  color: "white",
};

// Draw Rectangle
function drawRectangle(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

// Draw Circle
function drawBall(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
}

// Draw Net
function drawNet() {
  for (let i = 0; i <= canvas.height; i += 15) {
    drawRectangle(net.x, net.y + i, net.width, net.height, net.color);
  }
}

// Draw Text
function drawScore(score, x, y) {
  ctx.fillStyle = "#fff";
  ctx.font = "70px Poppins";
  ctx.textAlign = "center";
  ctx.fillText(score, x, y);
}

function renderGame() {
  drawRectangle(0, 0, canvas.width, canvas.height, "#000");
  drawRectangle(user.x, user.y, user.width, user.height, user.color);
  drawScore(user.score, canvas.width / 4, canvas.height / 5);
  drawNet();
  drawBall(ball.x, ball.y, ball.radius, ball.color);
  drawRectangle(com.x, com.y, com.width, com.height, com.color);
  drawScore(com.score, (canvas.width / 4) * 3, canvas.height / 5);
}

function fullGame() {
  renderGame();
}

let framePerSecond = 60;
setInterval(fullGame, 1000 / framePerSecond);
