module.exports = (io) => {
    const moment= require('moment')

    if (process.platform==='linux') {

        console.log('MOMENT -- ' + moment().unix())

        io.on("connection", socket => {
            socket.on('Fan_API', function () {
                console.log(data + 'DATA DATA DATA ')
            })


        })
    }
}

