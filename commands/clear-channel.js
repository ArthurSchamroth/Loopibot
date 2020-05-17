exports.run = (client, message) => {
  client.mysql = require("../mysql/db.js");
  client.mysql
    .selectSql(
      "SELECT enabled FROM execute where guild_id = ? and command_id = 3",
      message.guild.id
    )
    .then(str => {
      if (str[0].enabled === 1) {
        const old = message.channel;
        const pos = old.position;
        old.delete();
        old.clone().then(c => {
          c.setPosition(pos);
        });
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
  name: "clear-channel"
};
