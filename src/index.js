import "./styles.css";
import { getWeather } from "./api";

const form = document.querySelector("form");
const body = document.querySelector("body");
const input = document.querySelector("input");
const API_KEY = "W69WXACXK2JNKFFHHZ9ADANRU";
let locationObj;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newLocation = new FormData(form);
  input.value = "";
  const location = newLocation.get("title");
  getData(location, API_KEY);
});

async function getData(location = "london", key) {
  locationObj = await getWeather(location, key);
  console.log(locationObj);
  deleteWeather();
  buildWeather();
}

function buildWeather() {
  const weather_container = document.createElement("div");
  weather_container.classList.add("weather-container");
  const location_name = document.createElement("p");
  location_name.textContent = locationObj.address;
  weather_container.appendChild(location_name);
  body.appendChild(weather_container);
}

function deleteWeather() {
  const weather_container = document.querySelector(".weather-container");
  if (!weather_container) {
    return console.log("No container");
  }

  weather_container.remove();
}
