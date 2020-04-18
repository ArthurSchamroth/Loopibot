exports.run = (client, message) => {
  if (message.member.roles.cache.find(r => r.name === "Administration" || r.id === "659852072451047435")) {
    let nbr = Number(message.content.substring(8)) + 1;
    if (nbr > 100) {
      nbr = 100;
    }

    message.channel.bulkDelete(nbr).catch(error => {
      message.channel.send("impossible d'effacer des messages datant de plus de 14 jours.");
      setTimeout(function suprr() {
        message.channel.bulkDelete(2);
      }, 1500);
    });
  }
};
exports.help = {
  name: "delete"
};
