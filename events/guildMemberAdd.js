const { COLUMNS_DISCORD_USER_INFO, TABLES } = require("../util/config");
module.exports = (client, member) => {
  client.mysql = require("../util/db.js");
  client.methods = require("../util/methods.js");
  try {
    let ok = false;
    client.mysql.selectSql(
      `SELECT count(*) as nbr
      FROM ${TABLES[0]}
      where ${COLUMNS_DISCORD_USER_INFO[1]} = ?`,
      [
        member.user.id
      ]
    ).then(str => {
      if (str[0].nbr === 0) ok = true;
    });

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
          member.user.id
        ]
      );
    }
  } catch (e) {
    console.log("erreur : " + e);
  }
};
