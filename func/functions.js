const Discord = require("discord.js")
const { createCanvas } = require("canvas")

module.exports.notInAGuild = function notInAGuild(message, lingua) {
    if (lingua == "it") return message.reply(" non sei in una gilda")
    message.reply(" you are not in a guild")
}

module.exports.staffGuildModify = function staffGuildModify(client, message, lingua, args, command) {
    if (!args[1] || !args[2] || !args[3]) {
        if (lingua == "it") return message.reply(" l'uso corretto è " + config.prefix + args[0].toLowerCase() + ' ID della Gilda "nome"/"descrizione"/"logo" Nome/Descrizione/Logo (link)')
        return message.reply(" the correct use is " + config.prefix + args[0].toLowerCase() + ' Guild ID "name"/"description"/"logo" Name/Description/Logo (link)')
    }
    let guild = client.getGuild.get(0 + args[1]);
    if (!guild) {
        if (lingua == "it") return message.reply(" non esiste nessuna gilda con ID " + args[1])
        return message.reply(" there's no guild with " + args[1] + " as ID")
    }
    switch (args[2].toLowerCase()) {
        case "nome":
            guildModifyName(client,message, guild, lingua)
            break;
        case "name":
            guildModifyName(client,message, guild, lingua)
            break;
        case "descrizione":
            guildModifyDescription(client,message, guild, lingua)
            break;
        case "description":
            guildModifyDescription(client,message, guild, lingua)
            break;
        case "logo":
            guildModifyLogo(client,message, guild, lingua)
            break;
    }
}

module.exports.guildCreate = function guildCreate(client, message, guild, lingua, args, command) {

    if (guild) {
        if (infos.lingua == "it") return message.reply(" sei gia in una gilda")
        return message.reply(" you are already in a guild")
    }
    if (!args[1] || !args[2] || !args[3]) {
        if (lingua == "it") return message.reply(" l'utilizzo corretto è " + config.prefix + command + " create Nome Logo (link) Descrizione")
        return message.reply("The correct use is " + config.prefix + command + " create Name Logo (link) Description")
    }
    let i = -1
    let check = true;
    let request
    let check2
    while (check && !check2) {
        i = -1;
        if (request) if (request.SenderID != message.author.id || request.Action != "Create") check2 = request
        i++;
        request = client.getReq.get(i)
        if (!request) {
            check = false
            for (let l = 1; l < config.range; l++) {
                if (client.getReq.get(i + l)) check = true;
            }
        }
    }
    newRequest(client, message.guild.channels.cache.get(config.requestChannel), message.author.id, "Create", args[1] + " " + args[2] + " " + args.slice(3).join(" "), "Creating a Guild, name : " + args[1] + ", Logo : " + args[2] + ",\nDescription : " + args.slice(3).join(" "), check2)
    if (lingua == "it") {
        message.reply(" la tua richiesta è stata inviata, aspetta finché non verrà visionata")
    } else {
        message.reply(" your request has been sent, wait until someone accepts it")
    }
}

module.exports.guildModify = function guildModify(client, message, guild, lingua, args, command) {
    if (client.guilds.cache.get(config.GuildServerID).members.cache.get(message.author.id).roles.cache.get(config.MVOAdminRole)) {
        if (client.getGuild.get(args[1])) return staffGuildModify(message, lingua, args, command)
    }
    if (!guild) return notInAGuild(message, lingua)
    if (guild.founder != message.author.id) {
        if (!lingua == "it") return message.reply(" solo il founder può modificare la gilda")
        return message.reply(" only the founder can modify the guild")
    }
    if (!args[1]) {
        if (lingua == "it") return message.reply(" l'utilizzo corretto è " + config.prefix + command + " nome/descrizione/logo")
        return message.reply(" the correct use is " + config.prefix + command + " name/description/logo")
    }
    switch (args[1].toLowerCase()) {
        case "nome":
            guildModifyName(client,message, guild, lingua, args, commanad)
            break;
        case "name":
            guildModifyName(client,message, guild, lingua, args, command)
            break;
        case "descrizione":
            guildModifyDescription(client,message, guild, lingua, args, command)
            break;
        case "description":
            guildModifyDescription(client,message, guild, lingua, args, command)
            break;
        case "logo":
            guildModifyLogo(client, message, guild, lingua, args, command)
            break;
        default:
            if (lingua == "it") return message.reply(" l'utilizzo corretto è " + config.prefix + command + " nome/descrizione/logo")
            return message.reply(" the correct use is " + config.prefix + command + " name/description/logo")
            break;
    }
}

