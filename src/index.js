import "./styles.css";
import { getWeather, parseWeather } from "./api";

const form = document.querySelector("form");
const body = document.querySelector("body");
const input = document.querySelector("input");
const fahrenheit = document.querySelector(".fahrenheit");
const celsius = document.querySelector(".celsius");

let locationObj;
let celsiusObj;
let farenheitObj;

const API_KEY = "W69WXACXK2JNKFFHHZ9ADANRU";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newLocation = new FormData(form);
  input.value = "";
  const location = newLocation.get("title");
  getData(location, API_KEY);
});

function toCelsius(obj) {
  let newObj;
  newObj = { ...obj };
  newObj.temp = Math.round((obj.temp - 32) * (5 / 9));
  newObj.feelslike = Math.round((obj.feelslike - 32) * (5 / 9));
  newObj.tempmin = Math.round((obj.tempmin - 32) * (5 / 9));
  newObj.tempmax = Math.round((obj.tempmax - 32) * (5 / 9));

  return newObj;
}

function capitalize(str) {
  str = str.toLowerCase();
  return str.replace(/\b(\w)/g, (match, capture) => {
    return capture.toUpperCase();
  });
}

celsius.addEventListener("click", () => {
  locationObj = { ...celsiusObj };
  deleteWeather();
  displayWeather();
});

fahrenheit.addEventListener("click", () => {
  locationObj = { ...farenheitObj };
  deleteWeather();
  displayWeather();
});

async function getData(location = "london", key) {
  const data = await getWeather(location, key);
  locationObj = parseWeather(data);
  farenheitObj = locationObj;
  celsiusObj = toCelsius(locationObj);

  deleteWeather();
  displayWeather();
}

function displayWeather() {
  const weather_container = document.createElement("div");
  const location_name = document.createElement("p");
  const temp = document.createElement("p");
  const conditions = document.createElement("p");
  const feelsLike = document.createElement("p");
  const maxMin = document.createElement("div");
  const tempMax = document.createElement("p");
  const tempMin = document.createElement("p");

  weather_container.classList.add("weather-container");
  maxMin.classList.add("max-min");

  const address = capitalize(locationObj.address);

  location_name.textContent = address;
  temp.textContent = Math.round(locationObj.temp) + "°";
  conditions.textContent = locationObj.conditions;
  feelsLike.textContent =
    "Feels Like: " + Math.round(locationObj.feelslike) + "°";
  tempMax.textContent = "L:" + Math.round(locationObj.tempmax) + "°";
  tempMin.textContent = "H:" + Math.round(locationObj.tempmin) + "°";

  weather_container.appendChild(location_name);
  weather_container.appendChild(temp);
  weather_container.appendChild(conditions);
  weather_container.appendChild(feelsLike);
  maxMin.appendChild(tempMax);
  maxMin.appendChild(tempMin);
  weather_container.appendChild(maxMin);

  body.appendChild(weather_container);
}

function deleteWeather() {
  const weather_container = document.querySelector(".weather-container");
  if (!weather_container) {
    return console.log("No container");
  }

  weather_container.remove();
}
