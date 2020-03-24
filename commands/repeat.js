exports.run = (client, message, args) => {
  message.channel.send(args.join(" "));
  message.delete({ timeout: 3000 });
};
exports.help = {
  name: "repeat"
};
