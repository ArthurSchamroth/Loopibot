const {
  COLUMNS_DISCORD_USER_INFO,
  COLUMNS_DISCORD_JOIN,
  COLUMNS_DISCORD_GUILDS,
  TABLES,
} = require("../util/config");
module.exports = (client, member, newMember) => {
  client.mysql = require("../mysql/db.js");
  client.methods = require("../util/methods.js");
  try {
    client.mysql.querySql(
      `UPDATE ${TABLES[1]}
        SET
        ${COLUMNS_DISCORD_USER_INFO[2]} = ?,
        ${COLUMNS_DISCORD_USER_INFO[3]} = ?,
        ${COLUMNS_DISCORD_USER_INFO[4]} = ?,
        ${COLUMNS_DISCORD_USER_INFO[6]} = ?
        WHERE (${COLUMNS_DISCORD_USER_INFO[1]} = ?)`,
      [
        newMember.user.username,
        newMember.user.discriminator,
        newMember.user.tag,
        newMember.user.avatarURL({ format: "png" }),
        member.user.id,
      ]
    );
    client.mysql.querySql(
      `UPDATE ${TABLES[2]}
        SET
        ${COLUMNS_DISCORD_JOIN[3]} = ?
        
        WHERE ${COLUMNS_DISCORD_JOIN[2]} = ? and ${COLUMNS_DISCORD_GUILDS[1]} = ?`,
      [newMember.nickname, member.user.id, member.guild.id]
    );

    client.mysql.querySql(
      "delete h.* from has_role as h join role as r on r.role_id = h.role_id where h.member_id = ? and r.guild_id = ?",
      [member.user.id, member.guild.id]
    );
    newMember.guild.roles.cache.each((role) => {
      if (newMember.roles.cache.has(role.id)) {
        client.mysql.querySql(
          "call insert_has_role((select role_id from role where role_id = ?),(select member_id from member where member_id = ?))",
          [role.id, member.user.id]
        );
      } else {
        client.mysql.querySql(
          "delete from has_role where role_id = ? and member_id = ?",
          [role.id, member.user.id]
        );
      }
    });
  } catch (e) {
    console.log("erreur : " + e);
  }
};
