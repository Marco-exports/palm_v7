module.exports = function(io) {
    let interval   // interval fetch weather every: hour = 3600000  / 30 min = 1800000 /  hour = 600000
    // using global variable --> ROOM.outdoor

    io.on("connection", function (socket) {
        socket.on('GetOutdoor', function () {
            getOutdoorAndEmit(socket)
        })

        if(interval){ clearInterval(interval) }
        interval = setInterval(() => getOutdoorAndEmit(socket),600000)  // millisec = every hour = 3600000 ms
    })

    const getOutdoorAndEmit = async socket => {
            socket.emit("WeatherAPI", ROOM.outdoor)   // reply from visualcrossing.com --> send to screen
            socket.broadcast.emit("WeatherAPI", ROOM.outdoor)   // broadcast to other clients
    }
}

// 25.018202, -77.275562  --> Palm Cay 601

//  https://www.epochconverter.com/tps://www.epochconverter.com/

// new Date().toISOString()

// {
//   "queryCost": 1,
//   "latitude": 25.0771,
//   "longitude": -77.3408,
//   "resolvedAddress": "Nassau, New Providence, The Bahamas",
//   "address": "nassau bahamas",
//   "timezone": "America/Nassau",
//   "tzoffset": -4.0,
//   "description": "Similar temperatures continuing with a chance of rain multiple days.",
//   "days": [
//     {
//       "datetime": "2023-05-29",
//       "datetimeEpoch": 1685332800,
//       "tempmax": 31.0,
//       "tempmin": 24.0,
//       "temp": 26.6,
//       "feelslikemax": 36.4,
//       "feelslikemin": 24.0,
//       "feelslike": 28.5,
//       "dew": 23.4,
//       "humidity": 82.9,
//       "precip": 16.3,
//       "precipprob": 100.0,
//       "precipcover": 20.83,
//       "preciptype": [
//         "rain"
//       ],
//       "snow": 0.0,
//       "snowdepth": 0.0,
//       "windgust": 17.3,
//       "windspeed": 13.0,
//       "winddir": 220.7,
//       "pressure": 1013.1,
//       "cloudcover": 63.8,
//       "visibility": 10.3,
//       "solarradiation": 158.9,
//       "solarenergy": 13.8,
//       "uvindex": 8.0,
//       "severerisk": 75.0,
//       "sunrise": "06:20:03",
//       "sunriseEpoch": 1685355603,
//       "sunset": "19:53:47",
//       "sunsetEpoch": 1685404427,
//       "moonphase": 0.32,
//       "conditions": "Rain, Partially cloudy",
//       "description": "Partly cloudy throughout the day with strong storms possible.",
//       "icon": "rain",
//       "stations": [
//         "MYNN",
//         "1332W",
//         "remote"
//       ],