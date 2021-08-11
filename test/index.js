import { AsyncWeather } from '../index.js'
import chai from 'chai'

const expect = chai.expect
const weather = await new AsyncWeather()

const apiKey = process.env['OPENWEATHER_API_KEY'] || ''

describe('OpenweatherMap Mocha/Chai Tests: ', () => {
	describe('Settings: ', () => {
		it('Should set the API Key >> ', () => {
			weather.setApiKey(apiKey)
			chai.assert.equal(apiKey, weather.getApiKey())
		})

		it('Should set the language to Italia (it) >> ', () => {
			weather.setLang('it')
			chai.assert.equal('it', weather.getLang().toLowerCase())
		})

		it('Should set the units to metric  >> ', () => {
			weather.setUnits('metric')
			chai.assert.equal('metric', weather.getUnits())
		})

		it('Should set the City to Bergamo >> ', () => {
			weather.setCity('Bergamo')
			chai.assert.equal('bergamo', weather.getCity())
		})

		it('Should set the coordinate to 50.0467656, 20.0048731 >> ', () => {
			weather.setCoordinates(50.0467656, 20.0048731)
			const coordinates = weather.getCoordinates()
			expect(coordinates).be.not.empty
			expect(coordinates.latitude).be.equal('50.0467656')
			expect(coordinates.longitude).be.equal('20.0048731')
		})

		it('Should set the City ID to 4367872 >> ', () => {
			weather.setCityId(4367872)
			const cityid = weather.getCityId()
			expect(cityid).be.not.empty
			expect(cityid).be.equal('4367872')
		})

		it('Should set a valid Country code eg. IT >> ', () => {
			weather.setZipCodeAndCountryCode('', 'IT')
			const { zipCode, countryCode } = weather.getZipCodeAndCountryCode()
			expect(countryCode).to.be.equal('IT')
		})

		it('Should set a not valid Country code and throw an error >> ', () => {
			expect(() => weather.setZipCodeAndCountryCode('', 'XX'))
				.to.throw('Country code not valid! Enter a valid contry code!')
		})

	})	// end describe

	describe('Setting the location: ', () => {

		it('Should retrive meteo data by Coordinates (Courmayeur)>> ', async () => {
			weather.setCoordinates(45.789554, 6.973688)
			const r = await weather.getAllWeather()
			expect(r.name.toLowerCase() === 'courmayeur')
		})

		it('Should retrive meteo data by Zip Code (24121) + Country Code (IT) >> ', async () => {
			weather.setCoordinates('', '')
			weather.setZipCodeAndCountryCode(24121, 'IT')
			const r = await weather.getAllWeather()
			expect(r.name.toLowerCase() === 'bergamo')
		})

		it('Should retrive meteo data by City ID 2522818 (Ustica) >> ', async () => {
			weather.setZipCodeAndCountryCode('', 'IT')
			weather.setCityId(2522818)
			const r = await weather.getAllWeather()
			expect(r.name.toLowerCase() === 'ustica')
		})

		it('Should retrive meteo data by City Name Gandino >> ', async () => {
			weather.setCityId('')
			weather.setCity('Gandino')
			const r = await weather.getAllWeather()
			expect(r.name.toLowerCase() === 'gandino')
		})

	})	// end describe

	describe('Retrive data: ', () => {

		it('Should retrive temperature data >> ', (done) => {
			weather.getTemperature()
				.then(d => {
					chai.assert.typeOf(d , 'number')
					done()
				})
				.catch(err => {
					done(err)
				})
		})

		it('Should retrive pressure data >> ', (done) => {
			weather.getPressure()
				.then(d => {
					chai.assert.typeOf(d , 'number')
					done()
				})
				.catch(err => done(err))
		})
		
		it('Should retrive humidity data >> ', (done) => {
			weather.getHumidity()
				.then(d => {
					chai.assert.typeOf(d , 'number')
					done()
				})
				.catch(err => done(err))
		})

		it('Should retrive weather brief description >> ', (done) => {
			weather.getDescription()
				.then(d => {
					chai.assert.typeOf(d , 'string')
					done()
				})
				.catch(err => done(err))
		})

		it('Should present all the JSON response data >> ' , (done) => {
			weather.getAllWeather()
				.then(jsonObj => {
					chai.assert.property(jsonObj , 'weather')
					chai.assert.property(jsonObj , 'main')
					chai.assert.property(jsonObj , 'name')
					done()
				})
				.catch(err => done(err))
		})

		it('Should present the rain in mm of last hour if present >> ', (done) => {
			weather.getSmartJSON()
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

		it('Should return a smart JSON weather object >> ', (done) => {
			weather.getSmartJSON()
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

	describe('Pro APIs - Only with pay services :', () => {

		it('Should present MAX 4 day (8h) weather forecast (PRO APIs) >> ', (done) => {
			weather.getForecast4Days(8)
				.then(d => {
					expect(d).not.empty
					expect(d.cnt).is.equal(8)
					expect(d.list).is.not.empty
					expect(d.list.length).is.equal(8)
					done()
				})
				.catch(err => done(err))
		})

	}) // end describe

	describe('Error managment section :', () => {

		it('Should show a HTTP error in the request >> ',() => {
			weather.getError()
				.then(result => done())
				.catch(err => {
					chai.assert.typeOf(err, 'error')
					done()
				})
		})

		it('Should throw an Error when try to get data without set one location >> ', () => {
			weather.setCity('')
			weather.setCityId('')
			weather.setCoordinates('', '')
			weather.setZipCodeAndCountryCode('', 'IT')

			return weather.getSmartJSON()
				.catch((err) => {
					expect(err.message).to.eql('No Location set! Use setCity, setCityId, setCoordinates or setZipCode before request data.')
				})
		})
	})	// end describe
})
