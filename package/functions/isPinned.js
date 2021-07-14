const { docs } = require("../util/docs.json");
module.exports = {
  name:"isPinned",
  execute:async d => {
    let inside = d.ins()
    let [channelID, messageID] = inside.split(";");

    let channel = await d.client.channels.fetch(channelID).catch(err => { })
    if (!channel) return d.message.channel.send(`:x: Invalid channel ID in 1st field of \`$isPinned[${inside}]\`.\n${docs.conditions}/ispinned`)
    let msg;
    try {
        msg = await channel.messages.fetch(messageID)
    } catch {
        return d.message.channel.send(`:x: Invalid message ID in 2nd field of \`$isPinned[${inside}]\`.\n${docs.conditions}/ispinned`)
    }

    code = d.code.replaceLast(`$isPinned[${inside}]`, msg.pinned.toString())
    return {
      code: code
    }
  }
}