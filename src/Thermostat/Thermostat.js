import React from 'react'
import './Thermostat.css'
import FanSpeed from '../Fan_speed/Fan_speed'
import day_up from './arrow_up.jpg'
import day_down from './arrow_down.jpg'
import night_up from './arrow_up_dark.jpg'
import night_down from './arrow_down_dark.jpg'
import socketIOClient from "socket.io-client"

const socket = socketIOClient()

const arrow_up = { Day_up: day_up, Night_up: night_up }
const arrow_down = { Day_down: day_down, Night_down: night_down }

class Thermostat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            setTemp : 0,
            tempSet : 0
        }
    }
    componentDidMount() {
        socket.on("Temp_API", data => {
            console.log("Temp_API -> " + data)
            this.setState({tempSet: this.state.setTemp + data})
        })
        socket.emit('getTemp', { INDOOR : 'request'})  // ask server for Temperature
    }
    componentWillUnmount(){}

    ClickSet(i) {
        socket.emit('setTemp', { 'setTemp' : this.state.tempSet + i })
        this.setState({tempSet: this.state.tempSet + i})
    }

    render () {
        return (
            <div>
                <div className="arrow_up">
                    <img src={ arrow_up[this.props.day === 'day' ? 'Day_up':'Night_up' ] } alt="!"  onClick={()=>this.ClickSet(1)} />
                </div>
               <div className="temp_setting">
                {this.props.temp_F_C === "F" ? (
                   <FarenheitGrid tempSet={this.state.tempSet} F_C={this.props.temp_F_C}/>
                   ):(
                   <CelciusGrid tempSet={this.state.tempSet} F_C={this.props.temp_F_C}/>)}
               </div>
               <div className="arrow_down">
                    <img src={ arrow_down[this.props.day === 'day' ? 'Day_down':'Night_down' ]  } alt="!" onClick={()=>this.ClickSet(-1)} />
                </div>
               <FanSpeed />
            </div>
        )
    }
}
export default Thermostat


//function F_to_C (value) { return (Math.round(((value-32)/1.82)*2)/2).toFixed(0)}
function F_to_C (value){ return array_F_C.find(x => x.F === value).C }
function F_to_C_5 (value){ return array_F_C.find(x => x.F === value).D }

const FarenheitGrid = (props) => (
   <div className="temp_setter">{props.tempSet}<sup className='temp_small'>º</sup></div>
)
const CelciusGrid = (props) => (
   <div className="thermo-indoor-grid-C">
       <div className="thermo-indoor-span-row">
          {F_to_C(props.tempSet)}
          <sup className='thermo-temp_small'>º</sup>
       </div>
       <div className={'thermo-indoor-5'}>
          {F_to_C_5(props.tempSet)}
       </div>
   </div>
)

const array_F_C = [
   {F: 88, C: 31, D: ''},
   {F: 87, C: 30, D: '.5'},
   {F: 86, C: 30, D: ''},
   {F: 85, C: 29, D: '.5'},
   {F: 84, C: 29, D: ''},
   {F: 83, C: 28, D: ''},
   {F: 82, C: 27, D: '.5'},
   {F: 81, C: 27, D: ''},
   {F: 80, C: 26, D: '.5'},
   {F: 79, C: 26, D: ''},
   {F: 78, C: 25, D: ''},
   {F: 77, C: 24, D: '.5'},
   {F: 76, C: 24, D: ''},
   {F: 75, C: 23, D: '.5'},
   {F: 74, C: 23, D: ''},
   {F: 73, C: 22, D: '.5'},
   {F: 72, C: 22, D: ''},
   {F: 71, C: 21, D: '.5'},
   {F: 70, C: 21, D: ''},
   {F: 69, C: 20, D: '.5'},
   {F: 68, C: 20, D: ''},
   {F: 67, C: 19, D: '.5'},
   {F: 66, C: 19, D: ''},
   {F: 65, C: 18, D: '.5'},
   {F: 64, C: 18, D: ''},
   {F: 64, C: 17, D: '.5'}
]
