exports.run = (client, message, args, command, account) => {


    let user = message.mentions.members.first()
    let infoz = account
    if (user) infoz = client.getUser.get(user.id)
    if(!infoz) return message.reply(" no account")
    guild = client.getGuild.get(infoz.guildID)
    let act;
    act = (100 * infoz.xp) / ((infoz.level + 1) * (infoz.level + 1) * 125)    
    act = Math.floor(act)
    
    message.channel.send("👤 **__Account: " + infoz.nickname + "__** \n\n> ♦️ Rubies: " + infoz.mbits + "\n> 🏆 Rank: " + infoz.rank + "\n> ☄️ Level: " + infoz.level + "\n> ✨ XP: " + act + "%" + "\n> 🏠 Guild: ")
}
