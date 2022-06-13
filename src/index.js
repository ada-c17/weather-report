// Define state

const state = {
    currentTempInF: 0,
    currentLocation: "Irvine",
    currentSky: "sunny"
};

// Display update conditions

const updateColor = () => {
    const currentTempDisplay = document.getElementById("currentTemp");
    if (state.currentTempInF >= 100) {
        currentTempDisplay.style.color = "brown";
    } else if (state.currentTempInF >= 80){
        currentTempDisplay.style.color = "red";
    } else if (state.currentTempInF >= 60){
        currentTempDisplay.style.color = "orange";
    } else if (state.currentTempInF >= 40){
        currentTempDisplay.style.color = "green";
    } else if (state.currentTempInF >= 20){
        currentTempDisplay.style.color = "blue";
    } else {
        currentTempDisplay.style.color = "purple";
    }
};

const updateFeelImage = () => {
    const feelImage = document.getElementById("landscape");
    if (state.currentTempInF >= 100) {
        feelImage.src = "/images/venus.jpeg";
    } else if (state.currentTempInF >= 80){
        feelImage.src = "/images/hotTemp.jpeg";
    } else if (state.currentTempInF >= 60){
        feelImage.src = "/images/warmTemp.jpeg";
    } else if (state.currentTempInF >= 40){
        feelImage.src = "/images/coolTemp.jpg";
    } else if (state.currentTempInF >= 20){
        feelImage.src = "/images/coldTemp.jpeg";
    } else {
        feelImage.src = "/images/pluto.png";
    }
};

const updateSkyImage = () => {
    const skyImage = document.getElementById("skyscape");
    if (state.currentSky === "sunny") {
        skyImage.src = "/images/sunnySky.jpeg";
    } else if (state.currentSky === "cloudy") {
        skyImage.src = "/images/cloudySky.jpeg";
    } else if (state.currentSky === "rainy") {
        skyImage.src = "/images/rainySky.jpeg";
    } else if (state.currentSky === "snowy") {
        skyImage.src = "/images/snowySky.jpeg";
    } else {
        skyImage.src = "/images/nightSky.jpeg";
    }
};

// Temperature display helper functions 

const convertToF = (tempInK) => {
    const tempInF = (tempInK - 273.15) * (9/5) + 32;
    return tempInF;
};

const updateTemperatureDisplay = () => {
    const currentTempDisplay = document.getElementById("currentTemp");
    currentTempDisplay.textContent = `Current Temperature: ${Math.round(state.currentTempInF)}`;
    updateColor();
    updateFeelImage();
};

// Location display helper functions 

const updateLocationDisplay = () => {
    const currentLocationDisplay = document.getElementById("myLocation");
    currentLocationDisplay.textContent = `${state.currentLocation}`;
};

// Define actions Waves 2, 3, 5, 6

const increaseTempAction = () => {
    state.currentTempInF += 1;
    updateTemperatureDisplay();
};

const decreaseTempAction = () => {
    state.currentTempInF -= 1;
    updateTemperatureDisplay();
};

const inputLocationAction = () => {
    const inputLocation = document.getElementById("locationInput");
    state.currentLocation = inputLocation.value;
    updateLocationDisplay();
};
const resetLocationAction = () => {
    const inputLocation = document.getElementById("locationInput");
    state.currentLocation = "Irvine";
    inputLocation.value = state.currentLocation;
    updateLocationDisplay();
};

const selectSkyAction = () => {
    const selectSky = document.getElementById("skyDropdown");
    state.currentSky = selectSky.options[selectSky.selectedIndex].value;
    updateSkyImage();
};

// Wave 4 

const getLatLon = () => {
    return axios 
    .get('http://127.0.0.1:5000/location', {
        params: {
            q: state.currentLocation
        },
    }).then((response) => {
        const lat = response.data[0]['lat'];
        const lon = response.data[0]['lon'];
        return {'lat': lat, 'lon': lon}; 
    });
};

const getTemp = () => {
    return getLatLon().then((latLon) => {
        return axios 
        .get('http://127.0.0.1:5000/weather', {
                params: {
                    lat: latLon['lat'],
                    lon: latLon['lon']
                }
            });
    }).then((response) => {
        const tempInK = response['data']['current']['temp'];
        return tempInK;
    });
};

const updateCurrentTempInK = (tempInK) => {
    state.currentTempInF = convertToF(tempInK);
    updateTemperatureDisplay();
};


const realtimeTempAction = () => {
    getTemp().then((tempInK) => updateCurrentTempInK(tempInK)).catch((err) => {console.log(err);});
};


// Register events

const registerEventHandlers = () => {
    const increaseTempButton = document.getElementById("increaseTemp");
    increaseTempButton.addEventListener("click", increaseTempAction);

    const decreaseTempButton = document.getElementById("decreaseTemp");
    decreaseTempButton.addEventListener("click", decreaseTempAction);

    const inputLocation = document.getElementById("locationInput");
    inputLocation.addEventListener("input", inputLocationAction);

    const resetLocationButton = document.getElementById("resetLocation");
    resetLocationButton.addEventListener("click", resetLocationAction);

    const changeSky = document.getElementById("skyDropdown");
    changeSky.addEventListener("change", selectSkyAction);

    const realtimeTempButton = document.getElementById("realTime");
    realtimeTempButton.addEventListener("click", realtimeTempAction);
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);

