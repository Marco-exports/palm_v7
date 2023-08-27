module.exports = function(io) {
    if (process.platform === 'linux') {
        let interval
        const pigpio= require('pigpio')
        const GpioBank = pigpio.GpioBank
        let myBank = new GpioBank()
        let BankRead = myBank.read().toString(2)   // read RPi -> BANK1 string
        const num_windows = ROOM_ID_STAT.windows.length   // total windows
        console.log(" WINDOWS : " + num_windows )

        io.on("connection", socket => {
            socket.on('GetWindows', function (data){getWindowsAndEmit(socket)})
            if (interval) { clearInterval(interval)}
            interval = setInterval(() => getWindowsAndEmit(socket), 20000)  // 20 seconds
        })

        const getWindowsAndEmit = async socket => {
            if (global.windows !== BankRead.substring(4, 13)) {
                console.log(BankRead.substring(4, 13)+' XXX')   // + 'windows_GPIO')
            }
            global.windows = BankRead.substring(4, 13)   // 123000080
        }
    }
}