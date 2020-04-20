const {
  TABLES, COLUMNS_DISCORD_USER_INFO,
  COLUMNS_DISCORD_GUILDS,
  COLUMNS_DISCORD_JOIN,
  COLUMNS_DISCORD_ROLE,
  COLUMNS_DISCORD_HAS_ROLE
} = require("../util/config");

exports.run = (client, message) => {
  client.mysql = require("../util/db.js");
  client.methods = require("../util/methods.js");

  let i = 0;
  try {
    /* -------------DROP TABLES-------------*/
    { 
      client.mysql.querySql("SET FOREIGN_KEY_CHECKS = 0;");
      client.mysql.querySql(`DROP TABLE IF EXISTS ${TABLES[0]} CASCADE`);
      client.mysql.querySql(`DROP TABLE IF EXISTS ${TABLES[1]} CASCADE`); 
      client.mysql.querySql("DROP TABLE IF EXISTS ?? CASCADE", TABLES[2]);
      client.mysql.querySql(`DROP TABLE IF EXISTS ${TABLES[3]} CASCADE`);
      client.mysql.querySql(`DROP TABLE IF EXISTS ${TABLES[4]} CASCADE`);
      client.mysql.querySql("SET FOREIGN_KEY_CHECKS = 1;");
    }

    /* -------------CREATE TABLES-------------*/
    {
      client.mysql.querySql(`CREATE TABLE ${TABLES[0]} (
        ${COLUMNS_DISCORD_GUILDS[i++]}  SERIAL NOT NULL,
        ${COLUMNS_DISCORD_GUILDS[i++]} varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${COLUMNS_DISCORD_GUILDS[i++]} varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${COLUMNS_DISCORD_GUILDS[i++]} varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${COLUMNS_DISCORD_GUILDS[i++]} varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${COLUMNS_DISCORD_GUILDS[i++]} date NOT NULL,
        PRIMARY KEY (${COLUMNS_DISCORD_GUILDS[0]}),
        UNIQUE KEY ${COLUMNS_DISCORD_GUILDS[1]} (${COLUMNS_DISCORD_GUILDS[1]})
      ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

      i = 0;
      client.mysql.querySql(`CREATE TABLE ${TABLES[1]} (
        ${COLUMNS_DISCORD_USER_INFO[i++]}  SERIAL NOT NULL,
        ${COLUMNS_DISCORD_USER_INFO[i++]} varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${COLUMNS_DISCORD_USER_INFO[i++]} varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${COLUMNS_DISCORD_USER_INFO[i++]} varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${COLUMNS_DISCORD_USER_INFO[i++]} varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${COLUMNS_DISCORD_USER_INFO[i++]} varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
        ${COLUMNS_DISCORD_USER_INFO[i++]} date DEFAULT NULL,
        ${COLUMNS_DISCORD_USER_INFO[i++]} varchar(255),
        ${COLUMNS_DISCORD_USER_INFO[i++]} tinyint(4) NOT NULL,
        ${COLUMNS_DISCORD_USER_INFO[i++]} DATE NOT NULL,
        ${COLUMNS_DISCORD_USER_INFO[i++]} date NOT NULL,
        ${COLUMNS_DISCORD_USER_INFO[i++]} tinyint(4) NOT NULL,
        ${COLUMNS_DISCORD_USER_INFO[i++]} tinyint(4) NOT NULL,
        PRIMARY KEY (${COLUMNS_DISCORD_USER_INFO[0]}),
        UNIQUE KEY ${COLUMNS_DISCORD_USER_INFO[1]}_UNIQUE (${COLUMNS_DISCORD_USER_INFO[1]})
      ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

      i = 0;
      client.mysql.querySql(`CREATE TABLE ?? (
        ${COLUMNS_DISCORD_JOIN[i++]}  SERIAL NOT NULL,
        ${COLUMNS_DISCORD_JOIN[i++]} varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${COLUMNS_DISCORD_JOIN[i++]} varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        PRIMARY KEY (${COLUMNS_DISCORD_JOIN[0]})
      ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`, [TABLES[2]]);

      i = 0;
      client.mysql.querySql(`CREATE TABLE ${TABLES[3]} (
        ${COLUMNS_DISCORD_ROLE[i++]}  SERIAL NOT NULL,
        ${COLUMNS_DISCORD_ROLE[i++]} varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${COLUMNS_DISCORD_ROLE[i++]} varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${COLUMNS_DISCORD_ROLE[i++]} varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${COLUMNS_DISCORD_ROLE[i++]} varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${COLUMNS_DISCORD_ROLE[i++]} integer(255) NOT NULL,
        ${COLUMNS_DISCORD_ROLE[i++]} tinyint(4) NOT NULL,
        PRIMARY KEY (${COLUMNS_DISCORD_ROLE[0]}),
        UNIQUE KEY ${COLUMNS_DISCORD_ROLE[1]} (${COLUMNS_DISCORD_ROLE[1]})
      ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

      i = 0;
      client.mysql.querySql(`CREATE TABLE ${TABLES[4]} (
        ${COLUMNS_DISCORD_HAS_ROLE[i++]}  SERIAL NOT NULL,
        ${COLUMNS_DISCORD_HAS_ROLE[i++]} varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        ${COLUMNS_DISCORD_HAS_ROLE[i++]} varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
        PRIMARY KEY (${COLUMNS_DISCORD_HAS_ROLE[0]})
      ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);


      client.mysql.querySql(`ALTER TABLE ?? ADD FOREIGN KEY
          (${COLUMNS_DISCORD_JOIN[1]})
        REFERENCES 
          ${TABLES[0]}(${COLUMNS_DISCORD_GUILDS[1]});`, [TABLES[2]]);
      client.mysql.querySql(`ALTER TABLE ?? ADD FOREIGN KEY
      (${COLUMNS_DISCORD_JOIN[2]})
        REFERENCES 
          ${TABLES[1]}(${COLUMNS_DISCORD_USER_INFO[1]});`, [TABLES[2]]);
      client.mysql.querySql(`ALTER TABLE ?? ADD FOREIGN KEY
      (${COLUMNS_DISCORD_ROLE[4]})
        REFERENCES 
          ${TABLES[0]}(${COLUMNS_DISCORD_GUILDS[1]});`, [TABLES[3]]);
      client.mysql.querySql(`ALTER TABLE ?? ADD FOREIGN KEY
        (${COLUMNS_DISCORD_HAS_ROLE[1]})
          REFERENCES 
            ${TABLES[3]}(${COLUMNS_DISCORD_ROLE[1]});`, [TABLES[4]]);
      client.mysql.querySql(`ALTER TABLE ?? ADD FOREIGN KEY
      (${COLUMNS_DISCORD_HAS_ROLE[2]})
        REFERENCES 
          ${TABLES[1]}(${COLUMNS_DISCORD_USER_INFO[1]});`, [TABLES[4]]);
    }

    /* -------------INSERT TABLES-------------*/
    {
      client.guilds.cache.each(guild => {
        client.mysql.querySql(
          `INSERT IGNORE INTO ${TABLES[0]}(
            ${COLUMNS_DISCORD_GUILDS[1]},
            ${COLUMNS_DISCORD_GUILDS[2]},
            ${COLUMNS_DISCORD_GUILDS[3]},
            ${COLUMNS_DISCORD_GUILDS[4]},
            ${COLUMNS_DISCORD_GUILDS[5]}
          )
          VALUES( ?, ?, ?, ?, ?)`,
          [
            guild.id,
            guild.name,
            guild.ownerID,
            guild.owner.user.username,
            guild.createdAt.toJSON().slice(0, 10)
          ]
        );
        guild.members.cache.each(member => {
          client.mysql.querySql(
            `INSERT IGNORE INTO ${TABLES[1]}(
              ${COLUMNS_DISCORD_USER_INFO[1]},
              ${COLUMNS_DISCORD_USER_INFO[2]},
              ${COLUMNS_DISCORD_USER_INFO[3]},
              ${COLUMNS_DISCORD_USER_INFO[4]},
              ${COLUMNS_DISCORD_USER_INFO[5]},
              ${COLUMNS_DISCORD_USER_INFO[7]},
              ${COLUMNS_DISCORD_USER_INFO[8]},
              ${COLUMNS_DISCORD_USER_INFO[9]},
              ${COLUMNS_DISCORD_USER_INFO[10]},
              ${COLUMNS_DISCORD_USER_INFO[11]},
              ${COLUMNS_DISCORD_USER_INFO[12]}
            )
            VALUES( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              member.user.id,
              member.user.username,
              member.user.discriminator,
              member.user.tag,
              member.nickname,
              member.user.avatarURL({ format: "png" }),
              member.user.bot,
              member.user.createdAt.toJSON().slice(0, 10),
              member.joinedAt.toJSON().slice(0, 10),
              true,
              false
            ]
          );
          client.mysql.querySql(
            `INSERT IGNORE INTO ??(
              ${COLUMNS_DISCORD_JOIN[1]},
              ${COLUMNS_DISCORD_JOIN[2]}
            )
            VALUES((SELECT guild_id from guild where guild_id = '${guild.id}'),(SELECT member_id from member where member_id = '${member.user.id}'))`,
            [
              TABLES[2]
            ]
          );
          guild.roles.cache.each(role => {
            client.mysql.querySql(
              `INSERT IGNORE INTO ${TABLES[3]}(
                ${COLUMNS_DISCORD_ROLE[1]},
                ${COLUMNS_DISCORD_ROLE[2]},
                ${COLUMNS_DISCORD_ROLE[3]},
                ${COLUMNS_DISCORD_ROLE[4]},
                ${COLUMNS_DISCORD_ROLE[5]},
                ${COLUMNS_DISCORD_ROLE[6]}
              )
              VALUES( ?, ?, (select guild_id from guild where guild_id = '${guild.id}'), ?, ?, ?)`,
              [
                role.id,
                role.name,
                guild.id,
                role.color,
                role.position,
                role.hoist
              ]
            );
            client.mysql.querySql(
              `INSERT IGNORE INTO ${TABLES[4]}(
                ${COLUMNS_DISCORD_HAS_ROLE[1]},
                ${COLUMNS_DISCORD_HAS_ROLE[2]}
              )
              VALUES((select role_id from role where role_id = '${role.id}'),(select member_id from member where member_id = '${member.user.id}'))`
            );
          });
        }); 
      }); 
    }
  }
  catch (e) {
    console.log("erreur : " + e);
  }

  message.channel.send("la base de donnée à été crée et initalisée");

  setTimeout(function suprr() {
    message.channel.bulkDelete(2);
  }, 2000);
};

exports.help = {
  name: "client"
};
