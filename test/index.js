import { AsyncWeather } from '../index.js'
import chai from 'chai'

const expect = chai.expect
const weatherInstance = await new AsyncWeather()

const apiKey = process.env['OPENWEATHER_API_KEY'] || ''

describe('OpenweatherInstanceMap Mocha/Chai Tests: ', () => {
	describe('Settings: ', () => {
		it('Should set the API Key >> ', () => {
			weatherInstance.setApiKey(apiKey)
			chai.assert.equal(apiKey, weatherInstance.getApiKey())
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
					done()
				})
				.catch(err => done(err))
		})

		it('Should retrive pressure data ', (done) => {
			weatherInstance.getPressure()
				.then(d => {
					chai.assert.typeOf(d , 'number')
					done()
				})
				.catch(err => done(err))
		})
		
		it('Should retrive humidity data ', (done) => {
			weatherInstance.getHumidity()
				.then(d => {
					chai.assert.typeOf(d , 'number')
					done()
				})
				.catch(err => done(err))
		})

		it('Should retrive weather info', (done) => {
			weatherInstance.getDescription()
				.then(d => {
					chai.assert.typeOf(d , 'string')
					done()
				})
				.catch(err => done(err))
		})

		it('Should retrive weather brief description', (done) => {
			weatherInstance.getDescription()
				.then(d => chai.assert.typeOf(d , 'string'))
				done()
		})

		it('Should present all the JSON response data' , (done) => {
			weatherInstance.getAllWeather()
				.then(jsonObj => {
					chai.assert.property(jsonObj , 'weather')
					chai.assert.property(jsonObj , 'main')
					chai.assert.property(jsonObj , 'name')
					done()
				})
				.catch(err => done(err))
		})

		it('Should present the rain in mm of last hour if present ', (done) => {
			weatherInstance.getSmartJSON()
				.then(d => {
					if (d.rain) {
						chai.assert.typeOf(d.rain, 'number')
					} else {
						expect(d.rain).to.be.undefined
					}
					done()
				})
				.catch(err => done(err))
		})

		it('Should present MAX 4 day (8h) weatherInstance forecast', (done) => {
			weatherInstance.getForecast4Days(8)
				.then(d => {
					expect(d).not.empty
					expect(d.cnt).is.equal(8)
					expect(d.list).is.not.empty
					expect(d.list.length).is.equal(8)
					done()
				})
				.catch(err => done(err))
		})

		it('Should return a smart JSON weatherInstance object ', (done) => {
			weatherInstance.getSmartJSON()
				.then(d => {
					chai.assert.property(d, 'temp')
					chai.assert.property(d, 'humidity')
					chai.assert.property(d, 'pressure')
					chai.assert.property(d, 'description')
					done()
				})
				.catch(err => done(err))
		})
	})	// end describe

	describe('Error managment section', () => {
		it('Should show a HTTP error in the request ',() => {
			weatherInstance.getError()
				.then(result => done())
				.catch(err => {
					chai.assert.typeOf(err, 'error')
					done()
				})
		})
	})
})
