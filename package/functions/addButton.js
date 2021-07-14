const discord = require('discord.js')
module.exports = {
  name:"addButton",
  execute:async d => {
    let inside = d.ins()
    let [
      customID,
      style,
      label,
      emli,
      disabled = 'no'
    ] = inside.unescape().split(';')
    if(!d.actionRow) d.actionRow = new discord.MessageActionRow()
    if(!['yes','no'].includes(disabled)) return d.message.channel.send(':x: Invalid Option Provided')
    const button = new discord.MessageButton()
    .setCustomID(customID)
    .setStyle(style.toUpperCase())
    .setLabel(label)
    .setDisabled(disabled.replace('yes',true).replace('no',false))
    if(style.toUpperCase==='LINK'){
      button.setURL(emli)
    }else{
      button.setEmoji(emli)
    }
    d.actionRow.addComponents(button)
    return {
      code:d.code.replaceLast(`$addButton[${inside}]`,""),
      data:d
    }
  }
}