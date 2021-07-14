const execute = require('../bot/executableCommand.js')
module.exports = {
  name:"replaceText",
  execute: async d => {
    let inside = d.ins()
    let [text, match, replacer] = inside.unescape().split(";")
    if (inside.split(";").length !== 3) return message.channel.send(`:x: Invalid number of fields in \`$replaceText[${inside}]\`.\n${docs.action}/replacetext`)
    
    if (replacer.includes("{execute:") && (text === match)) {
        let m = await execute(replacer,d.client,d.message)
        replacer = m
        if (!replacer) return
    }
    text = text.split(match).join(replacer).escape()
    code = d.code.replaceLast(`$replaceText[${inside}]`,text)
    
    return {
      code: code
    }
  }
}