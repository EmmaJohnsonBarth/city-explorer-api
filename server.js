'use strict';

console.log('server is connected!!!');

const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
// console.log('weather key: ', WEATHER_API_KEY);
const app = express();
const PORT = process.env.PORT || 5005;

app.use(cors());

app.get('/', (request, response) => {
  response.status(200).send('Hello from the server!');
});

app.get('/weather', (request, response) => {
  let lat = request.query.lat;
  let lon = request.query.lon;
  let searchQuery = request.query.searchQuery;
  console.log('req query object ', lat, lon, searchQuery);

  //instead of this line, we'll build out a URL that will call the API
  // let weatherDataToInstant = response.find(weather => weather.city_name === searchQuery);

  let URL = `https://api.weatherbit.io/v2.0/forecast/hourly?lat=${lat}&lon=${lon}&key=${WEATHER_API_KEY}&units=I`;

  axios.get(URL)
    .then(apiResponse => {
      response.send(apiResponse.data);
    })
    .catch(error => {
      console.log(error);
      response.status(500).send('Error fetching weather data');
    });
}
);



// console.log('from JSON: ', weatherDataToInstant);
// let dataToSendFE = new Weather(weatherDataToInstant);
//   try {
//     let weatherObjects = weatherDataToInstant.data.map((day) => {
//       return new WeatherForecast(day);
//     });

//     response.send(weatherObjects);
//   } catch (error) {
//     //eslint-disable-next-line no-undef
//     next(error);
//   }
// }
// );

class WeatherForecast {
  constructor(weatherObject) {
    this.temp = weatherObject.data[0].temp;
    this.feelsLike = weatherObject.data[0].app_temp;
    this.date = weatherObject.data.datetime;
    this.description = weatherObject.data[0].weather.description;
    // console.log(weatherObject.data);
  }
}

//errors
// eslint-disable-next-line no-unused-vars
// app.use((error, request, response, next) => {
//   response.status(500).send(error.message);
// });

app.get('*', (request, response) => {
  response.send('the route does not exist, sorry. ERROR 404');
});

//listen() is a method in express
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
