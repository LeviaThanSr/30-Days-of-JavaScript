const input = document.querySelector(".input");
const costInput = document.querySelector(".cost");
const serviceInput = document.querySelector(".service");
const peopleInput = document.querySelector(".people");
const calcBtn = document.querySelector("#calc-btn");
const tip = document.querySelector(".tip-wrap .tip");

function calculateTip(e) {
  if (e.keyCode === 13 || e.type === "click") {
    const cost = Number(costInput.value);
    const service = Number(serviceInput.value) / 100;
    const people = Number(peopleInput.value);

    let result = (cost * service) / people;
    tip.innerHTML = `<i class="fas fa-dollar-sign"></i> ${result.toFixed(2)} ${
      people > 1 ? "each" : ""
    }`;
  }
}

function preventDefault(e) {
  // console.log(e.which);
  if ((e.which != 8 && e.which != 0 && e.which < 48) || e.which > 57) {
    e.preventDefault();
  }
}

input.addEventListener("keypress", preventDefault);
calcBtn.addEventListener("click", calculateTip);
document.addEventListener("keyup", calculateTip);
