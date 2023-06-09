module.exports = function( saveImmediate ) {

   const moment = require('moment')
   ROOM_ID_STATx.Last_Touched = moment().unix()
      ROOM_ID_STATx.DT_timestamp = moment().format("YYYY-MM-DD HH:mm")

      if( saveImmediate === 0){
            if (JSON_SAVED){clearTimeout(JSON_SAVED)}
            JSON_SAVED = setTimeout(STAT_saver,(ROOM_ID.SAVE_EVERY) * 60000)     // delay 5 minutes
      }else{
            STAT_saver()
            console.log("STAT_save : immediate")
      }
}

function STAT_saver() {
    console.log('try to get JSON saved...' +ROOM.room_ID )  // STAT_PC601_STUDY.json
      const fs = require('fs')
      fs.writeFile('./server/config/STAT_' + ROOM.room_ID+'.json',
         JSON.stringify(ROOM_ID_STATx, null, 2),
         (err) => {
            if (err) throw err
               console.log('JSON saved...')
      })
}
