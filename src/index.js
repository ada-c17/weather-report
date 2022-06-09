/* Wave2 
1. increase and decrease temperature on click 
2. temperature # change text color and background color accordingly
    Temp(F)	Color     landscape
    80+	    Red       🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂"
    70-79	  Orange    🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷
    60-69	  Yellow    🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃
    50-59	  Green     🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲
    49 or   below	Teal 🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲
3. temperature range changes garden emoji at bottom
*/

const state = {
  tempIncrement: 77,
}

const adjustTemp = () => {
  state.tempIncrement += 1;
  const tempText = document.querySelector("#temperature");
  tempText.textContent = `${state.tempIncrement} °C`;
}



const temperaturePlusClickHandler = () => {
  const tempPlus = document.querySelector("#left-arrow-btn");
  tempPlus.addEventListener("click",  adjustTemp);
    //change text color and background color
  // if ( state.tempIncrement > 80){
  //   document.body.style.backgroundColor = "red";
  // }
  
};

//register events to html element(minus button)
const temperatureMinusClickHandler = () => {
  const tempMinus = document.querySelector("#right-arrow-btn");
  //similar to callback function, instead anoynymous func
  tempMinus.addEventListener("click",  () => {
    state.tempIncrement -= 1;
    const tempText = document.querySelector("#temperature");
    tempText.textContent = `${state.tempIncrement} °C`;
    
    const gardenEmoji = document.querySelector("#temp-emoji");
    if (state.tempIncrement >= 80){
      document.body.style.backgroundColor = "red";
      gardenEmoji.textContent = "🌵_🐍_🦂_🌵🌵__🐍_🏜_🦂🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂🐍_🦂_🌵🌵__🐍_🏜_🦂";
    }else if (state.tempIncrement <=79 && state.tempIncrement >= 70){
      document.body.style.backgroundColor = "orange";
      gardenEmoji.textContent = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
    }else if (state.tempIncrement <= 69 && state.tempIncrement >= 60){
      document.body.style.backgroundColor = "yellow";
      gardenEmoji.textContent = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
    }else if (state.tempIncrement <= 59 && state.tempIncrement >= 50){
      document.body.style.backgroundColor = "green";
      gardenEmoji.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    }else{
      document.body.style.backgroundColor = "teal";
      gardenEmoji.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    }
  });
}

const temperatureNumber = () => {
  const tempPlus = document.querySelector("#left-arrow-btn");
  const gardenEmoji = document.querySelector("#temp-emoji");
  tempPlus.addEventListener('click', () => {
    state.tempIncrement += 1;
    if (state.tempIncrement >= 80){
      document.body.style.backgroundColor = "red";
      gardenEmoji.textContent = "🌵_🐍_🦂_🌵🌵__🐍_🏜_🦂🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂🐍_🦂_🌵🌵__🐍_🏜_🦂";
    }else if (state.tempIncrement <=79 && state.tempIncrement >= 70){
      document.body.style.backgroundColor = "orange";
      gardenEmoji.textContent = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
    }else if (state.tempIncrement <= 69 && state.tempIncrement >= 60){
      document.body.style.backgroundColor = "yellow";
      gardenEmoji.textContent = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
    }else if (state.tempIncrement <= 59 && state.tempIncrement >= 50){
      document.body.style.backgroundColor = "green";
      gardenEmoji.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    }else{
      document.body.style.backgroundColor = "teal";
      gardenEmoji.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    }
  })
}


//content load
document.addEventListener("DOMContentLoaded", temperaturePlusClickHandler);
document.addEventListener("DOMContentLoaded", temperatureMinusClickHandler);
document.addEventListener("DOMContentLoaded", temperatureNumber);
//document.addEventListener("DOMContentLoaded", gardenEmojiHandler);



/* Wave3 
An element that displays a city name
A text input element that allows the user to change the city name

*/



/** Wave4
  Calling API
 
 */


/** Wave5
 Option	Sky
  Sunny	"☁️ ☁️ ☁️ ☀️ ☁️ ☁️"
  Cloudy	"☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️"
  Rainy	"🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧"
  Snowy	"🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨"
*/


/** Wave6
  Resetting the City Name
  
 */