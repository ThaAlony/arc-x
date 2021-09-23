exports.run = (client, message, args, command, account) => {

    if (message.member.roles.cache.has(client.config.DiscordBoosterRole) || message.member.roles.cache.has(client.config.MVOBetaTesterRole)) {
    } else return message.reply(" not a beta tester")
    // PRIVATE LIST

    if (account) return message.reply(" you are already registered")


    let nick = message.content.substring(message.content.indexOf('"') + 1, message.content.lastIndexOf('"'))
    client.lingua = message.content.slice(message.content.length - 2).toLowerCase()

    if (!nick) return message.reply(" the correct use is " + client.config.prefix + command + ' "nickname"  en ( english ) / it ( italiano )')
    if (client.lingua != "en" && client.lingua != "it") return message.reply(" the correct use is " + client.config.prefix + command + ' "nickname"  en ( english ) / it ( italiano )')

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
        "nickname": nick,
        "artwork": null,
        "mbits": 0,
        "boost": 0,
        "character": "male-/char_skin-- male-/char_outline-- eyes-/eyes_1-- eyes-/eyes_1_pupils-black- hairs-/hair_1_chroma-brown-1 hairs-/hair_1_outline- outfit-/outfit_1--"
    }

    client.setUser.run(acc);
    message.reply(" you are now registered, try mv infos and remember to customize your character!")

}