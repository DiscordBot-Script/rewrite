const int = require('../main/interpreter.js')
const msg = require('../../package/bot/msg.js')
const event = async (client) => {
  client.ready.map(async command => {
    let message = {
      guild: client.channels.cache.get(command.name).guild,
      content: "",
      idd: Math.floor(Math.random() * 10101003949393),
      author: client.user,
      channel:client.channels.cache.get(command.name)
    }
    
    let execute = await int(client, command.code, message, message.content.split(" ")) 
    await msg(message,execute)
})
}
module.exports = event;