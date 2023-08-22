module.exports = (io) => {
    let interval
    let temp_humid = {temp : 10, humid : 88}    // temp
    console.log(' Init INDOOR' )
    if (process.platform === 'linux') {
        const dht = require('../rpio-nodes/pigpio_DHT')
        const Gpio = 5
        const sensor = dht(Gpio,22)

        setInterval(()=>{sensor.read()},60000)  // every 60 seconds
        sensor.on('result', data => {
            temp_humid = {
                temp : C_to_F(data.temperature),
                humid : round(data.humidity,1.0)
            }
           // CFG_save_DHT( temp_humid )   // store statistics
        })
        sensor.on('badChecksum', () => { console.log('  INDOOR checksum') })

        io.on("connection", ( socket ) => {
            socket.on('GetIndoor',  data => {getTempHumidAndEmit(socket)})
            if (interval) {clearInterval(interval)}
            interval = setInterval(() => getTempHumidAndEmit(socket), 30000)  // sensor read 30 seconds
        })

        const getTempHumidAndEmit = async socket =>{
                if(global.indoorTemp !== temp_humid.temp){
                    console.log("  Indoor: " + temp_humid.temp + 'º F')
                }
                global.indoorTemp = temp_humid.temp      // {"humid":33,"temp":74}

                socket.emit("Indoor_API", temp_humid)   // send to screen
                socket.broadcast.emit("Indoor_API", temp_humid)   // other screens

          //  var backlight = require('rpi-backlight')
           // console.log("BRIGHTNESS "+ await backlight.getBrightness())
        }

    }else{
        io.on("connection", socket => {
            socket.on('GetIndoor', function (data) {
                socket.emit("Indoor_API", temp_humid)   // send to screen
                socket.broadcast.emit("Indoor_API", temp_humid)   // other screens
                console.log("PLATFORM : DARWIN MacOS : "+ temp_humid)
            })
        })
    }
}


function round(value, step) {    //round(2.74,0.25)=2.75 // round(2.74,0.5)=2.5 // round(2.74,1.0)=3.0
    step || (step = 1.0)
   const inv = 1.0 / step;
   return Math.round(value * inv) / inv
}

function C_to_F (value){
    return Math.round((value*1.8)+32+ROOM_ID.temp_calibrate)     // calibrate DHT
}
