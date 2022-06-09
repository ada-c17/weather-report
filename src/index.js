const temp = {
    fahrenheit: 60
};

const increaseTemp = () => {
    temp.fahrenheit += 1;
}

const decreaseTemp = () => {
    temp.fahrenheit -= 1;
}

const tempLi = document.createElement("li");
tempLi.textContent = temp.fahrenheit;


document.getElementById("tempDisplay").innerHTML = tempLi; 

