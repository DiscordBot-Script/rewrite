module.exports = {
  name:"createSlashCommand",
  execute:async d => {
    let inside = d.ins()
    let [
      dataName,
      guildID
    ] = inside.split(';')
    let data = d.client.slashData.get(dataName)
    if(!data) return message.channel.send(`:x: Invalid Slash Command Data Name In $createSlashCommand[${inside}]`)
    if(guildID==='global'){
      d.client.cache.guilds.cache.forEach(guild => {
        guild.commands.create(data)
      })
    }else{
      let guild = d.client.guilds.cache.get(guildID)
      guild.commands.create(data)
    }
    return {
      code:d.code.replaceLast(`$createSlashCommand[${inside}]`,"")
    }
  }
}