const { docs } = require("../util/docs.json")
module.exports = {
  name:"messageUnpin",
  execute:async d => {
    let inside = d.ins()
    let [channelID, messageID, option] = inside.split(";")
    let channel = await d.client.channels.cache.get(channelID ? channelID : d.message.channel.id)
    if (!channel) return d.message.channel.send(`:x: Invalid channel ID in 1st field of \`$messageUnpin[${inside}]\`.\n${docs.action}/messageunpin`)
    let msg;
    try {
        msg = await channel.messages.fetch(messageID)
    } catch {
        return d.message.channel.send(`:x: Invalid message ID in 2nd field of \`$messageUnpin[${inside}]\`.\n${docs.action}/messageunpin`)
    }
    let opt = option
    if (!opt) opt = ""

    if (msg.pinned === false) return d.message.channel.send(`:x: Message is not pinned! Catch with **$isPinned**\n\`$messageUnpin[${inside}]\`.\n${docs.action}/messageunpin`)

    let result = await msg.unpin().catch(err => { })

    if (opt === "id") opt = result
    else if (opt === "url") opt = result.url
    else if (opt === "content") opt = result.content
    else if (opt === "author") opt = result.author
    else if (opt === "channel") opt = result.channel

    code = d.code.replaceLast(`$messageUnpin[${inside}]`, opt)
    return {
        code: code
    }
  }
}