module.exports.guildModifyName = function guildModifyName(client, message, guild, lingua, args, command) {
    const c = message.guild.channels.cache.get(config.requestChannel)
    if (guild.founder != message.author.id && client.guilds.cache.get(config.GuildServerID).members.cache.get(message.author.id).roles.cache.get(config.MVOAdminRole)) {
        if (!args[3]) if (lingua == "it") return message.reply(" l'utilizzo corretto è " + config.prefix + command + " nome ID della Gilda nome(nuovo Nome)")
        return message.reply(" the correct use is " + config.prefix + command + " name Guild ID name(new Name)")
        guild.nome = args[3];
        client.setGuild.run(guild)
        newLog(c, message.author, "Changed Guild ( ID : " + guild.id + " ) Name to " + guild.nome)
        if (lingua == "it") return message.reply(" il nome della gilda adesso è " + guild.nome)
        return message.reply(" the guild name now is " + guild.nome)
    }
    if (!args[2]) {
        if (lingua == "it") return message.reply(" l'utilizzo corretto è " + config.prefix + command + " nome nome(nuovo Nome)")
        return message.reply(" the correct use is " + config.prefix + command + " name name(new Name)")
    }
    guild.nome = args[2];
    let i = -1
    let check = true;
    let request
    let check2
    while (check && !check2) {
        i = -1;
        if (request) if (request.SenderID != message.author.id || request.Action != "Name") check2 = request
        i++;
        request = client.getReq.get(i)
        if (!request) {
            check = false
            for (let l = 1; l < config.range; l++) {
                if (client.getReq.get(i + l)) check = true;
            }
        }
    }
    newRequest(client, c, message.author.id, "Name", guild.id + " " + guild.nome, "Changing Guild ( ID : " + guild.id + " ) Name to " + guild.nome, check2)
    if (lingua == "it") return message.reply(" la tua richiesta di voler cambiare il nome della gilda in " + guild.nome + " è stata inviata")
    return message.reply(" your request for changing the guild name to " + guild.nome + " has been sent")
}

module.exports.guildModifyDescription = function guildModifyDescription(client, message, guild, lingua, args, command) {
    const c = message.guild.channels.cache.get(config.requestChannel)
    if (client.guilds.cache.get(config.GuildServerID).members.cache.get(message.author.id).roles.cache.get(config.MVOAdminRole)) {
        guild.descrizione = args.slice(3).join(" ")
        client.setGuild.run(guild)
        newLog(client, c, message.author, "Changed Guild ( ID : " + guild.id + " ) Description to \n" + guild.descrizione)
        if (lingua == "it") return message.reply(" la descrizione della gilda adesso è " + guild.descrizione)
        return message.reply(" the guild description now is " + guild.descrizione)
    }
    guild.descrizione = args.slice(2).join(" ")
    let i = -1
    let check = true;
    let request
    let check2
    while (check && !check2) {
        i = -1;
        if (request) if (request.SenderID != message.author.id || request.Action != "Description") check2 = request
        i++;
        request = client.getReq.get(i)
        if (!request) {
            check = false
            for (let l = 1; l < config.range; l++) {
                if (client.getReq.get(i + l)) check = true;
            }
        }
    }
    newRequest(client, c, message.author.id, "Description", guild.id + " " + guild.descrizione, "Changing Guild ( ID : " + guild.id + " ) Description to \n" + guild.descrizione, check2)
    if (lingua == "it") return message.reply(" la tua richiesta di voler cambiare la descrizione della gilda in " + guild.descrizione + " è stata inviata")
    return message.reply(" your request for changing the guild description to " + guild.descrizione + " has been sent")
}

