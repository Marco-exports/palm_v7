module.exports = function(io) {
    if (process.platform === 'linux') {
        const pigpio= require('pigpio')
        const GpioBank = pigpio.GpioBank
        let myBank = new GpioBank()
        let BankRead = myBank.read().toString(2)   // read RPi -> BANK1 string
        let interval

        const num_windows = ROOM_ID_STAT.windows.length
        console.log(" WINDOWS : " + num_windows )

        io.on("connection", socket => {
            socket.on('GetWindows', function (data){getWindowsAndEmit(socket)})

            if (interval) { clearInterval(interval)}
            interval = setInterval(() => getWindowsAndEmit(socket), 120000)  // 2 minutes
        })

        const getWindowsAndEmit = async socket => {
            if (global.windows !== BankRead.substring(4, 13)) {
                console.log(BankRead.substring(4, 13))
            }
            global.windows = BankRead.substring(4, 13)
        }
    }  // 000000001
}