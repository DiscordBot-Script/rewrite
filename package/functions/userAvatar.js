module.exports = {
  name:"userAvatar",
  execute:async d => {
  let r = d.code.split("$userAvatar[").length - 1
  if (d.code.split("$userAvatar")[r].startsWith("[")){
    let inside = d.ins()
    let [userID, size, format] = inside.split(";")

    let id = (userID ? userID : d.message.author.id)
    let user = await d.client.users.fetch(id).catch(err => { })

    if (!user) return d.message.channel.send(`:x: Invalid user ID in 1st field of \`$userAvatar[${inside}]\`.\n${docs.data}/useravatar`)

      if (![
        "png",
        "webp",
        "jpg",
        "jpeg",
        "gif"
     ].includes(format)) format = "png"

     let result = user.displayAvatarURL({ format: format, dynamic: true, size: (size ? Number(size) : 512) })
     code = d.code.replaceLast(`$userAvatar[${inside}]`, result)
    return {
      code:code
    }
} else {
  code = d.code.replaceLast("$userAvatar", d.message.author.displayAvatarURL({ format: "png", dynamic: true, size: 512 }))

    return {
      code: code
    }
    }
  }
}