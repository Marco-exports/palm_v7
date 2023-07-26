module.exports = function(io) {
   if (process.platform==='linux') {
      const sensorF = require('ds18b20-raspi')     // round temperature reading to 1 digit
      let interval

      io.on("connection", socket => {
         socket.on('Get_DS18', function (data) {getDS18AndEmit(socket)})
         if (interval) {clearInterval(interval)}
         interval = setInterval(() => getDS18AndEmit(socket), 240000)  // millisec = 4 min
      })

      const getDS18AndEmit = async socket => {
         sensorF.readSimpleF(1, (err, temp) => {
            if (err) { console.log( err ) } else {
               if(global.OneWire !== temp){
                  console.log('   One_Wire :  ' + temp + 'º F')
               }
               global.OneWire = temp
            }

            socket.emit("DS18_API", temp + 'º F')            //  screen
            socket.broadcast.emit("DS18_API", temp + 'º F')   // broadcast
         })
      }
   }
}
// global.OneWire = ""