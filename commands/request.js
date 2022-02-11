/*exports.run = (client, message, args, command, account) => {

    const lingua = client.lingua

    if (!message.guild.members.cache.get(message.author.id).roles.cache.get(client.config.MVOAdminRole)) return message.reply(" you are not a staffer")
    if (!args[0]) {
        if (lingua == "it") return message.reply(" l'utilizzo corretto � " + client.config.prefix + command + " accetta/rifiuta/lista/info ID della richiesta ")
        return message.reply(" the correct use is " + client.config.prefix + command + " accept/decline/list/info Request ID")
    }

    const c = message.guild.channels.cache.get(client.config.requestChannel)
    switch (args[0].toLowerCase()) {
        case "accept":
            client.requestAccept(client,c, lingua, message, args, command)
            break;
        case "accetta":
            client.requestAccept(client, c, lingua, message, args, command)
            break;
        case "decline":
            client.requestDecline(client,c, lingua, message, args, command)
            break;
        case "rifiuta":
            client.requestDecline(client,c, lingua, message, args, command)
            break;
        case "list":
            client.requestList(client,lingua, message, args, command)
            break;
        case "lista":
            client.requestList(client,lingua, message, args, command)
            break;
        case "info":
            client.requestInfo(client,c, lingua, message, args, command)
            break;
        default:
            if (lingua == "it") return message.reply(" l'utilizzo corretto � " + client.config.prefix + command + " accetta/rifiuta/lista/info ID della richiesta ")
            return message.reply(" the correct use is " + client.config.prefix + command + " accept/decline/list/info Request ID")
            break;
    }

}
*/