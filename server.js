//add all the stuff to run the server
'use strict';
console.log('server is connected!!!');

//Requires
// in our requires we have to use 'require instead of import
// here we will list the requirements for a server

const express = require('express');
require('dotenv').config();
let data = require('./data/weather.json');
const cors = require('cors');

const app = express();
//set up the server to serve on a port
const PORT = process.env.PORT || 5005;
app.use(cors());


app.get('/', (request, response) => {
  //we want to send something back
  response.send('Hello from the server!');
});

app.get('/weather', (request, response) => {
  let lat = request.query.lat;
  let lon = request.query.lon;
  let searchQuery = request.query.searchQuery;
  console.log('req query object ', lat, lon, searchQuery);
  let weatherDataToInstant = data.find(weather => weather.city_name === searchQuery);
  // console.log('from JSON: ', weatherDataToInstant);
  // let dataToSendFE = new Weather(weatherDataToInstant);
  try {
    let weatherObjects = weatherDataToInstant.data.map((day) => {
      return new WeatherForecast(day);
    });
    response.send(weatherObjects);
  } catch (error) {
    //eslint-disable-next-line no-undef
    next(error);
  }
}
);

class WeatherForecast {
  constructor(weatherObject) {
    this.lowTemp = weatherObject.low_temp;
    this.maxTemp = weatherObject.max_temp;
    this.date = weatherObject.datetime;
    this.description = weatherObject.weather.description;
    console.log(weatherObject.low_Temp);
  }
}

//errors
// eslint-disable-next-line no-unused-vars
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.get('*', (request, response) => {
  response.send('the route does not exsist, sorry. ERROR 404');
});

//listen() is a method in express
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
