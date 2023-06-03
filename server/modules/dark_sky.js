module.exports = function(io) {
    const axios = require('axios')
    // const moment = require('moment')
    let interval   // interval fetching weather data -- every 20 min = 1200000 ms

    io.on("connection", function (socket) {
        socket.on('GetOutdoor', function (data) {
            console.log(' GetOutdoor ...')
            getApiAndEmit(socket)
        })

        if(interval){ clearInterval(interval)}
        interval = setInterval(() => getApiAndEmit(socket),1200000)  // millisec = every 20 min = 1200000 ms
    })

    const getApiAndEmit = async socket => {
        try {
            const res = await axios.get(
                "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/25.018202%2C%20-77.275562?unitGroup=metric&include=current&key=RTAPSPVC9LUQLL8JSS5P76PT5&contentType=json"
            )
            // console.log(" OUTDOOR: ", res.data.currentConditions)
           // console.log(" OUTDOOR_X: ", moment(res.data.currently.time * 1000).format("lll"))
            socket.emit("WeatherAPI", res.data.currentConditions)   // reply from DARKSKY --> send to screen
            socket.broadcast.emit("WeatherAPI", res.data.currentConditions)   // broadcast to other clients
            console.log('Outdoor TEMP : ' + res.data.currentConditions.temp)
        } catch (error) {
            console.error(` >>> Error WEATHER: ${error}`)
        }
    }
}


// 25.018202, -77.275562  --> Palm Cay 601

//  https://www.epochconverter.com/

// "https://api.darksky.net/forecast/9db961cbb17b1499d96c87c58cd56afa/25.0407,-77.4701"
// "https://api.darksky.net/forecast/e0db0dc6e6eba46971a5b1a853baf2fd/43.7695,11.2558"
