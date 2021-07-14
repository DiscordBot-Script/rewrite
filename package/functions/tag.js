const { docs } = require("../util/docs.json");
module.exports = {
  name:"tag",
  execute:async d => {
    const r = d.code.split("$tag").length - 1
    if(d.code.split("$tag")[r].startsWith("[")){
        let inside = d.ins()
        let id = (inside ? inside : d.message.author.id)
        let user = await d.client.users.fetch(id).catch(err => {})
        if (!user) return d.message.channel.send(`:x: Invalid user ID in \`$tag[${inside}]\`.\n${docs.data}/tag`)
      code = d.code.replaceLast(`$tag[${inside}]`, user.tag.escape())
      return {
        code: code
      }
    }else{
      code = d.code.replaceLast("$tag", d.message.author.tag.escape())

      return {
        code: code
      }
  }
}
}