module.exports = {
  name:"slashID",
  execute: async d => {
    return {
      code: d.code.replaceLast(`$slashID`,d.other?.commandID || "undefined")
    }
  }
}