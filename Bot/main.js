const { Client, Collection } = require("discord.js");

const { TOKEN, PREFIX } = require("./util/config");
const client = new Client();
const fs = require("fs");


client.PREFIX = PREFIX;
client.mysql = require("./util/db");
client.birthday = require("./util/bd-alert");
client.bd = require("./commands/set-db");

client.commands = new Collection();

fs.readdir("./events/", (err, files) => {
  if (err) return console.error;
  files.forEach(file => {
    if (!file.endsWith(".js")) return undefined;
    const event = require(`./events/${file}`);
    const eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error;
  files.forEach(file => {
    if (!file.endsWith(".js")) return undefined;
    const props = require(`./commands/${file}`);
    const cmdName = file.split(".")[0];
    client.commands.set(cmdName, props);
  });
});

fs.readdir("./commands/evenement/", (err, files) => {
  if (err) return console.error;
  files.forEach(file => {
    if (!file.endsWith(".js")) return undefined;
    const props = require(`./commands/evenement/${file}`);
    const cmdName = file.split(".")[0];
    client.commands.set(cmdName, props);
  });
});

client.login(TOKEN);
client.mysql.init();
client.birthday.alert(client);

/* client.on("error", console.error);
client.on("warn", console.warn);
client.on("debug", console.debug); */
