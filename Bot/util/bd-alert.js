const { COLUMNS_DISCORD_USER_INFO, TABLES } = require("../util/config");
module.exports = {
  alert: client => {
    client.mysql = require("../mysql/db.js");


    setInterval(function msg() {
      const date = new Date();
      console.log(date.toString());

      if (date.getHours() === 0) {
        client.mysql
          .selectSql(
            `SELECT ${COLUMNS_DISCORD_USER_INFO[1]},
            ${COLUMNS_DISCORD_USER_INFO[5]} FROM ${TABLES[1]}`
          )
          .then(str => {
            for (let i = 0; i < str.length; i++) {
              if (str[i].birthday) {
                const birthday = new Date(str[i].birthday);
                if (birthday.getDate() === date.getDate() && birthday.getMonth() === date.getMonth()) {
                  client.channels.fetch("700760331026301040").then(channel =>
                    channel.send(`c'est l'anniversaire de <@${str[i].discordId}>`));
                }
                console.log(date);
              }
            }
          });
      }
    }, 1800000);
  }
};
