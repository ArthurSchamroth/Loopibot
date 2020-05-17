const { COLUMNS_DISCORD_JOIN, TABLES } = require("../util/config");

module.exports = (client, guild, user) => {
  client.mysql = require("../mysql/db.js");
  client.methods = require("../util/methods.js");

  try {
    client.mysql.querySql(
      `UPDATE ${TABLES[2]}
      SET ${COLUMNS_DISCORD_JOIN[6]} = ${false}
      WHERE ${COLUMNS_DISCORD_JOIN[1]} = ? and ${COLUMNS_DISCORD_JOIN[2]} = ?;`,
      [
        guild.id,
        user.id
      ]
    );
  }
  catch (e) {
    console.log("erreur : " + e);
  }
};
