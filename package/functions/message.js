module.exports = {
  name:"message",
  execute: async d => {
  let r = d.code.split('$message').length - 1
  if(d.code.split("$message")[r].startsWith("[")){
    let inside = d.ins()
    if (isNaN(inside) || Number(inside) < 0) return d.message.channel.send(`❌ Invalid arg number in \`$message[${inside}]\``)

    let n = d.args[Number(inside) - 1] || ""
    if(Number(inside) === 0) n = name
   return {
    code: d.code.replaceLast(`$message[${inside}]`, n.escape())
    }
    } else {
   return {
    code: d.code.replaceLast(`$message`, d.args.join(' ').escape())
   }
}
}
}