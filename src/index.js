const getCurrentTime = () => {
    const currentDate = new Date();
    return currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
};

console.log(`The current time is ${getCurrentTime()}.`);

const state = {
    currentTemp: 0,
    clicked: false
};

// const updateTempUp = () => {
//     const tempCounterContainer = document.getElementById("tempIncrease");
//     state.clickTempUp += 1;
//     tempCounterContainer.textContent = state.clickTempUp;
// };

// const registerEventHandlers = () =>{
//     const temperature = document.get
// }
const increaseTemp = () => {
    const tempContainer = document.getElementById("tempIncrease");
    state.currentTemp +=1;
    tempContainer.textContent = state.currentTemp;
};

const descreaseTemp = () => {
    const tempContainer = document.getElementById("tempDecrease");
    state.currentTemp -=1;
    tempContainer.textContent = state.currentTemp;
    if (state.currentTemp < 49){
        tempIncrease.style.backgroundColor = "Teal";
    }
    else if ((state.currentTemp > 49) && (state.currentTemp < 59)){
        tempIncrease.style.backgroundColor = "Green";
    }
    else if ((state.currentTemp > 59) && (state.currentTemp < 69)){
        tempIncrease.style.backgroundColor = "Yellow";
    }
    else if ((state.currentTemp > 69) && (state.currentTemp < 79)){
        tempIncrease.style.backgroundColor = "Yellow";
    }
    else if (state.currentTemp >= 80){
        tempIncrease.style.backgroundColor = "Yellow";
    }
};

const registerEventHandlers = () => {
    const increaseTempButton = document.querySelector("#increaseTempButton");
    increaseTempButton.addEventListener("click", increaseTemp);
    const decreaseTempButton = document.querySelector("#decreaseTempButton");
    decreaseTempButton.addEventListener("click", descreaseTemp);
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);