module.exports.guildModifyLogo = function guildModifyLogo(client, message, guild, lingua, args, command) {
    const c = message.guild.channels.cache.get(config.requestChannel)
    if (client.guilds.cache.get(config.GuildServerID).members.cache.get(message.author.id).roles.cache.get(config.MVOAdminRole)) {
        if (!args[3]) {
            if (lingua == "it") return message.reply(" l'utilizzo corretto è " + config.prefix + command + " ID della Gilda logo logo(link)")
            return message.reply(" the correct use is " + config.prefix + command + " Guild ID logo logo(link=")
        }
        guild.logo = args[3]
        client.setGuild.run(guild)
        newLog(client, c, message.author, "Changed Guild ( ID : " + guild.id + " ) Logo to " + guild.logo)
        if (lingua == "it") return message.reply(" il logo della gilda adesso è " + guild.logo)
        return message.reply(" the guild logo now is " + guild.logo)
    }
    guild.logo = args[2]
    let i = -1
    let check = true;
    let request
    let check2
    while (check && !check2) {
        i = -1;
        if (request) if (request.SenderID != message.author.id || request.Action != "Logo") check2 = request
        i++;
        request = client.getReq.get(i)
        if (!request) {
            check = false
            for (let l = 1; l < config.range; l++) {
                if (client.getReq.get(i + l)) check = true;
            }
        }
    }
    newRequest(client, c, message.author.id, "Logo", guild.id + " " + guild.logo, "Changing Guild ( ID : " + guild.id + " ) Logo to " + guild.logo, check2)
    if (lingua == "it") return message.reply(" la tua richiesta di voler cambiare il logo della gilda in " + guild.logo + " è stata inviata")
    return message.reply(" your request for changing the guild logo to " + guild.logo + " has been sent")
}

module.exports.guildKick = function guildKick(client, message, guild, lingua, args, command) {
    const c = message.guild.channels.cache.get(config.requestChannel)
    if (client.guilds.cache.get(config.GuildServerID).members.cache.get(message.author.id).roles.cache.get(config.MVOAdminRole)) {
        guild = client.getGuild.get(0 + args[1]);
        if (!guild) {
            if (lingua == "it") return message.reply(" non esiste nessuna gilda con ID " + args[1])
            return message.reply(" there's no guild with " + args[1] + " as ID")
        }
        let user = message.mentions.users.first()
        if (!user) user = client.guilds.cache.get(config.GuildServerID).members.cache.get(args[2]).user
        if (!user) user = client.guilds.cache.get(config.GuildServerID).members.cache.get(guild.members.split(" ")[0 + args[2]]).user
        if (!user) {
            if (lingua == "it") return message.reply(" l'utilizzo corretto è  " + config.prefix + args[0].toLowerCase() + " ID della Gilda @utente/ID dell'utente/Posizione dell'utente nella lista dei membri Motivo (opzionale)")
            return message.reply(" the correct use is " + config.prefix + args[0].toLowerCase() + " Guild ID @user/user ID/User position in the members list Reason (optional)")
        }
        guild.members = guild.members.replace(user.id, '').trim();
        let amem = guild.members.split(" ")
        let members = ""
        for (let i = 0; i < amem.length; i++) {
            members = members + client.users.cache.get(amem[i]) + "\n"
        }
        const embed = new Discord.MessageEmbed()
            .setTitle(guild.nome)
            .setDescription("Description : " + guild.descrizione + "\nMembers : " + members + "\nMBits : " + guild.mbits + "\nDiscord : " + guild.discord)
            .setImage(guild.logo)
            .setFooter("Badges : " + guild.badges)
            .setColor("#00ffff")
        message.guild.channels.cache.find(channel => channel.id == config.guildChannel).messages.fetch(guild.messageID).then(msg => msg.edit(embed))
        let info = client.getUser.get(user.id)
        info.guildID = null
        client.setUser.run(info)
        client.setGuild.run(guild);
        newLog(client, c, message.author, "Kicked a Member : " + user.tag + " from a Guild ( ID : " + guild.id + " ) ")
        if (lingua == "it") return message.reply(" hai cacciato " + user.tag + " dalla gilda")
        return message.reply(" " + user.tag + " has been kicked from the guild")
    }
    if (!guild) return notInAGuild(message, lingua)
    if (guild.founder != message.author.id) {
        if (!lingua == "it") return message.reply(" solo il founder può cacciare membri dalla gilda")
        return message.reply(" only the founder can kick people")
    }
    let user = message.mentions.users.first()
    if (!user) user = client.guilds.cache.get(config.GuildServerID).members.cache.get(args[2]).user
    if (!user) user = client.guilds.cache.get(config.GuildServerID).members.cache.get(guild.members.split(" ")[0 + args[1]]).user
    if (!user) {
        if (lingua == "it") return message.reply(" l'utilizzo corretto è  " + config.prefix + args[0].toLowerCase() + " @utente/ID dell'utente/Posizione dell'utente nella lista dei membri Motivo (opzionale)")
        return message.reply(" the correct use is " + config.prefix + args[0].toLowerCase() + " @user/user ID/User position in the members list Reason (optional)")
    }
    guild.members = guild.members.replace(user.id, '').trim();
    console.log(guild.members)
    let amem = guild.members.split(" ")
    let members = ""
    for (let i = 0; i < amem.length; i++) {
        members = members + "<@" + client.users.cache.get(amem[i]) + ">\n"
    }
    const embed = new Discord.MessageEmbed()
        .setTitle(guild.nome)
        .setDescription("Description : " + guild.descrizione + "\nMembers : " + members + "\nMBits : " + guild.mbits + "\nDiscord : " + guild.discord)
        .setImage(guild.logo)
        .setFooter("Badges : " + guild.badges)
        .setColor("#00ffff")
    message.guild.channels.cache.find(channel => channel.id == config.guildChannel).messages.fetch(guild.messageID).then(msg => msg.edit(embed))
    let info = client.getUser.get(user.id)
    info.guildID = null
    client.setUser.run(info)
    client.setGuild.run(guild);
    newAction(client,c, message.author.id, "Kick", user.id, "Kicking " + user.tag + " from a Guild ( ID : " + guild.id + " )\n" + args.slice(2).join(" "))
    if (lingua == "it") {
        message.reply(" hai cacciato " + user.tag)
    } else {
        message.reply(" " + user.tag + " has been kicked")
    }
}

