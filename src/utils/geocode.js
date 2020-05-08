const request = require('request')


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZ2lhbmx1Y2FkcCIsImEiOiJjazlleTlsOWYwMnR4M2VvM2piMGhqM2pkIn0.RrE5npcfjv7JvAM4mR0Sqg&limit=1'

    request({url, json: true},(error,{body}) => {
        if(error){
            callback('Unable to connect to location service',undefined)
        }
        else if (body.features.length === 0){
            callback('Unable to find location',undefined)
        }
        else{
            const longitude = body.features[0].center[0]
            const latitude = body.features[0].center[1]
            const place_name = body.features[0].place_name
            callback(undefined,{place_name: place_name,longitude: longitude, latitude: latitude})
        }
    })
}

module.exports = geocode