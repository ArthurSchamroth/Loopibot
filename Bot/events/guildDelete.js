const { COLUMNS_DISCORD_JOIN, COLUMNS_DISCORD_GUILDS, TABLES } = require("../util/config");

module.exports = (client, guild) => {
  client.mysql = require("../mysql/db.js");
  client.methods = require("../util/methods.js");

  try {
    client.mysql.querySql(
      `UPDATE ${TABLES[0]}
      SET ${COLUMNS_DISCORD_GUILDS[7]} = false
      WHERE ${COLUMNS_DISCORD_GUILDS[1]} = ?;`,
      [
        guild.id
      ]
    );
  }
  catch (e) {
    console.log("erreur : " + e);
  }
};