module.exports.guildInvite = function guildInvite(client, message, guild, lingua, args, command) {
    const c = message.guild.channels.cache.get(config.requestChannel)
    if (!guild) return notInAGuild(message, lingua)
    if (guild.founder != message.author.id) {
        if (!lingua == "it") return message.reply(" solo il founder può invitare utenti nella gilda")
        return message.reply(" only the founder can invite other people")
    }
    let user = message.mentions.users.first()
    if (!user) user = client.guilds.cache.get(config.GuildServerID).members.cache.get(args[2]).user
    if (!user) {
        if (lingua == "it") return message.reply(" l'utilizzo corretto è " + config.prefix + args[0].toLowerCase() + " @utente/ID dell'utente")
        return message.reply(" the correct use is " + config.prefix + args[0].toLowerCase() + "@user/user ID")
    }
    user.send("sei stato invitato in una gilda : " + guild.nome)
    newAction(client,c, message.author.id, "Invite", guild.id + " " + user.id, "Inviting " + user.tag + " in a Guild ( ID : " + guild.id + ")")
    if (lingua == "it") {
        message.reply(" il tuo invito a " + user.tag + " è stato inviato")
    } else {
        message.reply(" your invite to " + user.tag + " has been sent")
    }
}

module.exports.guildJoin = function guildJoin(client, message, infos, args, command, guild) {
    const c = message.guild.channels.cache.get(config.requestChannel)

    if (guild) {
        if (infos.lingua == "it") return message.reply(" sei gia in una gilda")
        return message.reply(" you are already in a guild")
    }
    if (!args[1]) {
        if (infos.lingua == "it") return message.reply(" l'utilizzo correct è " + config.prefix + command + " ID della Gilda")
        return message.reply(" the correct use is " + config.prefix + command + " Guild ID")
    }
    guild = client.getGuild.get(args[1])
    if (!guild) {
        if (infos.lingua == "it") return message.reply(" non esiste nessuna gilda con ID : " + args[1])
        return message.reply(" there is no guild with " + args[1] + " as ID")
    }
    let i = -1;
    let req
    do {
        i++;
        req = client.getReq.get(i)
    } while (req.Action.toLowerCase() != "invite" && req.more.split(" ")[1] != message.author.id && req.more.split(" ")[0] != guild.id)
    guild.members = guild.members + " " + message.author.id
    let amem = guild.members.split(" ")
    let members = ""
    for (let i = 0; i < amem.length; i++) {
        members = members + "<@" + client.users.cache.get(amem[i]) + ">\n"
    }
    const embed = new Discord.MessageEmbed()
        .setTitle(guild.nome)
        .setDescription("Description : " + guild.descrizione + "\nMembers : " + members + "\nMBits : " + guild.mbits + "\nDiscord : " + guild.discord)
        .setImage(guild.logo)
        .setFooter("Badges : " + guild.badges)
        .setColor("#00ffff")
    if (infos.lingua == "it") {
        message.reply(" sei entrato in una gilda")
    } else {
        message.reply(" you joined in a guild")
    }
    message.guild.channels.cache.find(channel => channel.id == config.guildChannel).messages.fetch(guild.messageID).then(msg => msg.edit(embed))
    infos.guildID = guild.id
    client.setUser.run(infos)
    client.setGuild.run(guild);
    client.deleteReq.run(req.id)
}

