let fetch, nodeFetch, Headers, Request, Response

export class AsyncWeather {
  constructor () {
    return (async () => {
      // init
      this._language = 'it'
      this._state = 'Italy'
      this._city = 'Bergamo'
      this._cityId = ''
      this._zipCode = ''
      this._host = 'https://api.openweathermap.org'
      this._path = '/data/2.5/weather?'
      this._format = 'json'
      this._units = 'metric'
      this._coordinates = {}
      this.withCredentials = false

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
    // tests if global scope is binded to window
    if (isBrowser()) {
      console.log('Running under browser')
    }
    if (isNode()) {
      console.log('running under node.js')
      nodeFetch = await import('node-fetch')
      // init the fetch Native Web APIs for Node.js
      fetch = nodeFetch.default
      Headers = nodeFetch.Headers
      Request = nodeFetch.Request
      Response = nodeFetch.Response
    }
  }

  // methods
  setLang (language) {
    this._language = String(language)
  }

  getLang () {
    return this._language
  }

  setCity (city) {
    this._city = encodeURIComponent(String(city).toLowerCase())
  }

  getCity () {
    return this._city
  }

  setCoordinates (latitude, longitude) {
    this._coordinates = {
      latitude: String(latitude),
      longitude: String(longitude)
    }
  }

  getCoordinates () {
    return this._coordinates
  }

  setCityId (cityId) {
    this._cityId = String(cityId)
  }

  getCityId () {
    return this._cityId
  }

  setZipCode (zipCode) {
    this._zipCode = String(zipCode)
  }

  getZipCode () {
    return this._zipCode
  }

  setUnits (units) {
    this._units = String(units).toLocaleLowerCase()
  }

  getUnits () {
    return this._units
  }

  setAppId (AppId) {
    this._AppId = AppId
  }

  getAppId () {
    return this._AppId
  }

  // Return the temperature value
  getTemperature () {
    const promise = new Promise((resolve, reject) => {
      this._handleFetch()
        .then(data => {
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

  // Request the complete Openweather response Object
  getAllWeather () {
    return this._handleFetch()
  }

  _handleFetch () {
    const hostPath = `${this._host + this._path}`
    const searchParams = new URLSearchParams('')
    searchParams.append('q', 'Bergamo')
    searchParams.append('units', this._units)
    searchParams.append('lang', this._language)
    searchParams.append('mode', this._format)
    searchParams.append('APPID', this._AppId)
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
