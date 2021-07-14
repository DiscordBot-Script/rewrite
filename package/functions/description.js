const discord = require('discord.js')
module.exports = {
  name:"description",
  execute: async d => {
  let inside = d.ins()
  if (!d.embed) d.embed = new discord.MessageEmbed()
  code = d.code.replaceLast(`$description[${inside}]`, "")
  return {
    code:code,
    embed:d.embed.setDescription(inside.unescape())
  }
  }
}