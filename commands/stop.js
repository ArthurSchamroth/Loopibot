exports.run = (client, message) => {
  client.mysql = require("../util/db.js");
  const sql = "SELECT * FROM participant";
  const role = message.guild.roles.cache.find(r => r.name === "test");
  const result = client.mysql.querySql(sql);
  console.log(result);
  if (message.content === "!stop")
    if (message.member.roles.cache.find(r => r.name === "test")) {
      
    }
  message.delete({ timeout: 3000 });
};

exports.help = {
  name: "stop"
};
