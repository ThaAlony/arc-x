exports.run = (client, message, args, command, account) => {

    let top5 = []
    let user
    let text;
    if (!args[0]) args = [" "];
    switch (args[0].toLowerCase()) {
        case "alltime":
            text = " | Alltime \n"
            for (let j = 0; j < 5; j++) {
                let i = 0;
                user = client.getUserRow.get(i)
                while (user) {
                    
                    let rank = parseInt(user.xp / 24000)
                    if (rank == 0) { rank = "Bronze" } else if (rank == 1) { rank = "Silver" } else if (rank == 2) { rank = "Gold" } else if (rank == 3) { rank = "Platinum" } else  { rank="Diamond" }
                    if (user) {
                        check = true;


                        for (let a = 0; a < 5; a++) {
                            if (top5[a] && user.id == top5[a][3]) check = false;
                        }
                        if (check && (!top5[j] || user.xp > top5[j][3])) {
                            top5[j] = [user.nickname, rank, user.level, user.id];
                        }
                    }

                    i++;
                    user = client.getUserRow.get(i)
                } 
            }
            break;
        default:
            text = " | Current Season \n"
            for (let j = 0; j < 5; j++) {
                let i = 0;
                user = client.getUserRow.get(i)
                while (user) {
                    let infos = client.getDiscordInfo.get(user.id)

                    if (infos) {
                        check = true;


                        for (let a = 0; a < 5; a++) {
                            if (top5[a] && user.id == top5[a][3]) check = false;
                        }
                        if (check && (!top5[j] || infos.current > top5[j].current)) {
                            top5[j] = [ user.nickname, infos.rank, Math.floor(Math.sqrt(infos.current / 125)), user.id];
                        }
                    }

                    i++;
                    user = client.getUserRow.get(i)
                } 
            }
            break;
    }

    for (let j = 0; j < 5; j++) {
        if (top5[j]) {
            let infoz = client.getDiscordInfo.get(top5[j].id);
            if (!infoz) infoz = {"rank" : "Unranked"}
            if (j == 0) text += "\n> 🥇 " + top5[j][0] + " - " + top5[j][1] + " (Level " + top5[j][2] +")"
            if (j == 1) text += "\n> 🥈 " + top5[j][0] + " - " + top5[j][1] + " (Level " + top5[j][2] + ")"
            if (j == 2) text += "\n> 🥉 " + top5[j][0] + " - " + top5[j][1] + " (Level " + top5[j][2] + ")"
            if (j == 3) text += "\n> 4️⃣ " + top5[j][0] + " - " + top5[j][1] + " (Level " + top5[j][2] + ")"
            if (j == 4) text += "\n> 5️⃣ " + top5[j][0] + " - " + top5[j][1] + " (Level " + top5[j][2] + ")"
        }
    }

    message.channel.send("🎖️ **__Expierence Leaderboard__** " + text)

}