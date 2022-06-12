const axios = require('axios');

const state ={
    temperature: 75,
    tempText: "Partly Sunny 🌤"
}

// add event handler

// select elements
const updateSky = (e) =>{
    e.preventDefault()
    let selectSkyValue = document.getElementById("skyOptions").value;
    console.log(selectSkyValue)
    // sky options is the id for the <select> tag  
    let selectTempDisplay = document.getElementById("tempTextDisplay");
    let selectTempText = document.getElementById("tempText");
    if (selectSkyValue == "Sunny") {
        console.log('in sunny block');
        selectTempDisplay.className = `seattleSunny`;
        state.tempText = selectSkyValue
        tempText.textContent = `${state.tempText} ☀️`;
    }
    // tempTextDisplay has background image as a property
    else if (selectSkyValue == "Cloudy") {
        console.log('in cloudy block');
        selectTempDisplay.className = `seattleCloudy`;
        state.tempText = selectSkyValue
        tempText.textContent = `${state.tempText} 🌥`;
    }
    else if (selectSkyValue == "Partly Sunny") {
        console.log('in partly sunny block');
        selectTempDisplay.className = `seattlePartlySunny`;
        state.tempText = selectSkyValue
        tempText.textContent = `${state.tempText} 🌤`;
    }

    else if (selectSkyValue == "Rain") {
        console.log('in partly sunny block');
        selectTempDisplay.className = `seattleRain`;
        state.tempText = selectSkyValue
        tempText.textContent = `${state.tempText} ☔️`;
    }


}

const updateTempText = () =>{
    let selectTempText = document.getElementById("tempText")
    // example of  tempText is Partly Sunny
  
}
const changeCityName = () =>{
    let inputValue = document.getElementById("location").value; 
    let cityName = document.getElementById("cityName").innerHTML
    document.getElementById("cityName").innerHTML = inputValue; 
  }



const increaseTemp = () =>{

    const temperature = document.getElementById("temperature");
    state.temperature += 1;
    temperature.textContent = `${state.temperature}°`;
    updateTempColor();
     
    console.log(temperature)
}


const decreaseTemp = () =>{
   
    const temperature = document.getElementById("temperature");
    // const tempColor = document.getElementById("tempColor");
    state.temperature -= 1;  
    temperature.textContent = `${state.temperature}°`;
    updateTempColor();    
    console.log(temperature)
}


const updateTempColor = () =>{
    const tempColor = document.getElementById("tempColor");
    const newTemp = state.temperature;
    if (newTemp >= 70 &&  newTemp <= 79){
        tempColor.className = `warm`;
        console.log(`${tempColor.className}`)
     }
    
    else if (newTemp >= 80){
        tempColor.className = `very-hot`;
        console.log(state.temperature)
        console.log(` this is the class name ${tempColor.className}`)
     }

     else if (newTemp >= 60 &&  newTemp <= 69){
        tempColor.className = `cool`;
        console.log(`${tempColor.className}`)
     }

     else if (newTemp >= 50 &&  newTemp <= 59){
        tempColor.className = `chilly`;
        console.log(`${tempColor.className}`)
     }

     else if (newTemp <= 49){
        tempColor.className = `cold`;
        console.log(state.temperature)
        console.log(` this is the class name ${tempColor.className}`)
     }
}
updateTempColor();
const registerEventHandlers = ( ) => {

    const increaseTempButton = document.getElementById("btn-increase");
    console.log(increaseTemp)
    increaseTempButton.addEventListener("click", increaseTemp);
    
    const decreaseTempButton = document.getElementById("btn-decrease");
    decreaseTempButton.addEventListener("click", decreaseTemp);

    const changeCityNameButton = document.getElementById("btn-changeLocation");
    changeCityNameButton.addEventListener("click", changeCityName );

    const changeSkySelectButton = document.getElementById("btn-skySelect")
    changeSkySelectButton.addEventListener("click", updateSky )
}

document.addEventListener("DOMContentLoaded", registerEventHandlers);












    