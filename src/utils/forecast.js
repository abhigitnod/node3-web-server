const request = require('request');

const forecast = (long, lat, callback) => {

    const url = "https://samples.openweathermap.org/data/2.5/forecast?id=524901&appid=b1b15e88fa797225412429c1c50c122a1"
    
    console.log(long, lat);
    
    request({url, json:true}, (error, { body }) => {
        if (error) {
            callback("Unable to connect to the Weather services", undefined);            
        } else if (!body.cnt) {
            callback("Unable to fetch the weather data for given location. Please try again..", undefined);            
        } else {
            callback(undefined, body.list[0].main);
        }

    })
}

module.exports = forecast;