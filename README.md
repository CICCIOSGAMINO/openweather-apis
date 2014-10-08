OpenWeatherMap.org APIs
=======================


### Intro
Simple abstraction layer for use the services offered by the OpenWeatherMap.org website through its API's. You
can easy reach the weather informations you need on over 400k weather stations.

### Version details
Main changes by version (if the first number change, old code you have write is not supported :(   ) :

+ First version  
+ From version 1.2.0 minor buds fix  
+ From version 2.0.0 link in the callback for the operational error such as the ClientRequest, HTTPParse and so on ...
+ From version 2.0.1 minor fix (no code impact)

### Installation

	npm install openweather-api

or install and save in the package.json

	npm install openweather-api --save


### How to Use

Install the package with npm, import with the require statement in the app and start to use the apis. First
step is set the params for the request (request the api-key at http://openweathermap.org/register ):

	var weather = require('weather-api');

	weather.setLang('it');
	// English - en, Russian - ru, Italian - it, Spanish - es (or sp), Ukrainian - uk (or ua),
	// German - de, Portuguese - pt,Romanian - ro, Polish - pl, Finnish - fi, Dutch - nl, French - fr,
	// Bulgarian - bg, Swedish - sv (or se), Chinese Traditional - zh_tw, Chinese Simplified - zh (or zh_cn),
	// Turkish - tr, Croatian - hr, Catalan - ca

	weather.setCity('Fairplay');

	// 'metric'  'internal'  'imperial'
 	weather.setUnits('metric');

	// check http://openweathermap.org/appid#get for get the APPID
 	weather.setAPIID('ssdglnsdogdh441s91gs6');




### Current Weather Data
Using the following requests to API you can get current weather data for any location on the Earth. Current weather data are updated in real time based on data from global weather providers and more than 40,000 weather stations. Weather data is available in JSON.

### Methods
Import the module and start to use the functions :


	// get the HTTP  statusCode of the response es. 200
	weather.getResponseCode(function(err, code){
		console.log(code);
	});

	// get the Temperature  
	weather.getTemperature(function(err, temp){
		console.log(temp);
	});

	// get the Atm Pressure
	weather.getPressure(function(err, pres){
		console.log(pres);
	});

	// get the Humidity
	weather.getTemperature(function(err, hum){
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

	/*

		return a complete openweathermap.org json object

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

	*/

	// get a simple JSON Object with temperature, humidity, pressure and description
	weather.getSmartJSON(function(smart){
		console.log(smart);
	});


	/*

		this is the JSON object returned by the getSmartJSON()

		{
			temp : 25,
			humidity : 88,
			pressure : 101325,
			description : 'sun',
			weathercode : 200
		}

	*/

this JSON object is easy to use and is enougth for a lot of possible use of the weather data, for example the
weathercode is easy to use for build check function, draw the icons ecc, for the complete table about this code
go to this link on official [docs][1].


### Error
Use the callback to check if a error raise on the request (HTTP server unreachable or other connection, request problem),
you need to manage the error on the request, for example :

		weather.getTemperature(function(err, temp){
			if(err) console.log(err);

			// normal execution with no error
			});


### Test
The package is tested with mocha anc chai, you can find the tests in the /test folder. If you need to use more test on the
library open issue on github repo (THANKS).


### Hystorical Data  (TODO)


### Geographic location (TODO)

[1]:http://openweathermap.org/weather-conditions
