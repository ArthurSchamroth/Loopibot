<<<<<<< HEAD
const {
  COLUMNS_DISCORD_USER_INFO,
  COLUMNS_DISCORD_JOIN,
  COLUMNS_DISCORD_GUILDS,
  TABLES
} = require("../util/config");
module.exports = (client, member, newMember) => {
  client.mysql = require("../mysql/db.js");
  client.methods = require("../util/methods.js");
  try {
    client.mysql.querySql(
      `UPDATE ${TABLES[1]}
=======
const { COLUMNS_DISCORD_USER_INFO, TABLES } = require("../util/config");
module.exports = (client, member, newMember) => {
  client.mysql = require("../util/db.js");
  client.methods = require("../util/methods.js");
  try {
    client.mysql.querySql(
      `UPDATE ${TABLES[0]}
>>>>>>> 97d2f4476b3c016999f8a6f22915e71876aa6c9d
        SET
        ${COLUMNS_DISCORD_USER_INFO[2]} = ?,
        ${COLUMNS_DISCORD_USER_INFO[3]} = ?,
        ${COLUMNS_DISCORD_USER_INFO[4]} = ?,
<<<<<<< HEAD
        ${COLUMNS_DISCORD_USER_INFO[6]} = ?
        WHERE (${COLUMNS_DISCORD_USER_INFO[1]} = ?)`,
=======
        ${COLUMNS_DISCORD_USER_INFO[5]} = ?,
        ${COLUMNS_DISCORD_USER_INFO[7]} = ?
        WHERE ${COLUMNS_DISCORD_USER_INFO[1]} = ?`,
>>>>>>> 97d2f4476b3c016999f8a6f22915e71876aa6c9d
      [
        newMember.user.username,
        newMember.user.discriminator,
        newMember.user.tag,
<<<<<<< HEAD
=======
        newMember.nickname,
>>>>>>> 97d2f4476b3c016999f8a6f22915e71876aa6c9d
        newMember.user.avatarURL({ format: "png" }),
        member.user.id
      ]
    );
<<<<<<< HEAD
    client.mysql.querySql(
      `UPDATE ${TABLES[2]}
        SET
        ${COLUMNS_DISCORD_JOIN[3]} = ?
        
        WHERE ${COLUMNS_DISCORD_JOIN[2]} = ? and ${COLUMNS_DISCORD_GUILDS[1]} = ?`,
      [
        newMember.nickname,
        member.user.id,
        member.guild.id
      ]
    );
  } catch (e) {
    console.log("erreur : " + e);
  }
};
=======
  } catch (e) {
    console.log("erreur : " + e);
  }
};
>>>>>>> 97d2f4476b3c016999f8a6f22915e71876aa6c9d
