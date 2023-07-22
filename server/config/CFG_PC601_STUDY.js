module.exports = {
    _id: "CFG_PC601_STUDY",
    name: "Palm Cay 601 STUDY",     // pre-set conditions for room...
    TOUCH_SCREEN: "event3",
    PIR_GPIO: 6,            // PIR on GPIO 6
    DHT_GPIO_1: 5,          // primary DHT
    DHT_GPIO_2: 999,        // secondary DHT
    DS18_GPIO: 4,          // DS18BO020 -> one wire TEMP
    fan_GPIO: 12,
    fan_speed: [0,10,8,15,30,40],  // * OFF-LINE * / AUTOMATIC / SOFT / BREEZE / MISTRAL / VIENTO
    cold_GPIO: 13,
    SAVE_EVERY: 60,         // save STAT after 1 hour of Last_Touched
    publish_every: 120, 	// 120 secs to Firebase
    temp_calibrate: -0.5,  // +/- 0.75 F  calibration on DHT sensor
    cool_temp_min: 66,		// min cooling: 66 F
    cool_temp_max: 86,		// max cooling: 86 F
    heat_temp_min: 72,		// min heating: 72 F
    heat_temp_max: 82,		// max heating: 82 F
    PIR_delay: 30,		    // 30 minutes of presence
    PIR_night_start: "08:00",	  // 08:00 hour
    PIR_night_end: "08:00",	  // 00:00 hour
    PIR_state: 0,			 // PIR enabled = 0

    // -- -- --  WINDOWS:  -- -- --
    windows: [
        {
            "_id": "side_17",
            "order": 1,
            "state": 1,     //  1 = window --> open
            "online":1,     //  1 = window --> online
            "RPi_GPIO": 17,
            "window": "Side window 17 X"
        },{
            "_id": "side",
            "order": 2,
            "state": 0,     // 0 = window --> closed
            "online":0,     // 0 = window --> offline
            "RPi_GPIO": 22,
            "window": "Side window"
        },{
            "_id": "left",
            "order": 3,
            "state": 1,
            "online":0,
            "RPi_GPIO": 23,
            "window": "Left front window Y"
        },{
            "_id": "right",
            "order": 4,
            "state": 1,
            "online":0,
            "RPi_GPIO": 24,
            "window": "Right front window"
        }
    ]
}
