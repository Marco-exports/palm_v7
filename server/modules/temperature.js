module.exports = function(io) {
    const STAT_saver = require('./STAT_save')
    const moment = require('moment')
    io.on("connection", function (socket) {socket.join("room")
        socket.on('getTemp', function () {
            io.emit("Temp_API", ROOM_ID_STAT.tempSet )     // send to app
        })
        socket.on('setTemp', function (data) {
            if(data.setTemp > ROOM_ID.cool_temp_max){           // if setTemp > MAX   X == MAX
                ROOM_ID_STAT.tempSet = ROOM_ID.cool_temp_max
                console.log('  setTemp -> '+(data.setTemp-1)+' X')
            }
            else if(data.setTemp < ROOM_ID.cool_temp_min){      // if setTemp < MIN   X == MIN
                ROOM_ID_STAT.tempSet = ROOM_ID.cool_temp_min
                console.log('  setTemp -> '+(data.setTemp+1)+' X')
            }
            else {
                console.log('  setTemp -> ' + data.setTemp)    // set_temperature "data"}
                ROOM_ID_STAT.tempSet = data.setTemp
                STAT_saver(1 )
            }
            ROOM_ID_STAT.DT_timestamp = moment().format("YYYY-MM-DD HH:mm")

            socket.emit("Temp_API", ROOM_ID_STAT.tempSet )
            socket.broadcast.emit("Temp_API", ROOM_ID_STAT.tempSet )   // broadcast ...

            if(ROOM_ID_STAT.fanSet === 1){    // OFF_LINE -->  restart SABIANA
                ROOM_ID_STAT.fanSet = 2
                io.emit("Fan_API", ROOM_ID_STAT.fanSet )     // EMIT --> send to app
                socket.broadcast.emit("Fan_API", ROOM_ID_STAT.fanSet )   //  broadcast all apps
                console.log('Fan : OFF --> AUTO')
            }
        })
    })
}