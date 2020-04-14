const { HOST, USER, PASSWORD, DATABASE } = require("../config.js");
const mysql = require("mysql");

const con = mysql.createConnection({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE
});

module.exports = {
  init: () => {
    con.connect(err => {
      if (err) throw err;
      console.log("connecté à la base de donnée");
    });
  },

  querySql: sql => {
    con.query(sql, function msg(err, result) {
      if (err) throw err;
      console.log(result);
    });
  },

  selectSql: () => {
    function getDiscordId(callback) {
      const sql = "SELECT discordID FROM participant WHERE id = 1";
      con.query(sql, function(err, result) {
        if (err) throw err;
        console.log(result[0].discordId);

        return callback(result[0].discordId);
      });
    }

    let donnee = "";

    getDiscordId(function(result) {
      donnee = result;
      console.log(donnee);
    });
  }
};
