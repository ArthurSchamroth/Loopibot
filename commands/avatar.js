const { MessageAttachment } = require("discord.js");
exports.run = (client, message) => {
  const attachment = new MessageAttachment(message.author.avatarURL({ format: "png" }));
  message.channel.send(attachment);

};
exports.help = {
  name: "avatar"
};
