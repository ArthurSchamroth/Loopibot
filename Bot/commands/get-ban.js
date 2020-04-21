
exports.run = (client, user, reason) => {
  client.guilds.cache.each(guild => {
    console.log(guild.name);
    guild.fetchBans().then(ban => {
      // console.log(ban);
      ban.each(baninfo => {
        console.log(baninfo.user.username);
        console.log(baninfo.reason);
      });
    });
  });
};
exports.help = {
  name: "client"
};
