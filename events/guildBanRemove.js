<<<<<<< HEAD
const { COLUMNS_DISCORD_JOIN, TABLES } = require("../util/config");

module.exports = (client, guild, user) => {
  client.mysql = require("../mysql/db.js");
=======
const { COLUMNS_DISCORD_USER_INFO, TABLES } = require("../util/config");

module.exports = (client, member, user) => {
  client.mysql = require("../util/db.js");
>>>>>>> 97d2f4476b3c016999f8a6f22915e71876aa6c9d
  client.methods = require("../util/methods.js");

  try {
    client.mysql.querySql(
<<<<<<< HEAD
      `UPDATE ${TABLES[2]}
      SET ${COLUMNS_DISCORD_JOIN[6]} = ${false}
      WHERE ${COLUMNS_DISCORD_JOIN[1]} = ? and ${COLUMNS_DISCORD_JOIN[2]} = ?;`,
      [
        guild.id,
=======
      `UPDATE ${TABLES[0]}
      SET  ${COLUMNS_DISCORD_USER_INFO[12]} = ?
      WHERE ${COLUMNS_DISCORD_USER_INFO[1]} = ?;`,
      [
        false,
>>>>>>> 97d2f4476b3c016999f8a6f22915e71876aa6c9d
        user.id
      ]
    );
  }
  catch (e) {
    console.log("erreur : " + e);
  }
};
