const axios = require('axios');

const locQuery = "Seattle";

axios
	.get(`http://127.0.0.1:5000/location?q=${locQuery}`)
	.then((response) => {
		console.log(response.data[0].lat, response.data[0].lon);
	}).catch((error) => {
		console.log('This is an error');
	})