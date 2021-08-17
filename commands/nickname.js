exports.run = (client, message, args, command, account) => {

    if (!account) return message.reply(" you do not have an account...")

    let nick = message.content.substring(message.content.indexOf('"') + 1, message.content.lastIndexOf('"'))

    if (!nick) {
        if (client.lingua == "it") return message.reply(" l'uso corretto e' " + client.config.prefix + command + ' "nickname"')
        return message.reply(" the correct use is " + client.config.prefix + command + ' "nickname"')
    }

    account.nickname = nick;
    client.setUser.run(account)

    if (client.lingua == "it") message.reply(" il tuo nickname adesso e' " + account.nickname)
    else message.reply(" your nickname is now " + account.nickname)
}
