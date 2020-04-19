module.exports = (client, member, user) => {
  client.mysql = require("../util/db.js");
  client.methods = require("../util/methods.js");
  try {
    client.mysql.querySql(`UPDATE discord_user_info SET  ban = ${false} WHERE (discordId = ${user.id});`);
  } catch (e) {
    console.log("erreur : " + e);
  }
};
