const {docs} = require("../util/docs.json")
module.exports = {
  name:"kick",
  execute:async d => {
  let inside = d.ins()
  let [userID, reason] = inside.split(";")

  let member = d.message.guild.members.cache.get(userID)

  if (!member) return d.message.channel.send(`:x: Invalid user ID in \`$kick[${inside}]\`.\n${docs.action}/kick`)

  if (member && d.message.guild.me.roles.highest.position <= member.roles.highest.position) return d.message.channel.send(`:x: Failed to kick user. Check bot role hoisting heiarchy.\n${docs.action}/kick`)

  if (!d.message.guild.me.hasPermission("KICK_MEMBERS")) return d.message.channel.send(`:x: Failed to kick user. Check bot permissions.\n${docs.action}/kick`)
    
  member = await member.kick(reason.unescape()).catch(Err => {})

  code = d.code.replaceLast(`$kick[${inside}]`, "")

  return {
    code: code
  }
  }
}