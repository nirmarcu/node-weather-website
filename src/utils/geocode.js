const request = require('request')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibmlybWFyY3UiLCJhIjoiY2s5bGJ0bm83MDRoZzNrcGJibnRuYjRxcSJ9.W7kjFQ-E8QwF5zfGjMgn6A&limit=1'

    request({ url, json:true }, (error, response) => {
        if (error) {
            callback('Unable to connect to geolocation service', undefined)
        } else if (response.body.features.length === 0) {
            callback('Can\'t find location', undefined)
        } else {
            let geoData = response.body.features[0]
            const latitude = geoData.center[1];
            const longtitude = geoData.center[0];
            const placeName = geoData.place_name

            const address = {
                latitude: latitude,
                longtitude: longtitude,
                location: placeName
            }

            callback(undefined, address)
        }
    })
}

module.exports = geocode