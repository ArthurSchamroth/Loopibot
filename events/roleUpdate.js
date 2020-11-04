module.exports = (client, old, newr) => {
  client.mysql = require("../mysql/db.js");
    
  client.mysql.querySql("delete from role where guild_id = ?", [
    newr.guild.id
  ]);

  newr.guild.members.cache.each(member => {
    newr.guild.roles.cache.each(role => {
      client.mysql.querySql(
        "call insert_role( ?, ?, (select guild_id from guild where guild_id = ?), ?, ?)",
        [role.id, role.name, newr.guild.id, role.color, role.position]
      );
      if (member.roles.cache.has(role.id)) {
        client.mysql.querySql(
          "call insert_has_role((select role_id from role where role_id = ?),(select member_id from member where member_id = ?))",
          [role.id, member.user.id]
        );
      }
    });
  });
};
