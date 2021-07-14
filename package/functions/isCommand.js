module.exports = {
  name:"isCommand",
  execute:d => {
    return {
    code: d.code.replaceLast(`$isCommand`,d.other?.isCommand().toString())
    }
  }
}