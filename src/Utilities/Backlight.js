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
         onClick = { e => toggleTheme()}
    />
)

export default Backlight



// <div className="backlight">
//   <div>{this.state.result}</div>
// </div>