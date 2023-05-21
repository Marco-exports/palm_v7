const express = require('express')
// const config_files = require("../config");
const router = express.Router()
router.use(function(req, res, next){next()})

if(process.platform !== 'darwin') {
   const backlight = require('rpi-backlight')

   router.route('/getBrightness')
      .get( (req, res) => {
         backlight.getBrightness().then((brightnessValue) => {
            res.send('Screen bright: ' + brightnessValue )
            console.log('Screen bright: ' + brightnessValue)
         })
   })

   router.route('/setBrightness/:value')
      .get( (req, res) => {
         backlight.setBrightness(req.params.value).then(() => {
            return backlight.getBrightness()}).then((newBrightnessValue) => {
               res.send('Screen now: ' + newBrightnessValue )
            console.log('Screen now: ' + newBrightnessValue)
            }).catch(() => {
               backlight.getMaxBrightness().then((maxBrightnessValue) => {
                  if (req.params.value > maxBrightnessValue) {
                     res.send('ERR: Max is ' + maxBrightnessValue )
                  } else {
                     res.send('ERR: Min value is 0' )
                  }
               })
            })
      })
} else {
   router.route('/setBrightness/:value')
      .get( (req, res) => {
         res.send('Screen bright: NIL')
      })
   router.route('/getBrightness')
      .get( (req, res) => {
         res.send('Screen bright: NIL')
   })
}

module.exports.router = router

//backlight.getBrightness()
//backlight.setBrightness(value) // The screen goes Off at <= 9 brightness value
//backlight.getMaxBrightness().
