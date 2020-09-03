const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "83528352"
});

connection.query("CREATE DATABASE IF NOT EXISTS main", function (err, result) {
  if (err) console.log(err);
  connection.query("USE main");
  connection.query("CREATE TABLE IF NOT EXISTS `parameters` (name CHAR(50), value TINYINT)", (err, results) => {
    console.log(results);
    if (results.warningStatus === 0) {
      connection.query("INSERT parameters(name, value)\n" +
        "VALUES ('temp_set_point', '0')");
    }
  });
});





module.exports = connection;

