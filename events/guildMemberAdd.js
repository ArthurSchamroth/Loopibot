<<<<<<< HEAD
const {
  COLUMNS_DISCORD_USER_INFO,
  COLUMNS_DISCORD_JOIN,
  COLUMNS_DISCORD_GUILDS,
  TABLES

} = require("../util/config");
module.exports = (client, member) => {
  client.mysql = require("../mysql/db.js");
=======
const { COLUMNS_DISCORD_USER_INFO, TABLES } = require("../util/config");
module.exports = (client, member) => {
  client.mysql = require("../util/db.js");
>>>>>>> 97d2f4476b3c016999f8a6f22915e71876aa6c9d
  client.methods = require("../util/methods.js");
  try {
    let ok = false;
    client.mysql.selectSql(
      `SELECT count(*) as nbr
<<<<<<< HEAD
      FROM ${TABLES[2]}
      where ${COLUMNS_DISCORD_JOIN[1]} = ? and ${COLUMNS_DISCORD_JOIN[2]} = ?`,
      [
        member.guild.id,
=======
      FROM ${TABLES[0]}
      where ${COLUMNS_DISCORD_USER_INFO[1]} = ?`,
      [
>>>>>>> 97d2f4476b3c016999f8a6f22915e71876aa6c9d
        member.user.id
      ]
    ).then(str => {
      if (str[0].nbr === 0) ok = true;
    });

<<<<<<< HEAD
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
      `INSERT IGNORE INTO ??(
        ${COLUMNS_DISCORD_JOIN[1]},
        ${COLUMNS_DISCORD_JOIN[2]},
        ${COLUMNS_DISCORD_JOIN[3]},
        ${COLUMNS_DISCORD_JOIN[4]},
        ${COLUMNS_DISCORD_JOIN[5]}
      )
      VALUES((SELECT ?? from ?? where ?? = ?),(SELECT ?? from ?? where ?? = ?), ?, ?, ?)`,
      [
        TABLES[2],
        COLUMNS_DISCORD_GUILDS[1],
        TABLES[0],
        COLUMNS_DISCORD_GUILDS[1],
        member.guild.id,
        COLUMNS_DISCORD_USER_INFO[1],
        TABLES[1],
        COLUMNS_DISCORD_USER_INFO[1],
        member.user.id,
        member.nickname,
        member.joinedAt.toJSON().slice(0, 10),
        true,
        false,
        0
      ]
    );
    if (ok === false) {
      client.mysql.querySql(
        `UPDATE ${TABLES[2]}
        SET ${COLUMNS_DISCORD_JOIN[5]} = ${true}
        WHERE ${COLUMNS_DISCORD_JOIN[1]} = ? and ${COLUMNS_DISCORD_JOIN[2]} = ?;`,
        [
          member.guild.id,
=======
    if (ok === false) {
      let name = member.user.username;
      let userTag = member.user.tag;

      name = client.methods.correctText(name);
      userTag = client.methods.correctText(userTag);

      client.mysql.querySql(
        `INSERT IGNORE INTO ${TABLES[0]}(
          ${COLUMNS_DISCORD_USER_INFO[1]},
          ${COLUMNS_DISCORD_USER_INFO[2]},
          ${COLUMNS_DISCORD_USER_INFO[3]},
          ${COLUMNS_DISCORD_USER_INFO[4]},
          ${COLUMNS_DISCORD_USER_INFO[5]},
          ${COLUMNS_DISCORD_USER_INFO[7]},
          ${COLUMNS_DISCORD_USER_INFO[8]},
          ${COLUMNS_DISCORD_USER_INFO[9]},
          ${COLUMNS_DISCORD_USER_INFO[10]},
          ${COLUMNS_DISCORD_USER_INFO[11]},
          ${COLUMNS_DISCORD_USER_INFO[12]}
        )
        VALUES( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          member.user.id,
          name,
          member.user.discriminator,
          userTag,
          member.nickname,
          member.user.avatarURL({ format: "png" }),
          member.user.bot,
          member.user.createdAt.toJSON().slice(0, 10),
          member.joinedAt.toJSON().slice(0, 10),
          true,
          false
        ]
      );
    }
    else {
      client.mysql.querySql(
        `UPDATE ${TABLES[0]}
        SET ${COLUMNS_DISCORD_USER_INFO[11]} = ${false}
        WHERE ${COLUMNS_DISCORD_USER_INFO[1]} = ?;`,
        [
>>>>>>> 97d2f4476b3c016999f8a6f22915e71876aa6c9d
          member.user.id
        ]
      );
    }
  } catch (e) {
    console.log("erreur : " + e);
  }
};
