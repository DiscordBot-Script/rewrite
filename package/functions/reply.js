module.exports = {
  name:"reply",
  execute: d => {
    d.reply = true
    return {
      code: d.code.replaceLast(`$reply`,""),
      data: d
    }
  }
}