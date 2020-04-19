module.exports = (client, member) => {
  client.mysql = require("../util/db.js");
  client.methods = require("../util/methods.js");
  try {
    client.mysql.selectSql(`SELECT count(*) as nbr FROM discord_user_info where discordId = ${member.user.id}`).then(str => {
      const nombre = str[0].nbr;
      if (nombre === 0) {
        let name = member.user.username;
        name = client.methods.correctText(name);
        let userTag = member.user.tag;
        userTag = client.methods.correctText(userTag);
        client.mysql.querySql(`INSERT IGNORE INTO discord_user_info(discordId, pseudo, discriminator, tag, nickname,  avatar, bot, creationDate, available, ban) VALUES(${member.user.id},'${name}', '${member.user.discriminator}', '${userTag}', '${member.nickname}', '${member.user.avatarURL({ format: "png" })}', ${member.user.bot}, '${member.user.createdAt.toJSON().slice(0, 10)}', ${true}, ${false})`);
      }
      else {
        client.mysql.querySql(`UPDATE discord_user_info SET available = ${true} WHERE (discordId = ${member.user.id});`);
      }
    });    
  } catch (e) {
    console.log("erreur : " + e);
  }
};
