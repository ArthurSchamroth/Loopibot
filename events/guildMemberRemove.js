const { COLUMNS_DISCORD_USER_INFO, TABLES } = require("../util/config");
module.exports = (client, member) => {
  client.mysql = require("../util/db.js");
  client.methods = require("../util/methods.js");
  try {
    client.mysql.querySql(
      `UPDATE ${TABLES[0]}
      SET ${COLUMNS_DISCORD_USER_INFO[11]} = ${false}
      WHERE ${COLUMNS_DISCORD_USER_INFO[1]} = ?;`,
      [
        member.user.id
      ]
    );
  } catch (e) {
    console.log("erreur : " + e);
  }
};
