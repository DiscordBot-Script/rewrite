module.exports = {
  name:"slashOption",
  execute: async d => {
    let inside = d.ins()
    let map = d.other?.options
    let res;
    if(map) res = map.get(inside).value.escape()
    else res = "undefined"
    return {
      code: d.code.replaceLast(`$slashOption[${inside}]`,res)
    }
  }
}