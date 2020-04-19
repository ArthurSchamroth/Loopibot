const { COLUMNS_DISCORD_USER_INFO, TABLES } = require("../util/config");

exports.run = (client, message) => {

  client.mysql = require("../util/db.js");

  const value = message.content.slice(8);
  const date = new Date(value);

  if (Object.prototype.toString.call(date) === "[object Date]") {
    if (isNaN(date.getTime())) {
      message.channel.send("rentrer un format valide tel que 01-31 (mois - date");
    }
    else {
      const userId = message.author.id;
      let final = date.setDate(date.getDate() + 1);

      final = date.toJSON().slice(0, 10);

      client.mysql.querySql(
        `UPDATE ${TABLES[0]}
      SET
        ${COLUMNS_DISCORD_USER_INFO[6]} = ? 
      WHERE
        ${COLUMNS_DISCORD_USER_INFO[1]} = ?`,
        [
          final,
          userId
        ]
      );  
      message.channel.send("Votre date de naissance a été enregistrée avec succès");
    }
  }
  else {
    message.channel.send("rentrer un format valide tel que 01-31 (mois - date");
  }
  setTimeout(function suprr() {
    message.channel.bulkDelete(2);
  }, 2000);
};
exports.help = {
  name: "bd-set"
};
