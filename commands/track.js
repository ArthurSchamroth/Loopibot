const { MessageEmbed } = require("discord.js");
exports.run = (client, message) => {
  // .messages.fetch().then(m => console.log(m.content))
  client.guilds.cache.get("615588332126208093").channels.cache.get("743752895119228988").messages.fetch({ limit: 100 })
  .then(messages => {
    // console.log(messages)
    for(var [key, value] of messages){
      console.log(value.author.username + " : "+ value.content)
    }
  })
  .catch(console.error);
  message.delete()
};
exports.help = {
  name: "sinfo"
};
