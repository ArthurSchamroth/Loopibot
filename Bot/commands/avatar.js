const { MessageAttachment } = require("discord.js");
exports.run = (client, message) => {
  if (message.content.length >= 8) {
    const userid = message.mentions.users.first().id;
    const attachment = new MessageAttachment(message.guild.members.cache.get(userid).user.avatarURL({ format: "png" }));
    message.channel.send(attachment);
  }
  else {
    const attachment = new MessageAttachment(message.author.avatarURL({ format: "png" }));
    message.channel.send(attachment);
  }
};

exports.help = {
  name: "avatar"
};
