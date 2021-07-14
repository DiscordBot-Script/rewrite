module.exports = {
  name:"log",
  execute:async d => {
    let inside = d.ins()
    console.log(inside)
    return {
      code:d.code.replaceLast(`$log[${inside}]`,"")
    }
  }
}