const int = require('../main/interpreter.js')
const msg = require('../../package/bot/msg.js')
const event = async (client, message, prefix) => {
  
  let args = message.content.slice(prefix.length).trim().split(/ +/g)

  prefix.map(async p => {
    if (message.content.startsWith(p)) prefix = p
  })

  if(typeof prefix === "object") return
  let cmd = args.shift().toLowerCase()
  
  let command = client.commands.get(cmd) || client.commands.find(x => x.aliases && x.aliases.includes(cmd))

  if (!command) return

  message.idd = message.id

  command.code.forEach(async (code) => {
  let execute = await int(client,code,message,args)
  if (execute !== undefined) {
    await msg(message,execute)
  }
  })
}

module.exports = event;