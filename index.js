let fetch, nodeFetch, Headers, Request

export class AsyncWeather {
  #language = 'it'
  #state = 'Italy'
  #city = 'Bergamo'
  #cityId = ''
  #zipCode = ''
  #appId= ''
  #host = 'https://api.openweathermap.org'
  #path = '/data/2.5/weather?'
  #format = 'json'
  #units = 'metric'
  #coordinates = {}
  #withCredentials = false

  constructor () {
    return (async () => {
      /* 
      this._state = 'Italy'
      this._city = 'Bergamo'
      this._cityId = ''
      this._zipCode = ''
      this._host = 'https://api.openweathermap.org'
      this._path = '/data/2.5/weather?'
      this._format = 'json'
      this._units = 'metric'
      this._coordinates = {}
      this.withCredentials = false */

      await this.initFetch()
      return this
    })()
  }

  /**
   * Init the fetch Native APIs for Node.js env from node-fetch
   */
  async initFetch () {
    const isBrowser = new Function('try {return this===window}catch(e){ return false}')
    const isNode = new Function('try {return this===global}catch(e){return false}')

    if (isBrowser()) {
      fetch = window.fetch
      Headers = window.Headers
      Request = window.Request
    }
    if (isNode()) {
      // import and use node-fetch
      nodeFetch = await import('node-fetch')
      fetch = nodeFetch.default
      Headers = nodeFetch.Headers
      Request = nodeFetch.Request
    }
  }

  // methods
  setLang (language) {
    this.#language = String(language)
  }

  getLang () {
    return this.#language
  }

  setCity (city) {
    this.#city = encodeURIComponent(String(city).toLowerCase())
  }

  getCity () {
    return this.#city
  }

  setCoordinates (latitude, longitude) {
    this.#coordinates = {
      latitude: String(latitude),
      longitude: String(longitude)
    }
  }

  getCoordinates () {
    return this.#coordinates
  }

  setCityId (cityId) {
    this.#cityId = String(cityId)
  }

  getCityId () {
    return this.#cityId
  }

  setZipCode (zipCode) {
    this.#zipCode = String(zipCode)
  }

  getZipCode () {
    return this.#zipCode
  }

  setUnits (units) {
    this.#units = String(units).toLocaleLowerCase()
  }

  getUnits () {
    return this.#units
  }

  setAppId (appId) {
    this.#appId = appId
  }

  getAppId () {
    return this.#appId
  }

  // Return the promise for temperature value
  getTemperature () {
    const promise = new Promise((resolve, reject) => {
      this.#handleFetch()
        .then(data => {
          // actual openweather map apis
          if (data.main.temp && typeof data.main.temp === 'number') {
            resolve(data.main.temp)
          } else {
            reject(new Error('Temperature data NOT found or in bad format.'))
          }
        })
        .catch(err => {
          reject(err)
        })
    })
    return promise
  }

  // Return the unmodified promise returned from fetch
  getAllWeather () {
    return this.#handleFetch()
  }

  // easy wrapper arounf the fetch to open-weather endpoint
  #handleFetch () {
    const hostPath = `${this.#host + this.#path}`
    const searchParams = new URLSearchParams('')
    searchParams.append('q', 'Bergamo')
    searchParams.append('units', this.#units)
    searchParams.append('lang', this.#language)
    searchParams.append('mode', this.#format)
    searchParams.append('APPID', this.#appId)
    // Iterate the search parameters.
    // for (const p of searchParams) {
    //   console.log(p)
    // }

    const requestURL = hostPath + searchParams.toString()
    console.log(requestURL)

    const headers = new Headers()
    const request = new Request(
      requestURL,
      {
        method: 'GET',
        headers,
        mode: 'cors',
        cache: 'default'
      })

    return fetch(request)
      .then(response => response.json())
  }
}
