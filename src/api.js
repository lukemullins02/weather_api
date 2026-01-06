async function getWeather(location, key) {
  const weather = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${key}`
  );
  const data = await weather.json();
  return data;
}

export { getWeather };
