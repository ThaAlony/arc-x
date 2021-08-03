module.exports = (client, message) => {

    if (message.author.bot) return;

    //  S T A R T I N G

    if (message.guild.id != client.config.GuildServerID) return
    let account = client.getUser.get(message.author.id)
    if (account) {
        client.lingua = account.lingua;
        client.xpChanger(client, message.member, account, 1)
    }

    if (message.content.toLowerCase().indexOf(client.config.prefix.toLowerCase()) !== 0) return;

    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command);

    if (!cmd) return;

    cmd.run(client, message, args, command, account);
};