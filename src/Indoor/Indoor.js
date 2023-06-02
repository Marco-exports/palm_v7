import React from "react"
import './Indoor.css'
import socketIOClient from "socket.io-client"
import WindowsOpen from "../Windows/Windows" // run WINDOWS from this module
const socket = socketIOClient()

class Indoor extends React.Component {
    constructor(props) {
        super(props)
        this.state = { response: false}
       // console.log(props)
    }
    componentDidMount() {
        socket.on("Indoor_API", data => {
            //console.log(data)
            this.setState({response: data})
        })
        socket.emit('GetIndoor', {INDOOR: 'request'})  // request temp/humid data
    }
    componentWillUnmount() {}

    render() {
        const { response } = this.state
        return(
            <div>
               <div className="indoor_label">INDOOR</div>
               {this.props.temp_F_C === "F" ? (
                  <FarenheitGrid temp={response.temp} /> ):( <CelciusGrid temp={response.temp} />)}
               <div className="indoor_humidity">{response.humid}% humidity</div>
               <WindowsOpen />
            </div>
        )
    }
}
export default Indoor

const F_to_C = function (deg) {
   return Math.round((deg - 32) * 5 / 9)
};

const CelciusGrid = (props) => (
   <div className="indoor-grid-C">
      <div className="indoor-span-row">
         {F_to_C(props.temp)}
      </div>
      <div className={'indoor-0'}>C</div>
      <div className={'indoor-5'}>.5</div>
   </div>
)

const FarenheitGrid = (props) => (
   <div className="indoor-grid-F">
      <div className="indoor-span-row">
         {props.temp}
      </div>
      <div className={'indoor-0-F'}>ºF</div>
   </div>
)
