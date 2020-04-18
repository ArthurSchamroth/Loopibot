exports.run = (client, message) => {
  client.mysql = require("../util/db.js");
  client.methods = require("../util/methods.js");

  client.mysql.querySql("DROP TABLE IF EXISTS userinfo");
  client.mysql.querySql(`CREATE TABLE userinfo (
    id int(11) NOT NULL AUTO_INCREMENT,
    discordId varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
    pseudo varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    email varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    birthday date DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY discordId_UNIQUE (discordId)
  ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

  let name;

  try {
    message.guild.members.cache.each(member => {
      name = member.user.username;
      name = client.methods.correctText(name);
      client.mysql.querySql(`INSERT INTO userinfo(discordId, pseudo) VALUES(${member.user.id},'${name}')`);
    });
  } catch (e) {
    console.log("erreur : " + e);
  }
  message.channel.send("la base de donnée à été crée et initalisée");
  setTimeout(function suprr() {
    message.channel.bulkDelete(2);
  }, 2000);
};
exports.help = {
  name: "client"
};
