module.exports = {
    _id: "CFG_PC601_PLAY",
    name: "Palm Cay 601 PLAY",     // pre-set conditions for room...
    TOUCH_SCREEN: "event0",
    PIR_GPIO: 6,            // PIR on GPIO 6
    DHT_GPIO_1: 5,          // primary DHT
    DHT_GPIO_2: 999,         // secondary DHT
    DS18_GPIO: 4,          //DS18BO020 -> one wire TEMP
    fan_GPIO: 12,
    cold_GPIO: 13,
    fan_speed: [8,15,30,40], // OFF-LINE / AUTOMATIC / SOFT / BREEZE / MISTRAL / VIENTO
    SAVE_EVERY: 60,         // save STAT after 1 hour of Last_Touched
    publish_every: 120, 	// 120 secs to Firebase
    admin_overide: 0,		// 0 = user, 1 = sys admin ON
    admin_delay: 30,		    // 30 minutes till cancel sys admin overide
    temp_calibrate: -0.5,  // +/- 0.75 F  calibration on DHT sensor
    cool_temp_min: 66,		// min cooling: 66 F
    cool_temp_max: 86,		// max cooling: 86 F
    cool_fan_min: 20,		// fan min cooling: 20%
    cool_fan_max: 80,		// fan max cooling: 80%
    heat_temp_min: 72,		// min heating: 72 F
    heat_temp_max: 82,		// max heating: 82 F
    heat_fan_min: 20,		// fan min heating: 20%
    heat_fan_max: 80,		// fan max heating: 80%
    chill_max: 100,		// 100%
    chill_med: 50,		// 50%
    chill_low: 20,		// 20%
    reduce_chill: 20,	    // 20% chiller valve close on PIR delay
    PIR_delay: 30,		    // 30 minutes of presence
    PIR_night_start: "08:00",	  // 08:00 hour
    PIR_night_end: "08:00",	  // 00:00 hour
    PIR_state: 1,			 // PIR enabled = 1
    // -- -- --  WINDOWS:  -- -- --
    // state ->  1 = online, 0 = offline
    // delay ->  10 seconds -- NOTIFY user
    // -- -- --  WINDOWS:  -- -- --
    windows: [
        {
            "_id": "3rd",
            "order": 1,
            "state": 1,
            "online":0,
            "RPi_GPIO": 17,
            "window": "3rd floor window"
        },{
            "_id": "3rd",
            "order": 2,
            "state": 1,
            "online":0,
            "RPi_GPIO": 22,
            "window": "3rd floor window X"
        }
    ]
}
