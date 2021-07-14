module.exports = {
  name:"interactionType",
  execute: async d => {
    return {
      code: d.code.replaceLast(`$interactionType`,d.other?.type || "undefined")
    }
  }
}