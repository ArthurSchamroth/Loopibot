const { Client, Collection } = require("discord.js");
const { TOKEN, PREFIX } = require("./config");
const client = new Client();
const fs = require("fs");
const mysql = require("mysql");

client.PREFIX = PREFIX;

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

client.commands.set("delete", require("./commands/delete.js"));

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "test"
});

con.connect(err => {
  if (err) throw err;
  console.log("connecté à la base de donnée");
});

client.login(TOKEN);

/* client.on("error", console.error);
client.on("warn", console.warn);
client.on("debug", console.debug); */
