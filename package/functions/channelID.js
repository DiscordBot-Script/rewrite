module.exports = {
  name:"channelID",
  execute:async d => {
  let r = d.code.split('$channelID').length - 1
  if (d.code.split("$channelID")[r].startsWith("[")) {
      let inside = d.ins()
      let id = (inside ? inside : d.message.channel.id)
      let channel = d.client.channels.cache.find(ch => ch.name === id) || d.message.guild.channels.cache.get(id)

      if (!channel) return d.message.channel.send(`:x: Invalid channel name in \`$channelID[${inside}]\`.\n${docs.data}/channelid`)

      code = d.code.replaceLast(`$channelID[${inside}]`, channel.id)

      return {
        code: code
      }
    } else {
      code = d.code.replaceLast("$channelID", d.message.channel.id)

      return {
        code: code
      }
    }
  }
}