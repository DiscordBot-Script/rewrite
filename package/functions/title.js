const discord = require('discord.js')
module.exports = {
  name:"title",
  execute: async d => {
  let inside = d.ins()
  
  let [title, url] = inside.split(';');

  if (!d.embed) d.embed = new discord.MessageEmbed()
  if(url) d.embed = d.embed.setURL(url.unescape())
  code = d.code.replaceLast(`$title[${inside}]`, "")
  
  return {
    code:code,
    embed:d.embed.setTitle(title.unescape())
  }
  }
}