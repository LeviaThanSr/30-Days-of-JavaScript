for (let i = 0; i < 200; i++) {
  const boxContainer = document.querySelector(".container");
  const box = document.createElement("div");
  box.classList.add("box");
  boxContainer.appendChild(box);
}

const refreshBtn = document.querySelector(".btn");
const randomColorBlock = document.querySelectorAll(".box");
const alertBox = document.querySelector(".alert");

function randomColor() {
  let chars = "0123456789abcdef";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += chars[Math.floor(Math.random() * 16)];
  }
  return color;
}

function generateColorPalette() {
  randomColorBlock.forEach((block) => {
    let newColor = randomColor();
    block.style.backgroundColor = newColor;
    block.innerHTML = newColor;
  });
}

function copyColor() {
  let textToCopy = this.innerText;
  let InputElement = document.createElement("input");
  InputElement.type = "text";
  InputElement.value = textToCopy;
  document.body.appendChild(InputElement);
  InputElement.select();
  document.execCommand("Copy");
  document.body.removeChild(InputElement);

  alertBox.innerHTML = `${this.innerText} <br> Copied!`;
  alertBox.style.backgroundColor = this.innerText;
  alertBox.classList.add("active");
  setTimeout(() => {
    alertBox.classList.remove("active");
  }, 1500);
}

generateColorPalette();
refreshBtn.addEventListener("click", generateColorPalette);
randomColorBlock.forEach((block) => {
  block.addEventListener("click", copyColor);
});