module.exports.guildLeave = function guildLeave(client, message, guild, lingua, args, command) {
    if (!guild) return notInAGuild(message, lingua)
    if (guild.founder == message.author.id) {
        if (lingua == "it") return message.reply(" il founder non può lasciare la propria gilda, puoi però fare richiesta per cancellarla")
        return message.reply(" the founder can't leave his own guild, but you can send a deleting request")
    }
    guild.members = guild.members.replace(message.author.id, '').trim();
    let amem = guild.members.split(" ")
    let members = ""
    for (let i = 0; i < amem.length; i++) {
        members = members + "<@" + client.users.cache.get(amem[i]) + ">\n"
    }
    const embed = new Discord.MessageEmbed()
        .setTitle(guild.nome)
        .setDescription("Description : " + guild.descrizione + "\nMembers : " + members + "\nMBits : " + guild.mbits + "\nDiscord : " + guild.discord)
        .setImage(guild.logo)
        .setFooter("Badges : " + guild.badges)
        .setColor("#00ffff")
    message.guild.channels.cache.find(channel => channel.id == config.guildChannel).messages.fetch(guild.messageID).then(msg => msg.edit(embed))
    let infos = client.getUser.get(message.author.id)
    infos.guildID = null
    client.setUser.run(infos)
    client.setGuild.run(guild)
    newAction(client, message.guild.channels.cache.get(config.requestChannel), message.author.id, "Leave", guild.id, message.author.tag + " left his Guild ( ID : " + guild.id + ")")
    if (lingua == "it") message.reply(" sei uscito dalla gilda"); else message.reply(" you left the guild");
    let user = client.users.cache.get(guild.founder)
    if (lingua == "it") user.send(" " + message.author.tag + " è uscito dalla tua gilda"); else user.send(" " + message.author.tag + " left your guild")
}

module.exports.guildDelete = function guildDelete(client, message, guild, lingua, args, command) {
    const c = message.guild.channels.cache.get(config.requestChannel)
    if (!guild) return notInAGuild(message, lingua)
    if (guild.founder != message.author.id) {
        if (!lingua == "it") return message.reply(" solo il founder può cancellare la gilda")
        return message.reply(" only the founder can delete the guild")
    }
    let i = -1
    let check = true;
    let request
    let check2
    while (check && !check2) {
        i = -1;
        if (request) if (request.SenderID != message.author.id || request.Action != "Delete") check2 = request
        i++;
        request = client.getReq.get(i)
        if (!request) {
            check = false
            for (let l = 1; l < config.range; l++) {
                if (client.getReq.get(i + l)) check = true;
            }
        }
    }
    newRequest(client,c, message.author.id, "Delete", guild.id, "Deleting Guild ( ID : " + guild.id + " )", check2)
    if (lingua == "it") {
        message.reply(" la tua richiesta è stata inviata, aspetta finché non verrà visionata")
    } else {
        message.reply(" your request has been sent, wait until someone accepts it")
    }
}

// REQUESTS & LOGS
module.exports.newLog = function newLog(client, channel, user, text) {
    let embed = new Discord.MessageEmbed()
        .setTitle("New Log")
        .setDescription("By " + user.tag + "\n" + text)
        .setColor("#ff0000")
    channel.send(embed)
}

module.exports.newRequest = function newRequest(client, channel, SenderID, Action, more, text, request) {
    if (request) client.deleteReq.run(request.id)
    let id = -1;
    let req1;
    do {
        id++;
        req1 = client.getReq.get(id)
    }
    while (req1)
    const req = {
        "id": id,
        "Sender": SenderID,
        "Action": Action,
        "more": more,
        "text": text
    }
    client.setReq.run(req)
    const embed = new Discord.MessageEmbed()
        .setTitle("New Request")
        .setDescription("By " + client.guilds.cache.get(config.GuildServerID).members.cache.get(SenderID).user.tag + "\n" + text)
        .setFooter("ID : " + id)
        .setColor("#ffff00")
    channel.send(embed)
}

module.exports.newAction = function newAction(client, channel, SenderID, Action, more, text) {
    let id = 0;
    while (client.getReq.get(id)) {
        id++;
    }
    const req = {
        "id": id,
        "Sender": SenderID,
        "Action": Action,
        "more": more,
        "text": text
    }
    client.setReq.run(req)
    const embed = new Discord.MessageEmbed()
        .setTitle("New Action")
        .setDescription("By " + client.users.cache.get(SenderID).tag + "\n" + text)
        .setFooter("ID : " + id)
        .setColor("#ffa500")
    channel.send(embed)
}

