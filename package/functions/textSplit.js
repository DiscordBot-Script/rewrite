module.exports = {
  name:"textSplit",
  execute:async d => {
    let inside = d.ins()
    let [text, separator] = inside.split(";")
    array = text.split(separator)
    code = d.code.replaceLast(`$textSplit[${inside}]`, "")
    d.array = array

    return {
      code: code,
      data:d
    }
  }
}