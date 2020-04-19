exports.run = (client, message) => {
  client.mysql = require("../util/db.js");
  client.methods = require("../util/methods.js");

  client.mysql.querySql("DROP TABLE IF EXISTS discord_user_info");
  client.mysql.querySql(`CREATE TABLE discord_user_info (
    id int(11) NOT NULL AUTO_INCREMENT,
    discordId varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
    pseudo varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
    discriminator varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
    tag varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
    nickname varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    birthday date DEFAULT NULL,
    avatar varchar(255),
    bot tinyint(4) NOT NULL,
    creationDate date NOT NULL,
    available tinyint(4) NOT NULL,
    ban tinyint(4) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY discordId_UNIQUE (discordId)
  ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

  
  try {
    message.guild.members.cache.each(member => {
      let name = member.user.username;
      name = client.methods.correctText(name);
      let userTag = member.user.tag;
      userTag = client.methods.correctText(userTag);
      client.mysql.querySql(`INSERT IGNORE INTO discord_user_info(discordId, pseudo, discriminator, tag, nickname,   avatar, bot, creationDate, available, ban) VALUES(${member.user.id},'${name}', '${member.user.discriminator}', '${userTag}','${member.nickname}', '${member.user.avatarURL({ format: "png" })}', ${member.user.bot}, '${member.user.createdAt.toJSON().slice(0, 10)}', ${true}, ${false})`);
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
