exports.run = (client, message) => {
  client.mysql = require("../../mysql/db.js");

  client.mysql.selectSql("SELECT discordId FROM participant").then(str => {
    if (str.length > 0) {
      message.channel.send("**Participants : **");
      const data = [];
      for (let i = 0; i < str.length; i++) {
        data.push(str[i].discordId);
        message.guild.members.fetch(data[i]).then(member => {
          message.channel.send("`" + member.user.username + "`");
        });
      }
    } else {
      message.channel.send("aucun participant");
      setTimeout(function suprr() {
        message.channel.bulkDelete(2);
      }, 1500);
    }
  });
};
exports.help = {
  name: "event-infos"
};
