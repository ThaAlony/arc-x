module.exports = ( client, o, n) => {

    if (o.guild.id != client.config.GuildServerID && n.guild.id != client.config.GuildServerID) return 

    const fs = require('fs');

    let account = client.getUser.get(n.id)
    if (!account) return;

    let newUserChannel = n.channel
    let oldUserChannel = o.channel

    if ((!oldUserChannel || oldUserChannel.guild.id != client.config.GuildServerID) && newUserChannel) {

        if (newUserChannel.id == client.config.afkChannel) return;
        if (newUserChannel.members.size == 1) return;

        let voiceJSON = require("../json/voice.json")

        voiceJSON[o.id] = Math.floor(new Date() / 1000);
        for (let i = 0; i++; i < newUserChannel.members.size) {
            newUserChannel.members.each(user => {
                if (client.getUser.get(user.id)) { voiceJSON[user.id] = Math.floor(new Date() / 1000) }
            })
        }

        fs.writeFile("./json/voice.json", JSON.stringify(voiceJSON), function writeJSON(err) {
            if (err) return console.log(err);
        });

    } else if (n.mute) {

        let voiceJSON = require("../json/voice.json")

        if (voiceJSON[n.id]) {
            client.xpChanger(client, n.member, account, Math.floor((Math.floor(new Date() / 1000) - voiceJSON[n.id]) / 10))
            delete voiceJSON[n.id]
        }

        fs.writeFile("./json/voice.json", JSON.stringify(voiceJSON, null, 2), function writeJSON(err) {
            if (err) return console.log(err);
        });

    }
    else if ( !newUserChannel || newUserChannel.guild.id != client.config.GuildServerID || newUserChannel.id == client.config.afkChannel ) {
        
        let voiceJSON = require("../json/voice.json")
        

        if (voiceJSON[n.id]) {
            client.xpChanger(client, n.member, account, Math.floor( (Math.floor(new Date() / 1000) - voiceJSON[n.id]) / 10) )
            delete voiceJSON[n.id]
        }

        if (oldUserChannel.members.size == 1) {
            let acc = client.getUser.get(oldUserChannel.members.first().id)
            console.log(oldUserChannel.members[0])
            console.log("PART 1 \n" + acc + "\n**********")
            if (acc) {
                console.log("VOICE.JSON : \n" + JSON.stringify(voiceJSON) + " \n*********")
                console.log("NEW DATE : " + (Math.floor(new Date() / 1000) + "  -  OLD DATE : " + voiceJSON[acc.id] + "  -  RESULT : " + Math.floor((Math.floor(new Date() / 1000) - voiceJSON[acc.id]) / 10)) )
                client.xpChanger(client, oldUserChannel.members.first(), acc, Math.floor((Math.floor(new Date() / 1000) - voiceJSON[acc.id]) / 10))
                delete voiceJSON[acc.id]
            }

        }

        fs.writeFile("./json/voice.json", JSON.stringify(voiceJSON, null, 2), function writeJSON(err) {
            if (err) return console.log(err);
        });

    } 
}