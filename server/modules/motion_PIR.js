module.exports = function(io) {
   if (process.platform==='linux') {
      let interval
      const moment = require('moment')
      const GpioToPin = require('./GpioBank').GpioToPin
      console.log(" Last PIR :" + ROOM_ID_STATx.PIR_last_seen)
      // const RP_PIR = [ROOM_ID.PIR_GPIO]      // Get PIR_GPIO number

      io.on("connection", socket => {
        // socket.on("disconnect", (reason) => { console.log(`drop < PIR >`)})

         socket.on('Get_PIRs', function (data) {getPIRsAndEmit(socket)})
         if (interval) {clearInterval(interval)}
         interval = setInterval(() => getPIRsAndEmit(socket), 10000);  // millisec = 10 seconds
      })


      const getPIRsAndEmit = async socket => {
         let GpioPIR = GpioToPin([ROOM_ID.PIR_GPIO])          // let GpioPIR = GpioToPin(RP_PIR)
         socket.emit("PIRs_API", GpioPIR)            // --> send to screen
         socket.broadcast.emit("PIRs_API", GpioPIR)   // broadcast to other clients
         if(GpioPIR === 1) { ROOM_ID_STATx.PIR_last_seen = moment().unix() }
      }
   }
}
