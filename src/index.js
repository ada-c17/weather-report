console.log("hello world")
// Leaving a comment here - Dana
let state = {
    currentTemp: 70,
    city: 'Seattle'
};

const cityID = document.getElementById('cityName');
const displayName = document.getElementById('headercityName');
const displaySky = document.getElementById('skyPic');
const skyType = document.getElementById('skyOptions');
const reset = document.getElementById('reset');
// const defaultCity = 'San Diego';

const increaseTemp = () => {
    console.log("inside increase temp")
    state.currentTemp += 1;
    const tempContainer = document.querySelector('#tempContainer')
    tempContainer.textContent = `${state.currentTemp} ℉`;
    colorCoding();
};

const decreaseTemp = () => {
    state.currentTemp -= 1;
    const tempContainer = document.querySelector('#tempContainer')
    tempContainer.textContent = `${state.currentTemp} ℉`;
    colorCoding();
};

const getLatAndLon = function() {
    let latitude;
    let longitude;

    axios.get('http://localhost:5000/location', { params: { q: state.city } })
        .then((response) => {
            latitude = response.data[0].lat;
            longitude = response.data[0].lon;
            console.log('Printing inside lat and lon stuff');
            console.log(`latitude is this: ${latitude}`);
            console.log(`longitude is this: ${longitude}`);
            console.log(`display name ${response.data[0].display_name}`);
            
            return getCurrentTemp(latitude, longitude);
        })
        .catch((error) => {
            // console.log(response.status);
            console.log('Cannot find lat and lon');
        });

};

const getCurrentTemp = function(latitude, longitude) {
    axios
        .get('http://localhost:5000/weather', {
            params: { lat: latitude, lon: longitude },
        })
        .then((response) => {
            const kelvin = response.data.current.temp;
            const temperature = Math.round((9 / 5) * (kelvin - 273) + 32);
            // console.log(`temp in fahren: ${temperature}`);
            console.log(`new temp: ${temperature}`);
            return updateCurrentTemp(temperature);
        })
        .catch((error) => {
            console.log('cannot get new weather');
        });
}

// Working on this to update temperature depending on city name
const updateCurrentTemp = function(temp) {
    state.currentTemp = temp;
    const newTemperature = document.getElementById('tempContainer');
    newTemperature.textContent = `${state.currentTemp} ℉`;
    colorCoding();
}



const resetCity = () => {
    state.city = 'Seattle';
    document.querySelector('#cityName').value = '';
    const curWeatherHeader = document.getElementById('headercityName');
    curWeatherHeader.textContent = 'Current Weather for ' + state.city;
};


// This function has error in Console
// "Uncaught TypeError: Cannot set properties of null (setting 'textContent') at HTMLInputElement.updateCity (index.js:95:32)"
const updateCity = () => {
    const inputCity = document.querySelector('#cityName');
    inputCity.addEventListener('change', updateValue);

    const headerCityName = document.getElementById('headerCityName');
    headerCityName.textContent = inputCity;

    // console.log(`New city!!`);

    function updateValue(x) {
        city = x.target.value;
        headerCityName.textContent = 'Current Weather for ' + city;
        state.city = city;
        console.log(`This is the new city ${state.city}`);
        return getLatAndLon(state.city);
    }
};

// changing temperature color and garden picture base on degree
const colorCoding = () => {
    let landscape = document.querySelector('#skyGarden');
    let colorTemp = document.getElementById('tempContainer');

    if (state.currentTemp >= 80) {
        colorTemp.style.color = "red";
        landscape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂🍳';
    } else if (state.currentTemp >= 70 && state.currentTemp <= 79) {
        colorTemp.style.color = "orange";
        landscape.textContent = '🌸🌿🌼__🌷🌻🌿 _☘️🌱 _🌻🌷 ';
    } else if (state.currentTemp >= 60 && state.currentTemp <= 69) {
        colorTemp.style.color = "yellow";
        landscape.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
    } else if (state.currentTemp >= 50 && state.currentTemp <= 59) {
        colorTemp.style.color = "green";
        landscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
    } else {
        colorTemp.style.color = "teal";
        landscape.textContent = '⛄️⛄️⛄️⛄️⛄️⛄️⛄️⛄️⛄️⛄️⛄️⛄️⛄️';
    }
};

const updateSky = (a) => {
    const optionSky = a.target.value;

    if (optionSky === '⛅️Cloudy☁️') {
        displaySky.innerText = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';;
    } else if (optionSky === '🌈Sunny☀️') {
        displaySky.innerText = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
    } else if (optionSky === '⛈Rainy☔️') {
        displaySky.innerText = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
    } else if (optionSky === '❄️Snowy☃️') {
        displaySky.innerText = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
    }
};

//registering events
const registerEventHandlers = () => {
    const increaseButton = document.getElementById("increase-button");
    increaseButton.addEventListener('click', increaseTemp);

    const decreaseButton = document.getElementById('decrease-button');
    decreaseButton.addEventListener('click', decreaseTemp);

    skyType.addEventListener('change', updateSky);

    cityID.addEventListener('input', updateCity);

    reset.addEventListener('click', resetCity);
    // getLatAndLon();
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);