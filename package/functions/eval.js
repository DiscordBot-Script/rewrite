module.exports = {
  name:"eval",
  execute: async d => {
    let inside = d.ins()
    let ins = inside.unescape()
    let execute = await require('../main/interpreter.js')(d.client, ins,d.message, d.args)
    return {
      code:d.code.replaceLast(`$eval[${inside}]`,execute.code),
      embed:execute.embed,
      data:execute.data
    }
  }
}