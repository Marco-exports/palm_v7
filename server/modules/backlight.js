module.exports = function(io) {
    if (process.platform === 'linux') {
        const backlight = require("rpi-backlight")
        const RPi_backlight = 30
        backlight.setBrightness(20)

        io.on("connection", socket => {
            socket.on('setBacklight', function ( data ) {
                console.log('setBacklight ->', data )
                backlight.setBrightness( RPi_backlight )
            })
        })
    }
}

//backlight.getBrightness()
//backlight.setBrightness(value) // screen goes Off at <= 9 brightness value
//backlight.getMaxBrightness() ...