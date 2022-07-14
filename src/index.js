"use strict";

const state = {
    currentTemp: 0,
    clicked: false,
    city: "Arcadia",
    sky: "sunny",
    lat: 0,
    lon: 0,
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

axios.get('http://127.0.0.1:5000/location',{
    params: {
        q: 'Seattle, WA', // will update once have city name
    },
})
.then((response) => {
    console.log('sucess!', response.data);
    console.log('sucess!', response.data[0].lon, response.data[0].lat);
    state.lat = response.data[0].lat;
    state.lon = response.data[0].lon;
    console.log(state.lon);
    console.log(state.lat);
})
.catch((error) => {
    console.log('error',error.response.data);
});

console.log(state.lat);

axios.get('http://127.0.0.1:5000/weather',{
    params: {
        lat: state.lat,
        lon: state.lon,
    },
})
.then((response) => {
    console.log('sucess!', response.data);
})
.catch((error) => {
    console.log('error',error.response.data);
});

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
    // const skyLandscapeContainer = document.querySelector("#skyLandscapeContainer");
    // skyLandscapeContainer.onchange = getSkyElement();
    // skyLandscapeContainer.addEventListener("change",getSkyElement)
    const skyColor = document.getElementById('sky_id');
    skyColor.addEventListener("change",updateSkyLandscape)
    
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);
resetCity();
updateSkyLandscape();
{/* <script src="./node_modules/axios/dist/axios.min.js"></script> */}
