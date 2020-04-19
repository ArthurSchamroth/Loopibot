const { COLUMNS_DISCORD_USER_INFO, TABLES } = require("../util/config");

module.exports = (client, member, user) => {
  client.mysql = require("../util/db.js");
  client.methods = require("../util/methods.js");

  try {
    client.mysql.querySql(
      `UPDATE ${TABLES[0]}
      SET  ${COLUMNS_DISCORD_USER_INFO[12]} = ?
      WHERE ${COLUMNS_DISCORD_USER_INFO[1]} = ?;`,
      [
        false,
        user.id
      ]
    );
  }
  catch (e) {
    console.log("erreur : " + e);
  }
};
