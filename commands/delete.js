exports.run = (client, message) => {
  if (message.member.roles.cache.find(r => r.name === "Administration")) {
    const nbr = Number(message.content.substring(8));
    message.channel.bulkDelete(nbr + 1);
  }
};
exports.help = {
  name: "delete"
};
