module.exports = {
  alert: client => {
    client.mysql = require("../util/db.js");

    const date = new Date();

    setInterval(function msg() {
      console.log(date.toString());

      if (date.getHours() === 0 && date.getMinutes() === 1) {
        client.mysql
          .selectSql("SELECT discordId, birthday FROM userinfo")
          .then(str => {
            for (let i = 0; i < str.length; i++) {
              if (str[i].birthday) {
                const birthday = new Date(str[i].birthday);
                if (birthday.getDate() === date.getDate() && birthday.getMonth() === date.getMonth()) {
                  client.channels.fetch("700760331026301040").then(channel =>
                    channel.send(`c'est l'anniversaire de <@${str[i].discordId}>`));
                }
                console.log(birthday);
              }
            }
          });
      }
    }, 1800000);
  }
};
