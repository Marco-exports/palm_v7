module.exports = function(io) {
    if (process.platform === 'linux') {
        // const {GpioToPin} = require("./GpioBank")
        let interval
        const num_windows = ROOM_ID_STAT.windows.length
        console.log(" WINDOWS : " + num_windows )
        const GpioToPin = require('./GpioBank').GpioToPin
        let RP_IOs = ROOM_ID_STAT.windows.map( a => a.RPi_GPIO )    // RP_IOs -->  17,22,23,24

        io.on("connection", socket => {
            socket.on('GetWindows', function (data) {getWindowsAndEmit(socket)})
            if (interval) {clearInterval(interval)}
            interval = setInterval(() => getWindowsAndEmit(socket),10000)  // 10 seconds
        })

        const getWindowsAndEmit = async socket => {
            let GpioPins = GpioToPin(RP_IOs)   // 123000080
            let i = 0
            for (i = 0; i < num_windows; ++i) {
                ROOM_ID_STAT.windows[i].state = Number(GpioPins[i])
            }
            try {
                let Windows = (ROOM_ID_STAT.windows)     // WINDOWS : 1000
                let WINDOWS = (
                    global.windows.substring(0,1) +global.windows.substring(1,2)
                    +global.windows.substring(2,3) +global.windows.substring(7,8))

                //  console.log('  '+ WINDOWS)  // 1001

                if (global.windows_OPEN !== WINDOWS) {
                    console.log('  ' + global.windows_OPEN)
                }
                global.windows_OPEN = WINDOWS   // 1001

                socket.emit("Windows_API", Windows)           // --> send to screen
                socket.broadcast.emit("Windows_API", Windows) // --> send to screen

            } catch (error) { console.error(' > Error WINDOW: ') // + ${error.code}}
            }
        }
    }
}

