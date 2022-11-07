const axios = require('axios');

const FAAS_URLS = [];

const INTERVAL = 1000; // this is the rate we call setTimeout
const VARIANCE = 10000; // this is the max range of the random time (in milliseconds) setTimeout will wait

const invokeFunction = function() {
  let url = FAAS_URLS[Math.floor(Math.random() * FAAS_URLS.length)];

  axios.get(url)
  .then(res => console.log(res.data))
  .catch(err => console.log("Error: ", err.message))
};

setInterval(function() {
  let milliseconds = Math.floor(Math.random() * VARIANCE)
  setTimeout(invokeFunction, milliseconds);
}, INTERVAL);
