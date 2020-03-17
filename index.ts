import * as querystring from 'querystring';
import * as https from 'https';

interface Coordinates {
  latitude: string;
  longitude: string;
}

interface Response {
  on(event: string, callback: (chunk: string) => void): void;
}

export default class Weather {
    // properties 
    private _defaultCity = 'Bergamo'
    private _city: string = this._defaultCity;
    private _cityId: string = '';
    private _zip: string = ''; 
    private _units: string = 'metric'; 
    private _language: string =  'it';
    private _format: string = 'json';
    private _APPID: string = '';
    private _latitude: string = '';
    private _longitude: string = '';

    private _options = {
      host: 'api.openweathermap.org',
      path: '/data/2.5/weather?' + querystring.stringify({q: this._defaultCity}),
      withCredentials: false
    }

    // set methods 
    setLang(language: string) {
      this._language = language;
    }

    setCity(city: string) {
      this._city = encodeURIComponent(city.toLowerCase());
    }

    setCoordinate(latitude: string, longitude: string) {
      this._latitude = latitude;
      this._longitude = longitude;
    };
  
    setCityId(cityid: string) {
      this._cityId = cityid;
    };
  
    setZipCode(zip: string) {
      this._zip = zip;
    };

    setUnits(units: string) {
      this._units = units.toLowerCase();
    };
  
    setAPPID(appid: string) {
      this._APPID = appid;
    };

    // get method 
    getLang(): string {
      return this._language;
    };
  
    getCity(): string{
      return this._city;
    };
  
    getCoordinate(): Coordinates {
      return {
        "latitude": this._latitude,
        "longitude": this._longitude
      };
    };
  
    getCityId(): string {
      return this._cityId;
    };
  
    getZipCode(): string {
      return this._zip;
    };
  
    getUnits(): string {
      return this._units;
    };
  
    getFormat(): string {
      return this._format;
    };

    getAPPID(): string {
      return this._APPID;
    };

    /*
    getTemperature(callback) {
      getTemp(callback);
    };
  
    getPressure(callback){
      getPres(callback);
    };
  
    getHumidity(callback) {
      getHum(callback);
    };

    getError(callback) {
      getErr(callback);
   };

   getDescription(callback) {
    getDesc(callback);
  };

  getAllWeather(callback) {
    getData(buildPath(), callback);
  };

  getWeatherForecast(callback) {
    getData(buildPathForecast(), callback);
  };

  getWeatherForecastForDays(days, callback) {
    getData(buildPathForecastForDays(days), callback);
  };

  getWeatherForecastForHours(hours, callback) {
    getData(buildPathForecastForHours(hours), callback);
  };

  getSmartJSON(callback) {
    getSmart(callback);
  };
  */ 

  // private methods 
  private getData(
    url: string, 
    callback: () => void,
    tries: number
  ): void {

    this._options.path = url;
    let connection = https.get(this._options, (res: Response) => {
      let chunks = ``;
      res.on('data', (chunk: string) => {
        chunks += chunk;
      })
      res.on('end', () => {
        console.log(`@CHUNCK > ${chunks}`);
      })
    })
  }

  /*
  private getTemp(callback: (one: string, two: string)): (err: Error, temp: string)  {
    getData(buildPath(), function(err,jsonObj){
      return callback(err,jsonObj.main.temp);
    });
  }
  */
   
    
}


/* (function(){

  var config = {
    city : 'Fairplay',
    units : 'metric',
    lan : 'it',
    format : 'json',
    APPID : null,
    ssl: false
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

  // weather(set)  ----------------------------  weather(set)  -----------------------------
  weather.setLang = function(lang){
    config.lan = lang.toLowerCase();
  };

  weather.setCity = function(city){
    config.city = encodeURIComponent(city.toLowerCase());
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

  // weather(get)  ------------------------------  weather(get)  -------------------------------
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

  // active functions()  ---------------------  active functions()  -----------------------
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
    return '/data/2.5/weather?' + getCoordinate() 
      + '&' 
      + querystring.stringify({units: config.units, lang: config.lan, mode: 'json', APPID: config.APPID});
  }

  function buildPathForecast(){
    return '/data/2.5/forecast?' 
      + getCoordinate() 
      + '&' 
      + querystring.stringify({units: config.units, lang: config.lan, mode: 'json', APPID: config.APPID});
  }

  function buildPathForecastForDays(days){
    return '/data/2.5/forecast/daily?' 
      + getCoordinate() 
      + '&' 
      + querystring.stringify({cnt: days, units: config.units, lang: config.lan, mode: 'json', APPID: config.APPID});
  }

  function buildPathForecastForHours(hours) {
      return '/data/2.5/forecast/hourly?' 
        + getCoordinate() 
        + '&' 
        + querystring.stringify({cnt: hours, units: config.units, lang: config.lan, mode: 'json', APPID: config.APPID});
  }

  function getData(url, callback, tries){
    options.path = url;
    var conn = getHttp().get(options, function(res){
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
            parsed = JSON.parse(chunks);
          }catch(e){
            parsed = {error:e};
          }

          return callback(null,parsed);
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
*/ 