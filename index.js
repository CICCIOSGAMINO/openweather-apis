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
  #SSL = false
  #withCredentials = false

  constructor () {
    return (async () => {
      // init the instance for node.js or browsers
      await this.initFetch()
      return this
    })()
  }

  /**
   * Init the fetch native in browsers or with node-fetch in Node.js
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

  /**
   * Setter for the language
   *
   * @param {String} language - String language to set
   */
  setLang (language) {
    this.#language = String(language)
  }

  /**
   * Getter for the language
   *
   * @returns {String} - language string
   */
  getLang () {
    return this.#language
  }

  /**
   * Setter for the city
   *
   * @param {String} city - String city to set
   */
  setCity (city) {
    this.#city = encodeURIComponent(String(city).toLowerCase())
  }

  /**
   * Getter for the city
   *
   * @returns {String} - city string
   */
  getCity () {
    return this.#city
  }

  /**
   * Setter for coordinates as latitude & longitude
   *
   * @param {String} latitude - String latitude to set
   * @param {String} longitude - String longitude to set
   */
  setCoordinates (latitude, longitude) {
    this.#coordinates = {
      latitude: String(latitude),
      longitude: String(longitude)
    }
  }

  /**
   * Getter for the coordinates
   *
   * @returns {Object} - coordinates {latitude: '', longitude: ''}
   */
  getCoordinates () {
    return this.#coordinates
  }

  /**
   * Setter for the cityId
   *
   * @param {String} cityId - String cityId to set
   */
  setCityId (cityId) {
    this.#cityId = String(cityId)
  }

  /**
   * Getter for the cityId
   *
   * @returns {String} - cityId string
   */
  getCityId () {
    return this.#cityId
  }

  /**
   * Setter for the zipCode
   *
   * @param {String} zipCode - String zipCode to set
   */
  setZipCode (zipCode) {
    this.#zipCode = String(zipCode)
  }

  /**
   * Getter for the zipCode
   *
   * @returns {String} - zipCode string
   */
  getZipCode () {
    return this.#zipCode
  }

  /**
   * Setter for the measure units
   *
   * @param {String} units - String units to set
   */
  setUnits (units) {
    this.#units = String(units).toLocaleLowerCase()
  }

  /**
   * Getter for the measure units
   *
   * @returns {String} - units string
   */
  getUnits () {
    return this.#units
  }

  /**
   * Setter for the appId
   *
   * @param {String} appId - String appId to set
   */
  setAppId (appId) {
    this.#appId = appId
  }

  /**
   * Getter for the appId
   *
   * @returns {String} - appid string
   */
  getAppId () {
    return this.#appId
  }

  /**
   * Setter for SSL
   *
   * @param {Boolean} SSL - Active SSL
   */
  setSSL () {
    this.#SSL = true
  }

   /**
   * Getter for SSL
   *
   * @returns {Boolean} - true if active
   */
  getSSL () {
    return this.#SSL
  }

  /**
   * Function to request the temperature for the location set
   *
   * @returns {Promise<Number>} - Promise that resolve Temperature as Number
   */
  getTemperature () {
    const p = new Promise((resolve, reject) => {
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
    return p
  }

  /**
   * Function to request the pressure for the location set
   *
   * @returns {Promise<Number>} - Promise that resolve Temperature as Number
   */
  getPressure () {
    const p = new Promise((resolve, reject) => {
      this.#handleFetch()
        .then(data => {
          if (data.main.pressure && typeof data.main.pressure === 'number') {
            resolve(data.main.pressure)
          } else {
            reject(new Error('Pressure data NOT found or in bad format.'))
          }
        })
        .catch(err => {
          reject(err)
        })
    })
    return p
  }

  /**
   * Function to request the humidity for the location set
   *
   * @returns {Promise<Number>} - Promise that resolve Humidity as Number %
   */
   getHumidity () {
    const p = new Promise((resolve, reject) => {
      this.#handleFetch()
        .then(data => {
          if (data.main.humidity && typeof data.main.humidity === 'number') {
            resolve(data.main.humidity)
          } else {
            reject(new Error('Humidity data NOT found or in bad format.'))
          }
        })
        .catch(err => {
          reject(err)
        })
    })
    return p
   }

   /**
   * Function to request the Weather Title eg. Sun, Couds etc
   *
   * @returns {Promise<String>} - Promise that resolve Weather title as string
   */
   getWetherTitle () {
    const p = new Promise((resolve, reject) => {
      this.#handleFetch()
        .then(data => {
          if (data.weather.main && typeof data.weather.main === 'string') {
            resolve(data.weather.main)
          } else {
            reject(new Error('Weather Info NOT found or in bad format.'))
          }
        })
        .catch(err => {
          reject(err)
        })
    })
    return p
   }

  /**
   * Function to request the Weather Description based on weather and language eg. Nubi Sparse
   *
   * @returns {Promise<String>} - Promise that resolve Humidity as Number %
   */
  getDescription () {
    const p = new Promise((resolve, reject) => {
      this.#handleFetch()
        .then(data => {
          if (data.weather.description && typeof data.weather.description === 'string') {
            resolve(data.weather.description)
          } else {
            reject(new Error('Weather Description NOT found or in bad format.'))
          }
        })
        .catch(err => {
          reject(err)
        })
    })
    return p
  }

  
  /**
   * Fetch + JSON promise wrapper around the openweather endpoin request
   *
   * @returns {Promise<JSON>} - Promise that resolve in JSON meteo data
   */
  getAllWeather () {
    return new Promise((resolve, reject) => {
      this.#handleFetch()
        .then(data => {
          resolve(JSON.stringify(data))
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  getWeatherForecastForDays () {
    return new Promise((resolve, reject) => {
      this.#handleFetch()
        .then(data => {
          resolve(JSON.stringify(data))
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  /**
   * Compact JSON object (SMART) with main Weather data
   * @returns {Promise<JSON>} - Promise that resolve in Smart Weather JSON data
   */
  getSmartJSON () {
    const p = new Promise((resolve, reject) => {
      this.#handleFetch()
        .then(data => {
          resolve({
            temp: data?.main?.temp,
            humidity: data?.main?.humidity,
            pressure: data?.main?.pressure,
            description: data.weather[0]?.description,
            weathercode: data.weather[0]?.id,
            rain: data?.precipitation
          })

        })
        .catch(err => {
          reject(err)
        })
    })
    return p
  }

  /**
   * 
   * Moke a fake request that raise error
   */
   getError () {
     const p = new Promise((resolve, reject) => {
       reject('FAKE@ERROR')
     })
     return p
   }

  /**
   * Wrapper around the fetch to open-weather endpoint, here the URL is build
   *
   */
  #handleFetch () {
    const hostPath = `${this.#host + this.#path}`
    const searchParams = new URLSearchParams('')
    searchParams.append('q', this.#city)
    searchParams.append('units', this.#units)
    searchParams.append('lang', this.#language)
    searchParams.append('mode', this.#format)
    searchParams.append('APPID', this.#appId)

    const requestURL = hostPath + searchParams.toString()

    // set the headers and the HTTP request
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
