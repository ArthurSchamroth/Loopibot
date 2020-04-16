const { HOST, USER, PASSWORD, DATABASE } = require("./config.js");
const mysql = require("mysql");

const con = mysql.createConnection({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
  charset: "utf8mb4"
});

module.exports = {
  init: () => {
    con.connect(err => {
      if (err) throw err;
      console.log("connecté à la base de donnée");
    });
  },

  selectSql: sql => new Promise((resolve, reject) => {
    con.query(sql, function msg(err, result) {
      if (err) reject(err);
      resolve(result);
    });
  }),

  querySql: sql => {
    con.query(sql, function msg(err) {
      if (err) {
        console.log("A wild error appeared!", err);
        process.exit(1);
      }
    });
  }
};
