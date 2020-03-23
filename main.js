const { Client } = require("discord.js");
const client = new Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
  if (msg.content === "ping") msg.reply("pong");
  if (msg.content === "everyone") msg.channel.send();
});

client.login("NjA2MTYwMjY4NjQ4NjQ0NjMw.Xnjdkw.2D_OoIKjkZcPZVJ7pEdBMDXKDek");
