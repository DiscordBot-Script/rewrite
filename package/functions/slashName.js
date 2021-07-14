module.exports = {
  name:"slashName",
  execute: async d => {
    return {
      code: d.code.replaceLast(`$slashName`,d.other?.commandName || "undefined")
    }
  }
}