module.exports.requestAccept = async function requestAccept(client, c, lingua, message, args, command) {
    if (!args[1]) return message.reply(" mi scoccio di scrivere")
    let req = client.getReq.get(args[1])
    let guild
    if (!req) {
        if (lingua == "it") return message.reply(" non esiste nessuna richiesta con ID : " + args[1])
        return message.reply(" there is not a request with " + args[1] + " as ID")
    }
    switch (req.Action.toLowerCase()) {
        case "create":
            requestAcceptCreate(client,c, lingua, message, args, guild, req)
            break;
        case "delete":
            requestAcceptDelete(client,c, lingua, message, args, guild, req)
            break;
        case "name":
            requestAcceptName(client,c, lingua, message, args, guild, req)
            break;
        case "description":
            requestAcceptDescription(client,c, lingua, message, args, guild, req)
            break;
        case "logo":
            requestAcceptLogo(client,c, lingua, message, args, guild, req)
            break;
        default:
            break;
    }
    let user = client.guilds.cache.get(config.GuildServerID).members.cache.get(req.Sender)
    let ling = client.getUser.get(req.Sender).lingua
    if (ling && ling == "it" && user) {
        user.user.send("La tua richesta con ID : " + req.id + " e con descrizione : " + req.text + ", è stata rifiutata da " + message.author.tag)
    } else if (user) {
        user.user.send("Your request with " + req.id + " as ID and " + req.text + " as description, has been declined by " + message.author.tag)
    }
}

module.exports.requestAcceptCreate = async function requestAcceptCreate(client, c, lingua, message, args, guild, req) {
    let id = -1;
    let g
    do {
        id++;
        g = client.getGuild.get(id)
    }
    while (g)
    let badges = ""
    if (config.version == "Closed Beta" || config.version == "Open Beta") badges = badges + "Created in Beta "
    if (id == 0) badges = badges + "First Guild "
    guild = {
        "id": id,
        "messageID": "",
        "logo": req.more.split(" ")[1],
        "nome": req.more.split(" ")[0],
        "descrizione": req.more.replace(req.more.split(" ")[0] + " " + req.more.split(" ")[1] + " ", ""),
        "founder": req.Sender,
        "members": req.Sender,
        "discord": "*not yet*",
        "mbits": 0,
        "badges": badges,
        "inv": "null",
        "quests": JSON.stringify({ "Discord": [], "MasterVerse": [] })
    }
    let embed = new Discord.MessageEmbed()
        .setTitle(guild.nome)
        .setDescription("Description : " + guild.descrizione + "\nMembers : <@" + client.users.cache.get(req.Sender) + ">\nMBits : " + guild.mbits + "\nDiscord : " + guild.discord)
        .setImage(guild.logo)
        .setFooter("ID : " + guild.id + " | Badges : " + guild.badges)
        .setColor("#00ffff")
    let chan = message.guild.channels.cache.get(config.guildChannel)
    async function getSentId() {
        let sent = await chan.send(embed)
        return sent.id
    }
    guild.messageID = await getSentId();
    let a = client.getUser.get(guild.founder)
    if (!a) {
        a = {
            id: guild.founder,
            lingua: "en",
            guildID: guild.id
        }
    }
    a.guildID = guild.id
    client.setUser.run(a)
    client.setGuild.run(guild);
    message.reply(" guild created")

    client.deleteReq.run(req.id)
    newLog(client,c, message.author, "Request Accepted, \nAction : " + req.Action + " " + req.more + "\nBy " + client.users.cache.get(req.Sender).tag + "\n" + req.text)
}

module.exports.requestAcceptDelete = async function requestAcceptDelete(client, c, lingua, message, args, guild, req) {
    guild = client.getGuild.get(req.more)
    console.log(guild.messageID)
    message.guild.channels.cache.find(channel => channel.id == config.guildChannel).messages.fetch(guild.messageID).then(msg => msg.delete())
    let amem = guild.members.split(" ")
    let inffo
    for (let i = 0; i < amem.length; i++) {
        inffo = client.getUser.get(amem[i])
        inffo.guildID = null
        client.setUser.run(inffo)
    }
    client.deleteGuild.run(guild.id)
    message.reply(" guild deleted")

    client.deleteReq.run(req.id)
    newLog(client,c, message.author, "Request Accepted, \nAction : " + req.Action + " " + req.more + "\nBy " + client.users.cache.get(req.Sender).tag + "\n" + req.text)
}

