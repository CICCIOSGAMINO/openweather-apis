// test use cases - weather.js APIs
var chai = require('chai');
var expect = require('chai').expect;
var weather = require('../index.js');

var myAPPID = 'e58df82a2e41b81975178a27f21319bc';

describe('OpenWeatherMap ', function(){

	describe('Settings :', function(){

		it('Should set the APPID ', function(){
			weather.setAPPID(myAPPID);
			chai.assert.equal(myAPPID, weather.getAPPID());
		});

		it('Should set the language to Italia (it) ', function(){
			weather.setLang('it');
			chai.assert.equal('it', weather.getLang().toLowerCase());
		});

		it('Should set the units to metric  ', function(){
			weather.setUnits('metric');
			chai.assert.equal('metric', weather.getUnits().toLowerCase());
		});

		it('Should set the City to Fairplay ', function(){
			weather.setCity('Fairplay');
			chai.assert.equal('fairplay', weather.getCity().toLowerCase());
		});

		it('Should set the coordinate to 50.0467656, 20.0048731', function(){
			weather.setCoordinate(50.0467656, 20.0048731);
			var coordinates = weather.getCoordinate();
			expect(coordinates).be.not.empty;
			expect(coordinates.latitude).be.equal(50.0467656);
			expect(coordinates.longitude).be.equal(20.0048731);
		});

		it('Should set the City ID to 4367872', function(){
			weather.setCityId(4367872);
			var cityid = weather.getCityId();
			expect(cityid).to.equal(4367872);
		});
	});

	describe('Retrive data : ', function(){
		it('Should retrive temperature data ', function(done){
			weather.getTemperature(function(err, temp){
				chai.assert.typeOf(temp , 'number');
				done();
			});
		});
		it('Should retrive pressure data ', function(done){
			weather.getPressure(function(err, pres){
				chai.assert.typeOf(pres , 'number');
				done();
			});
		});
		it('Should retrive humidity data ', function(done){
			weather.getHumidity(function(err, hum){
				chai.assert.typeOf(hum , 'number');
				done();
			});
		});
		it('Should retrive brief description of the weather ', function(done){
			weather.getDescription(function(err, desc){
				chai.assert.typeOf(desc  , 'string');
				done();
			});
		});

		it('Should present all the JSON Weather response data ', function(done){
			weather.getAllWeather(function(err, jsonObj){
				chai.assert.property(jsonObj , 'weather');
				done();
			});
		});

		it('Should present the rain in mm of last hour if present ', function(done) {
			weather.getSmartJSON(function(err, jsonObj) {
				if(jsonObj.rain){
					chai.assert.typeOf(jsonObj.rain['3h'], 'number');
				}
				if(jsonObj.precipitation){
					chai.assert.typeOf(jsonObj.precipitation.value, 'number');
				}

				if(!(jsonObj.rain || jsonObj.precipitation)) {
					chai.assert.equal(jsonObj.rain, 0);
				}
				
				done();
			});
		});

		it('Should present short-term weather forecast', function(done){
			weather.getWeatherForecast(function(err, obj){
				expect(obj).not.empty;
                expect(obj.cnt).is.equal(40);
				expect(obj.list).is.not.empty;
				done();
			});
		});
		it('Should present 3 day weather forecast', function(done){
			weather.getWeatherForecastForDays(3, function(err, obj){
				expect(obj).not.empty;
				expect(obj.cnt).is.equal(3);
				expect(obj.list).is.not.empty;
				expect(obj.list.length).is.equal(3);
				done();
			});
		});

		it('Should return a smart JSON weather object ', function(done){
			weather.getSmartJSON(function(err, smart){
				chai.assert.property(smart, 'temp');
				chai.assert.property(smart, 'humidity');
				chai.assert.property(smart, 'pressure');
				chai.assert.property(smart, 'description');
				done();
			});
		});
	});

	describe('Retrive data with Ssl: ', function(){
		it('Should set the Ssl to true ', function(){
			weather.setSsl(true);
			chai.assert.equal(true, weather.getSsl());
		});

		it('Should retrive temperature data ', function(done){
			weather.getTemperature(function(err, temp){
				chai.assert.typeOf(temp , 'number');
				done();
			});
		});
		it('Should retrive pressure data ', function(done){
			weather.getPressure(function(err, pres){
				chai.assert.typeOf(pres , 'number');
				done();
			});
		});
		it('Should retrive humidity data ', function(done){
			weather.getHumidity(function(err, hum){
				chai.assert.typeOf(hum , 'number');
				done();
			});
		});
		it('Should retrive brief description of the weather ', function(done){
			weather.getDescription(function(err, desc){
				chai.assert.typeOf(desc  , 'string');
				done();
			});
		});

		it('Should present all the JSON Weather response data ', function(done){
			weather.getAllWeather(function(err, jsonObj){
				chai.assert.property(jsonObj , 'weather');
				done();
			});
		});

		it('Should present the rain in mm of last hour if present ', function(done) {
			weather.getSmartJSON(function(err, jsonObj) {
				if(jsonObj.rain){
					chai.assert.typeOf(jsonObj.rain['3h'], 'number');
				}
				if(jsonObj.precipitation){
					chai.assert.typeOf(jsonObj.precipitation.value, 'number');
				}

				if(!(jsonObj.rain || jsonObj.precipitation)) {
					chai.assert.equal(jsonObj.rain, 0);
				}
				
				done();
			});
		});

		it('Should present short-term weather forecast', function(done){
			weather.getWeatherForecast(function(err, obj){
				expect(obj).not.empty;
                expect(obj.cnt).is.equal(40);
				expect(obj.list).is.not.empty;
				done();
			});
		});
		it('Should present 3 day weather forecast', function(done){
			weather.getWeatherForecastForDays(3, function(err, obj){
				expect(obj).not.empty;
				expect(obj.cnt).is.equal(3);
				expect(obj.list).is.not.empty;
				expect(obj.list.length).is.equal(3);
				done();
			});
		});

		it('Should return a smart JSON weather object ', function(done){
			weather.getSmartJSON(function(err, smart){
				chai.assert.property(smart, 'temp');
				chai.assert.property(smart, 'humidity');
				chai.assert.property(smart, 'pressure');
				chai.assert.property(smart, 'description');
				done();
			});
		});
	});

});
