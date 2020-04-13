exports.run = (client, message) => {
  client.mysql = require("../util/db.js");
  const sql = `INSERT INTO participant(discordId) VALUES(${message.author.id})`;
  const role = message.guild.roles.cache.find(r => r.name === "test");
  if (message.content === "!event")
    if (message.member.roles.cache.find(r => r.name === "test")) {
      message.author.send("Tu es déjà inscrit");
    } else {
      message.member.roles.add(role);
      client.channels.cache
        .get("691670772984447066")
        .send(`${message.author} participe`);

      client.mysql.querySql(sql);
    }
  message.delete({ timeout: 3000 });
};

exports.help = {
  name: "event"
};
