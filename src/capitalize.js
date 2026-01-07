function capitalize(str) {
  str = str.toLowerCase();
  return str.replace(/\b(\w)/g, (match, capture) => {
    return capture.toUpperCase();
  });
}

export { capitalize };
