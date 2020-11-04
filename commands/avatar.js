const { MessageAttachment } = require("discord.js");
exports.run = (client, message) => {
  client.mysql = require("../mysql/db.js");
  client.mysql
    .selectSql(
      "SELECT enabled FROM execute where guild_id = ? and command_id = 1",
      message.guild.id
    )
    .then(str => {
      console.log(str);
      if (str[0].enabled === 1) {
        if (message.content.length >= 8) {
          const userid = message.mentions.users.first().id;
          const attachment = new MessageAttachment(
            message.guild.members.cache
              .get(userid)
              .user.avatarURL({ format: "png" })
          );
          message.channel.send(attachment);
        } else {
          const attachment = new MessageAttachment(
            message.author.avatarURL({ format: "png" })
          );
          message.channel.send(attachment);
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
  name: "avatar"
};