module.exports.requestAcceptName = async function requestAcceptName(client, c, lingua, message, args, guild, req) {
    guild = client.getGuild.get(req.more.split(" ")[0])
    if (!guild) return message.reply("error")
    guild.nome = req.more.split(" ")[1]
    let amem = guild.members.split(" ")
    let members = ""
    for (let i = 0; i < amem.length; i++) {
        members = members + "<@" + client.users.cache.get(amem[i]) + ">\n"
    }
    let embed = new Discord.MessageEmbed()
        .setTitle(guild.nome)
        .setDescription("Description : " + guild.descrizione + "\nMembers : " + members + "\nMBits : " + guild.mbits + "\nDiscord : " + guild.discord)
        .setImage(guild.logo)
        .setFooter("ID : " + guild.id + " | Badges : " + guild.badges)
        .setColor("#00ffff")
    message.guild.channels.cache.find(channel => channel.id == config.guildChannel).messages.fetch(guild.messageID).then(msg => msg.edit(embed))
    client.setGuild.run(guild);
    message.reply(" guild modified")

    client.deleteReq.run(req.id)
    newLog(client,c, message.author, "Request Accepted, \nAction : " + req.Action + " " + req.more + "\nBy " + client.users.cache.get(req.Sender).tag + "\n" + req.text)
}

module.exports.requestAcceptDescription = async function requestAcceptDescription(client, c, lingua, message, args, guild, req) {
    guild = client.getGuild.get(req.more.split(" ")[0])
    guild.descrizione = req.more.replace(req.more.split(" ")[0] + " ", "");
    let amem = guild.members.split(" ")
    let members = ""
    for (let i = 0; i < amem.length; i++) {
        members = members + "<@" + client.users.cache.get(amem[i]) + ">\n"
    }
    let embed = new Discord.MessageEmbed()
        .setTitle(guild.nome)
        .setDescription("Description : " + guild.descrizione + "\nMembers : " + members + "\nMBits : " + guild.mbits + "\nDiscord : " + guild.discord)
        .setImage(guild.logo)
        .setFooter("ID : " + guild.id + " | Badges : " + guild.badges)
        .setColor("#00ffff")
    message.guild.channels.cache.find(channel => channel.id == config.guildChannel).messages.fetch(guild.messageID).then(msg => msg.edit(embed))
    client.setGuild.run(guild);
    message.reply(" guild modified")

    client.deleteReq.run(req.id)
    newLog(client,c, message.author, "Request Accepted, \nAction : " + req.Action + " " + req.more + "\nBy " + client.users.cache.get(req.Sender).tag + "\n" + req.text)
}

module.exports.requestAcceptLogo = async function requestAcceptLogo(client, c, lingua, message, args, guild, req) {
    guild = client.getGuild.get(req.more.split(" ")[0])
    guild.logo = req.more.split(" ")[1]
    let amem = guild.members.split(" ")
    let members = ""
    for (let i = 0; i < amem.length; i++) {
        members = members + "<@" + client.users.cache.get(amem[i]) + ">\n"
    }
    let embed = new Discord.MessageEmbed()
        .setTitle(guild.nome)
        .setDescription("Description : " + guild.descrizione + "\nMembers : " + members + "\nMBits : " + guild.mbits + "\nDiscord : " + guild.discord)
        .setImage(guild.logo)
        .setFooter("ID : " + guild.id + " | Badges : " + guild.badges)
        .setColor("#00ffff")
    message.guild.channels.cache.find(channel => channel.id == config.guildChannel).messages.fetch(guild.messageID).then(msg => msg.edit(embed))
    client.setGuild.run(guild);
    message.reply(" guild modified")

    client.deleteReq.run(req.id)
    newLog(client,c, message.author, "Request Accepted, \nAction : " + req.Action + " " + req.more + "\nBy " + client.users.cache.get(req.Sender).tag + "\n" + req.text)
}

