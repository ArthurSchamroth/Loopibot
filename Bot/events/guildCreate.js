const {
  TABLES, COLUMNS_DISCORD_USER_INFO,
  COLUMNS_DISCORD_GUILDS,
  COLUMNS_DISCORD_JOIN,
  COLUMNS_DISCORD_ROLE,
  COLUMNS_DISCORD_HAS_ROLE,
  COLUMNS_DISCORD_BAN,
  COLUMNS_DISCORD_COMMAND,
  COLUMNS_DISCORD_HAS_PERMISSION
} = require("../util/config");

module.exports = (client, guild) => {
  client.mysql = require("../mysql/db.js");
  client.methods = require("../util/methods.js");

  try {

    client.mysql.querySql(
      `INSERT IGNORE INTO ${TABLES[0]}(
        ${COLUMNS_DISCORD_GUILDS[1]},
        ${COLUMNS_DISCORD_GUILDS[2]},
        ${COLUMNS_DISCORD_GUILDS[3]},
        ${COLUMNS_DISCORD_GUILDS[4]},
        ${COLUMNS_DISCORD_GUILDS[5]},
        ${COLUMNS_DISCORD_GUILDS[6]},
        ${COLUMNS_DISCORD_GUILDS[7]}
      )
      VALUES( ?, ?, ?, ?, ?, ?, ?)`,
      [
        guild.id,
        guild.name,
        guild.ownerID,
        guild.owner.user.username,
        guild.createdAt.toJSON().slice(0, 10),
        guild.iconURL({ format: "png" }),
        true
      ]
    );
    guild.members.cache.each(member => {
      client.mysql.querySql(
        `INSERT IGNORE INTO ${TABLES[1]}(
          ${COLUMNS_DISCORD_USER_INFO[1]},
          ${COLUMNS_DISCORD_USER_INFO[2]},
          ${COLUMNS_DISCORD_USER_INFO[3]},
          ${COLUMNS_DISCORD_USER_INFO[4]},
          ${COLUMNS_DISCORD_USER_INFO[6]},
          ${COLUMNS_DISCORD_USER_INFO[7]},
          ${COLUMNS_DISCORD_USER_INFO[8]}
        )
        VALUES( ?, ?, ?, ?, ?, ?, ?)`,
        [
          member.user.id,
          member.user.username,
          member.user.discriminator,
          member.user.tag,
          member.user.avatarURL({ format: "png" }),
          member.user.bot,
          member.user.createdAt.toJSON().slice(0, 10)
        ]
      );
      client.mysql.querySql(
        `INSERT IGNORE INTO ??(
          ${COLUMNS_DISCORD_JOIN[1]},
          ${COLUMNS_DISCORD_JOIN[2]},
          ${COLUMNS_DISCORD_JOIN[3]},
          ${COLUMNS_DISCORD_JOIN[4]},
          ${COLUMNS_DISCORD_JOIN[5]}
        )
        VALUES((SELECT ?? from ?? where ?? = ?),(SELECT ?? from ?? where ?? = ?), ?, ?, ?)`,
        [
          TABLES[2],
          COLUMNS_DISCORD_GUILDS[1],
          TABLES[0],
          COLUMNS_DISCORD_GUILDS[1],
          guild.id,
          COLUMNS_DISCORD_USER_INFO[1],
          TABLES[1],
          COLUMNS_DISCORD_USER_INFO[1],
          member.user.id,
          member.nickname,
          member.joinedAt.toJSON().slice(0, 10),
          true,
          false,
          0
        ]
      );
      guild.roles.cache.each(role => {
        client.mysql.querySql(
          `INSERT IGNORE INTO ${TABLES[3]}(
            ${COLUMNS_DISCORD_ROLE[1]},
            ${COLUMNS_DISCORD_ROLE[2]},
            ${COLUMNS_DISCORD_ROLE[3]},
            ${COLUMNS_DISCORD_ROLE[4]},
            ${COLUMNS_DISCORD_ROLE[5]}
          )
          VALUES( ?, ?, (select guild_id from guild where guild_id = '${guild.id}'), ?, ?)`,
          [
            role.id,
            role.name,
            role.color,
            role.position
          ]
        );
        if (member.roles.cache.has(role.id)) {
          client.mysql.querySql(
            `INSERT IGNORE INTO ${TABLES[4]}(
            ${COLUMNS_DISCORD_HAS_ROLE[1]},
            ${COLUMNS_DISCORD_HAS_ROLE[2]}
          )
          VALUES((select role_id from role where role_id = '${role.id}'),(select member_id from member where member_id = '${member.user.id}'))`
          );
        }
      });
    });
    guild.fetchBans().then(ban => {
      ban.each(baninfo => {
        client.mysql.querySql(
          `INSERT IGNORE INTO ${TABLES[1]}(
            ${COLUMNS_DISCORD_USER_INFO[1]},
            ${COLUMNS_DISCORD_USER_INFO[2]},
            ${COLUMNS_DISCORD_USER_INFO[3]},
            ${COLUMNS_DISCORD_USER_INFO[4]},
            ${COLUMNS_DISCORD_USER_INFO[6]},
            ${COLUMNS_DISCORD_USER_INFO[7]},
            ${COLUMNS_DISCORD_USER_INFO[8]}
          )
          VALUES( ?, ?, ?, ?, ?, ?, ?)`,
          [
            baninfo.user.id,
            baninfo.user.username,
            baninfo.user.discriminator,
            baninfo.user.tag,
            baninfo.user.avatarURL({ format: "png" }),
            baninfo.user.bot,
            baninfo.user.createdAt.toJSON().slice(0, 10)
          ]
        );
        client.mysql.querySql(
          `INSERT IGNORE INTO ??(
            ${COLUMNS_DISCORD_JOIN[1]},
            ${COLUMNS_DISCORD_JOIN[2]},
            ${COLUMNS_DISCORD_JOIN[3]},
            ${COLUMNS_DISCORD_JOIN[4]},
            ${COLUMNS_DISCORD_JOIN[5]},
            ${COLUMNS_DISCORD_JOIN[6]},
            ${COLUMNS_DISCORD_JOIN[7]}
          )
          VALUES((SELECT ?? from ?? where ?? = ?),(SELECT ?? from ?? where ?? = ?), ?, ?, ?, ?, ?)`,
          [
            TABLES[2],
            COLUMNS_DISCORD_GUILDS[1],
            TABLES[0],
            COLUMNS_DISCORD_GUILDS[1],
            guild.id,
            COLUMNS_DISCORD_USER_INFO[1],
            TABLES[1],
            COLUMNS_DISCORD_USER_INFO[1],
            baninfo.user.id,
            null,
            null,
            false,
            true,
            0
          ]
        );
        client.mysql.querySql(
          `INSERT IGNORE INTO ??(
            ${COLUMNS_DISCORD_BAN[1]},
            ${COLUMNS_DISCORD_BAN[2]},
            ${COLUMNS_DISCORD_BAN[3]}
          )
          VALUES((SELECT ?? from ?? where ?? = ?),(SELECT ?? from ?? where ?? = ?), ?)`,
          [
            TABLES[7],
            COLUMNS_DISCORD_USER_INFO[1],
            TABLES[1],
            COLUMNS_DISCORD_USER_INFO[1],
            baninfo.user.id,
            COLUMNS_DISCORD_GUILDS[1],
            TABLES[0],
            COLUMNS_DISCORD_GUILDS[1],
            guild.id,
            baninfo.reason
          ]
        );
      });
    }); 
  }
  catch (e) {
    console.log("erreur : " + e);
  }
};
