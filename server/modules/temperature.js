module.exports = function(io) {
    const moment = require('moment')
    io.on("connection", function (socket) {socket.join("room")

        socket.on('getTemp', function () {
            io.emit("Temp_API", ROOM_ID_STAT.tempSet )     // send to app
        })

        socket.on('setTemp', function (data) {
            if(data.setTemp > ROOM_ID.cool_temp_max){
                ROOM_ID_STAT.tempSet = ROOM_ID.cool_temp_max;
                console.log( 'setTemp -> ' + data.setTemp +' : -- max temp')
            }
            else if(data.setTemp < ROOM_ID.cool_temp_min){
                ROOM_ID_STAT.tempSet = ROOM_ID.cool_temp_min;
                console.log('setTemp -> ' + data.setTemp+' : -- min temp')}
            else {
                console.log('setTemp -> ' + data.setTemp)    // set_temperature "data"}
                ROOM_ID_STAT.tempSet = data.setTemp;
            }
                ROOM_ID_STAT.DT_timestamp = moment().format("YYYY-MM-DD HH:mm")

            socket.emit("Temp_API", ROOM_ID_STAT.tempSet );
            socket.broadcast.emit("Temp_API", ROOM_ID_STAT.tempSet )   // broadcast ...

            if(ROOM_ID_STAT.fanSet === 1){     // OFF_LINE
                ROOM_ID_STAT.fanSet = 2
                io.emit("Fan_API", ROOM_ID_STAT.fanSet )     // EMIT --> send to app
                socket.broadcast.emit("Fan_API", ROOM_ID_STAT.fanSet )   //  broadcast all apps
                console.log('Fan : OFF --> AUTO')
            }
        })
    })
}
