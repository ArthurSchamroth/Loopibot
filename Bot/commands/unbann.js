exports.run = (client, message) => {
  client.mysql = require("../mysql/db.js");
  client.mysql
    .selectSql(
      "SELECT enabled FROM execute where guild_id = ? and command_id = 6",
      message.guild.id
    )
    .then((str) => {
      if (str[0].enabled === 1) {
        if (message.content.length >= 9) {
          const userid = message.content.slice(7);
          const username = message.content.slice(7);
          client.mysql.selectSql(
            "select * from member where member_id = ?", userid
          ).then(result => {
            if (!result) {
              client.mysql.selectSql("select * from member where username like %?%", username);
            }
          }).then(r => console.log(r[0].username));
          message.guild.members.unban(userid);
        } else {
          message.channel.send("Veuillez entrer un id valide");
        }
      } else {
        message.channel.send("veuillez activer la commande dans le pannel");
        setTimeout(function suprr() {
          message.channel.bulkDelete(2);
        }, 1500);
      }
    });
};

exports.help = {
  name: "avatar",
};
