const axios = require('axios');

const URL = 'https://us1.locationiq.com/v1/reverse.php';
const API_KEY = 'pk.bb55a79b7d91cfd4177159e4d3d58a1f';
const city = form.elements.query.value;
const config = { params: { key: API_KEY, q: city, format: 'json' } };

axios.get(URL, config).then((response) => {
  console.log(response);
});