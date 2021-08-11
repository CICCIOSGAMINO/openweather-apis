![GitHub issues](https://img.shields.io/github/issues/CICCIOSGAMINO/openweather-apis)
[![npm version](https://badgen.net/npm/v/@cicciosgamino/progress-ring)](https://www.npmjs.com/package/@cicciosgamino/openweather-apis)
[![Build Status](https://travis-ci.org/CICCIOSGAMINO/openweather-apis.svg?branch=master)](https://travis-ci.org/CICCIOSGAMINO/openweather-apis)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/cicciosgamino/openweather-apis)

# 🌞 \<openweather-apis\>
Javascript module wrapped around the OpenWeatherMap.org APIs for free servicies (getForecast4Days() works only with pro services). First step to use the module is get OpenWeatherMap.org API key, request a APPID (API Key) on http://openweathermap.org/appid and start to get the weather data!

Follow the official site for more info about [OpenWeather](https://openweathermap.org/guide), and here if you want more info about the [APIs](https://openweathermap.org/current).

<p align="center">
  <a href="#installation">installation</a> •
  <a href="#nodejs">nodejs</a> •
	<a href="#web">web</a> •
  <a href="#api">api</a> •
  <a href="#accessibility">accessibility</a> •
  <a href="#todo">todo</a> •
</p>

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
import { AsyncWeather } from '../index.js'
const weatherInstance = await new AsyncWeather()
// retrieve the Api Key from OS env
const apiKey = process.env['OPENWEATHER_API_KEY'] || ''
// or copy the Api Key into
const apiKey = 'sdgfd5g5f46...your_api_key_here'

// You can use lang parameter to get the output in your language.
// The contents of the description field will be translated.
weather.setLang('it')
// weather.getLang() // get the language
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

// set the coordinates (latitude,longitude)
weather.setCoordinates(50.0467656, 20.0048731)
// weather.getCoordinates() { latitude: '', longitude: '' }

// or set zip code and a valid country code
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
weather.setZipCodeAndCountryCode(33615)

// or set city by ID, check the IDs in the file city.list.json.gz
// http://bulk.openweathermap.org/sample/
weather.setCityId(4367872)
// weather.getCityId()	// get the city ID

// set city by name
weather.setCity('Bergamo')
// weather.getCity()	// get the city name

// 'metric'  'internal'  'imperial'
weather.setUnits('metric')
// check http://openweathermap.org/appid#get for get the APPID
weather.setApiKey(apiKey)


```

## Web


## Methods
Import the module and start to use the functions :

```javascript
// get the Temperature  
weather.getTemperature(function(err, temp){
	console.log(temp);
});

// get the Atm Pressure
weather.getPressure(function(err, pres){
	console.log(pres);
});

// get the Humidity
weather.getHumidity(function(err, hum){
	console.log(hum);
});

// get the Description of the weather condition
weather.getDescription(function(err, desc){
	console.log(desc);
});

// get all the JSON file returned from server (rich of info)
weather.getAllWeather(function(err, JSONObj){
	console.log(JSONObj);
});
```

This function returns a complete openweathermap.org json object :

```javascript
		{"coord":{"lon":139,"lat":35},
		"sys":{"country":"JP","sunrise":1369769524,"sunset":1369821049},
		"weather":[{"id":804,"main":"clouds","description":"overcast clouds","icon":"04n"}],
		"main":{"temp":289.5,"humidity":89,"pressure":1013,"temp_min":287.04,"temp_max":292.04},
		"wind":{"speed":7.31,"deg":187.002},
		"rain":{"3h":0},
		"clouds":{"all":92},
		"dt":1369824698,
		"id":1851632,
		"name":"Shuzenji",
		"cod":200}
```
```javascript

	// get 3 days forecast
	weather.getWeatherForecastForDays(3, function(err, obj){
		console.log(obj);
	});


	// get a simple JSON Object with temperature, humidity, pressure and description
	weather.getSmartJSON(function(smart){
		console.log(smart);
	});
```

This is the simple JSON object returned by the getSmartJSON(), pretty useful ! The rain 
value can be zero if not measured or a mesured value. 

```javascript
		{
			temp : 25,
			humidity : 88,
			pressure : 101325,
			description : 'sun',
			rain: 4,
			weathercode : 200
		}
```

this JSON object is easy to use and is enough for a lot of possible use of the weather data, for example the
weathercode is easy to use for build check function, draw the icons ecc, for the complete table about this code
go to this link on official [docs][1].


## Geographic location
Yes, of course you can set the location to get info by the coordinates, first the latitude, second
the longitude. Sometimes use the coordinates are worse than the city name !

```javascript
	weather.setCoordinate(50.0467656, 20.0048731);
```


## Error
Use the callback to check if an error is raised on the request (HTTP server unreachable or other connection, request problem),
you need to handle the error on the request, for example :

```javascript
		weather.getTemperature(function(err, temp){
			if(err) console.log(err);

			// normal execution with no error
			});
```

## TODO

[] - Implement Cities within a rectangle zone function
[] - Implement Cities in circle function

## Test
The package is tested with mocha and chai. You can find the tests in the /test folder. If you need more tests on module open an issue on the github repo (THANKS).

[3]:http://openweathermap.org/appid
