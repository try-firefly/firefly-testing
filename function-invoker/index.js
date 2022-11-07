const axios = require('axios');

const FAAS_URLS = [
  "https://4c7mxmu2mvpnjugwjkrubznksu0tzgrc.lambda-url.eu-central-1.on.aws/",
  "https://ok44be5zia2dea3nuzfsllf3mq0bgnhs.lambda-url.eu-central-1.on.aws/",
  "https://2whoo2hwsk7how5crbuyyj5zb40bsnqp.lambda-url.eu-central-1.on.aws/",
];

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
