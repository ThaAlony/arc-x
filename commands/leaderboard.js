exports.run = (client, message, args, command, account) => {

    let top5 = []
    let user
    for (let j = 0; j < 5; j++) {
        let i = -1;

        do {
            i++;
            user = client.getUserRow.get(i)

            if (user) {
                check = true;

                
                for (let a = 0; a < 5; a++) {
                    if (top5[a] && user.id == top5[a].id) check = false;
                }
                if (check && (!top5[j] || user.xp > top5[j].xp)) {
                    top5[j] = user;
                }
            }
            

        } while (user)
    }

    
    let text = "";
    for (let j = 0; j < 5; j++) {
        if (top5[j]) {
            if (j == 0) text += "\n> 🥇 " + top5[j].nickname + " - " + top5[j].rank + " (Level " + top5[j].level +")"
            if (j == 1) text += "\n> 🥈 " + top5[j].nickname + " - " + top5[j].rank + " (Level " + top5[j].level + ")"
            if (j == 2) text += "\n> 🥉 " + top5[j].nickname + " - " + top5[j].rank + " (Level " + top5[j].level + ")"
            if (j == 3) text += "\n> 4️⃣ " + top5[j].nickname + " - " + top5[j].rank + " (Level " + top5[j].level + ")"
            if (j == 4) text += "\n> 5️⃣ " + top5[j].nickname + " - " + top5[j].rank + " (Level " + top5[j].level + ")"
        }
    }

    message.channel.send("🎖️ **__Ranked Leaderboard__** \n" + text)

}