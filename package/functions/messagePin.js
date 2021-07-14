const { docs } = require("../util/docs.json")
module.exports = {
  name:"messagePin",
  execute:async d => {
    let inside = d.ins()
    let [channelID, messageID, option] = inside.split(";")
    let channel = await d.client.channels.cache.get(channelID ? channelID : d.message.channel.id)
    if (!channel) return d.message.channel.send(`:x: Invalid channel ID in 1st field of \`$messagePin[${inside}]\`.\n${docs.action}/messagepin`)
    let msg;
    try {
        msg = await channel.messages.fetch(messageID)
    } catch {
        return d.message.channel.send(`:x: Invalid message ID in 2nd field of \`$messagePin[${inside}]\`.\n${docs.action}/messagepin`)
    }
    let opt = option
    if (!opt) opt = ""

    if (msg.pinned === true) return d.message.channel.send(`:x: Message is already pinned! Catch with **$isPinned**\n\`$messagePin[${inside}]\`.\n${docs.action}/messagepin`)

    let result = await msg.pin().catch(err => { })

    if (opt === "id") opt = result
    else if (opt === "url") opt = result.url
    else if (opt === "content") opt = result.content
    else if (opt === "author") opt = result.author
    else if (opt === "channel") opt = result.channel

    code = d.code.replaceLast(`$messagePin[${inside}]`, opt)
    return {
        code: code
    }
  }
}