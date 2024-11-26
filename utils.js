function generateRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

function celciusToFahrenheit(celcius) {
  return (celcius * 9) / 5 + 32;
}

module.exports = {
  generateRandomNumber,
  celciusToFahrenheit,
};

// if there is a one function
// module.exports = generateRandomNumber;
