module.exports = (client) => {

    const SQLite = require("better-sqlite3");

    const guildSql = new SQLite('./database/guildsMB.sqlite')
    const RequestSql = new SQLite('./database/requestsMB.sqlite')
    const userInfosSql = new SQLite('./database/userInfosMB.sqlite')

    console.log("-----------------\n Started \n" + client.user.tag + "\n****************")

    const table = guildSql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'guilds';").get();
    if (!table['count(*)']) {
        guildSql.prepare("CREATE TABLE guilds (id INTEGER PRIMARY KEY,  messageID TEXT, logo TEXT, nome TEXT, descrizione TEXT, founder TEXT, members TEXT, discord TEXT, mbits INTEGER, badges TEXT, inv TEXT, quests TEXT);").run();
        guildSql.prepare("CREATE UNIQUE INDEX idx_accounts_id ON guilds (id);").run();
        guildSql.pragma("synchronous = 1");
        guildSql.pragma("journal_mode = wal");
        console.log("table Guilds Created")
    }

    const table1 = RequestSql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'requests';").get();
    if (!table1['count(*)']) {
        RequestSql.prepare("CREATE TABLE requests (id INTEGER PRIMARY KEY, Sender TEXT, Action TEXT, more TEXT, text TEXT);").run();
        RequestSql.prepare("CREATE UNIQUE INDEX idx_accounts_id ON requests (id);").run();
        RequestSql.pragma("synchronous = 1");
        RequestSql.pragma("journal_mode = wal");
        console.log("table Requests Created")
    }

    const table2 = userInfosSql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'accounts';").get();
    if (!table2['count(*)']) {
        userInfosSql.prepare("CREATE TABLE accounts ( id TEXT PRIMARY KEY, rowid INTEGER, lingua TEXT, guildID TEXT, xp INTEGER, level INTEGER, rank TEXT, nickname TEXT, artwork TEXT, invites INTEGER, mbits INTEGER, boost INTEGER);").run();
        userInfosSql.prepare("CREATE UNIQUE INDEX idx_accounts_id ON accounts (id);").run();
        userInfosSql.pragma("synchronous = 1");
        userInfosSql.pragma("journal_mod = wal");
        console.log("table Accounts created")
    }

    client.getUser = userInfosSql.prepare("SELECT * FROM accounts WHERE id = ?")
    client.getUserRow = userInfosSql.prepare("SELECT * FROM accounts WHERE rowid = ?;")
    client.setUser = userInfosSql.prepare("INSERT OR REPLACE INTO accounts ( id, rowid, lingua, guildID, xp, nickname, artwork, mbits, boost, level, rank) VALUES ( @id, @rowid, @lingua, @guildID, @xp, @nickname, @artwork, @mbits, @boost, @level, @rank);")
    client.deleteUser = userInfosSql.prepare("DELETE FROM accounts WHERE id = ?")

    client.getReq = RequestSql.prepare("SELECT * FROM requests WHERE id = ?")
    client.setReq = RequestSql.prepare("INSERT OR REPLACE INTO requests (id, Sender, Action, more, text) VALUES (@id, @Sender, @Action, @more, @text);")
    client.deleteReq = RequestSql.prepare("DELETE FROM requests WHERE id = ?")

    client.getGuild = guildSql.prepare("SELECT * FROM guilds WHERE id = ?")
    client.setGuild = guildSql.prepare("INSERT OR REPLACE INTO guilds (id, messageID, logo, nome, descrizione, founder, members, discord, mbits, badges, inv, quests) VALUES (@id, @messageID, @logo, @nome, @descrizione, @founder, @members, @discord, @mbits, @badges, @inv, @quests);")
    client.deleteGuild = guildSql.prepare("DELETE FROM guilds WHERE id = ?")

    let g = client.guilds.cache.get(client.config.GuildServerID)
    let i = 0;

    const statuses = [
        "⏬ TAKE OVER ⏬",
        "eating RAM...",
        "thanks to Alone",
        "MasterVerse.. Online!",
        "farming XPS..."
    ]
    function changeStatus() {
        g = client.guilds.cache.get(client.config.GuildServerID)
        client.user.setActivity(statuses[i])
        i++;
        if (i == statuses.length) i = 0;
        return;
    }

    setInterval(() => changeStatus(), 10000)

    // Load all invites for all guilds and save them to the cache.
    function invitesChecker() {
        g.fetchInvites().then(guildInvites => {
            client.invites[g.id] = guildInvites;
        })
    }
    setInterval(() => invitesChecker(g), 1000)
        

}
