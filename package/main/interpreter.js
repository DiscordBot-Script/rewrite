const fs = require("fs");
const fetch = require("node-fetch")
let funcs = [];
const functions = fs.readdirSync(`./package/functions/`).filter(file => file.endsWith(".js"));
for (let file of functions) {
    let pull = require(`../functions/${file}`);
    if (pull.name) {
    if(pull.denied) continue;
    funcs.push(pull)
    }
}

funcs = funcs.sort((a,b) => b.name.length - a.name.length)

const interpreter = async (client,code,message,args,other) => {
  let functions = code.escape('ops').split('$').slice(1).reverse()
  let data = {
    embed: undefined,
    actionRow:undefined,
    code:code.escape('ops'),
    client:client,
    message:message,
    args:args,
    other:other
  }
  for(let i = 0;i < functions.length;i++){
    if(data.code === undefined) return;
    const func = '$'+functions[i] 
    let avaliableFunc = funcs.filter(f => '$'+f.name === func.slice(0,f.name.length+1))
    if(!avaliableFunc[0]) return;
    let x = avaliableFunc[0]
    data.ins = () => {
      const r = data.code.split("$"+x.name).length - 1
      let inside = data.code.split("$"+x.name+"[")[r].split(']')[0]
      return inside;
    }
    let res = await x.execute(data)
    data.code = res?.code
    if(res?.embed) data.embed = res.embed
    if(res?.data) data = res.data
  }
  return {
    code:data.code ? data.code.unescape() : "",
    embed:data.embed,
    buttons:data.actionRow,
    data:data
  }
}

module.exports = interpreter;


String.prototype.replaceLast = function(what, replacement) {
  var pcs = this.split(what);
  var lastPc = pcs.pop();
  return pcs.join(what) + replacement + lastPc;
};

String.prototype.escape = function(ops){
  let encrypt = require('../util/encrypt')
  if(!ops){
  let content = this.split(']').join(encrypt('#BRACKET#')).split(';').join(encrypt("#SEMI_COLON#"))
  return content
  }else{
    let content = this.split(/\\]/gi).join(encrypt('#BRACKET#')).split(/\\;/gi).join(encrypt("#SEMI_COLON#"))
    return content;
  }
}

String.prototype.unescape = function(){
  let encrypt = require('../util/encrypt')
  let content = this.split(encrypt("#BRACKET#")).join(']').split(encrypt("#SEMI_COLON#")).join(';')
  return content
}