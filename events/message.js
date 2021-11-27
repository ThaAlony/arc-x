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

    if (!account) {

        let i = -1;
        let user;
        do {
            i++;
            user = client.getUserRow.get(i)
        } while (user)

        account = {
            "rowid": i,
            "id": message.author.id,
            "lingua": client.lingua,
            "guildID": null,
            "xp": 0,
            "level": 0,
            "rank": "Bronze",
            "nickname": message.author.nickname,
            "artwork": null,
            "mbits": 0,
            "boost": 0,
            "character": "male-/char_skin-- male-/char_outline-- eyes-/eyes_1-- eyes-/eyes_1_pupils-black- hairs-/hair_1_chroma-brown-1 hairs-/hair_1_outline- outfit-/outfit_1--"
        }
        client.setUser.run(acc);
        message.reply(" you are now registered, try mv infos and remember to customize your character!")
    }

    cmd.run(client, message, args, command, account);
};