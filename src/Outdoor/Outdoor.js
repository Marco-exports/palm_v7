import React from "react"
import socketIOClient from "socket.io-client"
const socket = socketIOClient()

class Outdoor extends React.Component {
    _isMounted = false
    constructor(props) {
        super(props)
        this.state = { response: false }
    }
    componentDidMount() {
        this._isMounted = true
        socket.on("WeatherAPI", data => {
            if(this._isMounted){ this.setState({ response: data })}
        })
            socket.emit('GetOutdoor', { OUTDOOR : 'request' })  // initial request to stream weather data
    }

    componentWillUnmount(){this._isMounted = false}

    render() {
        const { response } = this.state
        console.log('OUTDOOR  :  ', response)
        return (
            <div className="out_temp_humid">
                {response ? <span>{deg_F_to_C(response.temp, this.props.temp_F_C)}º {this.props.temp_F_C} &nbsp; &nbsp;

                    { Math.round(response.humidity)} % humid</span> : <span>...</span>}

                <div className="out_temp_humid_wind">
                    {degToCard(response.winddir)} : {Math.round(response.windspeed)} mph &nbsp; &nbsp; {Math.round(response.pressure)} mbar
                </div>
            </div>
        )
    }
}
export default Outdoor


const F_to_C = function (deg) {
    return Math.round((deg - 32) * 5 / 9)
}

var deg_F_to_C = function( deg , F_to_C ){
    if(F_to_C === "F"){ return( Math.round((deg * 1.8) + 32) )
    }else{ return( Math.round( deg ))}
}

//var deg_F_to_C = function( deg , F_to_C ){
//     if(F_to_C === "F"){ return( Math.round((deg-32)/(9/5)))
//     }else{ return( Math.round( deg ))}
// }




var degToCard = function( deg ){
    if (deg>11.25 && deg<33.75){ return "NNE"}
    else if (deg>33.75 && deg<56.25){ return "ENE"}
    else if (deg>56.25 && deg<78.75){ return "E"}
    else if (deg>78.75 && deg<101.25){ return "ESE"}
    else if (deg>101.25 && deg<123.75){ return "ESE"}
    else if (deg>123.75 && deg<146.25){ return "SE"}
    else if (deg>146.25 && deg<168.75){ return "SSE"}
    else if (deg>168.75 && deg<191.25){ return "S"}
    else if (deg>191.25 && deg<213.75){ return "SSW"}
    else if (deg>213.75 && deg<236.25){ return "SW"}
    else if (deg>236.25 && deg<258.75){ return "WSW"}
    else if (deg>258.75 && deg<281.25){ return "W"}
    else if (deg>281.25 && deg<303.75){ return "WNW"}
    else if (deg>303.75 && deg<326.25){ return "NW"}
    else if (deg>326.25 && deg<348.75){ return "NNW"}
    else {return "N"}
}


// 25.018202, -77.275562  --> 601


//  {response ? <span>{deg_F_to_C(response.temp, this.props.temp_F_C)}º {this.props.temp_F_C} &nbsp;



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
//       "temp": 26.6,          --------
//       "feelslikemax": 36.4,
//       "feelslikemin": 24.0,
//       "feelslike": 28.5,
//       "dew": 23.4,
//       "humidity": 82.9,      --------
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