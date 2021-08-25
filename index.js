let fetch, nodeFetch, Headers, Request

export class AsyncWeather {
  #language = ''
  #countryCode = ''
  #city = ''
  #cityId = ''
  #zipCode = ''
  #apiKey= ''
  #host = 'https://api.openweathermap.org'
  #path = '/data/2.5/weather?'
  #format = 'json'
  #units = 'metric'
  #coordinates = {
    latitude: '',
    longitude: ''
  }

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
  setZipCodeAndCountryCode (zipCode, countryCode) {
    this.#zipCode = String(zipCode)

    // iso3166 Country code
    const iso3166 = ['AD', 'AE', 'AF', 'AG', 'AI','AL', 'AM', 'AO', 'AQ', 'AR', 'AS', 'AT', 'AU', 'AW', 'AX', 'AZ',
                     'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ', 'BR', 'BS', 'BT', 'BV', 'BW', 'BY', 'BZ',
                     'CA', 'CC', 'CD', 'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CN', 'CO', 'CR', 'CU', 'CV', 'CW', 'CX', 'CY', 'CZ',
                     'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ',
                     'EC', 'EE', 'EG', 'EH', 'ER', 'ES', 'ET', 
                     'FI', 'FJ', 'FK', 'FM', 'FO', 'FR',
                     'GA', 'GB', 'GD', 'GE', 'GF', 'GG', 'GH', 'GI', 'GL', 'GM', 'GN', 'GP', 'GQ', 'GR', 'GS', 'GT', 'GU', 'GW', 'GY',
                     'HK', 'HM', 'HN', 'HR', 'HT', 'HU',
                     'ID', 'IE', 'IL', 'IM', 'IN', 'IO', 'IQ', 'IR', 'IS', 'IT', 
                     'JE', 'JM', 'JO', 'JP',
                     'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KP', 'KR', 'KW', 'KY', 'KZ',
                     'LA', 'LB', 'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY',
                     'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MH', 'MK', 'ML', 'MM', 'MN', 'MO', 'MP', 'MQ', 'MR', 'MS', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ',
                     'NA', 'NC', 'NE', 'NF', 'NG', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU', 'NZ',
                     'OM',
                     'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM', 'PN', 'PR', 'PS', 'PT', 'PW', 'PY',
                     'QA',
                     'RE', 'RO', 'RS', 'RU', 'RW',
                     'SA', 'SB', 'SC', 'SD', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 'SN', 'SO', 'SR', 'SS', 'ST', 'SV', 'SX', 'SY', 'SZ',
                     'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO', 'TR', 'TT', 'TV', 'TW', 'TZ',
                     'UA', 'UG', 'UM', 'US', 'UY', 'UZ',
                     'VA', 'VC', 'VE', 'VG', 'VI', 'VN', 'VU', 
                     'WF', 'WS',
                     'YE', 'YT',
                     'ZA', 'ZM', 'ZW']

    if (iso3166.includes(countryCode.toUpperCase())) {
      this.#countryCode = countryCode.toUpperCase()
    } else {
      throw new Error('Country code not valid! Enter a valid contry code!')
    }
  }

  /**
   * Getter for the zipCode
   *
   * @returns {Object} - { zipCode: '', countryCode: '' }
   */
   getZipCodeAndCountryCode () {
    return {
      zipCode: this.#zipCode,
      countryCode: this.#countryCode
    }
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
   * Setter for the apiKey
   *
   * @param {String} apiKey - String apiKey to set
   */
  setApiKey (apiKey) {
    this.#apiKey = apiKey
  }

  /**
   * Getter for the apiKey
   *
   * @returns {String} - apiKey string
   */
  getApiKey () {
    return this.#apiKey
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
          // check if is a 20x / 30x response
          if (data.cod > 199 && data.cod < 400) {
            if (data.main.temp && typeof data.main.temp === 'number') {
              resolve(data.main.temp)
            } else {
              reject(new Error('Temperature data NOT found or in bad format.'))
            }
          } else {
            // handle response.cod out of ok range
            reject(new Error(`Response Code ${data.cod} >> ${data.message}`))
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
          // check if is a 20x / 30x response
          if (data.cod > 199 && data.cod < 400) {
            if (data.main.pressure && typeof data.main.pressure === 'number') {
              resolve(data.main.pressure)
            } else {
              reject(new Error('Pressure data NOT found or in bad format.'))
            }
          } else {
            // handle response.cod out of ok range
            reject(new Error(`Response Code ${data.cod} >> ${data.message}`))
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
          // check if is a 20x / 30x response
          if (data.cod > 199 && data.cod < 400) {
            if (data.main.humidity && typeof data.main.humidity === 'number') {
              resolve(data.main.humidity)
            } else {
              reject(new Error('Humidity data NOT found or in bad format.'))
            }
          } else {
            // handle response.cod out of ok range
            reject(new Error(`Response Code ${data.cod} >> ${data.message}`))
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
   getTitle () {
    const p = new Promise((resolve, reject) => {
      this.#handleFetch()
        .then(data => {
          // check if is a 20x / 30x response
          if (data.cod > 199 && data.cod < 400) {
            if (data.weather[0].main && typeof data.weather[0].main === 'string') {
              resolve(data.weather[0].main)
            } else {
              reject(new Error('Weather Info NOT found or in bad format.'))
            }
          } else {
            // handle response.cod out of ok range
            reject(new Error(`Response Code ${data.cod} >> ${data.message}`))
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
          // check if is a 20x / 30x response
          if (data.cod > 199 && data.cod < 400) {
            if (data.weather[0].description && 
                  typeof data.weather[0].description === 'string'
              ) {
              resolve(data.weather[0].description)
            } else {
              reject(new Error('Weather Description NOT found or in bad format.'))
            }
          } else {
            // handle response.cod out of ok range
            reject(new Error(`Response Code ${data.cod} >> ${data.message}`))
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
          // check if is a 20x / 30x response
          if (data.cod > 199 && data.cod < 400) {
            resolve(data)
          } else {
            // handle response.cod out of ok range
            reject(new Error(`Response Code ${data.cod} >> ${data.message}`))
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  /**
   * Get the hourly forecast for 4 days MAX
   * https://openweathermap.org/api/hourly-forecast
   * @returns Promise(data, error)
   */
  getForecast4Days (cnt) {
    return new Promise((resolve, reject) => {
      this.#handleProFetch(cnt)
        .then(data => {
          // check if is a 20x / 30x response
          if (data.cod > 199 && data.cod < 400) {
            resolve(data)
          } else {
            // handle response.cod out of ok range
            reject(new Error(`Response Code ${data.cod} >> ${data.message}`))
          }
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
          // check if is a 20x / 30x response
          if (data.cod > 199 && data.cod < 400) {
            resolve({
              temp: data?.main?.temp,
              humidity: data?.main?.humidity,
              pressure: data?.main?.pressure,
              description: data.weather[0]?.description,
              weathercode: data.weather[0]?.id,
              rain: data?.precipitation
            })
          } else {
            // handle response.cod out of ok range
            reject(new Error(`Response Code ${data.cod} >> ${data.message}`))
          }

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
   * Wrapper around the fetch to open-weather pro endpoint, here 
   * where the URL is build
   *
   */
  #handleProFetch(cnt) {

    // compose the path for the forecast request
    const host = 'https://pro.openweathermap.org'
    const path = '/data/2.5/forecast/hourly?'
    const searchParams = new URLSearchParams('')
    // handle the priority to set the place (coordinates, zip + state, cityId, city)
    if (this.#coordinates.latitude !== '' && this.#coordinates.longitude !== '') {
      searchParams.append('lat', this.#coordinates.latitude)
      searchParams.append('lon', this.#coordinates.longitude)
    } else if (this.#zipCode !== '') {
      searchParams.append('zip', `${this.#zipCode},${this.#countryCode}`)
    } else if (this.#cityId !== '') {
      searchParams.append('id', this.#cityId)
    } else if (this.#city !== '') {
      searchParams.append('q', this.#city)
    }

    searchParams.append('units', this.#units)
    searchParams.append('lang', this.#language)
    searchParams.append('mode', this.#format)
    // cnt number of timestamps in response (hours 1 - 96)
    if (isNaN(cnt) || cnt < 1 || cnt > 97) {
      cnt = 1
    }
    searchParams.append('cnt', cnt)
    searchParams.append('APPID', this.#apiKey)

    const requestURL = host + path + searchParams.toString()

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

    // Check if location set
    if (
      this.#city !== '' || 
      this.#cityId !== '' || 
      (this.#zipCode !== '' && this.#countryCode) || 
      (this.#coordinates.latitude !== '' && this.#coordinates.longitude !== '')
      ) {
        
        // make the fetch request
        return fetch(request)
          .then(response => response.json())
      } else {
        // reject promise
        return Promise.reject(
          new Error('No Location set! Use setCity, setCityId, setCoordinates or setZipCode before request data.')
        )
      }

  }

  /**
   * Wrapper around the fetch to open-weather endpoint, here the URL is build
   *
   */
  #handleFetch () {
    const hostPath = `${this.#host + this.#path}`
    const searchParams = new URLSearchParams('')
    // handle the priority to set the place (coordinates, zip + state, cityId, city)
    if (this.#coordinates.latitude !== '' && this.#coordinates.longitude !== '') {
      searchParams.append('lat', this.#coordinates.latitude)
      searchParams.append('lon', this.#coordinates.longitude)
    } else if (this.#zipCode !== '') {
      searchParams.append('zip', `${this.#zipCode},${this.#countryCode}`)
    } else if (this.#cityId !== '') {
      searchParams.append('id', this.#cityId)
    } else if (this.#city !== '') {
      searchParams.append('q', this.#city)
    }

    searchParams.append('units', this.#units)
    searchParams.append('lang', this.#language)
    searchParams.append('mode', this.#format)
    searchParams.append('APPID', this.#apiKey)

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

    // Check if the location set
    if (
      this.#city !== '' || 
      this.#cityId !== '' || 
      (this.#zipCode !== '' && this.#countryCode) || 
      (this.#coordinates.latitude !== '' && this.#coordinates.longitude !== '')
      ) {
        
        // make the fetch request
        return fetch(request)
          .then(response => response.json())
      } else {
        // reject promise
        return Promise.reject(
          new Error('No Location set! Use setCity, setCityId, setCoordinates or setZipCode before request data.')
        )
      }

    
  }
}
