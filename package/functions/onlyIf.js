const execute = require('../bot/executableCommand.js')
const embed = require('../bot/embed.js')
module.exports = {
  name:"onlyIf",
  execute: async d => {
  let inside = d.ins()
  let [condition, error] = inside.split(";")
  let operators = ["==", "<", ">", "!=", ">=", "<="]
  let operator = undefined 
  operators.map(x => {
    if (condition.includes(x)) {
      operator = x
    } 
  }) 
  if (!operator) return message.channel.send(`❌ Invalid operator in \`$if[${inside}]\``)


  let ops = condition.split(operator)

  let op = false 
  
  if (condition.includes("==")) {
    if (ops[0] === ops[1]) op = true 
  } else if (condition.includes("!=")) {
    if (ops[0] !== ops[1]) op = true 
  } else if (condition.includes("<=")) {
    if (Number(ops[0]) <= Number(ops[1])) op = true
  } else if (condition.includes(">=")) {
    if (Number(ops[0]) >= Number(ops[1])) op = true
  } else if (condition.includes("<")) {
    if (Number(ops[0]) < Number(ops[1])) op = true 
  } else if (condition.includes(">")) {
    if (Number(ops[0]) > Number(ops[1])) op = true 
  }

  if (!op) {
    if (error) {
      if(error.includes('{execute:')){
        error = await execute(error,d.client,d.message)
      }
      let res = embed(error)
      let obj = {}
      if(res.error) obj.content = res.error
      if(res.embed) obj.embeds = [res.embed]
      if(res.attachment) obj.files = [res.attachment]
      d.message.channel.send(obj)
    }
    return;
  }
  
  let code = d.code.replaceLast(`$onlyIf[${inside}]`, "")
  
  return {
    code:code 
  }
  }
}