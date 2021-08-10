import { AsyncWeather } from '../index.js'
const weatherInstance = await new AsyncWeather()
const apiKey = process.env['OPENWEATHER_API_KEY'] || ''

// set the apiKey
weatherInstance.setApiKey(apiKey)

/* 
weatherInstance.getTemperature()
  .then(result => {
    console.log(result)
  })
  .catch(error => {
    console.log(error)
  }) */

/* Get the pressure data
weatherInstance.getPressure()
  .then(result => {
    console.log(result)
  })
  .catch(error => {
    console.log(error)
  }) */

/* Forecast next 4h */
weatherInstance.getForecast4Days(4)
  .then(result => {
    console.log(result)
  })
  .catch(error => {
    console.log(error)
  })

/* Description 
weatherInstance.getDescription()
  .then(result => console.log(result))
  .catch(err => console.log(err)) */

/* All response JSON data
weatherInstance.getAllWeather()
  .then(result => console.log(result))
  .catch(err => console.log(err)) */

/* Smart JSON object with weather data
weatherInstance.getSmartJSON()
  .then(result => console.log(result))
  .catch(err => console.log(err)) */
