const { MessageEmbed } = require("discord.js");
exports.run = (client, message) => {
  // .messages.fetch().then(m => console.log(m.content)) modo : 605161416475017224
  client.guilds.cache.get("591932855433691136").channels.cache.get("705052336434839602").messages.fetch({ limit: 100 })
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
