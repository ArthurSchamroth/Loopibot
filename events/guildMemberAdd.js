const {
  COLUMNS_DISCORD_USER_INFO,
  COLUMNS_DISCORD_JOIN,
  COLUMNS_DISCORD_GUILDS,
  TABLES

} = require("../util/config");
module.exports = (client, member) => {
  client.mysql = require("../mysql/db.js");
  client.methods = require("../util/methods.js");
  try {
    let ok = false;
    client.mysql.selectSql(
      `SELECT count(*) as nbr
      FROM ${TABLES[2]}
      where ${COLUMNS_DISCORD_JOIN[1]} = ? and ${COLUMNS_DISCORD_JOIN[2]} = ?`,
      [
        member.guild.id,
        member.user.id
      ]
    ).then(str => {
      if (str[0].nbr === 0) ok = true;
    });

    client.mysql.querySql(
      `INSERT IGNORE INTO ${TABLES[1]}(
        ${COLUMNS_DISCORD_USER_INFO[1]},
        ${COLUMNS_DISCORD_USER_INFO[2]},
        ${COLUMNS_DISCORD_USER_INFO[3]},
        ${COLUMNS_DISCORD_USER_INFO[4]},
        ${COLUMNS_DISCORD_USER_INFO[6]},
        ${COLUMNS_DISCORD_USER_INFO[7]},
        ${COLUMNS_DISCORD_USER_INFO[8]}
      )
      VALUES( ?, ?, ?, ?, ?, ?, ?)`,
      [
        member.user.id,
        member.user.username,
        member.user.discriminator,
        member.user.tag,
        member.user.avatarURL({ format: "png" }),
        member.user.bot,
        member.user.createdAt.toJSON().slice(0, 10)
      ]
    );
    client.mysql.querySql(
      " CALL insert_join_guild((SELECT guild_id from guild where guild_id = ?),(SELECT member_id from member where member_id = ?), ?, ?, ?, ?, ?, ?, ?)",
      [
        member.guild.id,
        member.user.id,
        member.nickname,
        member.joinedAt.toJSON().slice(0, 10),
        true,
        false,
        0,
        member.permissions.bitfield,
        false
      ]
    );
    if (ok === false) {
      client.mysql.querySql(
        `UPDATE ${TABLES[2]}
        SET ${COLUMNS_DISCORD_JOIN[5]} = ${true}
        WHERE ${COLUMNS_DISCORD_JOIN[1]} = ? and ${COLUMNS_DISCORD_JOIN[2]} = ?;`,
        [
          member.guild.id,
          member.user.id
        ]
      );
    }
  } catch (e) {
    console.log("erreur : " + e);
  }
};