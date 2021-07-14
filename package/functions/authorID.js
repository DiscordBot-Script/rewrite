module.exports = {
  name:"authorID",
  execute: async d => {
    return {
      code: d.code.replaceLast(`$authorID`,d.message.author.id)
    }
  }
}