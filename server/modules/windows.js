module.exports = function(io) {
    if (process.platform==='linux') {
        let interval
        const moment = require('moment')
        const GpioToPin = require('./GpioBank').GpioToPin
        const num_windows = ROOM_ID_STAT.windows.length
        console.log(" WINDOWS : " + num_windows )       // Num Windows in room
        let RP_IOs = ROOM_ID_STAT.windows.map( a => a.RPi_GPIO )
        // io.on("connection", socket => { socket.emit('GetWindows')})

        io.on("connection", socket => {
            socket.on('GetWindows', function (data) {getWindowsAndEmit(socket)})

            if (interval) {clearInterval(interval)}
            interval = setInterval(() => getWindowsAndEmit(socket), 240000)  // millisec = 4 minutes
        })

        const getWindowsAndEmit = async socket => {
            let GpioPins = GpioToPin(RP_IOs)
            console.log(GpioPins)           // [ '1', '0', '1', '0' ]
            for (i = 0; i < ROOM_ID_STATx.windows.length; ++i) {
                ROOM_ID_STATx.windows[i].open = Number(GpioPins[i])
            }
            try {
                let Windows = (ROOM_ID_STATx.windows) // JSON.stringify
                console.log("  WINDOW: ", moment().format("lll"))
                socket.emit("Windows_API", Windows)   // --> send to screen
                socket.broadcast.emit("Windows_API", Windows)   // --> send to screen
            } catch (error) {
                console.error(' > Error WINDOW: ') // + ${error.code}
            }
        }
    }
}
