const axios = require('axios');

// const locQuery = "Seattle";

// axios
// 	.get(`http://127.0.0.1:5000/location?q=${locQuery}`)
// 	.then((response) => {
// 		console.log(response.data[0].lat, response.data[0].lon);
// 	}).catch((error) => {
// 		console.log('This is an error');
// 	})

// const findLatitudeAndLongitude = () => {
//   let latitude, longitude;
//   axios
//     .get(`http://127.0.0.1:5000/location?q=${cityName.textContent}`)
//     .then((response) => {
//       latitude = response.data[0].lat;
//       longitude = response.data[0].lon;
//       console.log('found latitude and longitude');
//       getWeather(latitude, longitude);
//     })
//     .catch((error) => {
//       console.log('error in findLatitudeAndLongitude');
//     });
// };

// const getWeather = (latitude, longitude) => {
//   axios
//     .get(`http://127.0.0.1:5000/weather?lat=${latitude}&lon=${longitude}`)

//     .then((response) => {
//       tempKelvin = response.current.temp;

//       temp = Math.floor(1.8 * (tempKelvin - 273) + 32);

//       console.log(temp);
//     });
// };

//************************* */
// const findLatitudeAndLongitude = (city) => {
//   let latitude, longitude;
//   axios
//     .get(`http://127.0.0.1:5000/location?q=${city}`)
//     .then((response) => {
//       latitude = response.data[0].lat;
//       longitude = response.data[0].lon;
//       console.log('found latitude and longitude');

//       getWeather(latitude, longitude);
//     })
//     .catch((error) => {
//       console.log('error in findLatitudeAndLongitude');
//     });
// };

// const getWeather = (latitude, longitude) => {
//   axios
//     .get(`http://127.0.0.1:5000/weather?lat=${latitude}&lon=${longitude}`)

//     .then((response) => {
//       const tempKelvin = response.data.current.temp;

//       const temp = Math.floor(1.8 * (tempKelvin - 273) + 32);

//       console.log(temp);

//       return temp;
//     });
// };

// const city = 'Seattle';
// findLatitudeAndLongitude(city);

//************************* */
//********************* */
let z = [];

const findLatitudeAndLongitude = (city) => {
  let latitude, longitude;
  axios
    .get(`http://127.0.0.1:5000/location?q=${city}`)
    .then((response) => {
      latitude = response.data[0].lat;
      longitude = response.data[0].lon;
      console.log('found latitude and longitude');
      console.log('1');

      getWeather(latitude, longitude);
      console.log(z);
    })
    .catch((error) => {
      console.log('error in findLatitudeAndLongitude');
    });
};

const getWeather = (latitude, longitude) => {
  axios
    .get(`http://127.0.0.1:5000/weather?lat=${latitude}&lon=${longitude}`)

    .then((response) => {
      const tempKelvin = response.data.current['temp'];

      const tempFar = Math.floor(1.8 * (tempKelvin - 273) + 32);

      console.log('2');

      z.push(tempFar);
      console.log(z);

      return tempFar;
    });
};

const xx = () => {
  console.log(z);
};
// console.log(findLatitudeAndLongitude('Seattle'));
findLatitudeAndLongitude('Seattle');
