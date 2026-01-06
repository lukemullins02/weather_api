import "./styles.css";

const API_KEY = "W69WXACXK2JNKFFHHZ9ADANRU";

async function getWeather(location) {
  const weather = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEY}`
  );
  const data = await weather.json();
  console.log(data);
}

getWeather("london");
