const request = require('request')



const forecast = (lng,lat,callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=5a3d282f70bb4cdd3775c31b3c037c28&query='+lat+','+lng

    request({url, json:true},(error,{body}) => {
        if(error){
            callback('Unable to connect to server',undefined)
        }
        else if(body.error){
            callback('Unable to find location',undefined)
        }
        else{
            callback(undefined,body)
        }

    })

}

module.exports = forecast