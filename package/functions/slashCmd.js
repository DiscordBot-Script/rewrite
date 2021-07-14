module.exports = {
  name:"slashCmd",
  execute: async d => {
    let inside = d.ins()
    let [id,option] = inside.split(';')
    let cmd = await d.message.guild.commands.fetch(id)
    let res;
    switch(option){
      case "name": res = cmd.name
      break;
      case "description" : res = cmd.description
    }
    return {
      code: d.code.replaceLast(`$slashCmd[${inside}]`,res)
    }
  }
}