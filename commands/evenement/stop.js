exports.run = (client, message) => {
  client.mysql = require("../../util/db.js");

  const role = message.guild.roles.cache.find(r => r.name === "Event");

  client.mysql.selectSql("SELECT discordId FROM participant").then(str => {
    const data = [];
    for (let i = 0; i < str.length; i++) {
      data.push(str[i].discordId);
      message.guild.members.fetch(data[i]).then(member => {
        member.roles.remove(role);
      });
    }
  });

  
  client.mysql.querySql("Delete from participant");
  message.channel.send("L'event est terminé ! (message supprimé dans 3 secondes)");
  setTimeout(function suprr() {
    message.channel.bulkDelete(2);
  }, 1500);
};

exports.help = {
  name: "stop"
};
