const { MessageAttachment } = require("discord.js");
exports.run = (client, message) => {
<<<<<<< HEAD
  client.mysql = require("../mysql/db.js");
  client.mysql
    .selectSql(
      "SELECT enabled FROM execute where guild_id = ? and command_id = 1",
      message.guild.id
    )
    .then(str => {
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

=======
  const attachment = new MessageAttachment(message.author.avatarURL({ format: "png" }));
  message.channel.send(attachment);

};
>>>>>>> 97d2f4476b3c016999f8a6f22915e71876aa6c9d
exports.help = {
  name: "avatar"
};
