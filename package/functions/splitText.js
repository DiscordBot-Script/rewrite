const {docs} = require("../util/docs.json");
module.exports = {
  name:"splitText",
  execute:async d => {
    let inside = d.ins()
    if (!d.array.length) return d.message.channel.send(`:x: \`$splitText[${inside}]\`: Could not find a value from a **$textSplit**.\n${docs.data}/splittext`)
    let n = d.array[Number(inside) - 1] || "undefined"

    code = d.code.replaceLast(`$splitText[${inside}]`, n)

    return {
      code: code
    }
  }
}