const msg = async(message,data,interaction) => {
  if(!data) return;
  let obj = {}
  if(data.code) obj.content = data.code
  if(data.buttons) obj.components = [data.buttons]
  if(data.embed) obj.embeds = [data.embed]
  if(Object.keys(obj).length===0) return;
  let msg;
  if(data.data?.reply===true){
    if(interaction){
      msg = await interaction.reply(obj,true)
    }else{
      msg = await message.reply(obj,true)
    }
  }else{
    msg = await message.channel.send(obj)
  }
  return msg;
}
module.exports = msg;