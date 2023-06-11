module.exports = function(io) {
    const axios = require('axios')
    // const moment = require('moment')
    let interval   // interval fetch weather data every hour = 3600000 ms (1 hour)

    io.on("connection", function (socket) {
        socket.on('GetOutdoor', function (data) {
            console.log(' GetOutdoor ...')
            getApiAndEmit(socket)
        })

        if(interval){ clearInterval(interval)}
        interval = setInterval(() => getApiAndEmit(socket),3600000)  // millisec = every hour = 3600000 ms
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