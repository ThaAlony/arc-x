exports.run = (client, message, args, command, account) => {
    
    const Discord = require("discord.js")

    let embed
    if (client.lingua == "it") {
        embed = new Discord.MessageEmbed()
            .setTitle("Un po' di Aiuto?")
            .addField("Cosa?", "**AW | Project X** è il centro di MVO, non solo lavora nel server dicord principale ma gestisce il sistema di gilde")
            .addField("Chi?", "Il Bot è stato creato e viene gestito da `" + client.guilds.cache.get(client.config.GuildServerID).members.cache.get(client.config.aloneID).user.tag + "`")
            .addField("Altro?", "Queste info sono state scritte il mese di Gennaio 2021 ed il Bot era in Pre Alpha, \nIl Bot è passato in Closed Beta il mese di ???????? ????, \nIl Bot è passato in Stable Relase il mese di ???????? ????")
            .setFooter("Versione : " + client.config.version)
            .setColor("#4dff4d")
    } else {
        embed = new Discord.MessageEmbed()
            .setTitle("Need a little Help?")
            .addField("What?", "**AW | Project X** is the center of MVO, not only it works in the main discord server but it also manages the guilds system")
            .addField("Who?", "The Bot was created and is managed by `" + client.guilds.cache.get(client.config.GuildServerID).members.cache.get(client.config.aloneID).user.tag + "`")
            .addField("More?", "These infos were written in January 2021 and the Bot was in Pre Alpha, \nThe Bot was upgraded to Closed Beta in ??????? ????, \nThe Bot was upgraded in Stable Relase in ??????? ????")
            .setFooter("Version : " + client.config.version)
            .setColor("#4dff4d")
    }
    message.channel.send(embed)
}