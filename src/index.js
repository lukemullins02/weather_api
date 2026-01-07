import "./styles.css";
import { getWeather, parseWeather } from "./api";
import { format, parseISO } from "date-fns";

const form = document.querySelector("form");
const body = document.querySelector("body");
const input = document.querySelector("input");
const fahrenheit = document.querySelector(".fahrenheit");
const celsius = document.querySelector(".celsius");

let locationObj;
let celsiusObj;
let farenheitObj;
let arr = [];

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
  newObj.celsius = true;

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
  arr = [];
  const data = await getWeather(location, key);
  locationObj = parseWeather(data, arr);
  locationObj["celsius"] = false;

  farenheitObj = locationObj;
  celsiusObj = toCelsius(locationObj);

  deleteWeather();
  displayWeather();
}

function displayWeather() {
  fahrenheit.classList.remove("invisible");
  celsius.classList.remove("invisible");

  const weather_container = document.createElement("div");
  const card = document.createElement("div");
  const location_name = document.createElement("p");
  const temp = document.createElement("p");
  const conditions = document.createElement("p");
  const feelsLike = document.createElement("p");
  const maxMin = document.createElement("div");
  const tempMax = document.createElement("p");
  const tempMin = document.createElement("p");

  weather_container.classList.add("weather-container");
  maxMin.classList.add("max-min");
  card.classList.add("card");

  const address = capitalize(locationObj.address);

  location_name.textContent = address;
  temp.textContent = Math.round(locationObj.temp) + "°";
  conditions.textContent = locationObj.conditions;
  feelsLike.textContent =
    "Feels Like: " + Math.round(locationObj.feelslike) + "°";
  tempMax.textContent = "L: " + Math.round(locationObj.tempmax) + "°";
  tempMin.textContent = "H: " + Math.round(locationObj.tempmin) + "°";

  card.appendChild(location_name);
  card.appendChild(temp);
  card.appendChild(conditions);
  card.appendChild(feelsLike);
  maxMin.appendChild(tempMax);
  maxMin.appendChild(tempMin);
  card.appendChild(maxMin);
  weather_container.appendChild(card);

  const seven_container = document.createElement("div");
  seven_container.classList.add("seven-container");

  arr.forEach((item) => {
    const eachDay = document.createElement("div");
    const nextDate = document.createElement("p");
    const nextMaxMin = document.createElement("p");
    const nextConditions = document.createElement("p");

    eachDay.classList.add("each-day");

    nextDate.textContent = format(parseISO(item.datetime), "MM/dd/yyyy");
    if (locationObj.celsius === false) {
      nextMaxMin.textContent = `${item.tempmax}°/ ${item.tempmin}°`;
    } else {
      nextMaxMin.textContent = `${Math.round(
        (item.tempmax - 32) * (5 / 9)
      )}°/ ${Math.round((item.tempmin - 32) * (5 / 9))}°`;
    }
    nextConditions.textContent = item.conditions;

    eachDay.appendChild(nextDate);
    eachDay.appendChild(nextMaxMin);
    eachDay.appendChild(nextConditions);
    seven_container.appendChild(eachDay);
    weather_container.appendChild(seven_container);
  });
  body.appendChild(weather_container);
}

function deleteWeather() {
  const weather_container = document.querySelector(".weather-container");
  if (!weather_container) {
    return console.log("No container");
  }

  weather_container.remove();
}
