module.exports = {
  name:"isNumber",
  execute:async d => {
    let n = d.ins()
    code = d.code.replaceLast(`$isNumber[${n}]`, !isNaN(n))

    return {
        code: code
    }
  }
}