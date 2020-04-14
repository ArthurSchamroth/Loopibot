exports.run = (client, message) => {

  client.mysql = require("../util/db.js");

  const sql = "SELECT discordId FROM participant";
  const role = message.guild.roles.cache.find(r => r.name === "test");

  client.mysql.querySql(sql).then(str => {
    const data = [];
    console.log("le resultat est: ", str);
    for (let i = 0; i < str.length; i++) {
      data.push(str[i].discordId);
      console.log("valeur de", i + 1, " : ", str[i].discordId);
      //let guild = message.guild.members.get(data[i]).removeRole(role);
      
    }
  });

  message.delete({ timeout: 3000 });
};

exports.help = {
  name: "stop"
};
