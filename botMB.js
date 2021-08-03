//|=========|- CORE  -|=========|
const Discord = require("discord.js");
const client = new Discord.Client();
const SQLite = require("better-sqlite3");
const qs = require("qs")
const fs = require("fs");
/*const Canvas = require("canvas")
const webhook = require("webhook-discord");*/

//|=========|- DATABASEs -|=========|


//|=========|- JSON DIRECTORYs -|=========|

const pack = require('./json/packageMB.json');
const config = require("./json/configMB.json");
const quests = require('./json/questsMB.json');
const shop = require('./json/shopMB.json');
client.pack = pack;
client.config = config;
client.quests = quests;
client.shop = shop;

//|=========|- WEB-HOOKs -|=========|
//          WIP

//|=========|- PREFIXs -|=========|
//          WIP

//|=========|- STRINGHE -|=========|

//|=========|- STARTING -|=========|
let lingua = "en"
client.lingua = lingua;
const invites = {};
client.invites = invites;

//|=========|- FUNCTIONs -|=========|
const functions = require('./func/functions.js');

client.xpChanger = functions.xpChanger;
client.requestInfo = functions.requestInfo;
client.requestList = functions.requestList;
client.requestDecline = functions.requestDecline;
client.requestAcceptLogo = functions.requestAcceptLogo;
client.requestAcceptDescription = functions.requestAcceptDescription;
client.requestAcceptName = functions.requestAcceptName;
client.requestAcceptDelete = functions.requestAcceptDelete;
client.requestAcceptCreate = functions.requestAcceptCreate;
client.requestAccept = functions.requestAccept;
client.newAction = functions.newAction;
client.newRequest = functions.newRequest;
client.newLog = functions.newLog;
client.guildDelete = functions.guildDelete;
client.guildLeave = functions.guildLeave;
client.guildJoin = functions.guildJoin;
client.guildInvite = functions.guildInvite;
client.guildKick = functions.guildKick;
client.guildModifyLogo = functions.guildModifyLogo;
client.guildModifyDescription = functions.guildModifyDescription;
client.guildModifyName = functions.guildModifyName;
client.guildModify = functions.guildModify;
client.guildCreate = functions.guildCreate;
client.staffGuildModify = functions.staffGuildModify;
client.notInAGuild = functions.notInAGuild;



