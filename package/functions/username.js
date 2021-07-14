module.exports = {
  name:"username",
  execute:async d => {
    const r = d.code.split("$username").length - 1
    if(d.code.split("$username")[r].startsWith("[")){
        let inside = d.ins()
        let id = (inside ? inside : d.message.author.id)
        let user = await d.client.users.fetch(id).catch(err => { })
        if (!user) user = { username: "undefined" }
        code = d.code.replaceLast(`$username[${inside}]`, user.username.escape())

        return {
          code: code
        }
    } else {
      code = d.code.replaceLast("$username", d.message.author.username.escape())

      return {
        code: code
      }
    }
  }
}