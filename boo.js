var weather = require('./index.js');

weather.getSmartJSON(function(data){
	console.log(data.weathercode);
});