import { AsyncWeather } from '../index.js'
import chai from 'chai'

const expect = chai.expect
const weatherInstance = await new AsyncWeather()

const myAppId = process.env['OPENWEATHER_API_KEY'] || ''

describe('OpenweatherInstanceMap Mocha/Chai Tests: ', () => {
	describe('Settings: ', () => {
		it('Should set the AppId >> ', () => {
			weatherInstance.setAppId(myAppId)
			chai.assert.equal(myAppId, weatherInstance.getAppId())
		})

		it('Should set the language to Italia (it) >> ', () => {
			weatherInstance.setLang('it')
			chai.assert.equal('it', weatherInstance.getLang().toLowerCase())
		})

		it('Should set the units to metric  >> ', () => {
			weatherInstance.setUnits('metric')
			chai.assert.equal('metric', weatherInstance.getUnits())
		})

		it('Should set the City to Fairplay >> ', () => {
			weatherInstance.setCity('Fairplay')
			chai.assert.equal('fairplay', weatherInstance.getCity())
		})

		it('Should set the coordinate to 50.0467656, 20.0048731 >> ', () => {
			weatherInstance.setCoordinates(50.0467656, 20.0048731)
			const coordinates = weatherInstance.getCoordinates()
			expect(coordinates).be.not.empty
			expect(coordinates.latitude).be.equal('50.0467656')
			expect(coordinates.longitude).be.equal('20.0048731')
		})

		it('Should set the City ID to 4367872 >> ', () => {
			weatherInstance.setCityId(4367872)
			const cityid = weatherInstance.getCityId()
			expect(cityid).be.not.empty
			expect(cityid).be.equal('4367872')
		})
	})

	describe('Retrive data: ', () => {
		it('Should retrive temperature data >> ', (done) => {
			weatherInstance.getTemperature()
				.then(data => {
					chai.assert.typeOf(temp , 'number')
				})
				done()
		})

		it('Should retrive pressure data ', (done) => {
			weatherInstance.getPressure()
				.then(data => {
					chai.assert.typeOf(pres , 'number')
				})
				done()
		})
		
		it('Should retrive humidity data ', function(done){
			weatherInstance.getHumidity(function(err, hum){
				chai.assert.typeOf(hum , 'number');
				done();
			});
		});
		it('Should retrive brief description of the weatherInstance ', function(done){
			weatherInstance.getDescription(function(err, desc){
				chai.assert.typeOf(desc  , 'string');
				done();
			});
		});

		it('Should present all the JSON weatherInstance response data ', function(done){
			weatherInstance.getAllweatherInstance(function(err, jsonObj){
				chai.assert.property(jsonObj , 'weatherInstance');
				done();
			});
		});

		it('Should present the rain in mm of last hour if present ', function(done) {
			weatherInstance.getSmartJSON(function(err, jsonObj) {
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

		it('Should present short-term weatherInstance forecast', function(done){
			weatherInstance.getweatherInstanceForecast(function(err, obj){
				expect(obj).not.empty;
                expect(obj.cnt).is.equal(40);
				expect(obj.list).is.not.empty;
				done();
			});
		});
		it('Should present 3 day weatherInstance forecast', function(done){
			weatherInstance.getweatherInstanceForecastForDays(3, function(err, obj){
				expect(obj).not.empty;
				expect(obj.cnt).is.equal(3);
				expect(obj.list).is.not.empty;
				expect(obj.list.length).is.equal(3);
				done();
			});
		});

		it('Should return a smart JSON weatherInstance object ', function(done){
			weatherInstance.getSmartJSON(function(err, smart){
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
			weatherInstance.setSsl(true);
			chai.assert.equal(true, weatherInstance.getSsl());
		});

		it('Should retrive temperature data ', function(done){
			weatherInstance.getTemperature(function(err, temp){
				chai.assert.typeOf(temp , 'number');
				done();
			});
		});
		it('Should retrive pressure data ', function(done){
			weatherInstance.getPressure(function(err, pres){
				chai.assert.typeOf(pres , 'number');
				done();
			});
		});
		it('Should retrive humidity data ', function(done){
			weatherInstance.getHumidity(function(err, hum){
				chai.assert.typeOf(hum , 'number');
				done();
			});
		});
		it('Should retrive brief description of the weatherInstance ', function(done){
			weatherInstance.getDescription(function(err, desc){
				chai.assert.typeOf(desc  , 'string');
				done();
			});
		});

		it('Should present all the JSON weatherInstance response data ', function(done){
			weatherInstance.getAllweatherInstance(function(err, jsonObj){
				chai.assert.property(jsonObj , 'weatherInstance');
				done();
			});
		});

		it('Should present the rain in mm of last hour if present ', function(done) {
			weatherInstance.getSmartJSON(function(err, jsonObj) {
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

		it('Should present short-term weatherInstance forecast', function(done){
			weatherInstance.getweatherInstanceForecast(function(err, obj){
				expect(obj).not.empty;
                expect(obj.cnt).is.equal(40);
				expect(obj.list).is.not.empty;
				done();
			});
		});
		it('Should present 3 day weatherInstance forecast', function(done){
			weatherInstance.getweatherInstanceForecastForDays(3, function(err, obj){
				expect(obj).not.empty;
				expect(obj.cnt).is.equal(3);
				expect(obj.list).is.not.empty;
				expect(obj.list.length).is.equal(3);
				done();
			});
		});

		it('Should return a smart JSON weatherInstance object ', function(done){
			weatherInstance.getSmartJSON(function(err, smart){
				chai.assert.property(smart, 'temp');
				chai.assert.property(smart, 'humidity');
				chai.assert.property(smart, 'pressure');
				chai.assert.property(smart, 'description');
				done();
			});
		});
	});

	describe('Error managment section', function(){
		it('Should show a HTTP error in the request ',function(){
			weatherInstance.getError(function(err, data){
				chai.assert.typeOf(err, 'error');
			});
		});
	});

});
