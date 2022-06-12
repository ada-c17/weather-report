class Helper {
  static getSelectedSky() {
    const backgrounds = [
      './assets/blueSky.jpg',
      './assets/sunny.jpg',
      './assets/cloudySky.jpg',
      './assets/rainyGrass.jpg',
      './assets/snowy.jpg',
      './assets/windy.jpg',
    ];
    const dropBar = document.querySelector('#sky-selector');
    const sky = dropBar.options[dropBar.selectedIndex].text;
    let background;
    switch (true) {
      default:
        background = backgrounds[0];
        break;
      case sky === 'Sunny':
        background = backgrounds[1];
        break;
      case sky === 'Cloudy':
        background = backgrounds[2];
        break;
      case sky === 'Rainy':
        background = backgrounds[3];
        break;
      case sky === 'Snowy':
        background = backgrounds[4];
        break;
      case sky === 'Windy':
        background = backgrounds[5];
    }
    return background;
  }

  static getEffectByTempValue(tempValue, effects) {
    let effect;
    switch (true) {
      case tempValue <= 59:
        effect = effects[0];
        break;
      case tempValue <= 69:
        effect = effects[1];
        break;
      case tempValue <= 79:
        effect = effects[2];
        break;
      default:
        effect = effects[3];
    }
    return effect;
  }

  static getTempEffect(tempValue) {
    const colors = ['#2364aa', '#20a39e', '#ea7317', '#da5552'];
    const landscapes = [
      './assets/winter.jpg',
      './assets/fall.jpg',
      './assets/spring.jpg',
      './assets/summer.jpg',
    ];
    const color = this.getEffectByTempValue(tempValue, colors);
    const img = this.getEffectByTempValue(tempValue, landscapes);
    return { color: color, img: img };
  }

  static changeCityName(city = 'Seattle') {
    const cityName = document.querySelector('#temp-display h1');
    // Capitalize the first letter of city name
    cityName.innerText = city[0].toUpperCase() + city.slice(1);
  }

  static convertTempKtoF(tempK) {
    return Math.round(1.8 * (tempK - 273) + 32);
  }

  // API call with async function
  static getLocation = async (city) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/location?q=${city}`
      );
      const lat = response.data[0].lat;
      const lon = response.data[0].lon;
      return [lat, lon];
    } catch (e) {
      console.log('getLocation Error!');
      console.log(e);
    }
  };

  static getWeather = async (city) => {
    try {
      const location = await this.getLocation(city);
      const response = await axios.get(
        `http://127.0.0.1:5000/weather?lat=${location[0]}&lon=${location[1]}`
      );
      const temp = this.convertTempKtoF(response.data.current.temp);
      return temp;
    } catch (e) {
      console.log('getWeather Error!');
      console.log(e);
    }
  };

  static updateTemps = async (city = 'Seattle') => {
    try {
      const temp = await this.getWeather(city);
      const tempValue = document.querySelector('#temp-value');
      tempValue.innerText = temp;
    } catch (e) {
      console.log('updateTemp Error!');
      console.log(e);
    }
  };

  //API call in chain
  // const updateTemp = (city) => {
  //   if (city == '') {
  //     city = 'seattle';
  //   }
  //   axios
  //     .get(`http://127.0.0.1:5000/location?q=${city}`)
  //     .then((response) => {
  //       lat = response.data[0].lat;
  //       lon = response.data[0].lon;
  //       return [lat, lon];
  //     })
  //     .then((response) => {
  //       axios
  //         .get(
  //           `http://127.0.0.1:5000/weather?lat=${response[0]}&lon=${response[1]}`
  //         )
  //         .then((response) => {
  //           const tempValue = document.querySelector('#temp-value');
  //           kTemp = response.data.current.temp;
  //           FTemp = convertTempKtoF(kTemp);
  //           tempValue.innerText = FTemp;
  //         });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
}

const registerEventHandlers = () => {
  // temperature value need to be updated either manually or real time
  const temperature = document.querySelector('#temp-value');
  // landscape image will be updated base on the temperature value
  const landscape = document.querySelector('#temp-display');

  // get real time seattle temp when document load
  Helper.updateTemps();

  // update body background image base on sky selection
  const skyBackground = document.querySelector('body');
  skyBackground.addEventListener('change', () => {
    const img = Helper.getSelectedSky();
    skyBackground.style.backgroundImage = `url(${img})`;
  });

  const decreaseButton = document.querySelector('#temp-down');
  decreaseButton.addEventListener('click', () => {
    const tempValue = parseInt(temperature.innerText) - 1;
    temperature.innerText = tempValue;

    const tempText = document.querySelector('#temp-box .box-content h1');
    const color = Helper.getTempEffect(tempValue).color;
    tempText.style.color = color;

    const img = Helper.getTempEffect(tempValue).img;
    landscape.style.backgroundImage = `url(${img})`;
  });

  const increaseButton = document.querySelector('#temp-up');
  increaseButton.addEventListener('click', () => {
    const tempValue = parseInt(temperature.innerText) + 1;
    temperature.innerText = tempValue;

    const tempText = document.querySelector('#temp-box .box-content h1');
    const color = Helper.getTempEffect(tempValue).color;
    tempText.style.color = color;

    const img = Helper.getTempEffect(tempValue).img;
    landscape.style.backgroundImage = `url(${img})`;
  });

  const form = document.querySelector('form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const city = form.elements.query.value;
    if (city == '') {
      city = 'Seattle';
    }
    Helper.changeCityName(city);
  });

  const resetCityButton = document.querySelector('#reset');
  resetCityButton.addEventListener('click', async () => {
    Helper.changeCityName();
    await Helper.updateTemps();
    form.elements.query.value = '';

    const tempValue = parseInt(temperature.innerText);
    const color = Helper.getTempEffect(tempValue).color;
    const tempText = document.querySelector('#temp-box .box-content h1');
    tempText.style.color = color;

    const img = Helper.getTempEffect(tempValue).img;
    landscape.style.backgroundImage = `url(${img})`;
  });

  const getTempButton = document.querySelector('#get-temp');
  getTempButton.addEventListener('click', async () => {
    let city = form.elements.query.value;
    if (city == '') {
      city = 'Seattle';
    }
    await Helper.updateTemps(city);
    Helper.changeCityName(city);

    const tempValue = parseInt(temperature.innerText);
    const color = Helper.getTempEffect(tempValue).color;
    const tempText = document.querySelector('#temp-box .box-content h1');
    tempText.style.color = color;

    const img = Helper.getTempEffect(tempValue).img;
    landscape.style.backgroundImage = `url(${img})`;
  });
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
