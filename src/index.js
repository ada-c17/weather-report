const currentLocation = {
    city: "Seattle",
    latitude: 47.6038321,
    longitude: -122.3300624,
    climate: temperature,
};

window.onload = () => {
    displayCurrentLocation();
    getCurrentForecast();
    setTheMood();
    changeTemperatureAndLandscapeStyling();
};


const displayCurrentLocation = () => {
    const cityName = document.getElementById("city-name");
    cityName.textContent = "✨ " + currentLocation.city + " ✨";
}


const updateDisplayForGivenCity = () => {
    const cityNameInput = document.getElementById("city-name-input");
    cityNameInput.addEventListener("keyup", () => {
        currentLocation.city = cityNameInput.value;
        displayCurrentLocation();
    });
}


const resetLocation = () => {
    const cityName = document.getElementById("city-name");
    if (cityName != "Seattle"); {
        currentLocation.city = "Seattle"
        currentLocation.latitude = 47.6038321,
        currentLocation.longitude = -122.3300624,
        currentLocation.climate = temperature,
        document.getElementById("city-name-input").value = "";
        displayCurrentLocation();
        getCurrentForecast();
    };
}


const increaseTemperature = () => {
    const temperature = document.getElementById("temperature");
    temperature.textContent = (parseInt(temperature.textContent) + 1);
    changeTemperatureAndLandscapeStyling();
}


const decreaseTemperature = () => {
    const temperature = document.getElementById("temperature");
    temperature.textContent = (parseInt(temperature.textContent) - 1);
    changeTemperatureAndLandscapeStyling();
}


const getCurrentLocationCoordinates = () => {
    axios
        .get("http://127.0.0.1:5000/location", {
            params: { 
                q: currentLocation.city, 
            },
        })
        .then((response) => { 
            latitude = response.data[0].lat;
            longitude = response.data[0].lon;
            currentLocation.latitude = latitude;
            currentLocation.longitude = longitude;
            console.log(`${currentLocation.city}'s coordinates: ${latitude}, ${longitude} have been found`);
            getCurrentForecast();
        })
        .catch((error) => {
            console.log(`Coordinates for ${currentLocation.city} Not Found ${error.response.data}`);
        });
}


const getCurrentForecast = () => {
    axios
        .get("http://127.0.0.1:5000/weather", {
            params: {
                lat: currentLocation.latitude, 
                lon: currentLocation.longitude,
                units: "imperial"
            },
        })
    .then((response) => { 
        temperature.textContent = Math.round(response.data.current.temp);
        currentLocation.climate = temperature.textContent;
        console.log(`${currentLocation.city}'s current temperature of ${temperature.textContent} has been found`);
        changeTemperatureAndLandscapeStyling();
    })
    .catch((error) => {
        console.log(`Current Temperature for ${currentLocation.city} Not Found ${error.response.data}`);
    });
}


const changeTemperatureAndLandscapeStyling = () => {
    temperature = document.getElementById("temperature");
    landscape = document.getElementById("weather-garden-containing-landscape");
    adjustedTemperature = parseInt(temperature.textContent);

    if (adjustedTemperature >= 80) {
        temperature.style.color = "red";
        landscape.textContent = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂"
    } else if (adjustedTemperature >= 70 && adjustedTemperature <= 79) {
        temperature.style.color = "orange";
        landscape.textContent = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷"
    } else if (adjustedTemperature >= 60 && adjustedTemperature <= 69) {
        temperature.style.color = "goldenrod";
        landscape.textContent = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃"
    } else if (adjustedTemperature >= 50 && adjustedTemperature <= 59) {
        temperature.style.color = "green";
        landscape.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"
    } else if (adjustedTemperature <= 49) {
        temperature.style.color = "teal";
        landscape.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"
    }
}


const setTheMood = () => {
    const skyIcons = document.getElementById("weather-garden-containing-sky");
    const choice = document.getElementById("sky-drop-down").value;

    switch (choice) {
        case "sunny":
            skyIcons.textContent = "☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️";
            break;
        case "cloudy":
            skyIcons.textContent = "☁️☁️☁️☁️☁️🌥⛅️🌥☁️☁️☁️☁️☁️";
            break;
        case "rainy":
            skyIcons.textContent = "🌧🌈⛈🌧💧🌧🌦⛈💧🌧🌧🌈🌧";
            break;
        case "snowy":
            skyIcons.textContent = "🌨❄️🌨❄️🌨❄️🌨❄️🌨❄️🌨❄️🌨";
            break;
        case "What's the Vibe?":
            skyIcons.textContent = "🌧🌈⛈🌧💧🌧🌦⛈💧🌧🌧🌈🌧";
    }
}


const registerEventHandlers = () => {
    const cityNameInput = document.getElementById("city-name-input");
    cityNameInput.addEventListener("keyup", updateDisplayForGivenCity);
    
    const resetButton = document.getElementById("city-name-reset-button");
    resetButton.addEventListener("click", resetLocation);
    
    const increaseTemperatureButton = document.getElementById("increase-temperature-button");
    increaseTemperatureButton.addEventListener("click", increaseTemperature);

    const decreaseTemperatureButton = document.getElementById("decrease-temperature-button");
    decreaseTemperatureButton.addEventListener("click", decreaseTemperature);

    const choice = document.getElementById("sky-drop-down");
    choice.addEventListener('change', setTheMood);

    const getCurrentForecastButton = document.getElementById("get-current-forecast-button");
    getCurrentForecastButton.addEventListener("click", getCurrentLocationCoordinates);
}


if (document.readyState !== 'loading') {
    resetLocation();
    increaseTemperature();
    decreaseTemperature();
    getCurrentLocationCoordinates();
    getCurrentForecast();
    changeTemperatureAndLandscapeStyling();
    setTheMood();
    registerEventHandlers();
} else {
    document.addEventListener('DOMContentLoaded', resetLocation);
    document.addEventListener('DOMContentLoaded', increaseTemperature);
    document.addEventListener('DOMContentLoaded', decreaseTemperature);
    document.addEventListener('DOMContentLoaded', getCurrentLocationCoordinates);
    document.addEventListener('DOMContentLoaded', getCurrentForecast);
    document.addEventListener('DOMContentLoaded', changeTemperatureAndLandscapeStyling);
    document.addEventListener('DOMContentLoaded', setTheMood);
    document.addEventListener("DOMContentLoaded", registerEventHandlers);
}
