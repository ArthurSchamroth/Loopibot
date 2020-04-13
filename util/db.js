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
    con.query(sql, function(err, result) {
      if (err) throw err;
      console.log(result);
    });
  }
};
