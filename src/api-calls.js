// // import { state } from './index.js';

// const getLatAndLong = () => {
//   let latitude, longitude;

//   axios
//     .get('http://localhost:5000/location', {
//       params: {
//         // key: LOCATIONIQ_KEY,
//         q: state.city,
//         // format: 'json',
//       },
//     })
//     .then((response) => {
//       latitude = response.data[0].lat;
//       longitude = response.data[0].lon;
//       console.log(
//         `For ${state.city}, longitude is ${longitude} and latitude is ${latitude}.`
//       );
//     })

//     .catch((error) => {
//       console.log('Encountered an error with getLatAndLong.');
//     });
// };
