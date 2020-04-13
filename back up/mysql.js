
module.exports = {
  init: con => {
    con.connect(err => {
      if (err) throw err;
      console.log("connecté à la base de donnée");
    });
  }
};
