var weather = require('./index.js');

weather.setAPPID('_API_KEY_');
weather.setLang('it');
weather.setUnits('metric');
//weather.setCity('roma');
weather.setCoordinate(41.9152,12.5068)


weather.getOneCall(function(err,smart){
    console.log(smart);
});
