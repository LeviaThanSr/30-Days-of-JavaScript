setInterval(setClock, 1000);

const hourHand = document.querySelector("[data-hour]");
const minuteHand = document.querySelector("[data-minute]");
const secondHand = document.querySelector("[data-second]");

function setClock() {
  const currentDate = new Date();
  const seconds = currentDate.getSeconds() / 60;
  const minutes = (seconds + currentDate.getMinutes()) / 60;
  const hours = (minutes + currentDate.getHours()) / 12;

  setRotation(secondHand, seconds);
  setRotation(minuteHand, minutes);
  setRotation(hourHand, hours);
}

function setRotation(e, rotationRatio) {
  e.style.setProperty("--rotation", rotationRatio * 360);
}

setClock();
