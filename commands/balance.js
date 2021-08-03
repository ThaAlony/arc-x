exports.run = (client, message, args, command, account) => {

    if (!message.guild.members.cache.get(message.author.id).roles.cache.get(client.config.MVOStaffRole) || !message.guild.members.cache.get(message.author.id).roles.cache.get(client.config.MVOAdminRole)) return message.reply(" you are not a staffer")
    if (!args[0]) return message.reply(" the correct use is " + client.config.prefix + command + " add/remove/set Guild ID Quantity")
    let guild = client.getGuild.get(args[1])
    if (!guild) return message.reply(" there is no guild with " + args[1] + "as ID")
    if (!args[2]) return message.reply(" the correct use is " + client.config.prefix + command + " add/remove/set Guild ID Quantity")
    switch (args[0]) {
        case "add":
            guild.mbits = guild.mbits + args[2]
            break;
        case "remove":
            guild.mbits = guild.mbits - args[2]
            break;
        case "set":
            guild.mbits = 0 + args[2]
            break;
        default:
            return message.reply(" the correct use is " + client.config.prefix + command + " add/remove/set Guild ID Quantity")
            break;
    }
    client.setGuild.run(guild);
    client.newLog(client, c, message.author, "Balance Modified, **" + args[0] + "** to Guild : " + guild.nome + " ( ID : " + guild.id + ", actual balance : **" + guild.mbits + "**")

}
