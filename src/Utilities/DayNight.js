import React from "react"
import RPi_Day from './RPi_DAY.svg'
import RPi_Night from './RPi_NIGHT.svg'
import "./DayNight.css"

const Day_Night = { Day: RPi_Day, Night: RPi_Night }

const DayNight = ({ toggleTheme, Day }) => (

   <img className="dayNight"
        src = { Day_Night[ Day === 'day'?'Day':'Night'] }
        alt="!"
        onClick = { e => toggleTheme()}
   />
)
export default DayNight


// DayNight is only color changes ...
// needs replacement with backlight controls