const int = require('../main/interpreter.js')
const msg = require('../../package/bot/msg.js')
const event = async (client, interaction) => {
  client.interaction.map(async command => {
    let message = {
      guild: interaction.channel.guild,
      content: "",
      idd: interaction.message?.id || Math.floor(Math.random() * 10101003949393),
      author: interaction.user,
      channel:interaction.channel || interaction.message?.channel
    }
    
    let execute = await int(client, command.code, message, message.content.split(" "), interaction)

    await msg(message,execute,interaction)
  })
}
module.exports = event;