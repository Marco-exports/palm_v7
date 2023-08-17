const moment = require('moment')
const fs = require('fs')

global.ROOM = require('./CFG_ROOM')  // -->> get ROOM : "PC601_STUDY"
global.ROOM_ID = require('./CFG_' + ROOM.room_ID)
global.ROOM_ID_STAT = require('./CFG_' + ROOM.room_ID)         // CFG --> replace to JSON version
console.log(" ROOM_Id : " + ROOM_ID._id)
console.log(' FAN_SPEED : ' + ROOM_ID.fan_speed)

// global.ROOM_ID_STATx = require('./CFG_' + ROOM.room_ID + '.json')
// global.ROOM_ID_HIST = require('./HIST_' + ROOM.room_ID)
// global.ROOM_ID_LOG = './server/logs/LOG_' + ROOM.room_ID + '_' + moment().format("YYYY-MM-DD")
// console.log(' LOG : ' + ROOM_ID_LOG)          // path to current LOG

global.JSON_SAVED = moment().unix()            // only on start-up


if(null)
fs.access(ROOM_ID_LOG, fs.F_OK, (err) => {
     if (err) {  // file not found...
          fs.appendFile(ROOM_ID_LOG, '...', function (err) {
               if (err) throw err
               console.log(' > Log file created : ' + ROOM_ID_LOG)
          })
     }
})

// console.log(' LAST_Touched : ' + JSON_SAVED)