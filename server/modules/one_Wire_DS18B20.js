module.exports = function(io) {
   if (process.platform==='linux') {
      const sensorF = require('ds18b20-raspi')     // round temperature reading to 1 digit
      let interval

      io.on("connection", socket => {
         socket.on('Get_DS18', function (data) {getDS18AndEmit(socket)})
         if (interval) {clearInterval(interval)}
         interval = setInterval(() => getDS18AndEmit(socket), 120000)  // millisec = 2 min
      })

      const getDS18AndEmit = async socket => {
         sensorF.readSimpleF(1, (err, temp) => {
            if (err) { console.log( err ) } else {
               if(global.OneWire !== Math.round(temp)){
                  console.log('  SABIANA: ' + Math.round(temp) + 'º F')   // print if temp changed
               }
               global.OneWire = Math.round(temp)
            }

            socket.emit("DS18_API", Math.round(temp) + 'º F')            //  screen
            socket.broadcast.emit("DS18_API", Math.round(temp) + 'º F')   // broadcast
         })
      }
   }
}
// global.OneWire = ""