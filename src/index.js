'use strict';
import 'dotenv/config';
import express from 'express';

require('dotenv').config();

/* from reading



const axios = require('axios');

const printSucess = (response) => {
  console.log('success', response.data);
};

const printError = (error) => {
  console.log('error', error.response.data);
};

axios
  .get('https://us1.locationiq.com/v1/search.php', {
    params: {
      key: process.env['API_KEY'],
      q: 'Seattle, Washington, USA',
      format: 'json',
    }
  })
  .then(printSuccess)
  .catch(printError)
  .finally(() => {
    console.log('this is always exectued, no matter what!)
  })





  */
