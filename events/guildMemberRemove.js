module.exports = (client, member) => {
  client.mysql = require("../util/db.js");
  client.methods = require("../util/methods.js");
  try {
    client.mysql.querySql(`UPDATE discord_user_info SET available = ${false} WHERE (discordId = ${member.user.id});`);
  } catch (e) {
    console.log("erreur : " + e);
  }
};
