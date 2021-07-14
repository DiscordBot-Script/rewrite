module.exports = {
  name:"ping",
  execute: async d => {
    return {
      code: d.code.replaceLast(`$ping`,d.client.ws.ping)
    }
  }
}