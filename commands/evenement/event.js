exports.run = (client, message) => {
  client.mysql = require("../../util/db");
  client.methods = require("../../util/methods.js");
  const role = message.guild.roles.cache.find(r => r.name === "Event");
  if (message.content === "!event")
    if (message.member.roles.cache.find(r => r.name === "Event")) {
      message.author.send("Tu es déjà inscrit");
    } else {
      message.member.roles.add(role);
      client.channels.cache
        .get("691617149566844998")
        .send(`${message.author} participe`);

      client.mysql.querySql(`INSERT IGNORE INTO participant(discordId,pseudo) VALUES(${message.author.id}, '${message.author.username}')`);
    }
  message.delete({ timeout: 3000 });
};

exports.help = {
  name: "event"
};
