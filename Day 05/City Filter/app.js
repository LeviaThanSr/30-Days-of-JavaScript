const cities = [];
const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("change", displayCity);
searchInput.addEventListener("keyup", displayCity);

fetch("./Moroccan Cities.json")
  .then((blob) => blob.json())
  .then((data) => cities.push(...data));

function MatchWord(wordToFind, cities) {
  return cities.filter((cityName) => {
    const regex = new RegExp(wordToFind, "gi");
    return cityName.city.match(regex);
  });
}

function numberWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayCity() {
  const findCity = MatchWord(this.value, cities);
  const cityList = findCity
    .map((city) => {
      const regex = new RegExp(this.value, "gi");
      const CityName = city.city.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      return `<li>
    <span class="name">${CityName}</span>
    <span class="population">${numberWithCommas(city.population)}</span></li>`;
    })
    .join("");
  suggestions.innerHTML = cityList;
}
