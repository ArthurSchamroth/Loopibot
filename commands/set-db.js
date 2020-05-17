const {
  TABLES,
  COLUMNS_DISCORD_USER_INFO,
  COLUMNS_DISCORD_GUILDS,
  COLUMNS_DISCORD_JOIN,
  COLUMNS_DISCORD_ROLE,
  COLUMNS_DISCORD_HAS_ROLE,
  COLUMNS_DISCORD_WARN,
  COLUMNS_DISCORD_KICK,
  COLUMNS_DISCORD_BAN,
  COLUMNS_DISCORD_COMMAND,
  COLUMNS_DISCORD_HAS_PERMISSION,
  COLUMNS_DISCORD_EXECUTE
} = require("../util/config");

exports.run = (client, message) => {
  client.mysql = require("../mysql/db.js");
  client.methods = require("../util/methods.js");

  let i = 0;
  try {
    /* -------------DROP TABLES-------------*/
    {
      client.mysql.querySql("SET FOREIGN_KEY_CHECKS = 0;");
      for (i = 0; i < TABLES.length; i++) {
        client.mysql.querySql("DROP TABLE IF EXISTS ??;", TABLES[i]);
      }
      client.mysql.querySql("SET FOREIGN_KEY_CHECKS = 1;");
    }

    /* -------------CREATE TABLES-------------*/
    i = 0;
    {
      client.mysql.querySql(`CREATE TABLE ${TABLES[0]} (
        ${COLUMNS_DISCORD_GUILDS[i++]} SERIAL NOT NULL,
        ${COLUMNS_DISCORD_GUILDS[i++]} varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${COLUMNS_DISCORD_GUILDS[i++]} varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${COLUMNS_DISCORD_GUILDS[i++]} varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${COLUMNS_DISCORD_GUILDS[i++]} varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${COLUMNS_DISCORD_GUILDS[i++]} date NOT NULL,
        ${COLUMNS_DISCORD_GUILDS[i++]} varchar(255) COLLATE utf8mb4_unicode_ci NULL,
        ${COLUMNS_DISCORD_GUILDS[i++]} tinyint(4) NOT NULL,
        PRIMARY KEY (${COLUMNS_DISCORD_GUILDS[0]}),
        UNIQUE KEY ${COLUMNS_DISCORD_GUILDS[1]} (${COLUMNS_DISCORD_GUILDS[1]})
      ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

      i = 0;
      client.mysql.querySql(`CREATE TABLE ${TABLES[1]} (
        ${COLUMNS_DISCORD_USER_INFO[i++]} SERIAL NOT NULL,
        ${COLUMNS_DISCORD_USER_INFO[i++]} varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${COLUMNS_DISCORD_USER_INFO[i++]} varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${COLUMNS_DISCORD_USER_INFO[i++]} varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${COLUMNS_DISCORD_USER_INFO[i++]} varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${COLUMNS_DISCORD_USER_INFO[i++]} date DEFAULT NULL,
        ${COLUMNS_DISCORD_USER_INFO[i++]} varchar(255),
        ${COLUMNS_DISCORD_USER_INFO[i++]} tinyint(4) NOT NULL,
        ${COLUMNS_DISCORD_USER_INFO[i++]} DATE NOT NULL,
        PRIMARY KEY (${COLUMNS_DISCORD_USER_INFO[0]}),
        UNIQUE KEY ${COLUMNS_DISCORD_USER_INFO[1]}_UNIQUE (${COLUMNS_DISCORD_USER_INFO[1]})
      ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

      i = 0;
      client.mysql.querySql(
        `CREATE TABLE ?? (
        ${COLUMNS_DISCORD_JOIN[i++]} SERIAL NOT NULL,
        ${COLUMNS_DISCORD_JOIN[i++]} varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${COLUMNS_DISCORD_JOIN[i++]} varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${COLUMNS_DISCORD_JOIN[i++]} varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
        ${COLUMNS_DISCORD_JOIN[i++]} date NOT NULL,
        ${COLUMNS_DISCORD_JOIN[i++]} tinyint(4) NOT NULL,
        ${COLUMNS_DISCORD_JOIN[i++]} tinyint(4) NOT NULL,
        ${COLUMNS_DISCORD_JOIN[i++]} integer(10) NOT NULL,
        PRIMARY KEY (${COLUMNS_DISCORD_JOIN[0]}),
        UNIQUE KEY ${COLUMNS_DISCORD_JOIN[1]} (${COLUMNS_DISCORD_JOIN[1]}, ${COLUMNS_DISCORD_JOIN[2]})
      ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
        [TABLES[2]]
      );

      i = 0;
      client.mysql.querySql(`CREATE TABLE ${TABLES[3]} (
        ${COLUMNS_DISCORD_ROLE[i++]} SERIAL NOT NULL,
        ${COLUMNS_DISCORD_ROLE[i++]} varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${COLUMNS_DISCORD_ROLE[i++]} varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${COLUMNS_DISCORD_ROLE[i++]} varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${COLUMNS_DISCORD_ROLE[i++]} varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${COLUMNS_DISCORD_ROLE[i++]} integer(255) NOT NULL,
        PRIMARY KEY (${COLUMNS_DISCORD_ROLE[0]}),
        UNIQUE KEY ${COLUMNS_DISCORD_ROLE[1]} (${COLUMNS_DISCORD_ROLE[1]})
      ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

      i = 0;
      client.mysql.querySql(`CREATE TABLE ${TABLES[4]} (
        ${COLUMNS_DISCORD_HAS_ROLE[i++]} SERIAL NOT NULL,
        ${COLUMNS_DISCORD_HAS_ROLE[i++]} varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${COLUMNS_DISCORD_HAS_ROLE[i++]} varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        PRIMARY KEY (${COLUMNS_DISCORD_HAS_ROLE[0]})
      ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

      i = 0;
      client.mysql.querySql(`CREATE TABLE ${TABLES[5]} (
        ${COLUMNS_DISCORD_WARN[i++]} SERIAL NOT NULL,
        ${COLUMNS_DISCORD_WARN[i++]} varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${COLUMNS_DISCORD_WARN[i++]} varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${COLUMNS_DISCORD_WARN[i++]} TEXT(520) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
        PRIMARY KEY (${COLUMNS_DISCORD_WARN[0]})
      ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

      i = 0;
      client.mysql.querySql(`CREATE TABLE ${TABLES[6]} (
        ${COLUMNS_DISCORD_KICK[i++]} SERIAL NOT NULL,
        ${COLUMNS_DISCORD_KICK[i++]} varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${COLUMNS_DISCORD_KICK[i++]} varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${COLUMNS_DISCORD_KICK[i++]} TEXT(520) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
        PRIMARY KEY (${COLUMNS_DISCORD_KICK[0]})
      ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

      i = 0;
      client.mysql.querySql(`CREATE TABLE ${TABLES[7]} (
        ${COLUMNS_DISCORD_BAN[i++]} SERIAL NOT NULL,
        ${COLUMNS_DISCORD_BAN[i++]} varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${COLUMNS_DISCORD_BAN[i++]} varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${COLUMNS_DISCORD_BAN[i++]} TEXT(520) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
        ${COLUMNS_DISCORD_BAN[i++]} date DEFAULT NULL,
        PRIMARY KEY (${COLUMNS_DISCORD_BAN[0]})
      ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

      i = 0;
      client.mysql.querySql(`CREATE TABLE ${TABLES[8]} (
        ${COLUMNS_DISCORD_COMMAND[i++]} SERIAL NOT NULL,
        ${COLUMNS_DISCORD_COMMAND[i++]} varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${COLUMNS_DISCORD_COMMAND[i++]} varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
        PRIMARY KEY (${COLUMNS_DISCORD_COMMAND[0]}),
        UNIQUE KEY ${COLUMNS_DISCORD_COMMAND[1]}_UNIQUE (${COLUMNS_DISCORD_COMMAND[1]})
      ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

      i = 0;
      client.mysql.querySql(`CREATE TABLE ${TABLES[9]} (
        ${COLUMNS_DISCORD_HAS_PERMISSION[i++]} SERIAL NOT NULL,
        ${COLUMNS_DISCORD_HAS_PERMISSION[i++]} varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${COLUMNS_DISCORD_HAS_PERMISSION[i++]} BIGINT(20) UNSIGNED NOT NULL,
        PRIMARY KEY (${COLUMNS_DISCORD_HAS_PERMISSION[0]})
      ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

      i = 0;
      client.mysql.querySql(`CREATE TABLE ${TABLES[10]} (
        ${COLUMNS_DISCORD_EXECUTE[i++]} SERIAL NOT NULL,
        ${COLUMNS_DISCORD_EXECUTE[i++]} BIGINT(20) UNSIGNED NOT NULL,
        ${COLUMNS_DISCORD_EXECUTE[i++]} varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${COLUMNS_DISCORD_EXECUTE[i++]} tinyint(4) NOT NULL,
        PRIMARY KEY (${COLUMNS_DISCORD_EXECUTE[0]}),
        UNIQUE KEY EXECUTE_UNIQUE (${COLUMNS_DISCORD_EXECUTE[1]}, ${COLUMNS_DISCORD_EXECUTE[2]})
      ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

      client.mysql.querySql(
        `ALTER TABLE ?? ADD FOREIGN KEY
          (${COLUMNS_DISCORD_JOIN[1]})
        REFERENCES 
          ${TABLES[0]}(${COLUMNS_DISCORD_GUILDS[1]});`,
        [TABLES[2]]
      );
      client.mysql.querySql(
        `ALTER TABLE ?? ADD FOREIGN KEY
      (${COLUMNS_DISCORD_JOIN[2]})
        REFERENCES 
          ${TABLES[1]}(${COLUMNS_DISCORD_USER_INFO[1]});`,
        [TABLES[2]]
      );
      client.mysql.querySql(
        `ALTER TABLE ?? ADD FOREIGN KEY
      (${COLUMNS_DISCORD_ROLE[3]})
        REFERENCES 
          ${TABLES[0]}(${COLUMNS_DISCORD_GUILDS[1]});`,
        [TABLES[3]]
      );
      client.mysql.querySql(
        `ALTER TABLE ?? ADD FOREIGN KEY
        (${COLUMNS_DISCORD_HAS_ROLE[1]})
          REFERENCES 
            ${TABLES[3]}(${COLUMNS_DISCORD_ROLE[1]});`,
        [TABLES[4]]
      );
      client.mysql.querySql(
        `ALTER TABLE ?? ADD FOREIGN KEY
      (${COLUMNS_DISCORD_HAS_ROLE[2]})
        REFERENCES 
          ${TABLES[1]}(${COLUMNS_DISCORD_USER_INFO[1]});`,
        [TABLES[4]]
      );
      client.mysql.querySql(
        `ALTER TABLE ?? ADD FOREIGN KEY
      (${COLUMNS_DISCORD_WARN[1]})
      REFERENCES 
        ${TABLES[1]}(${COLUMNS_DISCORD_USER_INFO[1]});`,
        [TABLES[5]]
      );
      client.mysql.querySql(
        `ALTER TABLE ?? ADD FOREIGN KEY
      (${COLUMNS_DISCORD_KICK[1]})
        REFERENCES 
          ${TABLES[1]}(${COLUMNS_DISCORD_USER_INFO[1]});`,
        [TABLES[6]]
      );
      client.mysql.querySql(
        `ALTER TABLE ?? ADD FOREIGN KEY
      (${COLUMNS_DISCORD_BAN[1]})
        REFERENCES 
          ${TABLES[1]}(${COLUMNS_DISCORD_USER_INFO[1]});`,
        [TABLES[7]]
      );
      client.mysql.querySql(
        `ALTER TABLE ?? ADD FOREIGN KEY
      (${COLUMNS_DISCORD_HAS_PERMISSION[1]})
        REFERENCES 
          ${TABLES[3]}(${COLUMNS_DISCORD_ROLE[1]});`,
        [TABLES[9]]
      );
      client.mysql.querySql(
        `ALTER TABLE ?? ADD FOREIGN KEY
      (${COLUMNS_DISCORD_HAS_PERMISSION[2]})
        REFERENCES 
          ${TABLES[8]}(${COLUMNS_DISCORD_COMMAND[0]});`,
        [TABLES[9]]
      );
      client.mysql.querySql(
        `ALTER TABLE ?? ADD FOREIGN KEY
      (${COLUMNS_DISCORD_BAN[2]})
      REFERENCES 
      ${TABLES[0]}(${COLUMNS_DISCORD_GUILDS[1]});`,
        [TABLES[7]]
      );
      client.mysql.querySql(
        `ALTER TABLE ?? ADD FOREIGN KEY
      (${COLUMNS_DISCORD_EXECUTE[1]})
      REFERENCES 
      ${TABLES[8]}(${COLUMNS_DISCORD_COMMAND[0]}) ON DELETE CASCADE ;`,
        [TABLES[10]]
      );
      client.mysql.querySql(
        `ALTER TABLE ?? ADD FOREIGN KEY
      (${COLUMNS_DISCORD_EXECUTE[2]})
      REFERENCES 
      ${TABLES[0]}(${COLUMNS_DISCORD_GUILDS[1]})`,
        [TABLES[10]]
      );
    }

    /* -------------INSERT TABLES-------------*/
    {
      client.guilds.cache.each(guild => {
        client.mysql.querySql("CALL insert_guild(?,?,?,?,?,?,?);", [
          guild.id,
          guild.name,
          guild.ownerID,
          guild.owner.user.username,
          guild.createdAt.toJSON().slice(0, 10),
          guild.iconURL({ format: "png" }),
          true
        ]);

        client.mysql.querySql(
          "call insert_command(?,?)",
          ["avatar", "show user avatar"]
        );
    
        client.mysql.querySql(
          "call insert_command(?,?)",
          ["bd-set", "set birhtday"]
        );
    
        client.mysql.querySql(
          "call insert_command(?,?)",
          ["clear-channel", "delete all the message from a channel"]
        );
    
        client.mysql.querySql(
          "call insert_command(?,?)",
          ["delete", "delete a number of message"]
        );
    
        client.mysql.querySql(
          "call insert_command(?,?)",
          ["sinfo", "show info from the current server"]
        );
    
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
        guild.members.cache.each(member => {
          client.mysql.querySql("CALL insert_member(?,?,?,?,?,?,?);", [
            member.user.id,
            member.user.username,
            member.user.discriminator,
            member.user.tag,
            member.user.avatarURL({ format: "png" }),
            member.user.bot,
            member.user.createdAt.toJSON().slice(0, 10)
          ]);
          client.mysql.querySql(
            " CALL insert_join_guild((SELECT guild_id from guild where guild_id = ?),(SELECT member_id from member where member_id = ?), ?, ?, ?, ?, ?)",
            [
              guild.id,
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
        guild.fetchBans().then(ban => {
          ban.each(baninfo => {
            client.mysql.querySql("CALL insert_member(?,?,?,?,?,?,?);", [
              baninfo.user.id,
              baninfo.user.username,
              baninfo.user.discriminator,
              baninfo.user.tag,
              baninfo.user.avatarURL({ format: "png" }),
              baninfo.user.bot,
              baninfo.user.createdAt.toJSON().slice(0, 10)
            ]);
            client.mysql.querySql(
              "CALL insert_join_guild((SELECT guild_id from guild where guild_id = ?),(SELECT member_id from member where member_id = ?), ?, ?, ?, ?, ?)",
              [guild.id, baninfo.user.id, null, null, false, true, 0]
            );
            client.mysql.querySql(
              "CALL insert_ban((SELECT member_id from member where member_id = ?),(SELECT guild_id from guild where guild_id = ?), ?, ?)",
              [
                baninfo.user.id,
                guild.id,
                baninfo.reason,
                null
              ]
            );
          });
        });
      });
    }
  } catch (e) {
    console.log("erreur : " + e);
  }

  // message.channel.send("la base de donnée à été crée et initalisée");

  setTimeout(function suprr() {
    message.channel.bulkDelete(2);
  }, 2000);
};

exports.help = {
  name: "client"
};
