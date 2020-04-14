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
    con.connect((err) => {
      if (err) throw err;
      console.log("connecté à la base de donnée");
    });
  },

  querySql: (sql) => new Promise((resolve, reject) => {
    con.query(sql, function msg(err, result) {
      if (err) reject(err);
      resolve(result);
    });
  })
};
