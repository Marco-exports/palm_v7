module.exports = function(io) {
    if (process.platform === 'linux') {
        let interval
        const GpioToPin = require('./GpioBank').GpioToPin
        const num_windows = ROOM_ID_STAT.windows.length
        console.log(" WINDOWS : " + num_windows )       // Num Windows in room (4)
        let RP_IOs = ROOM_ID_STAT.windows.map( a => a.RPi_GPIO )    // RP_IOs -->  17,22,23,24

        io.on("connection", socket => {
            socket.on('GetWindows', function (data) {getWindowsAndEmit(socket)})

            if (interval) {clearInterval(interval)}
            interval = setInterval(() => getWindowsAndEmit(socket),60000)  // 1 minutes
        })

        const getWindowsAndEmit = async socket => {
            let GpioPins = GpioToPin(RP_IOs)
           // console.log('  --> GpioPins: ' + GpioPins)   // [ '1', '0', '1', '0' ]
            for (i = 0; i < num_windows; ++i) {
                ROOM_ID_STAT.windows[i].state = Number(GpioPins[i])
            }
            try {
                let Windows = (ROOM_ID_STAT.windows)             // JSON.stringify
                
                socket.emit("Windows_API", Windows)             // --> send to screen
                socket.broadcast.emit("Windows_API", Windows)   // --> send to screen

            } catch (error) {
                console.error(' > Error WINDOW: ') // + ${error.code}
            }
        }
    }
}
