module.exports = {
  name:"userExists",
  execute:async d => {
    let inside = d.ins()
    let id = (inside ? inside : d.message.author.id)
    let user = await d.client.users.fetch(id).catch(err => {})
    code = d.code.replaceLast(`$userExists[${inside}]`, user ? 'true' : 'false')
    return {
        code: code
    }
  }
}