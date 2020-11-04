module.exports = (client, old, newg) => {
  
  client.mysql = require("../mysql/db.js");
  newg.members.cache.each((member) => {
    
    newg.roles.cache.each((role) => {
      client.mysql.querySql(
        "call insert_role( ?, ?, (select guild_id from guild where guild_id = ?), ?, ?)",
        [role.id, role.name, newg.id, role.color, role.position]
      );
      if (member.roles.cache.has(role.id)) {
        client.mysql.querySql(
          "call insert_has_role((select role_id from role where role_id = ?),(select member_id from member where member_id = ?))",
          [role.id, member.user.id]
        );
      }
    });
  });
  client.mysql.querySql("update guild set name = ?, owner_id = ?, owner_username = ?, avatar = ? where guild_id = ?", [
    newg.name,
    newg.ownerID,
    newg.owner.user.username,
    newg.iconURL({ format: "png" }),
    newg.id
  ]);
};
