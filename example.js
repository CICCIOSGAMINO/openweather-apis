var weather = require('./index.js');

weather.setAPPID(process.env.API_KEY);
weather.setLang('it');
weather.setUnits('metric');
//weather.setCity('roma');
weather.setCoordinate(41.9152,12.5068)


weather.getOneCall(function(err,smart){
    console.log(smart);
});
