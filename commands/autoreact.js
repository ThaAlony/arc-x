/*exports.run = (client, message, args, command, account) => {

    const fs = require("fs")
    if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply(" no permissions")

    if(!args[0] || !message.mentions.channels.first()) return message.reply(" missing args. correct usage mv autoreact add/remove #channel emojiID")

    const chan = message.mentions.channels.first();
    let check = false;

    if(args[0].toLowerCase() == "add") {
        if (!args[2]) return message.reply(" missing args. correct usage mv autoreact add/remove #channel emojiID/emoji")

        check=true
        Promise.all([
            message.react(args[2])
        ])
            .catch(error => {check = false; console.error});

            check=true
            Promise.all([
            message.react(message.guild.emojis.cache.get(args[2]))
        ])
            .catch(error => check = false);

        if(check == false) return message.reply(" emoji not found")
        
        client.data.Autoreact[client.data.Autoreact.length] = {"id" : chan.id, "emoji" : args[2]}
        
    } else if (args[0].toLowerCase() == "remove") {
        for(let i = 0; i < client.data.Autoreact.length; i++) {
            if (client.data.Autoreact[i].id == chan.id) {
                check = true
                client.data.Autoreact.splice(i, 1)
                i--;
            } 
        }
        if (check == false) return message.reply(" there was no autoreact on that channel")
    }

    fs.writeFile("./json/data.json", JSON.stringify(client.data), function writeJSON(err) {
        if (err) return console.log(err);
    });
}*/