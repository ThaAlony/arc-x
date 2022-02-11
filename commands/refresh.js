/*exports.run = (client, message, args, command, account) => {

    if (!message.guild.members.cache.get(message.author.id).roles.cache.get(client.config.MVOAdminRole)) return message.reply(" you are not an admin")


    let i = -1;
    let user;
    do {
        i++;
        user = client.getUserRow.get(i)

        if (user) {
            if (isNaN(user.level) || user.level < 0) user.level = 0
            if (user.level <= 10) user.rank = "Bronze"
            else if (user.level <= 26) user.rank = "Silver"
            else if (user.level <= 46) user.rank = "Gold"
            else if (user.level <= 76) user.rank = "Platinum"
            else user.rank = "Diamond"

            client.setUser.run(user)
        }


    } while (user)

    console.log("[MV CONSOLE LOG] - [ACCOUNTS REFRESH by : " + message.author.username + " ]; ")
    message.reply(" refresh eseguito")
}*/