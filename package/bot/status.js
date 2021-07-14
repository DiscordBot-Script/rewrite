const Status = async (client, ops, time) => {

    if (isNaN(time) || time < 9000) return console.error('API limitation reached: Status change cannot be faster than 9 seconds / 9000')

    let y = 0,
    arr = Object.entries(ops)

    setInterval(async () => {
        if (y >= arr.length) y = 0

        let code = await require('../main/interpreter.js')(client, arr[y][1].description,undefined, [])
        if (!client.readyAt) return;
        if (!code) return;
        if (arr[y][1].type.toUpperCase() === "STREAMING") {
            client.user.setPresence({
                activities: [{
                    name: code.code,
                    type: arr[y][1].type, url: arr[y][1].url
                }]
            })
        } else {
            client.user.setPresence({
                activities: [{
                    name: code.code,
                    type: arr[y][1].type.toUpperCase()
                }], status: arr[y][1].status
            })
        }
        y++
    }, time)
}

module.exports = Status;