"use strict";

const initialTitle = 'Weather Wonderland'

const state = {
    title: initialTitle,
    temp: 60,
    sky: 'Sunny',
    unit: 'F',
    sky: null,
    land: null,
    cur_conditions: null,
    timezone: null,
    toc: false
};

const tempDisplay = document.getElementById('city-temp');
const tempBar = document.getElementById('temp-bar');
const increaseTempBtn = document.getElementById('increase-temp');
const decreaseTempBtn = document.getElementById('decrease-temp');
const textInputBox = document.getElementById('text-input');
const cityDisplay = document.getElementById('city-name');
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
    if (state.temp < 60) {
        state.land = "Gainsboro";
    } else if (state.temp < 70) {
        state.land = "MistyRose";
    } else if (state.temp < 80) {
        state.land = "Pink";
    } else {
        state.land = "Tomato";
    }
    updateBackground();
}

const updateBackground = () => {
    bodyMain.style.backgroundImage = "linear-gradient(to bottom, "+ state.sky +", "+ state.land +")"};

const updateForecast = (forecast) => {
    forecastContainer.innerHTML = "";
    var addDays = 1;
    for (const day of forecast) {
        const dayForecastCap = document.createElement('figcaption');
        const todayDate = new Date();
        todayDate.setDate(todayDate.getDate() + addDays)
        dayForecastCap.textContent = todayDate.toDateString();
        addDays += 1;
        forecastContainer.appendChild(dayForecastCap);

        const dayForecast = document.createElement('ul');

        const minTempListItem = document.createElement('li');
        const minTempTitle = document.createElement('span');
        minTempTitle.textContent = "Min temp: ";
        minTempTitle.className = "key";
        minTempListItem.appendChild(minTempTitle);
        const minTemp = document.createElement('span');
        minTemp.textContent = day.temp.min;
        minTemp.className = "val";
        minTempListItem.appendChild(minTemp);
        dayForecast.appendChild(minTempListItem);

        const maxTempListItem = document.createElement('li');
        const maxTempTitle = document.createElement('span');
        maxTempTitle.textContent = "Max temp: ";
        maxTempTitle.className = "key";
        maxTempListItem.appendChild(maxTempTitle);
        const maxTemp = document.createElement('span');
        maxTemp.textContent = day.temp.max;
        maxTemp.className = "val";
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
    const locationRes = await axios.get("http://127.0.0.1:5000/location", {params: {q: state.title}});
    const lat = locationRes.data[0].lat;
    const lon = locationRes.data[0].lon;
    return {lat: lat, lon: lon};
}

const fetchWeather = async (locationRes) => {
    const lat = locationRes.lat;
    const lon = locationRes.lon;
    const weatherRes = await axios.get("http://127.0.0.1:5000/weather", {params: {lat: lat, lon: lon}});
    console.log(weatherRes.data);
    return weatherRes.data;
}

const fetchAll = async () => {
    const resLatLon = await fetchLatLon();
    const resWeather = await fetchWeather(resLatLon);
    state.temp = Math.round(resWeather.current.temp);
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

    const weatherForecast = resWeather.daily;
    updateForecast(resWeather.daily);

    displayStates();
}

const registerEventHandlers = () => {
    increaseTempBtn.addEventListener('click', increaseTemp);
    decreaseTempBtn.addEventListener('click', decreaseTemp);
    textInputBox.addEventListener('input', updateTitle);
    skyInput.addEventListener('change', updateSkyState);
    fetchWeatherBtn.addEventListener('click', fetchAll);
    // fetchLocationWeatherBtn.addEventListener('click', fetchLiveWeather);
}

const displayStates = () => {
    tempDisplay.textContent = state.temp;
    updateColor();
    cityDisplay.textContent = state.title;
    updateLandState();
    updateSkyState();
    cityCurConditions.textContent = state.cur_conditions;
    displayDateTime();
}

document.addEventListener('DOMContentLoaded', registerEventHandlers);
document.addEventListener('DOMContentLoaded', displayStates);