
// sudo ./timeout 20 15 event3

const { exec } = require("child_process")

exec("./myExecutable", (error, stdout, stderr) => console.log(stdout))