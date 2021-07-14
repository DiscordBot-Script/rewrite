const Discord = require('discord.js')
const ms = require("ms")

const embed = (msg) => {
  
  let Embed = new Discord.MessageEmbed()
  let arr = new Discord.MessageAttachment()

  msg.split("{hyper").map((x, y) => {
    if (!msg.includes("{hyper:")) return 
      let ins = msg.split("{hyper:")[1].split("}")[0] 
      let text = ins.split(":")[0]
      let url = ins.split(":").slice(1).join(":") 
      msg = msg.replace(`{hyper:${ins}}`, `[${text}](${url})`)
  }) 
  
  if (msg.includes("{field:")) {
    msg.split("{field:").map(x => {
      if (!msg.includes("{field:")) return
      let inside = msg.split("{field:")[1].split("}")[0] 
      let fields = inside.split(":");
      let title = fields[0];
      let value = fields.slice(1, fields.length - 1).join(":");
      let inline = fields[fields.length - 1];
      if (!["yes","no"].includes(inline)) {
      inline = "no";
      value = fields.slice(1).join(":");
    }
      if(inline && inline.trim().toLowerCase() === "yes") {
        Embed.addField(title, value, true)
        } else {
          Embed.addField(title, value)
        }
      msg = msg.replace(`{field:${inside}}`, "") 
    }) 
    }
 
  if (msg.includes("{author:")) {
    let author = msg.split("{author:")[1].split("}")[0]
    Embed.setAuthor(author)
    msg = msg.replace(`{author:${author}}`, "")

    if (msg.includes("{authoricon:")) {
      let icon = msg.split(`{authoricon:`)[1].split("}")[0]
      Embed.setAuthor(author, icon)
      msg = msg.replace(`{authoricon:${icon}}`, "") 
    } 
  }
  
  if (msg.includes("{color:")) {
    let color = msg.split("{color:")[1].split("}")[0]
    Embed.setColor(color)
    msg = msg.replace(`{color:${color}}`, "") 
  } 

  if (msg.includes("{attachment:")) {
    let attachment = msg.split("{attachment:")[1].split("}")[0]
    arr.setFile(attachment)
    msg = msg.replace(`{attachment:${attachment}}`,"")
  }

  if (msg.includes("{title:")) {
    let title = msg.split("{title:")[1].split("}")[0]
    Embed.setTitle(title) 
    msg = msg.replace(`{title:${title}}`, "") 
  }
  
  if (msg.includes("{description:")) { 
    let description = msg.split("{description:")[1].split("}")[0] 
    Embed.setDescription(description) 
    msg = msg.replace(`{description:${description}}`, "") 
  } 

  if (msg.includes("{thumbnail:")) {
    let thumbnail = msg.split("{thumbnail:")[1].split("}")[0]
    Embed.setThumbnail(thumbnail) 
    msg = msg.replace(`{thumbnail:${thumbnail}}`, "") 
  }

  if (msg.includes("{image:")) {
    let image = msg.split("{image:")[1].split("}")[0]
    Embed.setImage(image) 
    msg = msg.replace(`{image:${image}}`, "") 
  } 

  if (msg.includes("{timestamp")) {
    let stamp = msg.split("{timestamp")[1].split("}")[0]
    Embed.setTimestamp()
    msg = msg.replace(`{timestamp}`, stamp)
  } 
  
  if (msg.includes("{footer:")) {
    let footer = msg.split("{footer:")[1].split("}")[0]
    Embed.setFooter(footer)
    msg = msg.replace(`{footer:${footer}}`, "")

    if (msg.includes("{footericon:")) {
      let url = msg.split("{footericon:")[1].split("}")[0]
      Embed.setFooter(footer, url)
      msg = msg.replace(`{footericon:${url}}`, "") 
    } 
  }
  
  if (!Embed.color && !Embed.title && !Embed.description) Embed = undefined
  if (!arr.attachment) arr = undefined
  return {
    embed:Embed,
    attachment:arr,
    error:msg
  }
}

module.exports = embed