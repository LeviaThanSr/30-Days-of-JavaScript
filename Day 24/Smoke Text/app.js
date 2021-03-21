const text = document.querySelector(".text");
text.innerHTML = text.textContent.replace(/\S/g, "<span>$&</span>");

const letters = document.querySelectorAll(".text span");

for (let i = 0; i < letters.length; i++) {
  letters[i].addEventListener("mouseover", smokeEffect);
}

function smokeEffect() {
  this.classList.add("active");
}
