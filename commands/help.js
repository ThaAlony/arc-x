exports.run = (client, message, args, command, account) => {
    
    const Discord = require("discord.js")

    let embed
    if (client.lingua == "it") {
        embed = new Discord.MessageEmbed()
            .setTitle("Serve aiuto?")
            .addField("❓ **__Cosa?__**", "**Arc-X** \u00E8 il centro di MVO: non solo aggiunge funzionalità al nostro server Discord, ma gestisce anche tutto il sistema di MasterVerse Online!")
            .addField("❔ **__Chi?__**", "Il creatore (e attuale gestore) del Bot \u00E8 `" + client.guilds.cache.get(client.config.GuildServerID).members.cache.get(client.config.aloneID).user.tag + "`")
            .addField("❓ **__Altro?__**", "Il Bot \u00E8 passato in Pre-Alpha nel mese di Gennaio 2021. \nIl Bot \u00E8 passato in Open Beta nel mese di Dicembre 2021.")
            .setFooter("Versione : " + client.config.version)
            .setColor("#4dff4d")
    } else {
        embed = new Discord.MessageEmbed()
            .setTitle("Need help ?")
            .addField("❓ **__What?__**", "**Arc-X** is the center of MVO: it not only adds functionality to our Discord server, but it also manages the entire MasterVerse Online system!")
            .addField("❔ **__Who?__**", "The creator (and current manager) of the Bot is `" + client.guilds.cache.get(client.config.GuildServerID).members.cache.get(client.config.aloneID).user.tag + "`")
            .addField("❓ ** __Other ? __ **", "The Bot moved into Pre-Alpha in January 2021. \nThe Bot moved into Open Beta in December 2021")
            .setFooter("Version : " + client.config.version)
            .setColor("#4dff4d")
    }
    message.channel.send({ embeds: [embed] }).catch(console.error)
}