"use strict";

const initialTitle = 'Weather Wonderland'

const state = {
    title: initialTitle,
    temp: 60,
    sky: null,
    unit: 'F',
    land: null,
    cur_conditions: null,
    timezone: null,
    toc: false
};

var forecastArr = [];

const tempDisplay = document.getElementById('city-temp');
const tempBar = document.getElementById('temp-bar');
const increaseTempBtn = document.getElementById('increase-temp');
const decreaseTempBtn = document.getElementById('decrease-temp');
const changeUnitsBtn = document.getElementById('change-unit');
const curUnits = document.getElementById('selected-measurement');
const textInputBox = document.getElementById('text-input');
const cityDisplay = document.getElementById('city-name');
const errorBox = document.getElementById('error-box');
const bodyMain = document.getElementById('body');
const skyInput = document.getElementById('skies');
const fetchWeatherBtn = document.getElementById('fetchweather');
const fetchLocationWeatherBtn = document.getElementById('fetchlivelocationweather');
const cityCurConditions = document.getElementById('cur-conditions');
const forecastContainer = document.getElementById('forecast');
const curDate = document.getElementById('cur-date');
const curTime = document.getElementById('cur-time');

const increaseTemp = event => {
    state.temp += 1;
    displayStates();
    updateColor();
    updateLandState();
}

const decreaseTemp = event => {
    state.temp -= 1;
    displayStates();
    updateColor();
    updateLandState();
}

const updateColor = () => {
    if (state.unit === 'F') {
        if (state.temp < 50) {
            tempBar.className = 'teal';
        } else if (state.temp < 60) {
            tempBar.className = 'green';
        } else if (state.temp < 70) {
            tempBar.className = 'yellow';
        } else if (state.temp < 80) {
            tempBar.className = 'orange';
        } else {
            tempBar.className = 'red';
        }
    } else {
        if (state.temp < 10) {
            tempBar.className = 'teal';
        } else if (state.temp < 16) {
            tempBar.className = 'green';
        } else if (state.temp < 21) {
            tempBar.className = 'yellow';
        } else if (state.temp < 27) {
            tempBar.className = 'orange';
        } else {
            tempBar.className = 'red';
        }
    }
    
}

const updateTitle = () => {
    if (textInputBox.value === "") {
        state.title = initialTitle;
    } else {state.title = textInputBox.value;}
    cityDisplay.textContent = state.title;
}

const updateSkyState = () => {
    if (skyInput.value === "Sunny") {
        state.sky = "LightGoldenRodYellow";
    } else if (skyInput.value === "Cloudy") {
        state.sky = "PowderBlue";
    } else if (skyInput.value === "Rainy") {
        state.sky = "DarkSeaGreen";
    } else if (skyInput.value === "Snowy") {
        state.sky = "White";
    }
    updateBackground();
}

const updateLandState = () => {
    if (state.unit === 'F') {
        if (state.temp < 60) {
            state.land = "Gainsboro";
        } else if (state.temp < 70) {
            state.land = "MistyRose";
        } else if (state.temp < 80) {
            state.land = "Pink";
        } else {
            state.land = "Tomato";
        }
    } else {
        if (state.temp < 16) {
            state.land = "Gainsboro";
        } else if (state.temp < 21) {
            state.land = "MistyRose";
        } else if (state.temp < 27) {
            state.land = "Pink";
        } else {
            state.land = "Tomato";
        }
    }
    updateBackground();
}

const updateBackground = () => {
    bodyMain.style.backgroundImage = "linear-gradient(to bottom, "+ state.sky +", "+ state.land +")"};

const fetchForecast = (forecast) => {
    forecastArr = [];
    forecastContainer.innerHTML = "";
    var addDays = 1;
    for (const day of forecast) {
        const dayForecastCap = document.createElement('figcaption');
        const todayDate = new Date();
        todayDate.setDate(todayDate.getDate() + addDays)
        dayForecastCap.textContent = todayDate.toDateString();
        forecastArr.push({min: day.temp.min, max: day.temp.max});
        forecastContainer.appendChild(dayForecastCap);

        const dayForecast = document.createElement('ul');

        const minTempListItem = document.createElement('li');
        const minTempTitle = document.createElement('span');
        minTempTitle.textContent = "Min temp: ";
        minTempTitle.className = "key";
        minTempListItem.appendChild(minTempTitle);
        const minTemp = document.createElement('span');
        minTemp.textContent = `${forecastArr[addDays-1].min} °${state.unit}`;
        minTemp.className = "val";
        minTemp.id = `min${addDays}`
        minTempListItem.appendChild(minTemp);
        dayForecast.appendChild(minTempListItem);

        const maxTempListItem = document.createElement('li');
        const maxTempTitle = document.createElement('span');
        maxTempTitle.textContent = "Max temp: ";
        maxTempTitle.className = "key";
        maxTempListItem.appendChild(maxTempTitle);
        const maxTemp = document.createElement('span');
        maxTemp.textContent = `${forecastArr[addDays-1].max} °${state.unit}`;
        maxTemp.className = "val";
        maxTemp.id = `max${addDays}`
        maxTempListItem.appendChild(maxTemp);
        dayForecast.appendChild(maxTempListItem);

        const weatherDescListItem = document.createElement('li');
        const weatherDescTitle = document.createElement('span');
        weatherDescTitle.textContent = "Conditions: "
        weatherDescTitle.className = "key";
        weatherDescListItem.appendChild(weatherDescTitle);
        const weatherDesc = document.createElement('span');
        weatherDesc.textContent = day.weather[0].description;
        weatherDesc.className = "val";
        weatherDescListItem.appendChild(weatherDesc);
        dayForecast.appendChild(weatherDescListItem);

        forecastContainer.appendChild(dayForecast);
        addDays += 1;
    };
}

