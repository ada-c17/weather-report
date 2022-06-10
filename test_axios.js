const axios = require("axios");


const serverAddress = "http://127.0.0.1:5000";
const city = "Ballard";
let longitude=0;
let latitude=0;



const parseWeatherReport = function(weatherData) {
  const tempKelvin = weatherData.current.temp;
  const tempFahrenheit = ((tempKelvin-273.15)*1.8)+32;
  const skyDescription = weatherData.current.weather[0].description;
  const cloudCoverage = `${weatherData.current.clouds}%`;


  return {"temp":tempFahrenheit, "sky":skyDescription};
};

//axios call for long and lat
const cityCallWeather = function(serverAddress, city) {
  axios.get(`${serverAddress}/location`, {
      params: {
        q:city,
      },
    })
    .then((response) => {
      console.log(response.status);
      longitude = response.data[0].lon;
      latitude = response.data[0].lat;

      axios.get(`${serverAddress}/weather`, {
          params: {
            lat:latitude,
            lon:longitude,
          },
        })
        .then((response) => {
          console.log(response.status);
          parseWeatherReport(response.data);
        })
        .catch((response) => {
          console.log(response.status);
          console.log("Mother fucking fuck")
        });

    })
    .catch((response) => {
      console.log(response.status);
      console.log("You FUCKED UP");
    })
    .finally(() => {
      console.log("okay all done! ^-^7");
    });
  };

console.log(cityCallWeather(serverAddress, city))
