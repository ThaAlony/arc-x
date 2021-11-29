module.exports = ( client, o, n) => {

    if (o.guild.id != client.config.GuildServerID && n.guild.id != client.config.GuildServerID) return 

    const fs = require('fs');

    const voiceJSON = require("../json/voice.json")

    let account = client.getUser.get(n.id)

    let newUserChannel = n.channel
    let oldUserChannel = o.channel

    if ((!oldUserChannel || oldUserChannel.guild.id != client.config.GuildServerID || oldUserChannel.id == client.config.afkChannel) && newUserChannel) {

        //console.log("JOIN")

        if (newUserChannel.id == client.config.afkChannel) return;
        if (newUserChannel.members.size == 1) return;
        
        if (!voiceJSON[newUserChannel.members.first().id]) {
            if (client.getUser.get(newUserChannel.members.first().id)) {
                //console.log(client.getUser.get(newUserChannel.members.first().id))
                voiceJSON[newUserChannel.members.first().id] = Math.floor(new Date() / 1000)
            }
        }

        if (account) voiceJSON[o.id] = Math.floor(new Date() / 1000);

        fs.writeFile("./json/voice.json", JSON.stringify(voiceJSON), function writeJSON(err) {
            if (err) return console.log(err);
        });

    } else if (n.mute || !newUserChannel || newUserChannel.guild.id != client.config.GuildServerID || newUserChannel.id == client.config.afkChannel) {

        //console.log("QUIT")
        if (account && voiceJSON[n.id]) {
            client.xpChanger(client, n.member, [account, client.getDiscordInfo.get(account.id)], Math.floor((Math.floor(new Date() / 1000) - voiceJSON[n.id]) / 10))
            delete voiceJSON[n.id]
        }

        if (oldUserChannel && oldUserChannel.members.size == 1) {
            let acc = client.getUser.get(oldUserChannel.members.first().id)
            console.log(oldUserChannel.members.first().id)
            if (acc && voiceJSON[acc.id]) {
                //console.log("VOICE.JSON : \n" + JSON.stringify(voiceJSON) + " \n*********")
                //console.log("NEW DATE : " + (Math.floor(new Date() / 1000) + "  -  OLD DATE : " + voiceJSON[acc.id] + "  -  RESULT : " + Math.floor((Math.floor(new Date() / 1000) - voiceJSON[acc.id]) / 10)))
                client.xpChanger(client, oldUserChannel.members.first(), [acc, client.getDiscordInfo.get(acc.id)], Math.floor((Math.floor(new Date() / 1000) - voiceJSON[acc.id]) / 10))
                    delete voiceJSON[acc.id]
                
            }

        }

        fs.writeFile("./json/voice.json", JSON.stringify(voiceJSON, null, 2), function writeJSON(err) {
            if (err) return console.log(err);
        });

    } else if (newUserChannel) {

        if (newUserChannel.members.size == 1) {
            //console.log("SOLO UNA PERSONA")
            if (account && voiceJSON[n.id]) {
                client.xpChanger(client, n.member, [account, client.getDiscordInfo.get(account.id)], Math.floor((Math.floor(new Date() / 1000) - voiceJSON[n.id]) / 10))
                delete voiceJSON[n.id]
            }
        }
    }

}