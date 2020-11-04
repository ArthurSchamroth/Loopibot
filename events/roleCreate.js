module.exports = (client, role) => {
  client.mysql = require("../mysql/db.js");
  client.mysql.querySql(
    "call insert_role( ?, ?, (select guild_id from guild where guild_id = ?), ?, ?)",
    [role.id, role.name, role.guild.id, role.color, role.position]
  );
};
