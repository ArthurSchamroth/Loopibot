const { Client, MessageEmbed } = require("discord.js");
const { TOKEN, PREFIX } = require("./config");
const client = new Client();

client.on("message", msg => {
  if (msg.author.bot) return;
  if (msg.content.indexOf(PREFIX) !== 0) return;
  const args = msg.content
    .slice(PREFIX.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd === "ping") msg.channel.send("pong");
  if (cmd === "lol") msg.channel.send("!lol");
  if (cmd === "repeat") {
    msg.channel.send(args.join(" "));
    msg.delete({ timeout: 3000 });
  }

  if (cmd === "event") {
    const role = msg.guild.roles.cache.find(r => r.name === "Event");
    if (!role) return msg.channel.send("role introuvable");
    if (msg.member.roles.cache.find(r => r.name === "Event")) {
      msg.author.send("Tu es déjà inscrit");
    } else {
      msg.member.roles.add(role);
      client.channels.cache
        .get("691670772984447066")
        .send(`${msg.author} participe`);
    }

    msg.delete({ timeout: 3000 });
  }

  if (cmd === "sinfo") {
    const embed = new MessageEmbed()
      .setDescription(msg.guild.name)
      .setThumbnail(msg.guild.iconURL())
      .setColor("AQUA")
      .addField("Membres", msg.guild.memberCount)
      .setFooter(msg.guild.owner.user.tag, msg.guild.owner.user.avatarURL())
      .setTimestamp();
    msg.channel.send(embed);
  }
});

client.login(TOKEN);

client.on("ready", () => console.log("connected"));
/* client.on("error", console.error);
client.on("warn", console.warn);
client.on("debug", console.debug); */
