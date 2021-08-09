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
				.then(d => {
					chai.assert.typeOf(d , 'number')
				})
				done()
		})

		it('Should retrive pressure data ', (done) => {
			weatherInstance.getPressure()
				.then(d => chai.assert.typeOf(d , 'number'))
				done()
		})
		
		it('Should retrive humidity data ', (done) => {
			weatherInstance.getHumidity()
				.then(d => chai.assert.typeOf(d , 'number'))
				done()
		})

		it('Should retrive weather info', (done) => {
			weatherInstance.getDescription()
				.then(d => chai.assert.typeOf(d , 'string'))
				done()
		})

		it('Should retrive weather brief description', (done) => {
			weatherInstance.getDescription()
				.then(d => chai.assert.typeOf(d , 'string'))
				done()
		})

		it('Should present all the JSON weatherInstance response data' , (done) => {
			weatherInstance.getAllWeather()
				.then(d => chai.assert.property(jsonObj , 'weatherInstance'))
				done()
		})

		it('Should present the rain in mm of last hour if present ', (done) => {
			weatherInstance.getSmartJSON()
				.then(d => {
					chai.assert.typeOf(d.rain.value, 'number')
				})
				done()
		})

		it('Should present 3 day weatherInstance forecast', (done) => {
			weatherInstance.getweatherInstanceForecastForDays()
				.then(d => {
					expect(d).not.empty
					expect(d.cnt).is.equal(3)
					expect(d.list).is.not.empty
					expect(d.list.length).is.equal(3)
				})
			done()
		})

		it('Should return a smart JSON weatherInstance object ', (done) => {
			weatherInstance.getSmartJSON()
				.then(d => {
					chai.assert.property(d, 'temp')
					chai.assert.property(d, 'humidity')
					chai.assert.property(d, 'pressure')
					chai.assert.property(d, 'description')
				})
			done()
		})
	})	// end describe

	describe('Retrive data with SSL: ', () => {
		it('Should set the SSL to true ', () => {
			weatherInstance.setSSL()
			chai.assert.equal(true, weatherInstance.getSSL())
		})

		it('Should retrive temperature data (SSL)', (done) => {
			weatherInstance.getTemperature()
				.then(d => chai.assert.typeOf(d , 'number'))
			done()
		})

		it('Should retrive pressure data (SSL)', (done) => {
			weatherInstance.getPressure()
				.then(d => chai.assert.typeOf(d , 'number'))
			done()
		})

		it('Should retrive humidity data (SSL)', (done) => {
			weatherInstance.getHumidity()
				.then(d => chai.assert.typeOf(hum , 'number'))
			done()
		})

		it('Should retrive description of Weather (SSL)', (done) => {
			weatherInstance.getDescription()
				.then(d => chai.assert.typeOf(desc  , 'string'))
			done()
		})

		it('Should present all the JSON weather data (SSL)', (done) => {
			weatherInstance.getAllweatherInstance()
				.then(d => chai.assert.property(jsonObj , 'weatherInstance'))
			done()
		})

		it('Should present the rain in mm of last hour (SSL)', (done) => {
			weatherInstance.getSmartJSON()
				.then(d => {
					chai.assert.typeOf(jsonObj.rain, 'number')
				})
			done()
		})

		it('Should present short-term forecast (SSL)', (done) => {
			weatherInstance.getweatherInstanceForecast()
				.then(d => {
					expect(d).not.empty
          expect(d.cnt).is.equal(40)
					expect(d.list).is.not.empty
				})
			done()
		})

		it('Should present 3 day weatherInstance forecast (SSL)', (done) => {
			weatherInstance.getweatherInstanceForecastForDays(3, function(err, obj){
				expect(obj).not.empty;
				expect(obj.cnt).is.equal(3);
				expect(obj.list).is.not.empty;
				expect(obj.list.length).is.equal(3);
				done();
			});
		});

		it('Should return a smart JSON weatherInstance object (SSL)', (done) => {
			weatherInstance.getSmartJSON()
				.then(d => {
					chai.assert.property(d, 'temp')
					chai.assert.property(d, 'humidity')
					chai.assert.property(d, 'pressure')
					chai.assert.property(d, 'description')
				})
			done()
		})
	})

	describe('Error managment section', () => {
		it('Should show a HTTP error in the request ',() => {
			weatherInstance.getError()
				.then(result => 'ok')
				.catch(err => {
					chai.assert.typeOf(err, 'error')
				})
		})
	})
})
