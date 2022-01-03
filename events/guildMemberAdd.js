module.exports = (client, member) => {

    if(!member || !member.guild || !member.guild.invites || !client.invites) return

    if (member.guild.id != client.config.GuildServerID) return;

    member.guild.invites.fetch().then(guildInvites => {
        const ei = client.invites[member.guild.id];
        client.invites[member.guild.id] = guildInvites;
        const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);

        if(!invite) return
        let account = client.getUser.get(invite.inviter.id)
        if (!account) return
        account.invites++;
        client.xpChanger(client, account, 100)
        
    });

}