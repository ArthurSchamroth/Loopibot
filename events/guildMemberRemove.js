<<<<<<< HEAD
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
=======
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
>>>>>>> 97d2f4476b3c016999f8a6f22915e71876aa6c9d
        member.user.id
      ]
    );
  } catch (e) {
    console.log("erreur : " + e);
  }
};
