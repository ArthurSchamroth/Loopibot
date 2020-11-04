module.exports = (client, role) => {
  client.mysql = require("../mysql/db.js");
    
  client.mysql.querySql("delete from role where role_id = ?", [
    role.id
  ]);
};
