/*exports.run = (client, message, args, command, account) => {

    if (!message.guild.members.cache.get(message.author.id).roles.cache.get(client.config.MVOAdminRole)) return message.reply(" you are not a staffer")

    let user = client.getUser.get(message.mentions.members.first().id)

    if (args[0].toLowerCase() == "set") {
        user.xp = args[1]
    } else {
        user.xp += args[1]
    }

    client.setUser.run(user);
}
*/