const mysql = require("mysql");
const { HOST, USER, PASSWORD, DATABASE } = require("../config");
module.exports = {
  init: () => {
    const con = mysql.createConnection({
      host: HOST,
      user: USER,
      password: PASSWORD,
      database: DATABASE
    });
    
    con.connect(err => {
      if (err) throw err;
      console.log("connecté à la base de donnée");
    });
  }
};
