// import 'regenerator-runtime/runtime';
// import axios from 'axios';
const state = {
    temp: 59,
    city: 'chicago'
};

changeCityWeather = () => {

    axios
        .get("http://localhost:5000/location", {
            params: {
                q: state.city,
            },
        })
        .then((response) => {
            let lat = response.data[0].lat;
            let lon = response.data[0].lon;
            console.log("success")
            axios
                .get('http://localhost:5000/weather', {
                    params: {
                        lat: lat,
                        lon: lon

                    },
                })
                .then((response) => {
                    const temperatureK = response.data.current.temp;

                    const degree = document.getElementById("temp-degree");
                    degree.textContent = `${temperatureK}`;
                    state.temp = temperatureK;
                    changeDegreeColor();

                })
                .catch((error) => {
                    console.log("error", error.response.data);
                });
        })
        .catch((error) => {
            console.log("error", error.response.data)
        });

};

const changeDegreeColor = () => {
    const degree = document.getElementById("temp-degree");
    degree.textContent = `${state.temp}`

    let color = "black"
    let landscape = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"
    let landImg = ""


    if (state.temp <= 49) {
        color = "teal";
        landImg = "/assets/images/winter.jpeg"
    }
    else if (state.temp > 49 && state.temp < 60) {
        color = "green";
        landImg = "/assets/images/winter.jpeg"
    }
    else if (state.temp > 59 && state.temp < 70) {
        color = "yellow";
        landscape = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
        landImg = "/assets/images/fall.jpg"
    }
    else if (state.temp > 69 && state.temp < 80) {
        color = "orange";
        landscape = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷"
        landImg = "/assets/images/spring.jpg"
    }
    else {
        color = "red";
        landscape = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂"
        landImg = "/assets/images/summer.jpg"
    }
    degree.style.color = color
    document.getElementById("landscape-image").textContent = landscape
    document.getElementById("land-img").setAttribute('src', landImg)

}

const changeSky = () => {

    let sky = document.getElementById("label-sky").value
    let skyDisplay = ""
    console.log(sky)

    if (sky == "Sunny") {
        skyDisplay = "🌞🌻🌞🌻🌞🌻🌞🌻"
    }
    else if (sky == "Cloudly") {
        skyDisplay = "🌥🌥⛅️🌥🌥⛅️🌥🌥"
    }
    else if (sky == "Rainy") {
        skyDisplay = "🌧🐶🐱🐶🐱🐶🐱🌧"
    }
    else if (sky = "Snowy") {
        skyDisplay = "⛄️⛄️⛄️⛄️⛄️⛄️⛄️⛄️⛄️"
    }
    document.getElementById("sky-image").textContent = skyDisplay;

}

const changeCityName = () => {
    const cityName = document.getElementById("temp-title-city");
    const newCity = document.getElementById("city-input").value;
    cityName.textContent = `${newCity}`
    state.city = newCity
}

const changeTempUp = () => {
    state.temp += 1;
    const button = document.getElementById("temp-degree");
    button.textContent = state.temp
    changeDegreeColor();
}

const changeTempDown = () => {
    state.temp -= 1;
    const button = document.getElementById("temp-degree");
    button.textContent = state.temp
    changeDegreeColor();
}

const reset = () => {
    state.temp = 59
    state.city = "chicago"
    document.getElementById("temp-degree").textContent = 59
    document.getElementById("temp-title-city").textContent = "chicago"
    document.getElementById("land-img").setAttribute('src', '/assets/images/winter.jpeg')



}


const registerEventHandlers = () => {
    document.getElementById("up-button").addEventListener("click", changeTempUp);

    document.getElementById("down-button").addEventListener("click", changeTempDown);

    document.getElementById("city-input").addEventListener('input', changeCityName);

    document.getElementById("update-city-button").addEventListener('click', changeCityWeather);

    document.getElementById("label-sky").addEventListener("change", changeSky);

    document.getElementById("reset-button").addEventListener("click", reset);
}

registerEventHandlers();