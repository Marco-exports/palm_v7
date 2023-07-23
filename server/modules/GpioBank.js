exports.GpioToPin = (inputArray) => {
   let output = []     // default = null array
   const GpioPins = { 17:6, 22:5, 23:12, 24:7, 4:25, 6:23, 25:4 }  // binary-> RPi_GPIO : GpioBank
   let BankPinOut
   if (process.platform === 'linux') {
      const pigpio= require('pigpio')
      const GpioBank = pigpio.GpioBank
      let myBank = new GpioBank()
      let BankRead = myBank.read().toString(2)      // read RPi -> BANK1  string

      for (const GpioPin of inputArray) {
         for (const Pin in GpioPins) {
            if (GpioPin === Pin) { output.push(GpioPins[GpioPin])}   // add to array
         }  // do not use '===' // input = 17 -> output = 6  // output->[6,5,12,7]
      }
      let BankPins = ""
      for (const i of output) {
         BankPins = BankPins + (BankRead.substr((i - 1), 1))
      }
      //console.log(BankRead.substr((i-1), 1))
      BankPinOut = [...BankPins + '']

      if(global.windows !== BankRead){
        // console.log(" --> " + BankRead + ' : ' + [...BankPins + ''])
         console.log( BankRead.substring(4, 13) )
      }
      global.windows = BankRead.substring(4, 13)
   }
   return (BankPinOut)
}


// console.log("BANK1 -> "+ BankRead)
// 10000110000101000000111111111   (total 30)
// 10001000000101100000110111111   (PIR GPIO = 6:23)

// WINDOW --> GPIO's == { 17,22,23,24 }  (PIR GPIO = 6:23) (LIGHT --> GPIO = 25:4)