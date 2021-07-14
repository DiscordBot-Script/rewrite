module.exports = {
  name:"getUserVar",
  execute: async d => {
  let [varName,guildID,userID] = inside.split(';')
  let modifiedData = await d.client.db.tables.get('main').columns.filter(x => x.name===varName+'_'+guildID+'_'+userID)
  if(!modifiedData){
    let originalData = await d.client.db.tables.get('main').columns.filter(x => x.name===varName)
  }
  console.log(res)
    return {
      code: d.code.replaceLast(`$getUserVar`,modifiedData.default)
    }
  }
}