module.exports = (client, message) => {
  client.mysql = require("../mysql/db.js");

  try {
    client.mysql
      .selectSql(
        `SELECT xp FROM join_guild where member_id = ${message.author.id} and guild_id = '${message.guild.id}'`
      )
      .then(str => {
        const xp = str[0].xp + 1;

        client.mysql.querySql(
          `update join_guild  set xp = ${xp} where member_id = ${message.author.id} and guild_id = '${message.guild.id}'`
        );
      }).catch(e => console.log(e));
  } catch (e) {
  }
  if (message.content.startsWith("!")) {
    try {
      client.mysql
        .selectSql(
          "select command.name, command.command_id, command.description, execute.enabled FROM command join execute on command.command_id = execute.command_id where execute.guild_id = ?",
          message.guild.id
        )
        .then(result => {
          for (let i = 0; i < result.length; i++) {
            if (result[i].command_id > 5) {
              if (message.content === "!" + result[i].name) {
                if (result[i].enabled === 1) {
                  message.channel.send(result[i].response);
                }
                else {
                  message.channel.send("veuillez activer la commande dans le pannel");
                }
              }
            }
          }
        });
    } catch (e) {
      console.log("erreur : " + e);
    }
  }
  

  if (message.author.bot) return;
  if (message.content.indexOf(client.PREFIX) !== 0) return;
  const args = message.content.slice(client.PREFIX.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  const cmd = client.commands.get(command);
  if (!cmd) return undefined;
  cmd.run(client, message, args);
};
