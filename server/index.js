// START: < nodemon server > or < sudo node server >
console.log(` PLATFORM : ${process.platform}`)
if (process.platform==='linux') {
   const pigpio = require('pigpio')
   console.log(' pigpio Hardware : ' + pigpio.hardwareRevision().toString(16))
   pigpio.terminate()
   pigpio.initialize() // pigpio C library initialized here
   pigpio.configureClock(5, pigpio.CLOCK_PWM)   // lowest CPU usage x
}
console.log(' Node -v : ' + process.version)     // node -v == v12.22.4
const config_files = require('./config')   // ROOM --> './CFG_ROOM'
console.log(config_files)     //  -->  "ROOM_Id : CFG_PC601_STUDY"
const port = process.env.PORT || 8080

// **** **** **** **** **** **** v7 **** **** **** **** **** **** **** //

const http = require("http")
const bodyParser = require("body-parser")
const express = require("express")
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const cors = require('cors')
app.use(cors())
const server = http.createServer(app)    // HTTP server
const io = require('socket.io')(server, {pingTimeout: 60000 }) // io server
server.listen(port,() => console.log(` Node on port :  ${port}`))

const { createProxyMiddleware } = require('http-proxy-middleware')
// const {TOUCH_SCREEN} = require("./config/CFG_PC601_STUDY")

module.exports = function(app) {app.use('/', createProxyMiddleware({target: 'http://localhost:3000', changeOrigin: true }))}

app.use('/', express.static( './build'))
app.use('/fans', require('./routes/tab_fans').router)    // TAB:  config fan speeds
// app.use('/backlight', require('./routes/backlight').router) // obsolete
app.use('/windows', require('./routes/tab_windows').router)

app.get('/XXXXX', function (req, res) { res.send( ROOM.room_ID )})
app.get('/ROOM_WIN', function (req, res) { res.send( ROOM_WIN )})
app.get('/QRQRQ', function (req, res) {
   res.sendFile(__dirname +'/QR_CODES/QR_'+ ROOM.room_ID +'.png')
   console.log("QRQRQ : " + ROOM.room_ID)}
)

global.windows = ""   // initialize repeat var
global.INDOOR = ""
global.OUTDOOR = 0

require('./modules/gpioBankRead')(io)
require('./modules/outdoor')(io)
require('./modules/fan_speed')(io)
require('./modules/temperature')(io)
require('./modules/indoor')(io)
require('./modules/windows')(io)     // send ROOM_WIN
require('./modules/motion_PIR')(io)
require('./modules/one_Wire_DS18B20')(io)
require('./modules/backlight')(io)
require('./modules/outdoor')(io)
require('./modules/outdoor_file')(io)

console.log(' Memory usage: ')
console.log( process.memoryUsage() )
const IP_address = require('os').networkInterfaces()
console.log(' IP: ' + IP_address.wlan0[0].address )
// console.dir(IP_address, { depth: null })

if(process.platform==='linux') {
   const pigpio = require('pigpio')
   const Gpio = pigpio.Gpio
   // const WATER = new Gpio(12, {mode: Gpio.OUTPUT})    // alt = 13 / 12
   const SABIANA = new Gpio(18, {mode: Gpio.OUTPUT})   // alt = 19 / 18
   let dutyCycle = 0
   // WATER.pwmFrequency(2000)
   SABIANA.pwmFrequency(2000)
   console.log("starting GPIO 18 : " +SABIANA.getPwmFrequency())   // WATER.getPwmFrequency()

   if(dutyCycle > 10000000){
      setInterval(() => {
         // WATER.pwmWrite(dutyCycle)
         SABIANA.pwmWrite(dutyCycle)
         console.log(" SABIANA : " + dutyCycle)
         dutyCycle += 15
         if (dutyCycle > 255) { dutyCycle = 0 }
      }, 20000)}    // n-seconds
}

//  require('./child_processes/lsExec')
// require('./child_processes/lsSpawn.js')
// require('./child_processes/listFiles')
// var exec = require('child_process').exec;

console.log(" Touch Screen event: "+ ROOM_ID.TOUCH_SCREEN)

var exec = require('child_process').exec
exec('sudo /home/pi/pi-touchscreen-dimmer/timeout 8 12 ' + ROOM_ID.TOUCH_SCREEN)

// ****  TIMEOUT ****
// -- PLAY = event0
// -- STUDY = event3