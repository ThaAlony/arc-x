/*exports.run = (client, message, args, command, account) => {

    let infos = account
    if (!account) message.reply(" no account")

    let guild = client.getGuild.get(account.guildID);

    if (!args[0]) {
        if (client.lingua == "it") return message.reply(" l'utilizzo corretto � " + client.config.prefix + command + " crea/info/modifica/invita/caccia/elimina")
        return message.reply(" the correct use is " + client.config.prefix + command + " create/info/modify/invite/kick/delete")
    }
    switch (args[0].toLowerCase()) {
        case "create":
            client.guildCreate(client,message, guild, client.lingua, args, command)
            break;
        case "crea":
            client.guildCreate(client,message, guild, client.lingua, args, command)
            break;
        case "modify":
            client.guildModify(client,message, guild, client.lingua, args, command)
            break;
        case "modifica":
            client.guildModify(client,message, guild, client.lingua, args, command)
            break;
        case "invita":
            client.guildInvite(client,message, guild, client.lingua, args, command)
            break;
        case "invite":
            client.guildInvite(client,message, guild, client.lingua, args, command)
            break;
        case "kick":
            client.guildKick(client,message, guild, client.lingua, args, command)
            break;
        case "caccia":
            client.guildKick(client,message, guild, client.lingua, args, command)
            break;
        case "delete":
            client.guildDelete(client,message, guild, client.lingua, args, command)
            break;
        case "elimina":
            client.guildDelete(client,message, guild, client.lingua, args, command)
            break;
        case "join":
            client.guildJoin(client,message, infos, args, command, guild)
            break;
        case "entra":
            client.guildJoin(client,message, infos, args, command, guild)
            break;
        case "leave":
            client.guildLeave(client,message, guild, client.lingua, args, command)
            break;
        case "esci":
            client.guildLeave(client,message, guild, client.lingua, args, command)
            break;
        case "info":
            if (!guild) return client.notInAGuild(message, client.lingua)
            let amem = guild.members.split(" ")
            let members = ""
            for (let i = 0; amem && i < amem.length; i++) {
                members = members + message.guild.members.cache.get("" + amem[i]).user.tag + "\n"
            }
            message.channel.send(guild.nome + "\n" + guild.descrizione + "\n" + members + guild.badges)
            break;
        default:
            if (lingua == "it") return message.reply(" l'utilizzo corretto � " + client.config.prefix + command + " crea/info/modifica/invita/caccia/elimina")
            return message.reply(" the correct use is " + client.config.prefix + command + " create/info/modify/invite/kick/delete")
    }

}*/