async function getWeather(location, key) {
  const weather = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${key}`
  );
  const data = await weather.json();
  return data;
}

function parseWeather(data) {
  const obj = {
    address: data.address,
    temp: data.currentConditions.temp,
    conditions: data.currentConditions.conditions,
    feelslike: data.currentConditions.feelslike,
    tempmax: data.days[0].tempmax,
    tempmin: data.days[0].tempmin,
  };

  return obj;
}

export { getWeather, parseWeather };
