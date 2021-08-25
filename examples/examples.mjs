// local import
import { AsyncWeather } from '../index.js'
// node_modules import
// import { AsyncWeather } from '@cicciosgamino/openweather-apis'

const weather = await new AsyncWeather()
const apiKey = process.env['OPENWEATHER_API_KEY'] || ''
// set the language
weather.setLang('it')
// set the apiKey
weather.setApiKey(apiKey)
// set coordinates location to Courmayeur
weather.setCoordinates(45.789554, 6.973688)
// weather.setCity('courmayeur')

/* Get temperature data
weather.getTemperature()
  .then(result => console.log(`@${typeof result} ${result}`))
  .catch(error => console.log(error)) */

/* Get pressure data
weather.getPressure()
  .then(result => console.log(`${typeof result} ${result}`))  // number 1023
  .catch(error => console.log(error)) */

/* Async / Await style
try {
  const r = await weather.getPressure()
  console.log(`${typeof r} ${r}`)
} catch(err) {
  console.log(err)
} */

/* Humidity 
weather.getHumidity()
	.then(result => console.log(`${typeof result} ${result}`))
  .catch(error => console.log(error)) */

/* Get the weather main title
weather.getTitle()
  .then(result => console.log(`${typeof result} ${result}`))
  .catch(error => console.log(error)) */

/* All weather data */
weather.getAllWeather()
  .then(result => console.log(result))
  .catch(error => console.log(error))
 
/* Forecast next 4h
weather.getForecast4Days(4)
  .then(result => console.log(result))
  .catch(error => console.log(error)) */

/* Description
weather.getDescription()
  .then(result => console.log(`${typeof result} ${result}`))
  .catch(err => console.log(err)) */

/* All response JSON data
weather.setZipCodeAndCountryCode(24024, 'IT')
weather.getAllWeather()
  .then(result => console.log(result))
  .catch(err => console.log(err)) */

/* Smart JSON object with weather data
weather.getSmartJSON()
  .then(result => console.log(result))
  .catch(err => console.log(err)) */
