const { COLUMNS_DISCORD_USER_INFO, TABLES } = require("../util/config");
module.exports = {
<<<<<<< HEAD
  alert: (client) => {
    client.mysql = require("../mysql/db.js");

    setInterval(function msg() {
      const date = new Date();
=======
  alert: client => {
    client.mysql = require("../util/db.js");

    const date = new Date();

    setInterval(function msg() {
>>>>>>> 97d2f4476b3c016999f8a6f22915e71876aa6c9d
      console.log(date.toString());

      if (date.getHours() === 0) {
        client.mysql
          .selectSql(
            `SELECT ${COLUMNS_DISCORD_USER_INFO[1]},
<<<<<<< HEAD
            ${COLUMNS_DISCORD_USER_INFO[5]} FROM ${TABLES[1]}`
          )
          .then((str) => {
            for (let i = 0; i < str.length; i++) {
              if (str[i].birthday) {
                const birthday = new Date(str[i].birthday);
                if (
                  birthday.getDate() === date.getDate() &&
                  birthday.getMonth() === date.getMonth()
                ) {
                  client.channels
                    .fetch("700760331026301040")
                    .then((channel) =>
                      channel.send(
                        `c'est l'anniversaire de <@${str[i].discordId}>`
                      )
                    );
                }
                console.log(date);
=======
            ${COLUMNS_DISCORD_USER_INFO[6]} FROM ${TABLES[0]}`
          )
          .then(str => {
            for (let i = 0; i < str.length; i++) {
              if (str[i].birthday) {
                const birthday = new Date(str[i].birthday);
                if (birthday.getDate() === date.getDate() && birthday.getMonth() === date.getMonth()) {
                  client.channels.fetch("700760331026301040").then(channel =>
                    channel.send(`c'est l'anniversaire de <@${str[i].discordId}>`));
                }
                console.log(birthday);
>>>>>>> 97d2f4476b3c016999f8a6f22915e71876aa6c9d
              }
            }
          });
      }
    }, 1800000);
<<<<<<< HEAD
  },
=======
  }
>>>>>>> 97d2f4476b3c016999f8a6f22915e71876aa6c9d
};
