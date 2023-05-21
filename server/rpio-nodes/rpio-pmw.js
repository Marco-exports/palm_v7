const rpio = require('rpio');
/*
 * Pulse an LED attached to P12 / GPIO18 5 times.
 */

const pin = 12;		/* P12/GPIO18 */
const range = 1024;	/* LEDs can quickly hit max brightness, so only use */
const max = 128;		/*   the bottom 8th of a larger scale */
const clockdiv = 8;	/* Clock divider (PWM refresh rate), 8 == 2.4MHz */
const interval = 5;	/* setInterval timer, speed of pulses */
let times = 5;		/* How many times to pulse before exiting */

/*
 * Enable PWM on the chosen pin and set the clock and range.
 */
rpio.open(pin, rpio.PWM);
rpio.pwmSetClockDivider(clockdiv);
rpio.pwmSetRange(pin, range);

/*
 * Repeatedly pulse from low to high and back again until times runs out.
 */
let direction = 1;
let data = 0;
const pulse = setInterval(function () {
   rpio.pwmSetData(pin, data);
   if (data === 0) {
      direction = 1;
      if (times-- === 0) {
         clearInterval(pulse);
         rpio.open(pin, rpio.INPUT);
         return;
      }
   } else if (data === max) {
      direction = -1;
   }
   data += direction;
}, interval, data, direction, times);
