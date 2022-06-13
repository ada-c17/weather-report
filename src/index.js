"use strict";

const state = {
    temp : 80,
    tempColor: "red",
    changeCity: "Orlando",
    skyCondition: document.getElementById("tempContainer"),
    lat: 28.5384,
    lon: 81.3789,
};

const temp = document.getElementById("tempValue");
temp.textContent = state.temp + "°";
temp.style.color = state.tempColor;


const increaseTemp = () => {
    state.temp++;
    const increase = document.getElementById("tempValue");
    increase.textContent = `${state.temp}°`;
};

const decreaseTemp = () => {
    state.temp--;
    const decrease = document.getElementById("tempValue");
    decrease.textContent = `${state.temp}°`;
};

const tempColor = () => {
    if(state.temp <= 49){
        state.tempColor = "teal";
        temp.style.color = state.tempColor;
    } else if(50 <= state.temp && state.temp <= 59){
        state.tempColor = "green"
        temp.style.color = state.tempColor;
    } else if(60 <= state.temp && state.temp <= 69){
        state.tempColor = "yellow";
        temp.style.color = state.tempColor;
    } else if(70 <= state.temp && state.temp <= 79){
        state.tempColor = "orange";
        temp.style.color = state.tempColor;
    } else if(state.temp >= 80){
        state.tempColor = "red";
        temp.style.color = state.tempColor;
    }
};

const tempImage = () => {
    const image1 = document.getElementById("image1");
    const image2 = document.getElementById("image2");
    const image3 = document.getElementById("image3");
    const image4 = document.getElementById("image4");

    if(state.temp <= 59){
        image1.src="images/winter/snowInCoffee.jpg";
        image2.src="images/winter/mountainCabin.jpg";
        image3.src="images/winter/snowman.jpg";
        image4.src="images/winter/snowTrees.jpg";
    } else if(60 <= state.temp && state.temp <= 69){
        image1.src="images/autumn/autumnTreesRoad.jpg";
        image2.src="images/autumn/pumpkinBroom.jpg";
        image3.src="images/autumn/mushrooms.jpg";
        image4.src="images/autumn/autumnTreesStairs.jpg";
    } else if(70 <= state.temp && state.temp <= 79){
        image1.src="images/spring/beeOnSunflower.jpg";
        image2.src="images/spring/flowers.jpg";
        image3.src="images/spring/rain.jpg";
        image4.src="images/spring/tulipAirBalloon.jpg";
    } else if (state.temp >= 80){
        image1.src="images/summer/sunglassesOnBeach.jpg";
        image2.src="images/summer/boatOnOcean.jpg";
        image3.src="images/summer/palmTrees.jpg";
        image4.src="images/summer/sandalsOnBeach.jpg";
    }
};

const input = document.querySelector("input");
const city = document.getElementById("cityName");
input.addEventListener("input", () => {
    state.changeCity = document.getElementById("city").value;
    document.getElementById("cityName").innerHTML = state.changeCity;
});

const reset = document.getElementById("resetBtn");
const resetValue = input.getAttribute("placeholder");
reset.addEventListener("click", () => {
    input.value = resetValue;
    city.textContent = resetValue;
})

const getRealTemp = () => {
    state.changeCity = document.getElementById("city").value;
    getLatLon();
}

const changeSky = () => {
    state.skyCondition = document.getElementById("tempContainer");
    if (document.getElementById("skyOptions").value === "sunny") {
        state.skyCondition.style.background = "rgba(255, 240, 0, 0.8)";

    } else if (document.getElementById("skyOptions").value === "rainy") {
        state.skyCondition.style.background = "rgba(137, 196, 244, 0.8)";

    } else if (document.getElementById("skyOptions").value === "cloudy") {
        state.skyCondition.style.background = "rgba(0, 0, 0, 0.5)";

    } else if (document.getElementById("skyOptions").value === "snowy") {
        state.skyCondition.style.background = "rgba(255, 255, 255, 0.8)";

    }
};

const getLatLon = () => {
    axios.get("http://127.0.01:5000/location", {
            params: {
                q: state.changeCity,
            },
        })
        .then((response) => {
            console.log(response);
            state.lat = response.data[0].lat;
            state.lon = response.data[0].lon;
            console.log("Success finding latitude and longitude!");
            getWeather(state.lat, state.lon);

        })
        .catch((error) => {
            console.log("Error finding latitude and longitude!");
            console.log(error.message);
        });
};

const kelvinToFahrenheit = (kelvin) => {
    return Math.floor(1.8 * (kelvin - 273) + 32);
};

const getWeather = () => {
    axios.get("http://127.0.01:5000/weather", {
            params: {
                lat: state.lat,
                lon: state.lon,
            },
        })
        .then((response) => {
            const kelvin = response.data["current"]["temp"];
            state.temp = kelvinToFahrenheit(kelvin);
            console.log(state.temp)
            temp.textContent = state.temp + "°";
            tempColor();
            tempImage();
        })
        .catch((error) => {
            console.log("Error getting weather!");
            console.log(error.message);
        });
};


const registerEventHandlers = () => {
    const increaseArrow = document.getElementById("increaseTemp");
    increaseArrow.addEventListener("click", increaseTemp);
    increaseArrow.addEventListener("click", tempColor);
    increaseArrow.addEventListener("click", tempImage);

    const decreaseArrow = document.getElementById("decreaseTemp");
    decreaseArrow.addEventListener("click", decreaseTemp);
    decreaseArrow.addEventListener("click", tempColor);
    decreaseArrow.addEventListener("click", tempImage);

    // const getRealTempBtn = document.getElementById("realTempBtn");
    // getRealTempBtn.addEventListener("click", getRealTemp);

    const getRealTempBtn = document.getElementById("realTempBtn");
    getRealTempBtn.addEventListener("click", getLatLon);

    const changeColorSky = document.getElementById("skyOptions");
    changeColorSky.addEventListener("change", changeSky);

};


document.addEventListener("DOMContentLoaded", registerEventHandlers) 