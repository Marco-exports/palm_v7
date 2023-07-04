//const { exec } = require("child_process")

const { exec } = require("child_process")

exec("sudo ./timeout 10 15 event3", (error, stdout, stderr) => console.log(stdout));



// require('sudo ./timeout 10 15 event3')


//exec("ls -la", (error, stdout, stderr) => {
//     if (error) {
//         console.log(`error: ${error.message}`)
//         return
//     }
//     if (stderr) {
//         console.log(`stderr: ${stderr}`)
//         return
//     }
//     console.log(`stdout: ${stdout}`)
// })
// sudo ./timeout 20 15 event3

