module.exports = (io) => {
    const STAT_saver = require('./STAT_save')
    const moment = require('moment')

    if( process.platform === 'linux' ) {
        const pigpio = require('pigpio')
        const Gpio = pigpio.Gpio
        global.SABIANA = new Gpio(ROOM_ID.fan_GPIO, {mode: Gpio.OUTPUT})    // alt = 13 / 12
        global.SABIANA.pwmFrequency(2000)
    }

    io.on("connection", socket => {
        socket.on('getFan', function () {
            io.emit("Fan_API", ROOM_ID_STAT.fanSet )   // EMIT --> send "fanSet" to app
            SetFanSpeed( ROOM_ID_STAT.fanSet )
            console.log(" Fan_API -> " + ROOM_ID_STAT.fanSet)
            })

        socket.on('setFan', function (data) {
            // console.log( 'setFan -> ' + data.setFan )  // set fan_speed
            ROOM_ID_STAT.fanSet = data.setFan
            SetFanSpeed( data.setFan )
            ROOM_ID_STAT.DT_timestamp = moment().format("YYYY-MM-DD HH:mm")
            socket.broadcast.emit("Fan_API", data.setFan )   // EMIT --> BROADCAST to all open apps
            STAT_saver(0 )
        })
    })

    function SetFanSpeed( newFanSpeed ){
        if(process.platform==='linux') {
            // OFF-LINE / AUTOMATIC / SOFT / BREEZE / MISTRAL / VIENTO
            let fanArray = ROOM_ID.fan_speed    //  [0,50,25,50,70,100]
            let fanControl = fanArray[ newFanSpeed - 1 ]
            let fanControl_BIT = Math.floor(fanControl * 2.55 )
            global.SABIANA.pwmWrite(fanControl_BIT >>0)
            console.log(' FAN : '+ newFanSpeed + ' : ' + fanControl )  //  + fanControl_BIT)

        } else {console.log(" Darwin : NO FANs")}
    }
}


// Math.floor()
// console.log(('fanControl: ' + fanControl ) + fanControl_BIT)