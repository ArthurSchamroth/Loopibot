const { MessageEmbed } = require("discord.js");
exports.run = (client, message) => {
  message.channel.send(`
    **yo** comment ca va\ntestavec\\n
  `)
};
exports.help = {
  name: "sinfo"
};
