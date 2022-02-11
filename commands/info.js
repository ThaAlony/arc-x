exports.run = (client, message, args, command, account) => {

    const { createCanvas, Image } = require("canvas")

    /*const canvas = createCanvas(1024, 1024)
    const ctx = canvas.getContext('2d')*/
    
    let user = message.mentions.members.first()
    let infoz = account
    if (user) infoz = client.getUser.get(user.id)
    if (!infoz) return message.reply(" no account")
    let discordinfo = client.getDiscordInfo.get(infoz.id)
    if (!discordinfo) return message.reply(" no account")
    guild = client.getGuild.get(infoz.guildID)
    let act;
    act = (100 * infoz.xp) / ((infoz.level + 1) * (infoz.level + 1) * 125)    
    act = Math.floor(act)

    console.log(discordinfo)
    if (!guild) guild = { "nome" : ""}
    const text = "👤 **__Account: " + infoz.nickname + "__** \n\n> ♦️ Rubies: " + infoz.mbits + "\n> 🏆 Rank: " + discordinfo.rank + "\n> ☄️ Level: " + infoz.level + "\n> ✨ XP: " + act + "%" + "\n> 🏠 Guild: " + guild.nome

    message.channel.send(text)

    /*
    if (infoz.character) {
        const char = infoz.character.split(' ')
        let img = new Image()
        let i = 0;
        do {
            const info = char[i].split('-')
            img.src = "./images/" + info[0] + info[1] +".png"
            ctx.drawImage(client.recolor(img, info[2], info[3]), 0, 0)
            i++;
        } while (char[i])

        message.channel.send(text, { files: [canvas.toBuffer()] });
    } else message.channel.send(text); */

    /*
    let img = new Image()
    img.src = './images/mape.png'
    ctx.drawImage(img, 0, 0, 1000, 1000)*/

    //message.channel.send(text, { files: [canvas.toBuffer()] });
}