module.exports.requestDecline = function requestDecline(client, c, lingua, message, args, command) {
    let req = client.getReq.get(args[1])
    if (!req) return message.reply(" something went wrong...")
    let ling = client.getUser.get(req.Sender).lingua
    let user = client.guilds.cache.get(config.GuildServerID).members.cache.get(req.Sender)
    if (ling && ling == "it" && user) {
        user.user.send("La tua richesta con ID : " + req.id + " e con descrizione : " + req.text + ", è stata rifiutata da " + message.author.tag)
    } else if (user) {
        user.user.send("Your request with " + req.id + " as ID and " + req.text + " as description, has been declined by " + message.author.tag)
    }
    message.reply(" request declined")
    client.deleteReq.run(req.id)
    newLog(client,c, message.author, "Request Declined, \nID : " + req.id + "\nAction : " + req.Action + " " + req.more + "\nBy " + client.users.cache.get(req.Sender).tag + "\n" + req.text)
}

module.exports.requestList = function requestList(client, lingua, message, args, command) {
    let i = -1
    let j = -15;
    let check = true;
    let req
    let text = "";
    while (check) {
        i = -1;
        j = j + 15;
        while (check && i < 15) {
            if (req) text = text + "By " + client.guilds.cache.get(config.GuildServerID).members.cache.get(req.Sender).user.username + ", Action " + req.Action + ", ID : " + req.id + "\n"
            i++;
            req = client.getReq.get(i + j)
            if (!req) {
                check = false
                for (let l = 1; l < config.range; l++) {
                    if (client.getReq.get(i + j + l)) check = true;
                }
            }
        }
        let embed = new Discord.MessageEmbed()
            .setTitle("Request List")
            .setDescription(text)
            .setFooter("already accepted / declined requests are cancelled from the database")
        message.channel.send(embed)
    }
}

module.exports.requestInfo = function requestInfo(client, c, lingua, message, args, command) {
    let req = client.getReq.get(args[1])
    if (lingua == "it") return message.channel.send("ID della Richiesta : " + req.id + ", Mandata da " + message.guild.members.cache.get(req.Sender).user.tag + ", Azione : " + req.Action + ", Testo : " + req.text)
    return message.channel.send("Request ID : " + req.id + ", Sended by " + message.guild.members.cache.get(req.Sender).user.tag + ", Action : " + req.Action + ", Text : " + req.text)
}


module.exports.xpChanger = function xpChanger(client, member, accounts, quantity) {
    account = accounts[0]
    infoz = accounts[1]
    if (isNaN(account.rowid) || account.rowid == null) {
        let i = -1;
        let user;
        do {
            i++;
            user = client.getUserRow.get(i)
        } while (user)
        account.rowid = i;
    }
    

    account.xp += quantity;
    infoz.xp += quantity;

    account.level = Math.floor(Math.sqrt(account.xp / 125))
    switch (parseInt(infoz.xp / 24)) {
        case 0:
            infoz.rank = "Bronze"
            member.roles.add(client.guilds.cache.get(client.config.GuildServerID).roles.cache.get(client.config.bronze))
        case 1:
            infoz.rank = "Silver"
            member.roles.add(client.guilds.cache.get(client.config.GuildServerID).roles.cache.get(client.config.silver))
            break;
        case 1:
            infoz.rank = "Gold"
            member.roles.add(client.guilds.cache.get(client.config.GuildServerID).roles.cache.get(client.config.gold))
            break;
        case 1:
            infoz.rank = "Platinum"
            member.roles.add(client.guilds.cache.get(client.config.GuildServerID).roles.cache.get(client.config.platinum))
            break;
        case 1:
            infoz.rank = "Diamond"
            member.roles.add(client.guilds.cache.get(client.config.GuildServerID).roles.cache.get(client.config.diamond))
            break;
    }

    client.setUser.run(account)
    client.setDiscordInfo.run(infoz)
}

module.exports.recolor = function recolor(image, color, multiply) {
    const temp = createCanvas()
    const tempCtx = temp.getContext('2d')

    temp.width = image.width
    temp.height = image.height

    tempCtx.fillStyle = 'black';
    tempCtx.fillRect(0, 0, temp.width, temp.height);
    tempCtx.drawImage(image, 0, 0);

    if (multiply) tempCtx.globalCompositeOperation = 'multiply';
    if (color) {
        tempCtx.fillStyle = color;
        tempCtx.fillRect(0, 0, temp.width, temp.height);
    }

    tempCtx.globalCompositeOperation = 'destination-atop';
    tempCtx.drawImage(image, 0, 0);

    return temp;
}

// DA AGGIUNGERE "client" COME PARAMETRO A TUTTE LE FUNZIONI - e aggiungerlo dove le funzioni vengono utilizzate 