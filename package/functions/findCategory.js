module.exports = {
  name:"findCategory",
  execute:async d => {
    let inside = d.ins()

    let [id, option] = inside.split(";");
    let channel;
    try {
        channel = await d.client.channels.cache.find(channel => (channel.name.toLowerCase() === id.trim().toLowerCase() || channel.id === id.trim()) && channel.type === "category") || 'undefined'
    } catch(error){}
    if (option === "name") {
        code = d.code.replaceLast(`$findCategory[${inside}]`, (channel ? channel.name : channel))
    }
    else code = d.code.replaceLast(`$findCategory[${inside}]`, (channel ? channel.id : channel))

    return {
        code: code
    }
  }
}