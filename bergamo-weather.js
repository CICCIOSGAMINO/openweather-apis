import {LitElement, html} from 'lit-element'
import { AsyncWeather } from './index.js'

// const myAppId = process.env['OPENWEATHER_API_KEY'] || ''

class BergamoWeather extends LitElement {
  static get properties () {
    return {
      temp: Number
    }
  }

  constructor () {
    super()
  }

  firstUpdated () {
    this.weatherInstance = await new AsyncWeather()
    this.weatherInstance.getTemperature()
      .then(result => {
        console.log(`@RESULT >> ${result}`)
        this.temp = result
      })
  }

  render () {
    return html`
      Bergamo >> ${this.temp} °C
    `
  }
}

customElements.define('bergamo-weather', BergamoWeather)
