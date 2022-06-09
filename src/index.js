//////////////temperature section/////////////////

// Select temperature
const currentTemp = document.getElementById('total-count');

// Variable to track temperature
var temperature = 0;

// Display initial value
currentTemp.innerHTML = temperature;

// Function to increment temperature
const handleTempIncrement = () => {
  temperature++;
  currentTemp.innerHTML = temperature;
};
// Function to decrement temp
const handleTempDecrement = () => {
  temperature--;
  currentTemp.innerHTML = temperature;
};
// Select increment and decrement buttons
const incrementTemp = document.getElementById('increment-count');
const decrementTemp = document.getElementById('decrement-count');

// Add click event to buttons
incrementTemp.addEventListener('click', handleTempIncrement);
decrementTemp.addEventListener('click', handleTempDecrement);
