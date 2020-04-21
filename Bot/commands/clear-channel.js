exports.run = (client, message) => {
  const old = message.channel;
  const pos = old.position;
  old.delete();
  old.clone().then(c => {
    c.setPosition(pos);
  });
};
exports.help = {
  name: "clear-channel"
};
