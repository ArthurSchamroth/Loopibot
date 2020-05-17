const { MessageEmbed } = require("discord.js");
exports.run = (client, message) => {
  client.mysql = require("../mysql/db.js");
  client.mysql
    .selectSql(
      "SELECT enabled FROM execute where guild_id = ? and command_id = 5",
      message.guild.id
    )
    .then(str => {
      if (str[0].enabled === 1) {
        const embed = new MessageEmbed()
          .setDescription(message.guild.name)
          .setThumbnail(message.guild.iconURL())
          .setColor("AQUA")
          .addField("Membres", message.guild.memberCount)
          .setFooter(
            message.guild.owner.user.tag,
            message.guild.owner.user.avatarURL()
          )
          .setTimestamp();
        message.channel.send(embed);
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
  name: "sinfo"
};
