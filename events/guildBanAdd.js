const { COLUMNS_DISCORD_USER_INFO } = require("../util/config");

module.exports = (client, guild, user) => {
  client.mysql = require("../util/db.js");
  client.methods = require("../util/methods.js");
  try {
    client.mysql.querySql(`UPDATE discord_user_info SET ${COLUMNS_DISCORD_USER_INFO[10]} = ${false}, ${COLUMNS_DISCORD_USER_INFO[11]} = ${true} WHERE (discordId = ${user.id});`);
  } catch (e) {
    console.log("erreur : " + e);
  }
};
