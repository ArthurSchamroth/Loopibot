exports.run = (client, message) => {
  client.mysql = require("../../util/db.js");
  client.mysql = require("../../util/methods.js");
  const role = message.guild.roles.cache.find(r => r.name === "test");
  if (message.content === "!event")
    if (message.member.roles.cache.find(r => r.name === "test")) {
      message.author.send("Tu es déjà inscrit");
    } else {
      message.member.roles.add(role);
      client.channels.cache
        .get("691617149566844998")
        .send(`${message.author} participe`);

      client.mysql.querySql(`INSERT INTO participant(discordId,pseudo) VALUES(${message.author.id})`);
    }
  message.delete({ timeout: 3000 });
};

exports.help = {
  name: "event"
};
