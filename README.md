![GitHub issues](https://img.shields.io/github/issues/CICCIOSGAMINO/openweather-apis)
[![npm version](https://badgen.net/npm/v/@cicciosgamino/openweather-apis)](https://www.npmjs.com/package/@cicciosgamino/openweather-apis)
[![Build Status](https://travis-ci.org/CICCIOSGAMINO/openweather-apis.svg?branch=master)](https://travis-ci.org/CICCIOSGAMINO/openweather-apis)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/cicciosgamino/openweather-apis)

# 🌞 @cicciosgamino/openweather-apis
Javascript module wrapped around the OpenWeatherMap.org APIs for free servicies (getForecast4Days() works only with pro services). First step to use the module is get OpenWeatherMap.org API key, request a APPID (API Key) on http://openweathermap.org/appid and start to get the weather data!

Follow the official site for more info about [OpenWeather](https://openweathermap.org/guide), and here if you want more info about the [APIs](https://openweathermap.org/current).

<p align="center">
  <a href="#installation">installation</a> •
  <a href="#nodejs">nodejs</a> •
	<a href="#web">web</a> •
  <a href="#errors">Errors</a> •
  <a href="#test">Test</a> •
  <a href="#todo">TODO</a> •
</p>

⚠️ Notice

- Only JSON format is handled (NOT XML)
- Only HTTPS requests (NOT HTTP)

## Installation
Like all node packages, install and mange operation are done by npm (use the -s if you want save
the package in the package.json file):

```bash
npm install @cicciosgamino/openweather-apis

# install and save dependency in package.json
npm install @cicciosgamino/openweather-apis --save

# global installation
npm install -g @cicciosgamino/openweather-apis
```

## Node.js
Install the package with npm, import the class you need:
```javascript
import { AsyncWeather } from '@cicciosgamino/openweather-apis'
const weatherInstance = await new AsyncWeather()
// retrieve the Api Key from OS env
const apiKey = process.env['OPENWEATHER_API_KEY'] || ''
// or copy the Api Key into
const apiKey = 'sdgfd5g5f46...your_api_key_here'

// You can use lang parameter to get the output in your language.
// The contents of the description field will be translated.
weather.setLang('it')
// weather.getLang() '' get the language
// af Afrikaans - al Albanian - ar Arabic - az Azerbaijani
// bg Bulgarian
// ca Catalan - cz Czech
// da Danish - de German
// el Greek - en English - eu Basque
// fa Persian (Farsi) - fi Finnish - fr French
// gl Galician
// he Hebrew - hi Hindi - hr Croatian - hu Hungarian
// id Indonesian - it Italian
// ja Japanese
// kr Korean
// la Latvian - lt Lithuanian
// mk Macedonian
// no Norwegian - nl Dutch
// pl Polish - pt Portuguese - pt_br Português Brasil
// ro Romanian - ru Russian
// sv, se Swedish - sk Slovak - sl Slovenian - sp, es Spanish - sr Serbian
// th Thai - tr Turkish
// ua, uk Ukrainian
// vi Vietnamese
// zh_cn Chinese Simplified - zh_tw Chinese Traditional - zu Zulu

// set the location, only one is used for the request if multiple locations set
// coordinates > zip + state Code > cityId > city

// or set the coordinates (latitude,longitude)
weather.setCoordinates(50.0467656, 20.0048731)
// weather.getCoordinates() 	{ latitude: '', longitude: '' }

// or set zip code and a valid country code
weather.setZipCodeAndCountryCode(24024, 'IT')
// weather.getZipCodeAndCountryCode()		{ zipCode: '', countryCode: '' }
// iso 3166 country code >>
// 'AD', 'AE', 'AF', 'AG', 'AI','AL', 'AM', 'AO', 'AQ', 'AR', 'AS', 'AT', 'AU', 'AW', 'AX', 'AZ',
// 'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ', 'BR', 'BS','BT', 'BV', 'BW', 'BY', 'BZ',
// 'CA', 'CC', 'CD', 'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CN', 'CO', 'CR', 'CU', 'CV', 'CW', 'CX', 'CY', 'CZ',
// 'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC', 'EE', 'EG', 'EH', 'ER', 'ES', 'ET', 'FI', 'FJ', 'FK', 'FM', 'FO', 'FR',
// 'GA', 'GB', 'GD', 'GE', 'GF', 'GG', 'GH', 'GI', 'GL', 'GM', 'GN', 'GP', 'GQ', 'GR', 'GS', 'GT', 'GU', 'GW', 'GY', 'HK', 'HM', 'HN', 'HR', 'HT', 'HU',
// 'ID', 'IE', 'IL', 'IM', 'IN', 'IO', 'IQ', 'IR', 'IS', 'IT', 'JE', 'JM', 'JO', 'JP',
// 'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KP', 'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY',
// 'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MH', 'MK', 'ML', 'MM', 'MN', 'MO', 'MP', 'MQ', 'MR', 'MS', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ',
// 'NA', 'NC', 'NE', 'NF', 'NG', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU', 'NZ','OM', 'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM', 'PN', 'PR', 'PS', 'PT', 'PW', 'PY',
// 'QA', 'RE', 'RO', 'RS', 'RU', 'RW',
// 'SA', 'SB', 'SC', 'SD', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 'SN', 'SO', 'SR', 'SS', 'ST', 'SV', 'SX', 'SY', 'SZ',
// 'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO', 'TR', 'TT', 'TV', 'TW', 'TZ',
// 'UA', 'UG', 'UM', 'US', 'UY', 'UZ', 'VA', 'VC', 'VE', 'VG', 'VI', 'VN', 'VU', 'WF', 'WS', 'YE', 'YT',
// 'ZA', 'ZM', 'ZW'

// or set city by ID, check the IDs in the file city.list.json.gz
// http://bulk.openweathermap.org/sample/
weather.setCityId(4367872)
// weather.getCityId()	'' get the city ID

// or set city by name
weather.setCity('Bergamo')
// weather.getCity()	'' get the city name

// set the units you need 'metric'  'internal'  'imperial'
weather.setUnits('metric')
// weather.getUnits() 	'' get the units

// check http://openweathermap.org/appid#get for get the APPID
weather.setApiKey(apiKey)
// weather.getApiKey() 	'' get the ApiKey
```

Now with the minimal set in place you can request the weather data! The module version after v5.0.0 included use Promise or Async/Await asynchronous coding style.
```javascript
// request the actual temperature [°C] of the location
weather.getTemperature()
  .then(result => console.log(`${typeof result} ${result}`))	// number 23.48
  .catch(error => console.log(error))

// request the actual pressure [hPa] of the location
weather.getPressure()
  .then(result => console.log(`${typeof result} ${result}`))  // number 1023
  .catch(error => console.log(error))

// request the actual humidity [%] of the location
weather.getHumidity()
	.then(result => console.log(`${typeof result} ${result}`))  // number 51
  .catch(error => console.log(error))

// request the weather title
weather.getTitle()
  .then(result => console.log(`${typeof result} ${result}`))	// string clear
  .catch(error => console.log(error))

// request the weather description
weather.getDescription()
  .then(result => console.log(`${typeof result} ${result}`))	// string cielo sereno
  .catch(err => console.log(err))

// request the main weather data in JSON format
weather.getSmartJSON()
  .then(result => console.log(result))
  .catch(err => console.log(err))
// {
//  temp: 23.45,
//  humidity: 51,
//  pressure: 1023,
//  description: 'cielo sereno',
//  weathercode: 800,
//  rain: undefined
// }

// request all weather data
weather.getAllWeather()
	.then(result => console.log(result))
	.catch(error => console.log(error))
// {
//  coord: { lon: 6.9737, lat: 45.7896 },
//  weather: [
//    {
//      id: 800,
//      main: 'Clear',
//      description: 'cielo sereno',
//      icon: '01d'
//    }
//  ],
//  base: 'stations',
//  main: {
//    temp: 23.45,
//    feels_like: 23.18,
//    temp_min: 19.86,
//    temp_max: 26.55,
//    pressure: 1023,
//    humidity: 51,
//    sea_level: 1023,
//    grnd_level: 885
//  },
//  visibility: 10000,
//  wind: { speed: 1.38, deg: 241, gust: 2.22 },
//  clouds: { all: 1 },
//  dt: 1628760600,
//  sys: {
//    type: 2,
//    id: 2003229,
//    country: 'IT',
//    sunrise: 1628742511,
//    sunset: 1628793955
//  },
//  timezone: 7200,
//  id: 3177872,
//  name: 'Courmayeur',
//  cod: 200
// }

// (PRO APIs) request the forecast for the location where
// cnt is the hours of forecast from 1 to 96 (hours)
getForecast4Days (cnt)
	.then(result => console.log(result))
	.catch(error => console.log(error))

'Error: Response Code 401 >> Invalid API key. Please see http://openweathermap.org/faq#error401 for more info.'

// Use Async / Await
try {
	// request the actual pressure of the location
  const r = await weather.getPressure()
  console.log(`${typeof r} ${r}`)

	// ....
} catch(err) {
  console.log(err)
}
```

## Web
TODO

Comming Soon the WebComponent **openweather-apis-element**


## Errors
TODO

**Commons Errors**
Error: Response Code 401 >> Invalid API key. Please see http://openweathermap.org/faq#error401 for more info.

## Test
The package is tested with mocha and chai. You can find the tests in the /test folder. If you need more tests on module open an issue on the github repo (THANKS).

## TODO 🔧
- [ ] Implement Cities within a rectangle zone function
- [ ] Implement Cities in circle function

## 🧑‍💻 Author

| [![@cicciosgamino](https://raw.githubusercontent.com/CICCIOSGAMINO/cicciosgamino.github.io/master/images/justme%40412x412_round.png)](https://www.linkedin.com/in/marco-canali-859b6a52/) 	|
|:------------------------------------------------------------------------------------------:	|
|                                    **@cicciosgamino**                                      	|


## Support
Reach out to me at one of the following places:

- [Github](https://github.com/CICCIOSGAMINO)
- [Twitter](https://twitter.com/cicciosgamino)

## Donate

Donate help and contibutions!

## License
[GNU General Public License v3.0](https://github.com/CICCIOSGAMINO/init/blob/master/LICENSE)

Made 🧑‍💻 by [@cicciosgamino](https://cicciosgamino.web.app)
