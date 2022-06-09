//////////////temperature section/////////////////

// Select temperature
const totalCount = document.getElementById('total-count');

// Variable to track temperature
var count = 0;

// Display initial value
totalCount.innerHTML = count;

// Function to increment temperature
const handleIncrement = () => {
  count++;
  totalCount.innerHTML = count;
};
// Function to decrement temp
const handleDecrement = () => {
  count--;
  totalCount.innerHTML = count;
};
// Select increment and decrement buttons
const incrementCount = document.getElementById('increment-count');
const decrementCount = document.getElementById('decrement-count');

// Add click event to buttons
incrementCount.addEventListener('click', handleIncrement);
decrementCount.addEventListener('click', handleDecrement);
