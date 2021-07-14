module.exports = {
  name:"messageSlice",
  execute:async d => {
    let inside = d.ins()
    let result = [];
    let array = inside.split("");
    let splitedMsg = d.args
    if (Number(array[1]) > splitedMsg.length) return d.message.channel.send(`:x: Invalid operator in \`$messageSlice[${inside}]\`.`)
    if (array[0] === "<") {
      for (let i = 0; i < Number(array[1]); i++) {
        result.push(splitedMsg[i])
      }
    } else if (array[0] === ">") {
      for (let i = Number(array[1]); i < splitedMsg.length; i++){
          result.push(splitedMsg[i])
      }
    } else if (array[0] === "-") {
      splitedMsg.splice(Number(array[1]) - 1, 1)
      result = splitedMsg;
    } else {
      result = [splitedMsg[Number(inside) - 1]]
    }
    code = d.code.replaceLast(`$messageSlice[${inside}]`, result.join(" ").escape())
    return {
        code: code
    }
  }
}