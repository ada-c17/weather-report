const temperatureColor = (temperature) => {
  if (temperature >= 80) {
    return 'red';
  } else if (temperature >= 70) {
    return 'orange';
  } else if (temperature >= 60) {
    return 'yellow';
  } else if (temperature >= 50) {
    return 'green';
  } else {
    return 'teal;';
  }
};

const temperatureArt = (temperature) => {
  if (temperature >= 80) {
    return '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temperature >= 70) {
    return '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temperature >= 60) {
    return '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else {
    return '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};

const setTemperature = (temperature) => {
  document.getElementById('temperature-reading').innerText = temperature;
  document.getElementById('temperature-reading').style.color =
    temperatureColor(temperature);
  document.getElementById('temperature-garden').innerText =
    temperatureArt(temperature);
};

document.addEventListener('DOMContentLoaded', () => {
  let temperature = 70;
  setTemperature(temperature);

  document.getElementById('temperature-up').addEventListener('click', () => {
    temperature += 1;
    setTemperature(temperature);
  });

  document.getElementById('temperature-down').addEventListener('click', () => {
    temperature -= 1;
    setTemperature(temperature);
  });
});
