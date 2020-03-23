const { Client } = require("discord.js");
const { TOKEN, PREFIX } = require("./config");
const client = new Client();

client.on("ready", () => {
  console.log("connected");
});

client.on("message", msg => {
  // bk
  if (msg.content === "ping") msg.channel.send("pong");
  if (msg.content === "everyone") msg.channel.send();
});

client.login(TOKEN);
