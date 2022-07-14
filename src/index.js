"use strict";

const state = {
    currentTemp: 0,
    clicked: false,
    city: "Arcadia",
    sky: "Sunny",
    // lat: 0,
    // lon: 0,
};

const increaseTemp = () => {
    const tempContainer = document.getElementById("tempDisplay");
    state.currentTemp +=1;
    tempContainer.textContent = state.currentTemp;
    tempColor();
    addLandscape();
    
};

const descreaseTemp = () => {
    const tempContainer = document.getElementById("tempDisplay");
    state.currentTemp -=1;
    tempContainer.textContent = state.currentTemp;
    tempColor();
    addLandscape();
};

const tempColor =() => {
    if (state.currentTemp <= 49){
        tempDisplay.style.backgroundColor = "teal";
    }
    else if ((state.currentTemp > 49) && (state.currentTemp <= 59)){
        tempDisplay.style.backgroundColor = "green";
    }
    else if ((state.currentTemp > 59) && (state.currentTemp <= 69)){
        tempDisplay.style.backgroundColor = "yellow";
    }
    else if ((state.currentTemp > 69) && (state.currentTemp <= 79)){
        tempDisplay.style.backgroundColor = "orange";
    }
    else if (state.currentTemp >= 80){
        tempDisplay.style.backgroundColor = "red";
    }
};

const addLandscape = () => {
    const newLandscape = document.createElement("span");
    const landscapeContainer = document.querySelector("#landscapeContainer");
    let landscape = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    if (state.currentTemp <= 59){
        landscape = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    }
    else if ((state.currentTemp > 59) && (state.currentTemp <= 69)){
        landscape = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
    }
    else if ((state.currentTemp > 69) && (state.currentTemp <= 79)){
        landscape = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
    }
    else if (state.currentTemp >= 80){
        landscape = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
    }
    landscapeContainer.textContent = landscape;
}
const getCityName = (event) => {
    if (event.keyCode === 13){
        document.getElementById('textbox_id').value = "";
        return;
    }
    const cityNameInput = document.getElementById('textbox_id').value;
    const cityNameHeader = document.getElementById("cityName");
    cityNameHeader.textContent = cityNameInput;
    state.city = cityNameInput;

}
const resetCity = () => {
    state.city = "Arcadia";
    const cityName = document.getElementById("cityName");
    cityName.textContent = state.city;

}
const findLatitudAndLongitude = (query) =>{
    let latitude, longitude;

    axios.get('http://127.0.0.1:5000/location',{
        params: {
            q: state.city,
        },
    })
    .then((response) => {
        latitude = response.data[0].lat;
        longitude = response.data[0].lon;
        console.log(latitude);
        console.log(longitude);
        let currentTempWeather = findWeather(latitude,longitude);
    })
    .catch((error) => {
        console.log('error',error.response.data);
    });
    return {
        cityLat: latitude,
        cityLon: longitude
    }
}
const findWeather = (latitude,longitude) => {
    let currentTempWeather;
    axios.get('http://127.0.0.1:5000/weather',{
        params: {
            lat: latitude,
            lon: longitude,
        },
    })
    .then((response) => {
        currentTempWeather = response.data.current.temp;
        currentTempWeather = Math.round((currentTempWeather-273.15)*1.8 +32);
        state.currentTemp = currentTempWeather;
    })
    .catch((error) => {
        console.log('error in Find Weather');
    });
    return{
        cityTemp: currentTempWeather,
    }
}
// console.log(state.temp);
// const cityCoordinates = findLatitudAndLongitude(state.city);
// const weather = findWeather(cityCoordinates.cityLat, cityCoordinates.cityLon);

const getRealTimeTemp = () => {
    findLatitudAndLongitude();
    let currentTempConverted = Math.round(((state.currentTemp-273.15)*1.8)+32);
    const cityTemp = document.getElementById("tempDisplay");
    cityTemp.textContent = state.currentTemp;
}

const updateSkyLandscape = () => {
    const skyColor = document.getElementById('sky_id'); 
    const skyLandscapeContainer = document.querySelector("#skyLandscapeContainer");
    state.sky = skyColor.options[skyColor.selectedIndex].text;
    console.log(state.sky);
    let skyLandscape = "☁️ ☁️ ☁️ ☀️ ☁️ ☁️";
    if (state.sky === "Sunny"){
        skyLandscape = "☁️ ☁️ ☁️ ☀️ ☁️ ☁️";
    }
    else if (state.sky === "Cloudy"){
        skyLandscape = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
    }
    else if (state.sky === "Rainy"){
        skyLandscape = "🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧";
    }
    else if (state.sky === "Snowy"){
        skyLandscape = "🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨";
    }
    skyLandscapeContainer.textContent = skyLandscape;
}
const registerEventHandlers = () => {
    const increaseTempButton = document.querySelector("#increaseTempButton");
    increaseTempButton.addEventListener("click", increaseTemp);
    const decreaseTempButton = document.querySelector("#decreaseTempButton");
    decreaseTempButton.addEventListener("click", descreaseTemp);
    const landscapeContainer = document.querySelector("#landscapeContainer");
    landscapeContainer.addEventListener("click", addLandscape);
    const cityName = document.getElementById("textbox_id");
    cityName.addEventListener("keyup",getCityName );
    const reset = document.getElementById("resetButton");
    reset.addEventListener("click", resetCity);
    const skyColor = document.getElementById('sky_id');
    skyColor.addEventListener("change",updateSkyLandscape);
    const realTimeTemp = document.getElementById("getRealTimeTempButton");
    realTimeTemp.addEventListener("click", getRealTimeTemp)
    
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);
resetCity();
updateSkyLandscape();
// getRealTimeTemp();
{/* <script src="./node_modules/axios/dist/axios.min.js"></script> */}
