const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  database: "main",
  password: "83528352"
});



module.exports = connection;
