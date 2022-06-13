// import axios from 'axios'
const state={
    celsius: 0,
    city: 'Edmonds',
};

const tempUp=(event)=>{
  state.celsius +=1
  const increase = document.querySelector("#celsius")
  increase.textContent = `Degrees Celsius: ${state.celsius}`;

};
const tempDown=(event)=>{
    state.celsius -=1
    const decrease = document.querySelector("#celsius")
    decrease.textContent = `Degrees Celsius: ${state.celsius}`;
}

const registerEventHandlers = (event) => {
    const upButton = document.querySelector("#upButton");
    upButton.addEventListener("click", tempUp);

    const downButton = document.querySelector("#downButton");
    upButton.addEventListener("click", tempDown);
  };

  document.addEventListener("DOMContentLoaded", registerEventHandlers);

const tempChangeColor=(state.celsius)=>{
    let element = document.querySelector('.temperatureContainer');
    if (num >= 80){
        element.style.backgroundColor = 'red';
    }else if( 70 <=num < 80){
        element.style.backgroundColor= 'orange';
    }else if(60 <= num < 70){
        element.style.backgroundColor= 'yellow';
    }else if(50 <= num < 60 ){
        element.style.backgroundColor= 'green';
    }else if(33 <= num < 50){
        element.style.backgroundColor= 'teal';
    }else if(num < 32){
        element.style.backgroundColor= 'blue';
    }

};

const weatherGarden=(state.celsius)=>{
    let conditions= document.querySelector('#conditions');
    if (state.celsius >= 80){
        conditions.textContent = `"🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂"`;
    }else if( 70 <=num < 80){
        conditions.textContent =`"🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷"`;  
    }else if(60 <= num < 70){
        conditions.textContent =`"🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃"` ; 
    }else if(50 <= num < 60 ){
        conditions.textContent =`"🌲🌲🌲🍂🌲🍁🌲🌲🍂🌲🍂🍁🍂"`;
    }else if(33 <= num < 50){
        conditions.textContent =`"🍂🍁🍂🍂🍁🍂🍂🍁🍂🍂🍁🍂"`;
    }else if(num < 32){
        conditions.textContent = `"⛄️⛄️⛄️⛄️⛄️⛄️⛄️⛄️⛄️⛄️"`;
    }
};

const cityInput=(event)=>{
    let cityInput=document.getElementById('input').value;
    state.city = cityInput;
    let cityHeader = document.querySelector('#city');
    cityHeader.textContent=  `${state.celsius}`;
};
