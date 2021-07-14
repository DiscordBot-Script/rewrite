const { docs } = require("../util/docs.json")
module.exports = {
  name:"channelType",
  execute:async d => {
  const r = d.code.split("$channelType").length - 1
  if(d.code.split("$channelType")[r].startsWith("[")){

    let inside = d.ins()
    let id = (inside ? inside : d.message.channel.id)

    let channel;
    try {
      channel = await d.client.channels.fetch(id)
    } catch (error) {
      return d.message.channel.send(`:x: Invalid channel ID in \`$channelType[${inside}]\`.\n${docs.data}/channeltype`)
    }

    if (!channel) return d.message.channel.send(`:x: Invalid channel ID in \`$channelType[${inside}]\`.\n${docs.data}/channeltype`)

      code = code.replaceLast(`$channelType[${inside}]`, channel.type ?? 'undefined')

      return {
        code: code
      }
    } else {

      code = d.code.replaceLast("$channelType", d.message.channel.type)

      return {
        code: code
      }
    }
  }
}