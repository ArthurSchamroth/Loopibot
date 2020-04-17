exports.run = (client, message) => {
  client.mysql = require("../util/db.js");

  client.mysql.querySql("truncate userinfo");
  try {
    message.guild.members.cache.each((member) => {
      let name = member.user.username;
      let ok = false;
      const pos = [];
      const str = "'";
      for (let i = 0; i < name.length; i++) {
        if (name[i] === str) {
          pos.push(i);
          ok = true;
        }
      }
      if (ok === true) {
        for (let i = 0; i < pos.length; i++) {
          pos[i]++;
          name = [name.slice(0, pos[i]), str, name.slice(pos[i])].join('');
        }
      }
      client.mysql.querySql(`INSERT INTO userinfo(discordId, pseudo) VALUES(${member.user.id},'${name}')`);

    });
  } catch (e) {
    console.log("erreur : " + e);
  }
};
exports.help = {
  name: "client",
};
