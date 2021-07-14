const { docs } = require("../util/docs.json");
module.exports = {
  name:"randomUserReaction",
  execute:async d => {
    let inside = d.ins()
    let [channelID, messageID, emoji] = inside.split(";")
    let channel = await d.client.channels.fetch(channelID).catch(err => { })

    if (!channel) return d.message.channel.send(`:x: Invalid channel ID in \`$randomUserReaction[${inside}]\`.\n${docs.data}/randomuserreaction`)

    let msg = await channel.messages.fetch(messageID).catch(err => {})

    if (!msg) return message.channel.send(`:x: Invalid message ID in \`$randomUserReaction[${inside}]\`.\n${docs.data}/randomuserreaction`)
    else if (!msg.reactions.cache.has(emoji)) return message.channel.send(`:x: Reaction doesnt exist.\n${docs.data}/randomuserreaction`);

    let reaction = msg.reactions.cache.get(emoji)
    let reacted = await reaction.users.fetch({
        limit: 100,
    })
    let final = reacted.random().id || 'undefined'

    code = d.code.replaceLast(`$randomUserReaction[${inside}]`, final)

    return {
        code: code
    }
  }
}