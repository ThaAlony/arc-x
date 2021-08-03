exports.run = (client, message, args, command, account) => {

    if (!client.config.betaTester.indexOf(message.author.id)) return message.reply(" not a beta tester")
    // PRIVATE LIST



    if (account) return message.reply(" you are already registered")
    if (!args[0]) return message.reply(" the correct use is " + client.config.prefix + command + " nickname language")

    if (!args[1] || (args[1].toLowerCase() != "en" && args[1].toLowerCase() != "it")) return message.reply(" supported languages : en ( english ) - it ( italiano )")
    client.lingua = args[1].toLowerCase()

    let i = -1;
    let user;
    do {
        i++;
        user = client.getUserRow.get(i)
    } while (user)

    let acc = {
        "rowid": i,
        "id": message.author.id,
        "lingua": client.lingua,
        "guildID": null,
        "xp": 0,
        "level": 0,
        "rank": "Bronze",
        "nickname": args[0],
        "artwork": null,
        "mbits": 0,
        "boost": 0
    }

    client.setUser.run(acc);

}