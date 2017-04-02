// weather.js - APIs for openweathermap.org
(function(){

  var config = {
    city : 'Fairplay',
    units : 'metric',
    lan : 'it',
    format : 'json',
    APPID : null
  };

  // main settings
  var http = require('http');
  var options = {
    host : 'api.openweathermap.org',
    path: '/data/2.5/weather?q=fairplay',
    withCredentials: false
  };

  var weather = exports;

  // weather(set)  --------------------------------------------  weather(set)  ---------------------------------------------
  weather.setLang = function(lang){
    config.lan = lang.toLowerCase();
  };

  weather.setCity = function(city){
    config.city = encodeURIComponent(city.toLowerCase());
  }

  weather.setCoordinate = function(latitude, longitude){
    config.latitude = latitude;
    config.longitude = longitude;
  };

  weather.setCityId = function(cityid){
    config.cityId = cityid;
  };

  weather.setUnits = function(units){
    config.units = units.toLowerCase();
  };

  weather.setAPPID = function(appid){
    config.APPID = appid;
  };

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

  weather.getSmartJSON = function(callback){
    getSmart(callback);
  };

  // active functions()  -------------------------------------  active functions()  --------------------------------------------

  function getErr(callback){
    // set new path to throw the http exception
    options.path = 'timetocrash';
    http.get(options, function(err,data){
        return callback(err,data);
    });
  };

  function getPres(callback){
    getData(buildPath(), function(err,jsonObj){
      return callback(err,jsonObj.main.pressure);
    });
  };

  function getTemp(callback){
    getData(buildPath(), function(err,jsonObj){
      return callback(err,jsonObj.main.temp);
    });
  };

  function getHum(callback){
    getData(buildPath(), function(err,jsonObj){
      return callback(err,jsonObj.main.humidity);
    });
  };

  function getDesc(callback){
    getData(buildPath(), function(err,jsonObj){
      return callback(err, (jsonObj.weather)[0].description);
    });
  };

  function getSmart(callback){
    getData(buildPath(), function(err,jsonObj){
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
  };

  function getCoordinate(){
    var coordinateAvailable = config.latitude && config.longitude;
    var cityIdAvailable = config.cityId;
    var coordinateQuery = 'q='+config.city;
    if (cityIdAvailable) coordinateQuery = 'id='+config.cityId;
    else if (coordinateAvailable) coordinateQuery = 'lat='+config.latitude+'&lon='+config.longitude;
    return coordinateQuery;
  };

  function buildPath(){
    return '/data/2.5/weather?' + getCoordinate() + '&units=' + config.units + '&lang=' + config.lan + '&mode=json&APPID=' + config.APPID;
  };

  function buildPathForecast(){
    return '/data/2.5/forecast?' + getCoordinate() + '&units=' + config.units + '&lang=' + config.lan + '&mode=json&APPID=' + config.APPID;
  };

  function buildPathForecastForDays(days){
    return '/data/2.5/forecast/daily?' + getCoordinate() + '&cnt=' + days + '&units=' + config.units + '&lang=' + config.lan + '&mode=json&APPID=' + config.APPID;
  };

  function buildPathForecastForHours(hours) {
      return '/data/2.5/forecast/hour?' + getCoordinate() + '&cnt=' + hours + '&units=' + config.units + '&lang=' + config.lan + '&mode=json&APPID=' + config.APPID;
  };

  function getData(url, callback, tries){
    options.path = url;
    http.get(options, function(res){
      var chunks = '';
      res.on('data', function(chunk) {
          chunks += chunk;
      });
      res.on('end', function () {
          var parsed = {};

          if (!chunks && (!tries || tries < 3)) {
              return getData(url, callback, (tries||0)+1);
          }

          // Try-Catch added by Mikael Aspehed
          try{
            parsed = JSON.parse(chunks)
          }catch(e){
            parsed = {error:e}
          }

          return callback(null,parsed);
      });

      res.on('error', function(err){
          return callback(err, null);
      });
    });
  };

})();
