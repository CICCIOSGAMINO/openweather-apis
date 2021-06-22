import { AsyncWeather } from './index.js'
const weatherInstance = await new AsyncWeather()
const myAppId = process.env['OPENWEATHER_API_KEY'] || ''

weatherInstance.setAppId(myAppId)
/*
weatherInstance.getTemperature()
  .then(result => {
    console.log(result)
  })
  .catch(error => {
    console.log(error)
  }) */

weatherInstance.getPressure()
  .then(result => {
    console.log(result)
  })
  .catch(error => {
    console.log(error)
  })
