exports.run = (client, message) => {
  client.mysql = require("../mysql/db.js");
  client.mysql
    .selectSql(
      "SELECT enabled FROM execute where guild_id = ? and command_id = 4",
      message.guild.id
    )
    .then(str => {
      if (str[0].enabled === 1) {
        if (message.member.roles.cache.find(r => r.name === "Administration" || r.id === "659852072451047435")) {
          let nbr = Number(message.content.substring(8)) + 1;
          if (nbr > 100) {
            nbr = 100;
          }

          message.channel.bulkDelete(nbr).catch(error => {
            message.channel.send("impossible d'effacer des messages datant de plus de 14 jours.");
            setTimeout(function suprr() {
              message.channel.bulkDelete(2);
            }, 1500);
          });
        }
      }
      else {
        message.channel.send("veuillez activer la commande dans le pannel");
        setTimeout(function suprr() {
          message.channel.bulkDelete(2);
        }, 1500);
      }
    });
};
exports.help = {
  name: "delete"
};
