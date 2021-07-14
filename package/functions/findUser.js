module.exports = {
  name:"findUser",
  execute:async d => {
    let inside = d.ins()
    let [userID, guildID,option] = inside.unescape().split(";")

    let user = d.client.users.cache.get(userID) || d.message.mentions.users.first() || d.client.users.cache.find(user => user.username.toLowerCase() === userID.toLowerCase()) || 'undefined'

    if(guildID){
    let guild = d.client.guilds.cache.get(guildID) || d.message.guild.id

    try {
      u = await guild.members.fetch(user)
    } catch {
      u = 'undefined'
    }
    }else u = user

    switch(option){
      case "mention": res = u ? u.id.toString() : u
      break;
      case "name": res = u ? u.user.username : u
      break;
      case "tag": res = u? u.user.tag : u
      break;
      default: res = u ? u.id : u
    }

    return {
        code: d.code.replaceLast(`$findUser[${inside}]`, res)
    }
  }
}