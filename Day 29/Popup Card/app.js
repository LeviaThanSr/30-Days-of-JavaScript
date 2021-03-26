const container = document.querySelector(".container");
const buttons = document.querySelectorAll(".btn");
const popup = document.querySelector(".popup");

function togglePopup(e) {
  container.classList.toggle("blur");
  popup.classList.toggle("active");
  console.log(e);
}

buttons.forEach((button) => {
  button.addEventListener("click", togglePopup);
});
