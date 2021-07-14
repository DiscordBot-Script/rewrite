const executeCommand = async (error,client,message,args) => {
    if (!error.includes("{execute:")) return error

    let x = error.split("{execute:")[1].split("}")[0]

    let command = client.executable.get(x)

    if (!command){
      message.channel.send({content:`:x: Invalid executable command: \`${x}\`.`})
      return
    }
  
    error = error.replaceLast(`{execute:${x}}`, "")

    let execute = await require('../main/interpreter.js')(client, command.code,message, args)
  
  if (execute !== undefined) {
  const msg = await require("./msg.js")(message,execute)
  }

  return error
}

module.exports = executeCommand;