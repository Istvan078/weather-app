const request = require("postman-request")

const geocode = (address, callback) => {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?types=place&access_token=pk.eyJ1IjoiaXN0dmFuMDc4IiwiYSI6ImNsb3ZzY2czNTBweDMyamw5bXhxZmtkZTAifQ.ROfeoQ0qtPo2H8tukbpfUQ&limit=1'
    request({url: url, json: true}, (error, { body }) => {
       if(error) {
          callback("Nem tudtam csatlakozni a helylekérő szolgáltatáshoz.", undefined)
       } else if (body.features.length === 0) {
          callback("Nem találom a megadott helyet. Próbálj meg egy másik szóra rákeresni.", undefined)
       } else {
          callback(undefined, {
             latitude: body.features[0].center[1],
             longitude: body.features[0].center[0],
             location: body.features[0].place_name
          })
       }
    })
 }

module.exports = geocode