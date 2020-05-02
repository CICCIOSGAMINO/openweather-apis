# openweather-apis
Simple APIs to use with OpenWeatherMap.org free servicies, request a APPID on http://openweathermap.org/appid and start!

[![Build Status](https://travis-ci.org/CICCIOSGAMINO/openweather-apis.svg?branch=master)](https://travis-ci.org/CICCIOSGAMINO/openweather-apis)

## Intro
Simple abstraction layer for use the services offered by the OpenWeatherMap.org website through its API's. You can easy reach the weather informations you need on over 400k weather stations. For get the APPID follow the OpenWeather.org [link][3] and complete the request process.

## Version details
Main changes by version (if the first number change, old code you have written is not supported, for
example between version 1.x.x to version 2.x.x (I apologize for that), all minor/major/fix in: 

CHANGELOG.md 

## Installation
Like all node packages, install and mange operation are done by npm (use the -s if you want save
the package in the package.json file) :

```javascript
	npm install openweather-apis

	// install and save in package.json
	npm install openweather-apis --save

	// global installation
	npm install -g openweather-apis
```

## How to Use

Install the package with npm, import with the require statement in the app, and start to use the apis. First
step is set the params for the request (request the api-key at http://openweathermap.org/register ):

```javascript
	var weather = require('openweather-apis');

	weather.setLang('it');
	// English - en, Russian - ru, Italian - it, Spanish - es (or sp),
	// Ukrainian - uk (or ua), German - de, Portuguese - pt,Romanian - ro,
	// Polish - pl, Finnish - fi, Dutch - nl, French - fr, Bulgarian - bg,
	// Swedish - sv (or se), Chinese Tra - zh_tw, Chinese Sim - zh (or zh_cn),
	// Turkish - tr, Croatian - hr, Catalan - ca


	// set city by name
	weather.setCity('Fairplay');
 	// or set the coordinates (latitude,longitude)
	weather.setCoordinate(50.0467656, 20.0048731);
	// or set city by ID (recommended by OpenWeatherMap)
	weather.setCityId(4367872);

    // or set zip code
	weather.setZipCode(33615);

	// 'metric'  'internal'  'imperial'
 	weather.setUnits('metric');

	// check http://openweathermap.org/appid#get for get the APPID
 	weather.setAPPID(ownKey);
```



## Current Weather Data
Using the following requests to API, you can get current weather data for any location on the Earth. Current weather data are updated in real time based on data from global weather providers and more than 40,000 weather stations. Weather data is available in JSON.

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

## Test
The package is tested with mocha and chai. You can find the tests in the /test folder. If you need to use more tests on the
library, open an issue on the github repo (THANKS).

[3]:http://openweathermap.org/appid
