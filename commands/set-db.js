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
  COLUMNS_DISCORD_EXECUTE,
  COLUMNS_DISCORD_TEXT_CHANNEL,
  COLUMNS_DISCORD_VOICE_CHANNEL,
  COLUMNS_DISCORD_CATEGORY_CHANNEL,
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
        ${
          COLUMNS_DISCORD_GUILDS[i++]
        } varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${
          COLUMNS_DISCORD_GUILDS[i++]
        } varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${COLUMNS_DISCORD_GUILDS[i++]} varchar(45) COLLATE utf8mb4_unicode_ci,
        ${
          COLUMNS_DISCORD_GUILDS[i++]
        } varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${COLUMNS_DISCORD_GUILDS[i++]} date NOT NULL,
        ${
          COLUMNS_DISCORD_GUILDS[i++]
        } varchar(255) COLLATE utf8mb4_unicode_ci NULL,
        ${COLUMNS_DISCORD_GUILDS[i++]} tinyint(4) NOT NULL,
        PRIMARY KEY (${COLUMNS_DISCORD_GUILDS[0]}),
        UNIQUE KEY ${COLUMNS_DISCORD_GUILDS[1]} (${COLUMNS_DISCORD_GUILDS[1]})
      ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

      i = 0;
      client.mysql.querySql(`CREATE TABLE ${TABLES[1]} (
        ${COLUMNS_DISCORD_USER_INFO[i++]} SERIAL,
        ${
          COLUMNS_DISCORD_USER_INFO[i++]
        } varchar(45) COLLATE utf8mb4_unicode_ci,
        ${
          COLUMNS_DISCORD_USER_INFO[i++]
        } varchar(45) COLLATE utf8mb4_unicode_ci,
        ${
          COLUMNS_DISCORD_USER_INFO[i++]
        } varchar(45) COLLATE utf8mb4_unicode_ci,
        ${
          COLUMNS_DISCORD_USER_INFO[i++]
        } varchar(45) COLLATE utf8mb4_unicode_ci,
        ${COLUMNS_DISCORD_USER_INFO[i++]} date DEFAULT NULL,
        ${COLUMNS_DISCORD_USER_INFO[i++]} varchar(255),
        ${COLUMNS_DISCORD_USER_INFO[i++]} tinyint(4),
        ${COLUMNS_DISCORD_USER_INFO[i++]} DATE,
        PRIMARY KEY (${COLUMNS_DISCORD_USER_INFO[0]}),
        UNIQUE KEY ${COLUMNS_DISCORD_USER_INFO[1]}_UNIQUE (${
        COLUMNS_DISCORD_USER_INFO[1]
      })
      ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

      i = 0;
      client.mysql.querySql(
        `CREATE TABLE ?? (
        ${COLUMNS_DISCORD_JOIN[i++]} SERIAL NOT NULL,
        ${
          COLUMNS_DISCORD_JOIN[i++]
        } varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${
          COLUMNS_DISCORD_JOIN[i++]
        } varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${
          COLUMNS_DISCORD_JOIN[i++]
        } varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
        ${COLUMNS_DISCORD_JOIN[i++]} date NOT NULL,
        ${COLUMNS_DISCORD_JOIN[i++]} tinyint(4) NOT NULL,
        ${COLUMNS_DISCORD_JOIN[i++]} tinyint(4) NOT NULL,
        ${COLUMNS_DISCORD_JOIN[i++]} integer(10) NOT NULL,
        ${COLUMNS_DISCORD_JOIN[i++]} integer(15) NULL,
        ${COLUMNS_DISCORD_JOIN[i++]} tinyint(4) NULL,
        PRIMARY KEY (${COLUMNS_DISCORD_JOIN[0]}),
        UNIQUE KEY ${COLUMNS_DISCORD_JOIN[1]} (${COLUMNS_DISCORD_JOIN[1]}, ${
          COLUMNS_DISCORD_JOIN[2]
        })
      ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
        [TABLES[2]]
      );

      i = 0;
      client.mysql.querySql(`CREATE TABLE ${TABLES[3]} (
        ${COLUMNS_DISCORD_ROLE[i++]} SERIAL NOT NULL,
        ${
          COLUMNS_DISCORD_ROLE[i++]
        } varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${
          COLUMNS_DISCORD_ROLE[i++]
        } varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${
          COLUMNS_DISCORD_ROLE[i++]
        } varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${
          COLUMNS_DISCORD_ROLE[i++]
        } varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${COLUMNS_DISCORD_ROLE[i++]} integer(255) NOT NULL,
        number bigint(10) not null,
        PRIMARY KEY (${COLUMNS_DISCORD_ROLE[0]}),
        UNIQUE KEY ${COLUMNS_DISCORD_ROLE[1]} (${COLUMNS_DISCORD_ROLE[1]})
      ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

      i = 0;
      client.mysql.querySql(`CREATE TABLE ${TABLES[4]} (
        ${COLUMNS_DISCORD_HAS_ROLE[i++]} SERIAL NOT NULL,
        ${
          COLUMNS_DISCORD_HAS_ROLE[i++]
        } varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${
          COLUMNS_DISCORD_HAS_ROLE[i++]
        } varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        PRIMARY KEY (${COLUMNS_DISCORD_HAS_ROLE[0]})
      ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

      i = 0;
      client.mysql.querySql(`CREATE TABLE ${TABLES[5]} (
        ${COLUMNS_DISCORD_WARN[i++]} SERIAL NOT NULL,
        ${
          COLUMNS_DISCORD_WARN[i++]
        } varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${
          COLUMNS_DISCORD_WARN[i++]
        } varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${
          COLUMNS_DISCORD_WARN[i++]
        } TEXT(520) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
        PRIMARY KEY (${COLUMNS_DISCORD_WARN[0]})
      ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

      i = 0;
      client.mysql.querySql(`CREATE TABLE ${TABLES[6]} (
        ${COLUMNS_DISCORD_KICK[i++]} SERIAL NOT NULL,
        ${
          COLUMNS_DISCORD_KICK[i++]
        } varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${
          COLUMNS_DISCORD_KICK[i++]
        } varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${
          COLUMNS_DISCORD_KICK[i++]
        } TEXT(520) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
        PRIMARY KEY (${COLUMNS_DISCORD_KICK[0]})
      ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

      i = 0;
      client.mysql.querySql(`CREATE TABLE ${TABLES[7]} (
        ${COLUMNS_DISCORD_BAN[i++]} SERIAL NOT NULL,
        ${
          COLUMNS_DISCORD_BAN[i++]
        } varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${
          COLUMNS_DISCORD_BAN[i++]
        } varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${
          COLUMNS_DISCORD_BAN[i++]
        } TEXT(520) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
        ${COLUMNS_DISCORD_BAN[i++]} date DEFAULT NULL,
        PRIMARY KEY (${COLUMNS_DISCORD_BAN[0]}),
        UNIQUE KEY EXECUTE_UNIQUE (${COLUMNS_DISCORD_BAN[1]}, ${
        COLUMNS_DISCORD_BAN[2]
      })
      ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

      i = 0;
      client.mysql.querySql(`CREATE TABLE ${TABLES[8]} (
        ${COLUMNS_DISCORD_COMMAND[i++]} SERIAL NOT NULL,
        ${
          COLUMNS_DISCORD_COMMAND[i++]
        } varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${
          COLUMNS_DISCORD_COMMAND[i++]
        } varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
        custom tinyint(4) not null,
        PRIMARY KEY (${COLUMNS_DISCORD_COMMAND[0]}),
        UNIQUE KEY ${COLUMNS_DISCORD_COMMAND[1]}_UNIQUE (${
        COLUMNS_DISCORD_COMMAND[1]
      })
      ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

      client.mysql.querySql(`Create table response(
        response_id serial not null,
        response text(2000) not null,
        command_id bigint(20) UNSIGNED,
        Primary Key (response_id)
      )`);
      i = 0;
      client.mysql.querySql(`CREATE TABLE ${TABLES[9]} (
        ${COLUMNS_DISCORD_HAS_PERMISSION[i++]} SERIAL NOT NULL,
        ${
          COLUMNS_DISCORD_HAS_PERMISSION[i++]
        } varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${COLUMNS_DISCORD_HAS_PERMISSION[i++]} BIGINT(20) UNSIGNED NOT NULL,
        PRIMARY KEY (${COLUMNS_DISCORD_HAS_PERMISSION[0]})
      ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

      i = 0;
      client.mysql.querySql(`CREATE TABLE ${TABLES[10]} (
        ${COLUMNS_DISCORD_EXECUTE[i++]} SERIAL NOT NULL,
        ${COLUMNS_DISCORD_EXECUTE[i++]} BIGINT(20) UNSIGNED NOT NULL,
        ${
          COLUMNS_DISCORD_EXECUTE[i++]
        } varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${COLUMNS_DISCORD_EXECUTE[i++]} tinyint(4) NOT NULL,
        PRIMARY KEY (${COLUMNS_DISCORD_EXECUTE[0]}),
        UNIQUE KEY EXECUTE_UNIQUE (${COLUMNS_DISCORD_EXECUTE[1]}, ${
        COLUMNS_DISCORD_EXECUTE[2]
      })
      ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

      i = 0;
      client.mysql.querySql(`CREATE TABLE ${TABLES[11]}(
        ${COLUMNS_DISCORD_TEXT_CHANNEL[i++]} SERIAL NOT NULL,
        ${
          COLUMNS_DISCORD_TEXT_CHANNEL[i++]
        } varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${
          COLUMNS_DISCORD_TEXT_CHANNEL[i++]
        } varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${COLUMNS_DISCORD_TEXT_CHANNEL[i++]} integer(10) NOT NULL,
        ${
          COLUMNS_DISCORD_TEXT_CHANNEL[i++]
        } varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${COLUMNS_DISCORD_TEXT_CHANNEL[i++]} tinyint(4) NOT NULL,
        ${
          COLUMNS_DISCORD_TEXT_CHANNEL[i++]
        } varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        PRIMARY KEY (${COLUMNS_DISCORD_TEXT_CHANNEL[0]}),
        UNIQUE KEY ${COLUMNS_DISCORD_TEXT_CHANNEL[1]} (${
        COLUMNS_DISCORD_TEXT_CHANNEL[1]
      })
      )ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

      i = 0;
      client.mysql.querySql(`CREATE TABLE ${TABLES[12]}(
        ${COLUMNS_DISCORD_CATEGORY_CHANNEL[i++]} SERIAL NOT NULL,
        ${
          COLUMNS_DISCORD_CATEGORY_CHANNEL[i++]
        } varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${
          COLUMNS_DISCORD_CATEGORY_CHANNEL[i++]
        } varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${COLUMNS_DISCORD_CATEGORY_CHANNEL[i++]} integer(10) NOT NULL,
        ${
          COLUMNS_DISCORD_CATEGORY_CHANNEL[i++]
        } varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        PRIMARY KEY (${COLUMNS_DISCORD_CATEGORY_CHANNEL[0]}),
        UNIQUE KEY ${COLUMNS_DISCORD_CATEGORY_CHANNEL[1]} (${
        COLUMNS_DISCORD_CATEGORY_CHANNEL[1]
      })
      )ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);
      i = 0;
      client.mysql.querySql(`CREATE TABLE ${TABLES[13]}(
        ${COLUMNS_DISCORD_VOICE_CHANNEL[i++]} SERIAL NOT NULL,
        ${
          COLUMNS_DISCORD_VOICE_CHANNEL[i++]
        } varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${
          COLUMNS_DISCORD_VOICE_CHANNEL[i++]
        } varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${COLUMNS_DISCORD_VOICE_CHANNEL[i++]} integer(10) NOT NULL,
        ${
          COLUMNS_DISCORD_VOICE_CHANNEL[i++]
        } varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${
          COLUMNS_DISCORD_VOICE_CHANNEL[i++]
        } varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        PRIMARY KEY (${COLUMNS_DISCORD_VOICE_CHANNEL[0]}),
        UNIQUE KEY ${COLUMNS_DISCORD_VOICE_CHANNEL[1]} (${
        COLUMNS_DISCORD_VOICE_CHANNEL[1]
      })
      )ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

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
            ${TABLES[3]}(${COLUMNS_DISCORD_ROLE[1]}) ON DELETE CASCADE;`,
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
          ${TABLES[8]}(${COLUMNS_DISCORD_COMMAND[0]}) ON DELETE CASCADE;`,
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
      client.mysql.querySql(
        `ALTER TABLE ?? ADD FOREIGN KEY
      (${COLUMNS_DISCORD_TEXT_CHANNEL[4]})
      REFERENCES 
      ${TABLES[0]}(${COLUMNS_DISCORD_GUILDS[1]})`,
        [TABLES[11]]
      );
      client.mysql.querySql(
        `ALTER TABLE ?? ADD FOREIGN KEY
      (${COLUMNS_DISCORD_CATEGORY_CHANNEL[4]})
      REFERENCES 
      ${TABLES[0]}(${COLUMNS_DISCORD_GUILDS[1]})`,
        [TABLES[12]]
      );
      client.mysql.querySql(
        `ALTER TABLE ?? ADD FOREIGN KEY
      (${COLUMNS_DISCORD_TEXT_CHANNEL[6]})
      REFERENCES 
      ${TABLES[12]}(${COLUMNS_DISCORD_CATEGORY_CHANNEL[1]})`,
        [TABLES[11]]
      );
      client.mysql.querySql(
        `ALTER TABLE ?? ADD FOREIGN KEY
      (${COLUMNS_DISCORD_VOICE_CHANNEL[5]})
      REFERENCES 
      ${TABLES[12]}(${COLUMNS_DISCORD_CATEGORY_CHANNEL[1]})`,
        [TABLES[11]]
      );

      client.mysql.querySql(
        `ALTER TABLE ?? ADD FOREIGN KEY
      (${COLUMNS_DISCORD_VOICE_CHANNEL[4]})
      REFERENCES 
      ${TABLES[0]}(${COLUMNS_DISCORD_GUILDS[1]})`,
        [TABLES[11]]
      );
      client.mysql.querySql(
        `Alter table response add foreign key
        (command_id)
        references
        command(command_id) ON DELETE CASCADE `
      );
    }

    client.mysql.querySql(
      "create or replace procedure insert_guild(in guild_id varchar(45), in name varchar(255), in owner_id varchar(45), in owner_username varchar(45), in guild_creation date, in avatar varchar(255), in available tinyint(4)) begin insert ignore into guild(guild_id,name,owner_id,owner_username,guild_creation,avatar,available) values(guild_id,name,owner_id,owner_username,guild_creation,avatar,available); end;"
    );
    client.mysql.querySql(
      "create or replace procedure insert_command(in name varchar(255), in description varchar(255), in custom tinyint(4)) begin insert ignore into command(name,description, custom) values(name,description, custom); end;"
    );
    client.mysql.querySql(
      "create or replace procedure insert_execute(in command_id bigint(20), in guild_id varchar(45), in enabled tinyint(4)) begin insert ignore into execute(command_id,guild_id, enabled) values(command_id,guild_id, enabled); end"
    );
    client.mysql.querySql(
      "create or replace procedure insert_member(in member_id varchar(45), in username varchar(45), in discriminator varchar(45),in tag varchar(45), in avatar varchar(255), in bot tinyint(4), account_creation date) begin insert ignore into member(member_id,username, discriminator, tag, avatar, bot, account_creation) values(member_id,username,discriminator, tag, avatar, bot, account_creation); end"
    );
    client.mysql.querySql(
      "create or replace procedure insert_join_guild(in guild_id varchar(45),in member_id varchar(45), in nickname varchar(45), in account_join date, in available tinyint(4), in ban tinyint(4), in xp integer(10), in permissions integer(15), in admin tinyint(4)) begin insert ignore into join_guild(member_id, guild_id,nickname,account_join ,available,ban,xp,permissions, admin) values(member_id, guild_id,nickname,account_join ,available,ban,xp,permissions,admin); end"
    );
    client.mysql.querySql(
      "create or replace procedure insert_role(in role_id varchar(45),in name varchar(255), in guild_id varchar(45), in color varchar(20), in position integer(255), in number bigint(10)) begin insert ignore into role(role_id, name, guild_id,color,position, number) values(role_id, name, guild_id,color, position, number); end"
    );
    client.mysql.querySql(
      "create or replace procedure insert_has_role(in role_id varchar(45), in member_id varchar(45)) begin insert ignore into has_role(role_id, member_id) values(role_id, member_id); end"
    );
    client.mysql.querySql(
      "create or replace procedure insert_ban(in member_id varchar(45),in guild_id varchar(45),in reason text, in ban_date date) begin insert ignore into ban(member_id,guild_id,reason,ban_date) values(member_id,guild_id,reason,ban_date); end"
    );
    client.mysql.querySql(
      "create or replace procedure insert_category(in category_id varchar(45), in name varchar(45), in position integer(10), in guild_id varchar(45)) begin insert ignore into category_channel(category_id,name,position,guild_id) values(category_id, name, position, guild_id); end"
    );
    client.mysql.querySql(
      "create or replace procedure insert_channel(in channel_id varchar(45), in name varchar(45), in position integer(10), in guild_id varchar(45), in nsfw tinyint(4), in category_id varchar(45)) begin insert ignore into text_channel(channel_id,name,position,guild_id,nsfw, category_id) values(channel_id, name, position, guild_id, nsfw, category_id); end"
    );
    client.mysql.querySql(
      "create or replace procedure insert_voice(in voice_id varchar(45), in name varchar(45), in position integer(10), in guild_id varchar(45), in category_id varchar(45)) begin insert ignore into voice_channel(voice_id,name,position,guild_id, category_id) values(voice_id, name, position, guild_id, category_id); end"
    );
    /* -------------INSERT TABLES-------------*/
    {
      client.guilds.cache.each((guild) => {
        try {
          client.mysql.querySql("CALL insert_guild(?,?,?,?,?,?,?);", [
            guild.id,
            guild.name,
            guild.ownerID,
            guild.owner.user.id,
            guild.createdAt.toJSON().slice(0, 10),
            guild.iconURL({ format: "png" }),
            true,
          ]);
          guild.channels.cache.each((channel) => {
            if (channel.type == "category") {
              client.mysql.querySql("call insert_category(?,?,?,?);", [
                channel.id,
                channel.name,
                channel.position,
                guild.id,
              ]);
            }
            if (channel.type == "text") {
              client.mysql.querySql("call insert_channel(?,?,?,?,?,?);", [
                channel.id,
                channel.name,
                channel.position,
                guild.id,
                channel.nsfw,
                channel.parentID,
              ]);
            }
            if (channel.type == "voice") {
              client.mysql.querySql("call insert_voice(?,?,?,?,?);", [
                channel.id,
                channel.name,
                channel.position,
                guild.id,
                channel.parentID,
              ]);
            }
          });

          client.mysql.querySql("call insert_command(?,?,?)", [
            "avatar",
            "show user avatar",
            false
          ]);
          client.mysql.querySql("call insert_command(?,?,?)", [
            "bd-set",
            "set birhtday",
            false
          ]);

          client.mysql.querySql("call insert_command(?,?,?)", [
            "clear-channel",
            "delete all the message from a channel",
            false
          ]);
          client.mysql.querySql("call insert_command(?,?,?)", [
            "delete",
            "delete a number of message",
            false
          ]);

          client.mysql.querySql("call insert_command(?,?,?)", [
            "sinfo",
            "show info from the current server",
            false
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
              try {
                client.mysql.querySql(
                  "call insert_role( ?, ?, (select guild_id from guild where guild_id = ?), ?, ?, ?)",
                  [
                    role.id,
                    role.name,
                    guild.id,
                    role.color,
                    role.position,
                    role.members.size,
                  ]
                );
              } catch (error) {
                console.log(error);
              }
              // if (member.roles.cache.has(role.id)) {
              //   client.mysql.querySql(
              //     "call insert_has_role((select role_id from role where role_id = ?),(select member_id from member where member_id = ?))",
              //     [role.id, member.user.id]
              //   );
              // }
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
                [
                  guild.id,
                  baninfo.user.id,
                  null,
                  null,
                  false,
                  true,
                  0,
                  null,
                  false,
                ]
              );
              client.mysql.querySql(
                "CALL insert_ban((SELECT member_id from member where member_id = ?),(SELECT guild_id from guild where guild_id = ?), ?, ?)",
                [baninfo.user.id, guild.id, baninfo.reason, null]
              );
            });
          });
        } catch (error) {
          console.log(error);
        }
      });
    }
  } catch (e) {
    console.log("erreur : " + e);
  }

  // message.channel.send("la base de donnée à été crée et initalisée");

  setTimeout(function suprr() {
    message.channel.bulkDelete(1);
  }, 2000);
};

exports.help = {
  name: "client",
};
