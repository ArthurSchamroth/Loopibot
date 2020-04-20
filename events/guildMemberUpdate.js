const { COLUMNS_DISCORD_USER_INFO, TABLES } = require("../util/config");
module.exports = (client, member, newMember) => {
  client.mysql = require("../util/db.js");
  client.methods = require("../util/methods.js");
  try {
    client.mysql.querySql(
      `UPDATE ${TABLES[0]}
        SET
        ${COLUMNS_DISCORD_USER_INFO[2]} = ?,
        ${COLUMNS_DISCORD_USER_INFO[3]} = ?,
        ${COLUMNS_DISCORD_USER_INFO[4]} = ?,
        ${COLUMNS_DISCORD_USER_INFO[5]} = ?,
        ${COLUMNS_DISCORD_USER_INFO[7]} = ?
        WHERE ${COLUMNS_DISCORD_USER_INFO[1]} = ?`,
      [
        newMember.user.username,
        newMember.user.discriminator,
        newMember.user.tag,
        newMember.nickname,
        newMember.user.avatarURL({ format: "png" }),
        member.user.id
      ]
    );
  } catch (e) {
    console.log("erreur : " + e);
  }
};