/*
// QUESTS
function questList(message, lingua) {
    let title, discordTitle, discordDescription, masterverseTitle, masterverseDescription
    discordDescription = ""
    masterverseDescription = ""
    if (lingua == "en") {
        title = "Quest Trees"
        discordTitle = "Discord Tree"
        masterverseTitle = "MasterVerse Tree"
        for (let i = 0; i < quests.Discord.length; i++) {
            discordDescription += quests.Discord[i].name.en + " - " + quests.Discord[i].description.en + " - " + quests.Discord[i].mbits + "\n"
        }
        for (let i = 0; i < quests.MasterVerse.length; i++) {
            masterverseDescription += quests.MasterVerse[i].name.en + " - " + quests.MasterVerse[i].description.en + " - " + quests.MasterVerse[i].mbits + "\n"
        }
    } else {
        title = "Albero delle Quest"
        discordTitle = "Ramo Discord"
        masterverseTitle = "Ramo MasterVerse "
        for (let i = 0; i < quests.Discord.length; i++) {
            discordDescription += quests.Discord[i].name.it + " - " + quests.Discord[i].description.it + " - " + quests.Discord[i].mbits + "\n"
        }
        for (let i = 0; i < quests.MasterVerse.length; i++) {
            masterverseDescription += quests.MasterVerse[i].name.it + " - " + quests.MasterVerse[i].description.it + " - " + quests.MasterVerse[i].mbits + "\n"
        }
    }
    const embed = new Discord.MessageEmbed()
        .setTitle(title)
        .addField(discordTitle, discordDescription)
        .addField(masterverseTitle, masterverseDescription)
        .setColor("#ff00ff")
    message.channel.send(embed)
}

function questCompleted(message, lingua, guild) {
    let text = "";
    let trees = ["Discord", "MasterVerse"]
    let tree;
    for (let j = 0; j < trees.length; j++) {
        tree = quests.${trees[j]}
        for (let i = 0; i < tree.length; i++) {
            if (questIsCompleted(`${tree}`, i, guild)) text += "Ramo : " + `${tree}` + ", Quest : " + tree[i].name.it + " \n"
        }
    }
    message.channel.send(text)
}

function questIsCompleted(tree, id, guild) {
    let completed = JSON.parse(guild.quests)
    switch (tree.toLowerCase()) {
        case "discord":
            for (let i = 0; i < completed.Discord.length) {
                if (completed.Discord[i] == id) return true;
            }
            return false;
            break;
        case "masterverse":
            for (let i = 0; i < completed.MasterVerse.length) {
                if (completed.MasterVerse[i] == id) return true;
            }
            return false;
            break;
    }
    
}

function questTreeChecker(tree, guild) {
    if (!guild) return
    let completed = JSON.parse(guild.quests)
    switch (tree.toLowerCase()) {
        case "discord":
            for (let i = 0; i < quests.Discord.length; i++) {
                if (i >= 0 && i <= 3) {

                }
            }
            let g;
            for (let j = 0; j < client.guilds.cache.size; j++) {
                g = client.guild.cache.array()[j]
                g.fetchInvites().then(invs => invites = invs).catch()
                for (let l = 0; l < invites.size; l++) {
                    if (invites.get(guild.discord.replace("https://discord.gg/", ""))) {     // NON MI PIACE, FIXA
                        for (let i = 0; i < quests.Discord.length; i++) {
                            if (!questIsCompleted(tree, i, guild)) {
                                if (i >= 0 && i <= 3) {
                                    if (g.memberCount >= quests.Discord[i].goal) {
                                        completed.Discord[completed.Discord.length + 1] = i;
                                        guild.mbits += quests.Discord[i].mbits;
                                    }
                                }
                            }
                            
                            
                        }
                    }
                }
            }  
            break;
        case "masterverse":
            for (let i = 0; i < quests.MasterVerse.length; i++) {
                if (!questIsCompleted(tree, i, guild)) {
                    if (i >= 0 && i <= 2) {
                        /*if (  GET INVITI TOTALI DI TUTTI GLI UTENTI DELLA GILDA ( MAYBE DA AGGIUNGERE IN "infoz") >= quests.MasterVerse[i].goal )
                        completed.MasterVerse[completed.MasterVerse.length + 1] = i;
                        guild.mbits += quests.MasterVerse[i].mbits;*/


                        /*                                                             WHAT 'BOUT THIS? actually good 
                         if (!questCompleted(tree, i, guild)) {
                    if (i >= 0 && i <= 2) {
                        let invs;
                        let amem = guild.members.split(" ")
                        for (let j = 0; j < amem.length; j++) {
                            invs += client.getUser.get(amem[j]).invites
                        }
                    }
                }
                        */         /*
                    }
                    
                }
            } 
            break;
    }

}
*/
// GUILDS



    /*let guild;
    let g;
    let i = 0;
    let check = true;
    let Tree = ""
    if (check) {                                                  // CODICE DI PARTENZA
        Tree = "Discord" 
        if (i%2 == 1) Tree = "MasterVerse"
        guild = client.getGuild.get(i)
        if (!guild) {
            check = false
            for (let l = 1; l < config.range; l++) {
                if (client.getGuild.get(i + l)) check = true;
            }
        } else if (guild.discord != "* not yet *") {
            questTreeChecker(Tree, guild) 
        }
        i++;
    } else i = 0;

    questChecker(i, check) {                        // DA SPOSTARE SOPRA NELLE FUNZIONI
        if (check) {
            let Tree = "Discord"
           if (i%2 == 1) Tree = "MasterVerse"
           let guild = client.getGuild.get(i)
           if (!guild) {
               check = false
                for (let l = 1; l < config.range; l++) {
                 if (client.getGuild.get(i + l)) check = true;
              }
         } else if (guild.discord != "* not yet *") {
                questTreeChecker(Tree, guild)
          }
          i++;
      } else i = 0;
    }

    let check = true;
    let i = 0;
    setInterval( questChecker(i, check), config.tempo)         // CODICE FINALE MAYBE
    */

