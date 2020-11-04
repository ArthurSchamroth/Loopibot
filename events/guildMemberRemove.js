const { COLUMNS_DISCORD_JOIN, TABLES } = require("../util/config");
module.exports = (client, member) => {
  client.mysql = require("../mysql/db.js");
  client.methods = require("../util/methods.js");
  try {
    client.mysql.querySql(
      `UPDATE ${TABLES[2]}
      SET ${COLUMNS_DISCORD_JOIN[5]} = ${false}
      WHERE ${COLUMNS_DISCORD_JOIN[1]} = ? and ${COLUMNS_DISCORD_JOIN[2]} = ?;`,
      [
        member.guild.id,
        member.user.id
      ]
    );
  } catch (e) {
    console.log("erreur : " + e);
  }
};
