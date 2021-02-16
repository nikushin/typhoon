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
    (heat_manual_sp TINYINT, 
    vds_manual_sp TINYINT, 
    roast_mode_auto BOOL, 
    step TINYINT,
    vds_prepare_fr TINYINT,
    cooling_time SMALLINT,
    temp_prepare_sp SMALLINT,
    manual_vds TINYINT,
    manual_heat SMALLINT)`).then(
    async (result) => {if (result[0].warningStatus === 0) {
      await connection.query(`INSERT parameters(heat_manual_sp, vds_manual_sp, roast_mode_auto, step, 
      vds_prepare_fr, cooling_time, temp_prepare_sp, manual_vds, manual_heat) 
      VALUES (0, 0, TRUE, 60, 100, 60, 180, 100, 200)`);
    }});

    await connection.query(`CREATE TABLE IF NOT EXISTS saved_graphs (
      id INT PRIMARY KEY AUTO_INCREMENT, 
      name CHAR(20), 
      time SMALLINT, 
      date DATETIME, 
      beans LONGTEXT, 
      air LONGTEXT, 
      ror LONGTEXT, 
      arr_done LONGTEXT 
      )`);

    await connection.query("CREATE TABLE IF NOT EXISTS `recipes` (" +
      "id INT PRIMARY KEY AUTO_INCREMENT," +
      "name CHAR(20)," +
      "recipe_data LONGTEXT" +
      ")").then(
      async (result) => {if (result[0].warningStatus === 0) {
        await connection.query("INSERT recipes(name) VALUES ('first_recipe')");
      }});

    await connection.query("CREATE TABLE IF NOT EXISTS `service` (current_recipe INT)").then(
         async (result) => {
            if (result[0].warningStatus === 0) {
                await connection.query("SELECT id FROM recipes LIMIT 1;").then(
                    async (result)=>{
                await connection.query(`INSERT service(current_recipe) VALUES (${result[0][0]['id']})`)
                }
            );
        }});
    return connection
};

