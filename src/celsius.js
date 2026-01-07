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

function numToCelsius(num) {
  const result = Math.round((num - 32) * (5 / 9));

  return result;
}

export { toCelsius, numToCelsius };
