const discord = require('discord.js');
const fs = require('fs')
const Interaction = require('../../package/events/interaction.js')
const Message = require('../../package/events/message.js')
const Ready = require('../../package/events/ready.js')
const Status = require('../../package/bot/status.js')

class DiscordLang {
  constructor(ops) {

    if (!ops.token) return console.error(`Invalid token given!`)

    if (!ops.prefix) return console.error(`Invalid prefix given!`)

    if (typeof ops.prefix !== "object") return console.error(`Prefix must be an array! Example: ["!", "?"]`)

    this.prefix = ops.prefix
    if (typeof ops.intents !== "object") return console.error(`Intents must be an array! Example: ["!", "?"]`)
    let intents = []
    ops.intents.forEach(x => {
      switch(x){
        case "guild" : intents.push(discord.Intents.FLAGS.GUILDS)
        break;
        case 'message' : intents.push(discord.Intents.FLAGS.GUILD_MESSAGES)
        break;
        case 'all' : intents.push(discord.Intents.ALL)
        break;
        case 'member' : intents.push(discord.Intents.FLAGS.GUILD_MEMBERS)
        break;
      }
    })
    this.intents = intents

    this.client = new discord.Client({ intents: this.intents });

    this.client.commands = new discord.Collection()
    this.client.interaction = new discord.Collection()
    this.client.slashData = new discord.Collection()
    this.client.ready = new discord.Collection()
    this.client.executable = new discord.Collection()

    this.client.login(ops.token)

  }

  MessageEvent() {
    this.client.on("message", async message => {
      Message(this.client, message, this.prefix)
    })
  }

  Command(ops) {
    ops = Array.from(arguments);

    if (!ops) return;
    ops.forEach(x => {
      if (!x.name) return console.error(`Command needs a name! Code:\n${x.code}`)
      if (!x.code) return console.error(`Command needs a code! Name: ${x.name}\n`)

      let check = this.client.commands.get(x.name)
      if (check) {
        check.code.push(x.code)
      } else {
        x.code = [x.code]
        check = x;
      }
      this.client.commands.set(check.name, check)
    })
  }
  SlashCommand(ops){
    this.client.slashData.set(ops.name,ops)
  }
  InteractionCommand(ops) {
    ops = Array.from(arguments);
    ops.forEach(x => {
      if (!x.code) return console.error(`Interaction Command needs a code! Name: ${x.name}\n`)
      this.client.interaction.set(x?.name || this.client.interaction.size, x)
    })
  } onInteraction() {
    this.client.on('interaction', async interaction => {
      await Interaction(this.client,interaction)
    })
  }

  ExecutableCommand(ops) {
    ops = Array.from(arguments);
    ops.forEach(x => {
      if (!x.name) return console.error(`Executable Command needs a name! Code:\n${x.code}`)
      if (!x.code) return console.error(`Executable Command needs a code! Name: ${x.name}\n`)
      this.client.executable.set(x.name, x)
    })
  }

  ReadyCommand(ops) {
    ops = Array.from(arguments);
    ops.forEach(x => {
      if (!x.name) return console.error(`Interaction Command needs a name! Code:\n${x.code}`)
      if (!x.code) return console.error(`Interaction Command needs a code! Name: ${x.name}\n`)
      this.client.ready.set(x.name, x)
    })
  } onReady() {
    this.client.on('ready', async () => {
      await Ready(this.client)
      console.log(fs.readdirSync(`./package/functions/`).filter(file => file.endsWith(".js")).length + " Function In DBScript v4 Beta")
    })
  }

  Status(ops, time) {
    Status(this.client, ops, time)
  }

}

module.exports = DiscordLang