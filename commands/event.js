exports.run = (client, message) => {
  client.mysql = require("../util/db.js");
  const sql = "INSERT INTO user VALUES(5,'test')";
  const role = message.guild.roles.cache.find(r => r.name === "test");
  if (message.content === "!event")
    if (message.member.roles.cache.find(r => r.name === "test")) {
      message.author.send("Tu es déjà inscrit");
    } else {
      message.member.roles.add(role);
      client.channels.cache
        .get("691670772984447066")
        .send(`${message.author} participe`);
    }
  message.delete({ timeout: 3000 });

  client.mysql.querySql(sql);
};

exports.help = {
  name: "event"
};
