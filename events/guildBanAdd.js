<<<<<<< HEAD
const { COLUMNS_DISCORD_JOIN, COLUMNS_DISCORD_BAN, TABLES } = require("../util/config");

module.exports = (client, guild, user) => {
  client.mysql = require("../mysql/db.js");
=======
const { COLUMNS_DISCORD_USER_INFO, TABLES } = require("../util/config");

module.exports = (client, guild, user) => {
  client.mysql = require("../util/db.js");
>>>>>>> 97d2f4476b3c016999f8a6f22915e71876aa6c9d
  client.methods = require("../util/methods.js");

  try {
    client.mysql.querySql(
<<<<<<< HEAD
      `UPDATE ${TABLES[2]}
      SET ${COLUMNS_DISCORD_JOIN[5]} = ${false},
      ${COLUMNS_DISCORD_JOIN[6]} = ${true}
      WHERE ${COLUMNS_DISCORD_JOIN[1]} = ? and ${COLUMNS_DISCORD_JOIN[2]} = ?;`,
      [
        guild.id,
        user.id
      ]
    );
    const date_ban = new Date();
    guild.fetchBan(user.id).then(ban => {
      client.mysql.querySql(
        `INSERT IGNORE ${TABLES[7]}(
          ${COLUMNS_DISCORD_BAN[1]},
          ${COLUMNS_DISCORD_BAN[2]},
          ${COLUMNS_DISCORD_BAN[3]},
          ${COLUMNS_DISCORD_BAN[4]})
  
          values(
          (select member_id from member where member_id = '${user.id}'),
          (select guild_id from guild where guild_id = '${guild.id}'),
          '${ban.reason}',
          '${date_ban.toJSON().slice(0, 10)}')`
      );
    });
=======
      `UPDATE ${TABLES[0]}
      SET
        ${COLUMNS_DISCORD_USER_INFO[11]} = ?,
        ${COLUMNS_DISCORD_USER_INFO[12]} = ?
      WHERE
        ${COLUMNS_DISCORD_USER_INFO[1]} = ?;`,
      [
        false,
        true,
        user.id
      ]
    );
>>>>>>> 97d2f4476b3c016999f8a6f22915e71876aa6c9d
  }
  catch (e) {
    console.log("erreur : " + e);
  }
};
