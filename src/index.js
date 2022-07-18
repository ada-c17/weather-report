"use strict";


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
    const city= document.getElementById('name')
    const cityName= city.value;
    cityContainer.textContent = `Showing weather for: ${cityName}`;
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

const getTemp=() => {
    //console.log(loc)
    const loc= document.getElementById('name');
    
    return axios
    .get('http://127.0.0.1:5000/location', {
        params:{
            q: loc.value,
            },
    })
    .then((response) => {
        console.log(response);
        const lat=response.data[0].lat;
        const lon=response.data[0].lon;
        return axios.get('http://127.0.0.1:5000/weather', {
        params:{
            lat: lat,
            lon: lon,
            },
        })
    })

    .then((response) => {
        
        const temp=response.data.current.temp;
        state.degree=Math.floor((temp-273.15)*1.8+32)
        document.getElementById("degree").textContent=state.degree;
        return state.degree;
    })
    .catch((response)=>{
        console.log(response);
        console.log('ERROR');
    })
}

// const showRealWeather = ()=> {
//     const degreeCountContainer = document.getElementById("degree");
//     let theText = document.getElementById("name").value;
    
//     // let temp=getTemp(theText);
//     // state.isF=true;
//     // degreeCountContainer.textContent=temp;
// }
const selectSky= (event)=>{
    const result = document.querySelector('.result');
    result.textContent = event.target.value;
    
    }

const changeBackground=() =>{ 
    const sky = document.getElementById('select-sky');
    if (sky.value == 'sunny'){
        document.getElementById("body").style.backgroundImage= "url('/assets/sunny.gif')";
    }else if (sky.value == 'rainy'){
        
        document.getElementById("body").style.backgroundImage ="url('/assets/rainy.gif')";
    }else if (sky.value == 'snowy'){
        document.getElementById("body").style.backgroundImage='url("/assets/snow.gif")';
    }else if (sky.value == 'cloudy'){
        document.getElementById("body").style.backgroundImage="url('/assets/cloudy.webp')";
    }
    console.log('changeBackgroundCalled')
    
}
const registerEventHandlers = () => {
    
    const realWeather=document.getElementById("s");
    realWeather.addEventListener("click", getTemp);
    realWeather.addEventListener('click', showCityName);


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

    const sky= document.getElementById("select-sky");
    //sky.addEventListener('change', selectSky);
    sky.addEventListener('change', changeBackground);

}


// DOM listener
document.addEventListener("DOMContentLoaded", registerEventHandlers);


