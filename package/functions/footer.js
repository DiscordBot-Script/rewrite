const discord = require('discord.js')
module.exports = {
  name:"footer",
  execute: async d => {
  let inside = d.ins()
  if (!d.embed) d.embed = new discord.MessageEmbed()
  code = d.code.replaceLast(`$footer[${inside}]`, "")
  return {
    code:code,
    embed:d.embed.setFooter(inside.unescape())
  }
  }
}