const updateForecast = () => {
    var addDays = 1;
    for (const dayObj of forecastArr) {
        const minDay = document.getElementById(`min${addDays}`);
        minDay.textContent = `${Math.round(dayObj.min)} °${state.unit}`;
        const maxDay = document.getElementById(`max${addDays}`);
        maxDay.textContent = `${Math.round(dayObj.max)} °${state.unit}`;
        addDays += 1;
    };
}


const getCurDateTime = () => {
    const utcDateTime = new Date();
    const localDateTime = utcDateTime.toLocaleString('en-US', {
        timeZone: state.timezone,
        dateStyle: 'full',
        timeStyle: 'long',
    });
    return localDateTime;
};

const displayDateTime = () => {
    const updateDateTime = () => {
        setTimeout(displayDateTime, 1000);
    };
    const dateTimeString = getCurDateTime();
    const [date, time] = dateTimeString.split(' at ');
    curDate.textContent = date;
    curTime.textContent = time;
    updateDateTime();
};

const fetchLatLon = async () => {
    try {
        const locationRes = await axios.get("http://127.0.0.1:5000/location", {params: {q: state.title}});
        const lat = locationRes.data[0].lat;
        const lon = locationRes.data[0].lon;
        errorBox.innerHTML = "";
        errorBox.className = "";
        return {lat: lat, lon: lon};
    } catch (e) {
        errorBox.className = "error";
        errorBox.textContent = "ERROR: Invalid location";
    }
}

const fetchWeather = async (locationRes) => {
    try {
        const lat = locationRes.lat;
        const lon = locationRes.lon;
        const unit = state.unit === 'F' ? 'imperial' : 'metric';
        const weatherRes = await axios.get("http://127.0.0.1:5000/weather", {params: {lat: lat, lon: lon, units: unit}});
        errorBox.innerHTML = "";
        errorBox.className = "";
        return weatherRes.data;
    } catch (e) {
        errorBox.className = "error";
        errorBox.textContent = "ERROR: Invalid location";
    }
}

const fetchAll = async () => {
    textInputBox.value = "";
    const resLatLon = await fetchLatLon();
    const resWeather = await fetchWeather(resLatLon);
    state.temp = resWeather.current.temp;
    const curWeatherDes = resWeather.current.weather[0].description;
    const curWeatherMain = resWeather.current.weather[0].main;
    state.timezone = resWeather.timezone;
    
    if (curWeatherMain === "Clouds") {
        skyInput.value = "Cloudy";
    } else if (curWeatherMain === "Rain") {
        skyInput.value = "Rainy";
    } else if (curWeatherMain === "Clear") {
        skyInput.value = "Sunny";
    } else {
        skyInput.value = "Snowy";
    }
    state.cur_conditions = curWeatherDes;

    fetchForecast(resWeather.daily);

    displayStates();
}

const changeUnits = () => {
    if (state.unit === 'F') {
        state.unit = 'C';
        curUnits.textContent = ' °C / '
        changeUnitsBtn.textContent =  '°F'
        state.temp = (state.temp-32)*(5/9);
        for (const dayObj of forecastArr) {
            dayObj.min = (dayObj.min-32)*(5/9);
            dayObj.max = (dayObj.max-32)*(5/9);
        }
    } else {
        state.unit = 'F';
        curUnits.textContent = ' °F / '
        changeUnitsBtn.textContent =  '°C'
        state.temp = (state.temp*1.8)+32;
        for (const dayObj of forecastArr) {
            dayObj.min = (dayObj.min*1.8)+32;
            dayObj.max = (dayObj.max*1.8)+32;
        }
    }
    displayStates();
}

const fetchCity = async (lat, lon) => {
    try {
        const response = await axios.get("http://127.0.0.1:5000/location/reverse", {params: {lat: lat, lon: lon}});
        errorBox.innerHTML = "";
        errorBox.className = "";
        return response.data.address.city;
    } catch (e) {
        errorBox.className = "error";
        errorBox.textContent = "ERROR: Unable to fetch city from lat/lon";
    }
};

const fetchLiveWeather = () => {
    textInputBox.value = "";
    const success = async (pos) => {
        alert('Please wait to fetch your current location.');
        const curCity = await fetchCity(pos.coords.latitude, pos.coords.longitude);
        if (curCity) {
            state.title = curCity;
        }
        await fetchAll();
    };
    const error = (err) => {
        alert('Your browser does not permit location sharing.');
    };
    navigator.geolocation.getCurrentPosition(success, error);
};

const registerEventHandlers = () => {
    increaseTempBtn.addEventListener('click', increaseTemp);
    decreaseTempBtn.addEventListener('click', decreaseTemp);
    textInputBox.addEventListener('input', updateTitle);
    skyInput.addEventListener('change', updateSkyState);
    fetchWeatherBtn.addEventListener('click', fetchAll);
    fetchLocationWeatherBtn.addEventListener('click', fetchLiveWeather);
    changeUnitsBtn.addEventListener('click', changeUnits);
}

const displayStates = () => {
    tempDisplay.textContent = Math.round(state.temp);
    updateColor();
    cityDisplay.textContent = state.title;
    updateLandState();
    updateSkyState();
    cityCurConditions.textContent = state.cur_conditions;
    displayDateTime();
    updateForecast();
}

document.addEventListener('DOMContentLoaded', registerEventHandlers);
document.addEventListener('DOMContentLoaded', displayStates);