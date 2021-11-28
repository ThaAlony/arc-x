//|=========|- CORE  -|=========|
const Discord = require("discord.js");
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_EMOJIS_AND_STICKERS", "GUILD_INTEGRATIONS", "GUILD_MESSAGES", "GUILD_INVITES", "GUILD_VOICE_STATES"] });
const SQLite = require("better-sqlite3");
const qs = require("qs")
const fs = require("fs");
const Canvas = require("canvas")
//const webhook = require("webhook-discord");

//|=========|- DATABASEs -|=========|
const guildSql = new SQLite('./database/guildsMB.sqlite')
const RequestSql = new SQLite('./database/requestsMB.sqlite')
const userInfosSql = new SQLite('./database/userInfosMB.sqlite')

//|=========|- JSON DIRECTORYs -|=========|

const pack = require('./package.json');
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
client.recolor = functions.recolor;



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


// CONSOLE CHATTER and ROBES
let y = process.openStdin()
y.addListener("data", res => {
    let args = res.toString().trim().split(/ +/g)
    switch (args[0]) {
        case "/sql":
            switch (args[1].toLowerCase()) {
                case "userinfossql":
                    userInfosSql.prepare(args.slice(2).join(" ")).run();
                    break;
            }
            break;
        case "/accounts":
            break;
        case "/xp":
            let user = client.getUser.get(args[1])
            if (!user) console.log("account does not exist")
            else console.log(user.nickname + " has " + user.xp + " xps")
            
            
            break;
        case "/send":
            switch (args[1].toLowerCase()) {
                case "general":
                    client.channels.resolve("749258696491663390").send(args.slice(2).join(" "))
                    break;
            }
            break;
    }
})




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