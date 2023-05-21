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
        this._isMounted = true;
        socket.on("WeatherAPI", data => {
            if(this._isMounted){ this.setState({ response: data })}
        });
        socket.emit('GetOutdoor', { OUTDOOR : 'request' });  //  initial request for streaming weather data
    }
    componentWillUnmount(){this._isMounted = false};

    render() {
        const { response } = this.state
        return (
           <div className="out_temp_humid">
               {response ? <span>{deg_F_to_C(response.temperature, this.props.temp_F_C)}º {this.props.temp_F_C} &nbsp;
                   { Math.round(response.humidity*100)} % humidity</span> : <span>...</span>}
               <div className="out_temp_humid_wind">
                   {degToCard(response.windBearing)} : {Math.round(response.windSpeed)} mph &nbsp; &nbsp; {Math.round(response.pressure)} mbar
               </div>
           </div>
        )
    }
}
export default Outdoor

var deg_F_to_C = function( deg , F_to_C ){
    if(F_to_C === "C"){ return( Math.round((deg-32)/(9/5)))
    }else{ return( Math.round( deg ))}
}

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
