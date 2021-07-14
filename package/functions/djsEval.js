const util = require('util')
module.exports = {
  name:'djsEval',
  execute:async d => {
    const r = d.code.split("$djsEval[").length - 1
    let inside = d.code.split("$djsEval[")[r].split("]")[0]
    try{
      const client = d.client
      const message = d.message
      if(!inside) return message.channel.send(`:x: Missing Code To Evaluate In \`$djsEval[${inside}]\``)
      let c =  eval(inside.unescape())
      let ev = util.inspect(c, {
        "depth": 0
      })
      return {
        code:d.code.replaceLast(`$djsEval[${inside}]`,ev)
      }
    }catch(err){
      return {
        code:d.code.replaceLast(`$djsEval[${inside}]`,err)
      }
    }
  }
}