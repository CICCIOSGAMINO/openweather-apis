/*jshint esversion: 6,node: true,-W041: false */
// weather.js - APIs for openweathermap.org
(function(){

  var config = {
    city : 'Fairplay',
    units : 'metric',
    lan : 'it',
    format : 'json',
    APPID : null,
    ssl: false,
    exclude: "minutely,hourly,alerts"
  };

  // main settings
  var http = require('http');
  var https = require('https');
  var querystring = require('querystring');
  var options = {
    host : 'api.openweathermap.org',
    path: '/data/2.5/weather?' + querystring.stringify({q: 'fairplay'}),
    withCredentials: false
  };

  var weather = exports;

  // weather(set)  --------------------------------------------  weather(set)  ---------------------------------------------
  weather.setLang = function(lang){
    config.lan = lang.toLowerCase();
  };

  weather.setCity = function(city){
    config.city = city.toLowerCase();
  };

  weather.setCoordinate = function(latitude, longitude){
    config.latitude = latitude;
    config.longitude = longitude;
  };

  weather.setCityId = function(cityid){
    config.cityId = cityid;
  };

  weather.setZipCode = function(zip){
    config.zip = zip;
  };

  weather.setUnits = function(units){
    config.units = units.toLowerCase();
  };

  weather.setAPPID = function(appid){
    config.APPID = appid;
  };
  weather.setSsl = function(ssl){
    config.ssl = ssl;
  };
  weather.setExclude = function(exclude) {
    config.exclude = exclude
  }
  // weather(get)  ---------------------------------------------  weather(get)  ---------------------------------------------
  weather.getLang = function(){
    return config.lan;
  };

  weather.getCity = function(){
    return config.city;
  };

  weather.getCoordinate = function(){
    return {
      "latitude": config.latitude,
      "longitude": config.longitude
    };
  };

  weather.getCityId = function(){
    return config.cityId;
  };

  weather.getZipCode = function(){
    return config.zip;
  };

  weather.getUnits = function(){
    return config.units;
  };

  weather.getFormat = function(){
    return config.format;
  };

  weather.getError = function(callback){
     getErr(callback);
  };

  weather.getAPPID = function(){
    return config.APPID;
  };

  weather.getSsl = function(){
    return config.ssl;
  };

  weather.getExclude = function(){
    return config.exclude;
  };

  // get temperature
  weather.getTemperature = function(callback){
    getTemp(callback);
  };

  // get the atmospheric pressure
  weather.getPressure = function(callback){
    getPres(callback);
  };

  weather.getHumidity = function(callback){
    getHum(callback);
  };

  weather.getDescription = function(callback){
    getDesc(callback);
  };

  weather.getAllWeather = function(callback){
    getData(buildPath(), callback);
  };

  weather.getWeatherForecast = function(callback){
    getData(buildPathForecast(), callback);
  };

  weather.getWeatherForecastForDays = function(days, callback){
    getData(buildPathForecastForDays(days), callback);
  };

  weather.getWeatherForecastForHours = function(hours, callback){
    getData(buildPathForecastForHours(hours), callback);
  };

  weather.getWeatherOneCall = function(callback){
    getData(buildPathOneCall(), callback);
  };

  weather.getSmartJSON = function(callback){
    getSmart(callback);
  };

  // active functions()  -------------------------------------  active functions()  --------------------------------------------
  function getHttp(){
    return options.ssl ? https : http;
  }

  function getErr(callback){
    // set new path to throw the http exception
    options.path = 'timetocrash';
    getHttp().get(options, function(err,data){
      return callback(err,data);
    });
  }

  function getPres(callback){
    getData(buildPath(), function(err,jsonObj){
      return callback(err,jsonObj.main.pressure);
    });
  }

  function getTemp(callback){
    getData(buildPath(), function(err,jsonObj){
      return callback(err,jsonObj.main.temp);
    });
  }

  function getHum(callback){
    getData(buildPath(), function(err,jsonObj){
      return callback(err,jsonObj.main.humidity);
    });
  }

  function getDesc(callback){
    getData(buildPath(), function(err,jsonObj){
      return callback(err, (jsonObj.weather)[0].description);
    });
  }

  function getSmart(callback){
    getData(buildPath(), function(err,jsonObj){
      if(err){
        return callback(err,null);
      }
      var smartJSON = {};
      smartJSON.temp = jsonObj.main.temp;
      smartJSON.humidity = jsonObj.main.humidity;
      smartJSON.pressure = jsonObj.main.pressure;
      smartJSON.description = ((jsonObj.weather[0]).description);
      smartJSON.weathercode = ((jsonObj.weather[0]).id);

      // return the rain in mm if present
      if(jsonObj.precipitation){
        smartJSON.rain = jsonObj.precipitation.value;
      }else {
        smartJSON.rain = 0;
      }

      if(jsonObj.rain){
        var rain3h = jsonObj.rain;
        smartJSON.rain = Math.round(rain3h['3h'] / 3);
      }

      return callback(err,smartJSON);
    });
  }

  function getCoordinate(){
    var coordinateAvailable = config.latitude && config.longitude;
    var cityIdAvailable = config.cityId;
    var coordinateQuery = {q: config.city};
    if (cityIdAvailable) coordinateQuery = {id: config.cityId};
    if (config.zip) coordinateQuery = {zip: config.zip};
    else if (coordinateAvailable) coordinateQuery = {lat: config.latitude, lon: config.longitude};
    return querystring.stringify(coordinateQuery);
  }

  function buildPath(){
    return '/data/2.5/weather?' + getCoordinate() + '&' + querystring.stringify({units: config.units, lang: config.lan, mode: 'json', APPID: config.APPID});
  }

  function buildPathForecast(){
    return '/data/2.5/forecast?' + getCoordinate() + '&' + querystring.stringify({units: config.units, lang: config.lan, mode: 'json', APPID: config.APPID});
  }

  function buildPathForecastForDays(days){
    return '/data/2.5/forecast/daily?' + getCoordinate() + '&' + querystring.stringify({cnt: days, units: config.units, lang: config.lan, mode: 'json', APPID: config.APPID});
  }

  function buildPathForecastForHours(hours) {
      return '/data/2.5/forecast/hourly?' + getCoordinate() + '&' + querystring.stringify({cnt: hours, units: config.units, lang: config.lan, mode: 'json', APPID: config.APPID});
  }

  function buildPathOneCall(){
    return '/data/2.5/onecall?' + getCoordinate() + '&' + querystring.stringify({units: config.units, lang: config.lan, exclude: config.exclude, APPID: config.APPID});
  }

  function getData(url, callback, tries){
    options.path = url;
    var conn = getHttp().get(options, function(res){
      var chunks = '';
      res.on('data', function(chunk) {
          chunks += chunk;
      });
      res.on('end', function () {
        try{
          var parsed = {};

          if (!chunks && (!tries || tries < 3)) {
              return getData(url, callback, (tries||0)+1);
          }
          parsed = JSON.parse(chunks);
          if(res.statusCode >199 && res.statusCode <400){
            return callback(null,parsed);
          }else{
            return callback(new Error(parsed.message||`Request failed with status code: ${res.statusCode}`),null);
          }
        }catch(e){
          return callback(e,null);
        }
      });

      res.on('error', function(err){
          return callback(err, null);
      });
    });

    conn.on('error', function(err){
      return callback(err, null);
    });
  }

})();
