module.exports = {
    _id: "CFG_PC601_STUDY",
    name: "Palm Cay 601 STUDY",  // pre-set conditions
    TOUCH_SCREEN: "event0",
    DHT_GPIO_1: 5,          // primary DHT
    DHT_GPIO_2: 999,        // secondary DHT
    DS18_GPIO: 4,           // DS18BO020 -> one-wire TEMP
    fan_GPIO: 12,           // SABIANA_FAN
    fan_speed: [0,10,8,15,30,40],  // * OFF-LINE * / AUTO / SOFT / BREEZE / MISTRAL / VIENTO
    temp_calibrate: -0.5,  // +/- 0.75 F  calibration on DHT sensor
    cool_temp_max: 80,		// max cooling: 86 F
    cool_temp_min: 65,		// min cooling: 66 F

    // -- -- --  WINDOWS:  -- -- -- //
    windows: [
        {
            "_id": "side",
            "order": 4,
            "state": 1,     // state  -> 1 = window open
            "online":1,     // online -> 1 = window online / 0 = offline
            "window": "Side window"
        },{
            "_id": "front_left",
            "order": 1,
            "state": 0,
            "online":1,
            "window": "Front window L"
        }, {
            "_id": "front_right",
            "order": 2,
            "state": 1,
            "online": 1,
            "window": "Front window R",
        },{
            "_id": "XXX",
            "order": 3,
            "state": 1,
            "online":1,
            "window": "XXX window R"
        }
    ]
}



// PIR_GPIO: 6,         // PIR on GPIO 6
// cold_GPIO: 13,
// SAVE_EVERY: 60,      // save STAT after 1 hour of Last_Touched
// PIR_delay: 30,	    // 30 minutes of presence
// PIR_night_start: "08:00",   // 08:00 hour
// PIR_night_end: "08:00",     // 00:00 hour
// PIR_state: 0,		       // PIR enabled = 0
