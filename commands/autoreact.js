/*exports.run = (client, message, args, command, account) => {
    const fs = require("fs")
    if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply(" no permissions")

    if(!args[0] || !message.mentions.channels.first()) return message.reply(" missing args. correct usage mv autoreact add/remove #channel emojiID")

    const chan = message.mentions.channels.first();

    if(args[0].toLowerCase() == "add") {
        if (!args[2]) return message.reply(" missing args. correct usage mv autoreact add/remove #channel emojiID/emoji")

        try {
            message.react(args[2])
        } catch (error) {
            return message.reply(" emoji not found")
        }
        try {
            message.react(message.guild.emojis.cache.get(args[2]))
        } catch (error) {
            return message.reply(" emoji not found")
        }
        
        client.data.Autoreact[client.data.Autoreact.length] = [chan.id, ]
        
        

    } else if (args[0].toLowerCase() == "remove") {

    }

    fs.writeFile("./json/data.json", JSON.stringify(client.data), function writeJSON(err) {
        if (err) return console.log(err);
    });
}*/