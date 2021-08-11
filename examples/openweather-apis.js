import { LitElement, html } from 'lit'
import { resolvePromise } from '../directive/resolve-promise'
import { AsyncWeather } from '../index.js'

class OpenweatherApis extends LitElement {
  static get properties () {
    return {
      temp: Number,
      apiKey: String,
      weatherAPI: Object
    }
  }

  constructor () {
    super()
    new AsyncWeather().then(w => {
      this.weatherAPI = w
      // set the apiKey
      this.weatherAPI.setApiKey(this.apiKey)
    })
  }

  render () {
    return html`
      Bergamo >> 
      ${this.weatherAPI
          ? resolvePromise(this.weatherAPI.getTemperature())
          : '...'}°C - 

      ${this.weatherAPI
          ? resolvePromise(this.weatherAPI.getDescription())
          : '...'}
    `
  }
}

customElements.define('openweather-apis', OpenweatherApis)
