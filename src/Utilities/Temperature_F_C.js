import React from "react"
import RPi_F from './Temperature_F.svg'
import RPi_C from './Temperature_C.svg'
import "./Temperature_F_C.css"

const imagesPath = { Far: RPi_F, Cel: RPi_C }

const TempFC = ({ toggleTemp, F }) => (
   <img className="tempFCstyle"
        src = { imagesPath[ F === 'F'?'Far':'Cel']} alt="!"
        onClick = { e => toggleTemp() }
   />
)

export default TempFC
