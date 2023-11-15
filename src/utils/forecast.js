const request = require("postman-request")

const forecast = (geocode, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7fac0c6ec4b1192e8fcc5868bd27c622&query='+ geocode;
    request({url, json:true}, (error, {body}) => {  //  megszerezzük a response objektumból a body property-t.
       if(error) {
          callback("Nem sikerült lekérni az adatokat. Kérlek ellenőrizd az internetkapcsolatod.", undefined)
       }
       else if(body.error) {
          callback("Nem találtam meg a megadott helyet!", undefined)
       } else {
          callback(undefined, 
             "Az időjárás " + body.current.weather_descriptions[0]+ ". A hőmérséklet: "
             + body.current.temperature + " fok. A hőérzet "+ body.current.feelslike 
             + " fok." + "A páratartalom: " + body.current.humidity + "%" + ". A szél erőssége: " + body.current.wind_speed + " km/h."
        )
       }
    })
 }

module.exports = forecast