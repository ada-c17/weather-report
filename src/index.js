// event: temp num color changes as temp changes
const tempNumColorSet = () => {
  let temperature = document.getElementById('tempNum');
  tempNum = parseInt(temperature.textContent);
  let Landscape = document.getElementById('img1');
  // crowAndSnow = Landscape.textContent;
  if (tempNum > 80) {
    temperature.style.color = 'red';
    Landscape.src = 'img/red.png';
  } else if (tempNum > 70) {
    temperature.style.color = 'orange';
    Landscape.src = 'img/orange.png';
  } else if (tempNum > 60) {
    temperature.style.color = 'gold';
    Landscape.src = 'img/gold.png';
  } else if (tempNum > 50) {
    temperature.style.color = 'green';
    Landscape.src = 'img/green.png';
  } else {
    temperature.style.color = 'teal';
    if (tempNum > 32) {
      Landscape.src = 'img/teal2.png';
    } else if (tempNum <= 32) {
      Landscape.src = 'img/teal1.png';
    }
  }
};

// event: increase temp num by clicking "up" button
const increaseTemp = () => {
  let temperature = document.getElementById('tempNum');
  tempNum = parseInt(temperature.textContent);
  temperature.textContent = tempNum + 1;
  tempNumColorSet();
};

// event:  decrease temp num by clicking "down" button
const decreaseTemp = () => {
  let temperature = document.getElementById('tempNum');
  tempNum = parseInt(temperature.textContent);
  temperature.textContent = tempNum - 1;
  tempNumColorSet();
};

const registerEventHandlers = () => {
  // register increase temp
  const increaseTempButton = document.getElementById('up');
  increaseTempButton.addEventListener('click', increaseTemp);
  // register decrease temp
  const decreaseTempButton = document.getElementById('down');
  decreaseTempButton.addEventListener('click', decreaseTemp);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
