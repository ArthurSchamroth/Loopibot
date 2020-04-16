exports.run = (client, message) => {
  
  client.mysql = require("../util/db.js");
  
  client.mysql.querySql("delete from userinfo");

  message.guild.members.cache.each(member => {
    try {
      const sql = `INSERT INTO userinfo(discordId, pseudo) VALUES(${member.user.id},"${member.user.username}")`;
      client.mysql.querySql(sql);
    } catch (e) {
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    }
  });
};
exports.help = {
  name: "client"
};
