require("../util/config");

module.exports = (client, guild) => {
  client.mysql = require("../mysql/db.js");
  client.methods = require("../util/methods.js");

  try {
    client.mysql
      .selectSql("select count(*) as count from guild where guild_id = ?", [
        guild.id,
      ])
      .then((nbr) => {
        if (nbr[0].count >= 0) {
          client.mysql.querySql(
            "update guild set available = true where guild_id = ?",
            guild.id
          );
        }
      });
    client.mysql.querySql("CALL insert_guild(?,?,?,?,?,?,?);", [
      guild.id,
      guild.name,
      guild.ownerID,
      guild.owner.user.username,
      guild.createdAt.toJSON().slice(0, 10),
      guild.iconURL({ format: "png" }),
      true,
    ]);
    client.mysql.querySql("call insert_command(?,?)", [
      "avatar",
      "show user avatar",
    ]);

    client.mysql.querySql("call insert_command(?,?)", [
      "bd-set",
      "set birhtday",
    ]);

    client.mysql.querySql("call insert_command(?,?)", [
      "clear-channel",
      "delete all the message from a channel",
    ]);

    client.mysql.querySql("call insert_command(?,?)", [
      "delete",
      "delete a number of message",
    ]);

    client.mysql.querySql("call insert_command(?,?)", [
      "sinfo",
      "show info from the current server",
    ]);

    client.mysql.querySql(
      "call insert_execute((SELECT command_id from command where command_id = ?),(SELECT guild_id from guild where guild_id = ?), ?)",
      [1, guild.id, true]
    );

    client.mysql.querySql(
      "call insert_execute((SELECT command_id from command where command_id = ?),(SELECT guild_id from guild where guild_id = ?), ?)",
      [2, guild.id, true]
    );

    client.mysql.querySql(
      "call insert_execute((SELECT command_id from command where command_id = ?),(SELECT guild_id from guild where guild_id = ?), ?)",
      [3, guild.id, true]
    );

    client.mysql.querySql(
      "call insert_execute((SELECT command_id from command where command_id = ?),(SELECT guild_id from guild where guild_id = ?), ?)",
      [4, guild.id, true]
    );

    client.mysql.querySql(
      "call insert_execute((SELECT command_id from command where command_id = ?),(SELECT guild_id from guild where guild_id = ?), ?)",
      [5, guild.id, true]
    );
    guild.members.cache.each((member) => {
      client.mysql.querySql("CALL insert_member(?,?,?,?,?,?,?);", [
        member.user.id,
        member.user.username,
        member.user.discriminator,
        member.user.tag,
        member.user.avatarURL({ format: "png" }),
        member.user.bot,
        member.user.createdAt.toJSON().slice(0, 10),
      ]);
      if (member.hasPermission("ADMINISTRATOR")) {
        client.mysql.querySql(
          " CALL insert_join_guild((SELECT guild_id from guild where guild_id = ?),(SELECT member_id from member where member_id = ?), ?, ?, ?, ?, ?, ?, ?)",
          [
            guild.id,
            member.user.id,
            member.nickname,
            member.joinedAt.toJSON().slice(0, 10),
            true,
            false,
            0,
            member.permissions.bitfield,
            true,
          ]
        );
      }
      client.mysql.querySql(
        " CALL insert_join_guild((SELECT guild_id from guild where guild_id = ?),(SELECT member_id from member where member_id = ?), ?, ?, ?, ?, ?, ?, ?)",
        [
          guild.id,
          member.user.id,
          member.nickname,
          member.joinedAt.toJSON().slice(0, 10),
          true,
          false,
          0,
          member.permissions.bitfield,
          false,
        ]
      );
      guild.roles.cache.each((role) => {
        client.mysql.querySql(
          "call insert_role( ?, ?, (select guild_id from guild where guild_id = ?), ?, ?)",
          [role.id, role.name, guild.id, role.color, role.position]
        );
        if (member.roles.cache.has(role.id)) {
          client.mysql.querySql(
            "call insert_has_role((select role_id from role where role_id = ?),(select member_id from member where member_id = ?))",
            [role.id, member.user.id]
          );
        }
      });
    });
    guild.fetchBans().then((ban) => {
      ban.each((baninfo) => {
        client.mysql.querySql("CALL insert_member(?,?,?,?,?,?,?);", [
          baninfo.user.id,
          baninfo.user.username,
          baninfo.user.discriminator,
          baninfo.user.tag,
          baninfo.user.avatarURL({ format: "png" }),
          baninfo.user.bot,
          baninfo.user.createdAt.toJSON().slice(0, 10),
        ]);
        client.mysql.querySql(
          "CALL insert_join_guild((SELECT guild_id from guild where guild_id = ?),(SELECT member_id from member where member_id = ?), ?, ?, ?, ?, ?, ?, ?)",
          [guild.id, baninfo.user.id, null, null, false, true, 0, null, false]
        );
        client.mysql.querySql(
          "CALL insert_ban((SELECT member_id from member where member_id = ?),(SELECT guild_id from guild where guild_id = ?), ?, ?)",
          [baninfo.user.id, guild.id, baninfo.reason, null]
        );
      });
    });
  } catch (e) {
    console.log("erreur : " + e);
  }
};
