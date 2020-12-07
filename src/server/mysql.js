const mysql = require("mysql2/promise");

module.exports = async function mysql_create_connect () {

    const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "83528352",
    //timezone: 'utc'
  });
    await connection.query("CREATE DATABASE IF NOT EXISTS main");
    await connection.query("USE main");

    // await connection.query(`CREATE TABLE IF NOT EXISTS parameters
    // (name CHAR(50), value TINYINT)`).then(
    // (result) => {if (result[0].warningStatus === 0) {
    //   connection.query("INSERT parameters(name, value) VALUES ('temp_set_point', '0')");
    // }});

    await connection.query(`CREATE TABLE IF NOT EXISTS parameters 
    (heat_manual_sp TINYINT, vds_manual_sp TINYINT, roast_mode_auto BOOL, step TINYINT)`).then(
    (result) => {if (result[0].warningStatus === 0) {
      connection.query(`INSERT parameters(heat_manual_sp, vds_manual_sp, roast_mode_auto, step) 
      VALUES (0, 0, TRUE, 60)`);
    }});

    await connection.query(`CREATE TABLE IF NOT EXISTS saved_graphs (
      id INT PRIMARY KEY AUTO_INCREMENT, 
      name CHAR(20), 
      time SMALLINT, 
      date DATETIME, 
      beans JSON, 
      air JSON, 
      ror JSON, 
      arr_done JSON 
      )`);

    await connection.query("CREATE TABLE IF NOT EXISTS `recipes` (" +
      "id INT PRIMARY KEY AUTO_INCREMENT," +
      "name CHAR(20)," +
      "recipe_data JSON" +
      ")").then(
      (result) => {if (result[0].warningStatus === 0) {
        connection.query("INSERT recipes(name) VALUES ('first_recipe')");
      }});

    await connection.query("CREATE TABLE IF NOT EXISTS `service` (current_recipe INT)").then(
        (result) => {
            if (result[0].warningStatus === 0) {
                connection.query("SELECT id FROM recipes LIMIT 1;").then(
                    (result)=>{
                connection.query(`INSERT service(current_recipe) VALUES (${result[0][0]['id']})`)
                }
            );
        }});
    return connection
};



  //   connection.query("CREATE DATABASE IF NOT EXISTS main", function (err, result) {
  //   if (err) console.log(err);
  //
  //   connection.query("USE main");
  //
  //   connection.query("CREATE TABLE IF NOT EXISTS `parameters` (name CHAR(50), value TINYINT)", (err, results) => {
  //     //console.log(results);
  //     if (results.warningStatus === 0) {
  //       connection.query("INSERT parameters(name, value)\n" +
  //         "VALUES ('temp_set_point', '0')");
  //     }
  //   });
  //
  //   connection.query("CREATE TABLE IF NOT EXISTS `saved_graphs` (" +
  //     "id INT PRIMARY KEY AUTO_INCREMENT," +
  //     "name CHAR(20)," +
  //     "date DATETIME," +
  //     "first_graph JSON," +
  //     "second_graph JSON" +
  //     ")", (err, results) => {
  //     if (err) console.log(err);
  //   });
  //
  //   connection.query("CREATE TABLE IF NOT EXISTS `recipes` (" +
  //     "id INT PRIMARY KEY AUTO_INCREMENT," +
  //     "name CHAR(20)," +
  //     "recipe_data JSON" +
  //     ")", (err, results) => {
  //     if (err) console.log("recipe create err");
  //     if (results.warningStatus === 0) {
  //       connection.query("INSERT recipes(name) " +
  //         "VALUES ('first_recipe')");
  //     }
  //   });
  //
  //   connection.query("CREATE TABLE IF NOT EXISTS `service` (" +
  //     "current_recipe INT" +
  //     ")", (err, results) => {
  //     if (err) console.log("service create err");
  //     if (results.warningStatus === 0) {
  //
  //       connection.query("SELECT id FROM recipes LIMIT 1;",
  //         function (err, results) {
  //           if (err) return console.log('ошибка', err);
  //           connection.query(`INSERT service(current_recipe) ` +
  //             `VALUES (${results[0]['id']})`);
  //         });
  //     }
  //   });
  // });
//     return connection
// };

