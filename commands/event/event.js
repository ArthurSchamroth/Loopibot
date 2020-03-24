exports.run = (client, message) => {
  if (message.content === "!event")
    const role = message.guild.roles.cache.find(r => r.name === "Event");
  if (message.member.roles.cache.find(r => r.name === "Event")) {
    message.author.send("Tu es déjà inscrit");
  } else {
    message.member.roles.add(role);
    client.channels.cache
      .get("691670772984447066")
      .send(`${message.author} participe`);
  }
  message.delete({ timeout: 3000 });
  return message.author.id;
};

exports.help = {
  name: "event"
};
