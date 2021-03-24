const carousel = document.querySelector(".carousel");
const nextButton = document.querySelector(".right-btn");
const previousButton = document.querySelector(".left-btn");
const nav = document.querySelector(".nav");
const dots = [...nav.children];
const slides = [...carousel.children];
let slideWidth = slides[0].getBoundingClientRect().width;

function positionSlides(slides) {
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.left = slideWidth * i + "px";
  }
}
positionSlides(slides);

function handlePrevBtn() {
  const currentSlide = carousel.querySelector(".active");
  const previousSlide = currentSlide.previousElementSibling;

  moveToSlide(carousel, currentSlide, previousSlide);
  hideButton(previousSlide, slides);
  moveToDot(previousSlide, slides, nav, dots);
}

function handleNextBtn() {
  const currentSlide = carousel.querySelector(".active");
  const nextSlide = currentSlide.nextElementSibling;

  moveToSlide(carousel, currentSlide, nextSlide);
  hideButton(nextSlide, slides);
  moveToDot(nextSlide, slides, nav, dots);
}

function handleNavDots(e) {
  if (e.target === nav) return;
  const targetDot = e.target;
  const currentDot = nav.querySelector(".active");
  const currentSlide = carousel.querySelector(".active");
  let targetDotIndex = findIndex(targetDot, dots);
  const targetSlide = slides[targetDotIndex];

  moveToSlide(carousel, currentSlide, targetSlide);
  toggleActive(currentDot, targetDot);
  hideButton(targetSlide, slides);
}

function moveToDot(targetSlide, slides, nav, dots) {
  let slideIndex = findIndex(targetSlide, slides);
  const currentDot = nav.querySelector(".active");
  const targetDot = dots[slideIndex];

  toggleActive(currentDot, targetDot);
}

function moveToSlide(carousel, currentSlide, targetSlide) {
  const position = targetSlide.style.left;

  carousel.style.transform = `translateX(-${position})`;
  toggleActive(currentSlide, targetSlide);
}

function toggleActive(current, target) {
  current.classList.remove("active");
  target.classList.add("active");
}

function hideButton(targetSlide, slides) {
  if (targetSlide === slides[0]) {
    previousButton.classList.add("hide");
    nextButton.classList.remove("hide");
  } else if (targetSlide === slides[slides.length - 1]) {
    nextButton.classList.add("hide");
    previousButton.classList.remove("hide");
  } else {
    previousButton.classList.remove("hide");
    nextButton.classList.remove("hide");
  }
}

function findIndex(item, items) {
  for (let i = 0; i < items.length; i++) {
    if (item === items[i]) {
      return i;
    }
  }
}

previousButton.addEventListener("click", handlePrevBtn);
nextButton.addEventListener("click", handleNextBtn);
nav.addEventListener("click", handleNavDots);
