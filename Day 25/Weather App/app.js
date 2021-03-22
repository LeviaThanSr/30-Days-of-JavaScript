const notification = document.querySelector(".notification");
const icon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature-value p");
const description = document.querySelector(".temperature-description p");
const currentLocation = document.querySelector(".location p");
const API_KEY = "4dfc5a4e302e8f9503ca1cb298dccb09";
const weather = {};
weather.temperature = {
  unit: "celsius",
};

// DisplayWeather
function displayWeather() {
  icon.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
  temperature.innerHTML = `${weather.temperature.value}° <span>C</span>`;
  description.innerHTML = weather.description;
  currentLocation.innerHTML = `${weather.city}, ${weather.country}`;
}

// Convert C to F
function HandleConversion(temp) {
  return (temp * 9) / 5 + 32;
}

// HandleConversion
function handleTempChange() {
  if (weather.temperature.value === undefined) return;
  if (weather.temperature.unit === "celsius") {
    let fahrenheitTemp = Math.floor(
      HandleConversion(weather.temperature.value)
    );
    temperature.innerHTML = `${fahrenheitTemp}° <span>F</span>`;
    weather.temperature.unit = "fahrenheit";
  } else {
    temperature.innerHTML = `${weather.temperature.value}° <span>C</span>`;
    weather.temperature.unit = "celsius";
  }
}

// Check & SetPosition
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notification.style.display = "block";
  notification.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  getWeather(latitude, longitude);
}

function showError(error) {
  notification.style.display = "block";
  notification.innerHTML = `<p> ${error.message} </p>`;
}

// Fetching API to get the data
function getWeather(latitude, longitude) {
  let API = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
  fetch(API)
    .then((response) => {
      let data = response.json();
      // console.log(data);
      return data;
    })
    .then((data) => {
      weather.temperature.value = Math.floor(data.main.temp - 273);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
    })
    .then(() => {
      displayWeather();
    });
}

temperature.addEventListener("click", handleTempChange);
