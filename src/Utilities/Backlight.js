import React from 'react'
import RPi_Day from './RPi_DAY.svg'
import RPi_Night from './RPi_NIGHT.svg'
import "./DayNight.css"
import socketIOClient from "socket.io-client"
const socket = socketIOClient()

const DayNight = { Day: RPi_Day, Night: RPi_Night }

const Backlight = ({ toggleTheme, Day }) => (
    <img className="dayNight"
         src = { DayNight[ Day === 'day'?'Day':'Night'] }
         alt="!"
         onClick = { e => {
             toggleTheme()
             socket.emit('setBacklight', Day )
             // console.log('setBacklight', Day )  // Day or Night
             // socket.broadcast.emit('setBacklight',  Day )
         }}
    />
)

export default Backlight



// <div className="backlight">
//   <div>{this.state.result}</div>
// </div>