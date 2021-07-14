const discord = require('discord.js')
module.exports = {
  name:"color",
  execute: async d => {
  let inside = d.ins()
  if (!d.embed) d.embed = new discord.MessageEmbed()
  code = d.code.replaceLast(`$color[${inside}]`, "")
  return {
    code:code,
    embed:d.embed.setColor(inside.unescape())
  }
  }
}