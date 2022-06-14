"use strict";

//const axios = require('axios');

// let map;
// let service;
// function callback(place, status) {
//     if (status == google.maps.places.PlacesServiceStatus.OK) {
//         createMarker(place);
//     }
// }
// let place= //input city
// let config = {
//     method: 'get',
//     url: 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=place&key=YOUR_API_KEY'

// };

// axios(config)

// .then((response)=>{
//     const place = response.data[results][0];
//     request={
//     placeId: place.place_id
//     }
//     service = new google.maps.places.PlacesService(map);
//     service.getDetails(request, callback);
// });
// .then((response)=>{
//     PlacePhoto=response.photos[0];
//     URL=PlacePhoto.getUrl();
//     parameters={
//     maxwidth=400,
//     key=YOUR_API_KEY
//     }
// return axios.get(URL, parameters);
// });
const state = {
    degree:60,
    isF: true,
    cityName: 'Poppy City, USA',
    
};
//let theText = myTextInput.value;
const showCityName=()=>{
    const cityContainer = document.getElementById("cityDisplay");
    let theText = myTextInput.value;
    state.cityName=theText;
    cityContainer.textContent = `Showing weather for: ${state.cityName}`;
}   
const changeToC=()=>{
    const degreeCountContainer = document.getElementById("degree");
    if (state.isF){
        state.isF=false;
        degreeCountContainer.textContent = Math.floor((state.degree -32)/1.8);
    }

}
const changeToF=()=>{
    const degreeCountContainer = document.getElementById("degree");
    if (! state.isF){
        state.isF=true;
    }
    degreeCountContainer.textContent=state.degree;
}
const changeTemp=(e)=> { //refactor 2 functions together to change temp
    const degreeCountContainer = document.getElementById("degree");
    e.target.id ==='plus'? state.degree++: state.degree--;
    degreeCountContainer.textContent=state.degree;
}
// const plusTemp = (e) => {
//     const degreeCountContainer = document.getElementById("degree");
//     state.degree += 1;
//     degreeCountContainer.textContent=state.degree;

//     const temperature = document.querySelector("#degree");
//     if (temperature > 80) {
//         temperature.style.color = 'red';
        
//     }
//     state.clickCount=0;
// };
// const minusTemp = () => {
//     const degreeCountContainer = document.getElementById("degree");
//     state.degree -= 1;
//     degreeCountContainer.textContent = state.degree;

//     const temperature = document.querySelector("#degree");
//     if (temperature < 40) {
//         temperature.style.color = 'blue';
//     }
//     state.clickCount=0;
// };
const resetTemp = () => {
    const degreeCountContainer = document.getElementById("degree");
    state.degree = 60;
    state.isF=true;
    
    degreeCountContainer.textContent=state.degree;
    
}
const getLocation=(theText)=> {
    axios
    .get('https://us1.locationiq.com/v1/search.php?', {
        params:{
            key: pk.c4dffe85e029156fa5f4e3dee8600c56,
            q: theText,
            format: 'json',
            },
    })
    .then((response) => {
        const lat=response.data[0].lat;
        const lon=response.data[0].lon;
        return { lat, lon };
    }
)};
const getWeather = (loc)=>{
    axios
    .get('https://api.openweathermap.org/data/2.5/onecall', {
        params:{
            appid: '05bcade8cd63472439446adea0a55dec',
            lat: loc.lat,
            lon: loc.lon,
            units: 'imperial',
            },
    })
    .then((response) => {
        const temp=response.data[0].current.temp;
        return temp;
    }
)};
const showRealWeather = ()=> {
    const degreeCountContainer = document.getElementById("degree");
    let theText = myTextInput.value;
    loc=getLocation(theText);
    temp=getWeather(loc);
    state.degree=temp;
    state.isF=true;
    degreeCountContainer.textContent=state.degree;
}
const selectSky= (event)=>{
    const result = document.querySelector('.result');
    result.textContent = event.target.value;
    
}
const changeBackground=(event) =>{ // this one doesn't work
    let imgPath ='';
    imgPath = document.getElementById("body").style.backgroundImage;
    if (event.target.value == 'sunny'){
        document.getElementById("body").style.backgroundImage=url('/assets/sunny.gif');
    }else if (event.target.value == 'rainy'){
        document.getElementById("body").style.backgroundImage=url('/assets/rainy.gif');
    }else if (event.target.value == 'snowy'){
        document.getElementById("body").style.backgroundImage=url('/assets/snow.gif');
    }else if (event.target.value == 'cloudy'){
        document.getElementById("body").style.backgroundImage=url('/assets/cloudy.webp');
    }
    
}
const registerEventHandlers = () => {
    console.log('hello!');
    const realWeather=document.getElementById("s");
    realWeather.addEventListener("click", showRealWeather);

    const plusDegree = document.getElementById("plus");
    plusDegree.addEventListener("click", changeTemp);

    const minusDegree = document.getElementById("minus");
    minusDegree.addEventListener("click", changeTemp);

    const cButton = document.getElementById("c-button");
    cButton.addEventListener("click", changeToC);
    const fButton = document.getElementById("f-button");
    fButton.addEventListener("click", changeToF);

    const resetDegree = document.getElementById("resetbutton");
    resetDegree.addEventListener("click", resetTemp);

    const showCity= document.getElementById("s");
    showCity.addEventListener('click', showCityName);
    showCity.addEventListener('click', showRealWeather);

    const sky= document.getElementById("select-sky");
    sky.addEventListener('change', selectSky);
    sky.addEventListener('change', changeBackground);
}


// DOM listener
document.addEventListener("DOMContentLoaded", registerEventHandlers);


