exports.run = (client, message, args) => {
  message.channel.send(args.join(" "));
  message.delete();
};
exports.help = {
  name: "repeat"
};
