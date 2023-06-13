import React from 'react'
import './Fan_speed.css'
import {ReactComponent as AutoOff} from './Auto-icon-white.svg'
import {ReactComponent as AutoOn} from './Auto-icon-red.svg'
import {ReactComponent as FanSvg} from './fan_speed.svg'
import socketIOClient from "socket.io-client"
const socket = socketIOClient()

const speed_text =  ["< OFF-LINE >","AUTO","SOFT","BREEZE","MISTRAL","VIENTO !"]

class FanSpeed extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fans: Array(4).fill(false),
            fan: -2,     // offline
            speed: "auto",
            auto: true,
            setFan : 0,
            fanSet : 0,
        }
    }
    componentDidMount() {
        socket.on("Fan_API", data => {
            console.log("Fan_API -> " + data)
            this.setState({fanSet: data})      // Node -> setFan = 1-6
            this.setState(state => ({auto: false}))
            const fans_x = [false,false,false,false]
            if (data === 2) {
                this.setState(state => ({auto: true})) // Auto
                fans_x[0] = true
            }
            if (data > 2) {fans_x[data-2] = true}
            this.setState(state => ({fans: fans_x}))
            this.setState(state => ({speed: speed_text[data-1]}))     // speed text [ 0-5 ]
        })
        socket.emit('getFan', { FAN : 'request'})  // ask server for FAN
    }
    componentWillUnmount(){}

    toggleFans(i) {
        const fans_x = [false, false, false, false, false]
        let fanSetting = i+2;   // valid for : 3,4,5,6
        this.setState(state => ({speed: speed_text[ i + 1 ]}))      // speed text
        if (i>0) {
            this.setState(state => ({fan: -2}))
            this.setState(state => ({auto: false}))   // Auto & Offline  --> Manual  1,2,3,4
            fans_x[i] = true
        }
        if (i === 0 && this.state.fan === -2) {         // go to -> Auto
            this.setState(state => ({fan: -1}))
            this.setState(state => ({auto: true}))
            this.setState(state => ({speed: speed_text[ 1 ]}))    // Auto -> ON
            fans_x[0] = true     // Auto -> ON
            fanSetting = 2
        }
        if (i === 0 && this.state.fan === -1) {         // Auto to -> Offline
            this.setState(state => ({fan: -2}))
            this.setState(state => ({auto: false}))
            this.setState(state => ({speed: speed_text[ 0 ]}))    // Auto to -> Offline text
            fans_x[0] = false
            fanSetting = 1
        }
        console.log(' setFan: '+ fanSetting)
        this.setState(state => ({fans: fans_x}))
        socket.emit('setFan', {'setFan': fanSetting});
    }

    render() {
        return (
           <div className='fans'>
           {(this.state.auto ?
                   <AutoOn className='fan_1' style={fanStyle(this.state.fans[0])} onClick={()=>this.toggleFans(0)}/>
                  : <AutoOff className='fan_1' style={fanStyle(this.state.fans[0])} onClick={()=>this.toggleFans(0)}/>
           )}
               <FanSvg className='fan_2' style={fanStyle(this.state.fans[1])} onClick={()=>this.toggleFans(1)} />
               <FanSvg className="fan_3" style={fanStyle(this.state.fans[2])} onClick={()=>this.toggleFans(2)} />
               <FanSvg className="fan_4" style={fanStyle(this.state.fans[3])} onClick={()=>this.toggleFans(3)} />
               <FanSvg className="fan_5" style={fanStyle(this.state.fans[4])} onClick={()=>this.toggleFans(4)} />
               <div className='fan_text'>{[this.state.speed]}</div>
           </div>
        )
    }
}

export default FanSpeed

var fanStyle = function(i){return {animationPlayState : i ? 'running':'paused' }}

