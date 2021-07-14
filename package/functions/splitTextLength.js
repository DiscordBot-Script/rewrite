const {docs} = require("../util/docs.json")
module.exports = {
  name:"splitTextLength",
  execute:async d => {
    if (!d.array) return d.message.channel.send(`:x: \`$splitTextLength\`: Could not find a value from a **$textSplit**.\n${docs.data}/splittextlength`)
    let l = d.array.length

    code = d.code.replaceLast(`$splitTextLength`,l)

    return {
      code: code
    }
  }
}