exports.run = (client, message, args, command, account) => {


    if (!account) return message.reply(" no account")

    if (!args[0]) return message.reply(" the correct use is " + client.config.prefix + command + " en/it | l'utilizzo corretto è " + client.config.prefix + command + " en/it")
    switch (args[0].toLowerCase()) {
        case "it":
            client.lingua = "it"
            message.reply(" selezionata la versione italiana")
            break;
        case "en":
            client.lingua = "en"
            message.reply(" english version selected")
            break;
        default:
            return message.reply(" the correct use is " + client.config.prefix + command + " en/it | l'utilizzo corretto è " + client.config.prefix + command + " en/it")
    }
    
        account.lingua = client.lingua;
    client.setUser.run(account)

}