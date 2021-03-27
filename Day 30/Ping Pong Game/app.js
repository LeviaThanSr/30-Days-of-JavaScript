const canvas = document.querySelector(".pong");
const ctx = canvas.getContext("2d");

// Sound Effects
let hit = new Audio();
let wall = new Audio();
let userScore = new Audio();
let comScore = new Audio();

hit.src = "sounds/hit.mp3";
wall.src = "sounds/wall.mp3";
comScore.src = "sounds/comScore.mp3";
userScore.src = "sounds/userScore.mp3";

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
  velocityX: 5,
  velocityY: 5,
  speed: 7,
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

// Handle Paddle Movement
function getMousePosition(e) {
  let rect = canvas.getBoundingClientRect();
  user.y = e.clientY - rect.top - user.height / 2;
}

// Reset Ball
function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.velocityX = -ball.velocityX;
  ball.speed = 7;
}

// Collision Detection
function collision(b, p) {
  p.top = p.y;
  p.bottom = p.y + p.height;
  p.left = p.x;
  p.right = p.x + p.width;

  b.top = b.y - b.radius;
  b.bottom = b.y + b.radius;
  b.left = b.x - b.radius;
  b.right = b.x + b.radius;

  return (
    p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top
  );
}

// Handle Game Logic
function updateGame() {
  // Handle Score
  if (ball.x - ball.radius < 0) {
    com.score++;
    comScore.play();
    resetBall();
  } else if (ball.x + ball.radius > canvas.width) {
    user.score++;
    userScore.play();
    resetBall();
  }

  // Ball Velocity
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;

  // AI!
  com.y += (ball.y - (com.y + com.height / 2)) * 0.05;

  // Handle colliding with the wall
  if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
    ball.velocityY = -ball.velocityY;
    wall.play();
  }

  // Who's the player ?
  let player = ball.x + ball.radius < canvas.width / 2 ? user : com;

  // Ball.hitPaddle === true
  if (collision(ball, player)) {
    hit.play();
    // Where did the ball hit the paddle?
    let collidePoint = ball.y - (player.y + player.height / 2);
    // Normalize the value of collidePoint
    collidePoint = collidePoint / (player.height / 2);
    // Getting the right angle
    let angleRad = (Math.PI / 4) * collidePoint;

    // Change the X and Y velocity direction
    let direction = ball.x + ball.radius < canvas.width / 2 ? 1 : -1;
    ball.velocityX = direction * ball.speed * Math.cos(angleRad);
    ball.velocityY = ball.speed * Math.sin(angleRad);

    // Need for Speed!
    ball.speed += 0.1;
  }
}

// Render Game Components
function renderGame() {
  drawRectangle(0, 0, canvas.width, canvas.height, "#000");
  drawRectangle(user.x, user.y, user.width, user.height, user.color);
  drawScore(user.score, canvas.width / 4, canvas.height / 5);
  drawNet();
  drawBall(ball.x, ball.y, ball.radius, ball.color);
  drawRectangle(com.x, com.y, com.width, com.height, com.color);
  drawScore(com.score, (canvas.width / 4) * 3, canvas.height / 5);
}

// Enjoy!
function fullGame() {
  updateGame();
  renderGame();
}

let framePerSecond = 60;
setInterval(fullGame, 1000 / framePerSecond);
canvas.addEventListener("mousemove", getMousePosition);
