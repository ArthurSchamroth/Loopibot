const { Client, Collection } = require("discord.js");
const { TOKEN, PREFIX } = require("./config");
const client = new Client();

client.PREFIX = PREFIX;

client.commands = new Collection();
client.commands.set("repeat", require("./commands/repeat.js"));
client.commands.set("sinfo", require("./commands/sinfo.js"));
client.commands.set("event", require("./commands/role.js"));

client.on("ready", () => require("./events/ready.js")(client));
client.on("message", msg => require("./events/message.js")(client, msg));

client.login(TOKEN);

/* client.on("error", console.error);
client.on("warn", console.warn);
client.on("debug", console.debug); */
