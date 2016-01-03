var weather = require('./index.js');

weather.setAPPID('2a1ad423e9fad1a3ceda81fda56b1366');
weather.setLang('it');
weather.setUnits('metric');
weather.setCity('roma');
// weather.setCoordinate(41.9152,12.5068)


weather.getSmartJSON(function(err,smart){
    console.log(smart);
});
