module.exports = {
  name:"customID",
  execute: async d => {
    return {
      code: d.code.replaceLast(`$customID`,d.other?.customID || "undefined")
    }
  }
}