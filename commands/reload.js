exports.run = (client, message, args, command, account) => {

    if (!message.guild.members.cache.get(message.author.id).roles.cache.get(client.config.MVOAdminRole)) return message.reply(" you are not an admin")

    if (!args || args.length < 1) return message.reply(" ==> [nome del comando]");
    const commandName = args[0];

    if (!client.commands.has(commandName)) {
        return message.reply("!!! [comando inesistente] ");
    }

    delete require.cache[require.resolve(`./${commandName}.js`)];

    client.commands.delete(commandName);

    const props = require(`./${commandName}.js`);
    client.commands.set(commandName, props);
    console.log("[MV CONSOLE LOG] - [RELOAD : RELOADED COMMAND : " + commandName + " by : " + message.author.username + " ]; ")
    message.reply(`>>> [reload del comando **${commandName}** eseguito]`);

}