/*
client.on("message", (message) => {

    if (message.author == client.user || message.author.bot || message.guild.id != config.GuildServerID || !message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    //  S T A R T I N G
    let c = message.guild.channels.cache.get(config.requestChannel)
    let guild;
    let lingua = "en"
    let infos = client.getUser.get(message.author.id)
    if (infos) lingua = infos.lingua;
    if (infos) guild = client.getGuild.get(infos.guildID)

    // COMMANDS
    // user settings

    //Quests 
    if (command == "quests" || command == "missioni") {
        if (!args[0]) {
            if (lingua == "it") return message.reply(" l'utilizzo corretto è " + config.prefix + command + " lista/completate ")
            return message.reply(" the correct use is " + config.prefix + command + " list/completed ")
        }
        switch (args[0].toLowerCase()) {
            case "list":
                questList(message, lingua)
                break;
            case "lista":
                questList(message, lingua)
                break;
        }
    }

    //shop
    if (command == "shop" || command == "negozio") {

    }

    if (command == "market" || command == "mercato") {

    }

    // guilds
    if (command == "guild" || command == "gilda") { //  CON LE FUNZIONI ( due case per ogni roba, 1 in italiano 1 in inglese quindi lets go di funzioni)
        if (!args[0]) {
            if (lingua == "it") return message.reply(" l'utilizzo corretto è " + config.prefix + command + " crea/info/modifica/invita/caccia/elimina")
            return message.reply(" the correct use is " + config.prefix + command + " create/info/modify/invite/kick/delete")
        }
        switch (args[0].toLowerCase()) {
            case "create":
                guildCreate(message, guild, infos, args, command)
                break;
            case "crea":
                guildCreate(message, guild, infos, args, command)
                break;
            case "modify":
                guildModify(message, guild, lingua, args, command)
                break;  
            case "modifica":
                guildModify(message, guild, lingua, args, command)
                break;
            case "invita":
                guildInvite(message, guild, lingua, args, command)
                break;
            case "invite":
                guildInvite(message, guild, lingua, args, command)
                break;
            case "kick":
                guildKick(message, guild, lingua, args, command)
                break;
            case "caccia":
                guildKick(message, guild, lingua, args, command)
                break;
            case "delete":
                guildDelete(message, guild, lingua, args, command)
                break;
            case "elimina":
                guildDelete(message, guild, lingua, args, command)
                break;
            case "join":
                guildJoin(message, infos, args, command, guild)
                break;
            case "entra":
                guildJoin(message, infos, args, command, guild)
                break;
            case "leave":
                guildLeave(message, guild, lingua, args, command)
                break;
            case "esci":
                guildLeave(message, guild, lingua, args, command)
                break;
            case "info":
                if (!guild) return notInAGuild(message, lingua)
                console.log(guild.members)
                let amem = guild.members.split(" ")
                console.log(amem)
                let members = ""
                for (let i = 0; amem && i < amem.length; i++) {
                    members = members + message.guild.members.cache.get("" + amem[i]).user.tag + "\n"
                }
                message.channel.send(guild.nome + "\n" + guild.descrizione + "\n" + members + guild.badges)
                break;
            default:
                if (lingua == "it") return message.reply(" l'utilizzo corretto è " + config.prefix + command + " crea/info/modifica/invita/caccia/elimina")
                return message.reply(" the correct use is " + config.prefix + command + " create/info/modify/invite/kick/delete")
        }   
    }

    // requests
    if (command == "request") {
        if (!message.guild.members.cache.get(message.author.id).roles.cache.get(config.MVOAdminRole)) return message.reply(" you are not a staffer")
        if (!args[0]) {
            if (lingua == "it") return message.reply(" l'utilizzo corretto è " + config.prefix + command + " accetta/rifiuta/lista/info ID della richiesta ")
            return message.reply(" the correct use is " + config.prefix + command + " accept/decline/list/info Request ID")
        }
        switch (args[0].toLowerCase()) {
            case "accept":
                requestAccept(c, lingua, message, args, command)
                break;
            case "accetta":
                requestAccept(c, lingua, message, args, command)
                break;
            case "decline":
                requestDecline(c, lingua, message, args, command)
                break;
            case "rifiuta":
                requestDecline(c, lingua, message, args, command)
                break;
            case "list":
                requestList(lingua, message, args, command)
                break;
            case "lista":
                requestList(lingua, message, args, command)
                break;
            case "info":
                requestInfo(c, lingua, message, args, command)
                break;
            default:
                if (lingua == "it") return message.reply(" l'utilizzo corretto è " + config.prefix + command + " accetta/rifiuta/lista/info ID della richiesta ")
                return message.reply(" the correct use is " + config.prefix + command + " accept/decline/list/info Request ID")
                break;
        }
    }

    // staff
    if (command == "balance") {
        if (!message.guild.members.cache.get(message.author.id).roles.cache.get(config.MVOStaffRole) || !message.guild.members.cache.get(message.author.id).roles.cache.get(config.MVOAdminRole)) return message.reply(" you are not a staffer")
        if (!args[0]) return message.reply(" the correct use is " + config.prefix + command + " add/remove/set Guild ID Quantity")
        guild = client.getGuild.get(args[1])
        if (!guild) return message.reply(" there is no guild with " + args[1] + "as ID")
        if (!args[2]) return message.reply(" the correct use is " + config.prefix + command + " add/remove/set Guild ID Quantity")
        switch (args[0]) {
            case "add":
                guild.mbits = guild.mbits + args[2]
                break;
            case "remove":
                guild.mbits = guild.mbits - args[2]
                break;
            case "set":
                guild.mbits = 0 + args[2]
                break;
            default:
                return message.reply(" the correct use is " + config.prefix + command + " add/remove/set Guild ID Quantity")
                break;
        }
        client.setGuild.run(guild);
        newLog(c, message.author, "Balance Modified, **" + args[0] + "** to Guild : " + guild.nome + " ( ID : " + guild.id + ", actual balance : **" + guild.mbits + "**")
    }

    if (command == "servers") {
        let text = "```"
        for (let i = 0; i < client.guilds.cache.size; i++) {
            text += (client.guilds.cache.array()[i].name) + "\n"
        }
        text += "```"
        message.channel.send(text)
    }

    if (command == "infos") {
        let user = message.mentions.members.first()
        let infoz = infos
        if (user) infoz = client.getUser.get(user.id)
        guild = client.getGuild.get(infos.guildID)
        let a = infos.guildID
        let b = guild.messageID
        if (!guild) {
            a = "null"
            b = "null"
        }
        message.channel.send(infoz.id + " " + infoz.lingua + " " + a + " " + b)
    }

}) */


fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

client.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(`[MasterVerse Starting up... ]  > >  Attempting to load command ${commandName}`);
        client.commands.set(commandName, props);
    });
});

client.login(config.token)