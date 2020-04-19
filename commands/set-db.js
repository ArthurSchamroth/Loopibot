const { COLUMNS_DISCORD_USER_INFO } = require("../util/config");

exports.run = (client, message) => {
  client.mysql = require("../util/db.js");
  client.methods = require("../util/methods.js");


  client.mysql.querySql("DROP TABLE IF EXISTS discord_user_info");
  client.mysql.querySql(`CREATE TABLE discord_user_info (
    ${COLUMNS_DISCORD_USER_INFO[0]} int(11) NOT NULL AUTO_INCREMENT,
    ${COLUMNS_DISCORD_USER_INFO[1]} varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
    ${COLUMNS_DISCORD_USER_INFO[2]} varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
    ${COLUMNS_DISCORD_USER_INFO[3]} varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
    ${COLUMNS_DISCORD_USER_INFO[4]} varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
    ${COLUMNS_DISCORD_USER_INFO[5]} varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    ${COLUMNS_DISCORD_USER_INFO[6]} date DEFAULT NULL,
    ${COLUMNS_DISCORD_USER_INFO[7]} varchar(255),
    ${COLUMNS_DISCORD_USER_INFO[8]} tinyint(4) NOT NULL,
    ${COLUMNS_DISCORD_USER_INFO[9]} DATE NOT NULL,
    ${COLUMNS_DISCORD_USER_INFO[10]} tinyint(4) NOT NULL,
    ${COLUMNS_DISCORD_USER_INFO[11]} tinyint(4) NOT NULL,
    PRIMARY KEY (${COLUMNS_DISCORD_USER_INFO[0]}),
    UNIQUE KEY discordId_UNIQUE (${COLUMNS_DISCORD_USER_INFO[1]})
  ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

  
  try {
    message.guild.members.cache.each(member => {
      let name = member.user.username;
      name = client.methods.correctText(name);
      let userTag = member.user.tag;
      userTag = client.methods.correctText(userTag);
      client.mysql.querySql(`INSERT IGNORE INTO discord_user_info(${COLUMNS_DISCORD_USER_INFO[1]}, ${COLUMNS_DISCORD_USER_INFO[2]}, ${COLUMNS_DISCORD_USER_INFO[3]}, ${COLUMNS_DISCORD_USER_INFO[4]}, ${COLUMNS_DISCORD_USER_INFO[5]}, ${COLUMNS_DISCORD_USER_INFO[7]}, ${COLUMNS_DISCORD_USER_INFO[8]}, ${COLUMNS_DISCORD_USER_INFO[9]}, ${COLUMNS_DISCORD_USER_INFO[10]}, ${COLUMNS_DISCORD_USER_INFO[11]}) VALUES(${member.user.id},'${name}', '${member.user.discriminator}', '${userTag}','${member.nickname}', '${member.user.avatarURL({ format: "png" })}', ${member.user.bot}, '${member.user.createdAt.toJSON().slice(0, 10)}', ${true}, ${false})`);
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
