const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=ceb2d5e062d540b1c96fc5899ffe8034&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather sevice!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
        let curr = response.body.current;
        let currWeatherDesc = curr.weather_descriptions[0]
        let currTemp = curr.temperature
        let currFeelsLike = curr.feelslike

            callback(undefined, {
                weatherDesc: currWeatherDesc,
                temprature: currTemp,
                feelslike: currFeelsLike
            })
        }
    })
}

module.exports = forecast