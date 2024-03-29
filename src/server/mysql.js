const mysql = require("mysql2/promise");
const emitter = global.emitter;

module.exports = async function mysql_create_connect () {
    const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: process.platform === 'linux' ? "admin" : 'root',
    password: "83528352",
    //timezone: 'utc'
  }).catch(
        (err) => {emitter.emit('alarms', ['database', 'error while connecting to database' , err]);}
    );

    await connection.query("CREATE DATABASE IF NOT EXISTS main").catch(
        (err) => {emitter.emit('alarms', ['database', 'error in database creation', err]);}
    );

    await connection.query("USE main").catch(
        (err) => {emitter.emit('alarms', ['database', 'error when selecting a database', err]);}
    );

    try {
        await connection.query(`CREATE TABLE IF NOT EXISTS parameters 
            (heat_manual_sp TINYINT, 
            vds_manual_sp TINYINT, 
            roast_mode CHAR(20), 
            step TINYINT,
            vds_prepare_fr TINYINT,
            cooling_time SMALLINT,
            temp_prepare_sp SMALLINT,
            manual_vds TINYINT,
            manual_heat SMALLINT,
            koef_t SMALLINT UNSIGNED,
            koef_v SMALLINT UNSIGNED,
            koef_a SMALLINT UNSIGNED)`).then(
            async (result) => {if (result[0].warningStatus === 0) {
                await connection.query(`INSERT parameters(heat_manual_sp, vds_manual_sp, roast_mode, step, 
                   vds_prepare_fr, cooling_time, temp_prepare_sp, manual_vds, manual_heat, koef_t, koef_v, koef_a) 
                   VALUES (0, 0, 'manual'  , 60, 100, 60, 180, 100, 200, 0, 0, 0)`);
            }});
    } catch (err) {
        emitter.emit('alarms', ['database', 'error while creating parameter table', err])
    }


    await connection.query(`CREATE TABLE IF NOT EXISTS saved_graphs (
      id INT PRIMARY KEY AUTO_INCREMENT, 
      name CHAR(20), 
      time SMALLINT, 
      date DATETIME, 
      beans LONGTEXT, 
      air LONGTEXT, 
      ror LONGTEXT, 
      arr_done LONGTEXT,
      history LONGTEXT
      )`).catch(
        (err) => {emitter.emit('alarms', ['database', 'error while creating saved graphs table', err]);}
    );

try {
    await connection.query("CREATE TABLE IF NOT EXISTS `recipes` (" +
        "id INT PRIMARY KEY AUTO_INCREMENT," +
        "name CHAR(20)," +
        "recipe_data LONGTEXT" +
        ")").then(
        async (result) => {if (result[0].warningStatus === 0) {
            await connection.query("INSERT recipes(name) VALUES ('first_recipe')");
        }});
}  catch (err) {
    emitter.emit('alarms', ['database', 'error while creating recipe table', err])
}


    try {
        await connection.query(`CREATE TABLE IF NOT EXISTS service (
        current_recipe INT,
        current_background_id INT
        )`).then(
            async (result) => {
                if (result[0].warningStatus === 0) {
                    await connection.query("SELECT id FROM recipes LIMIT 1;").then(
                        async (result)=>{
                            await connection.query(`INSERT service(current_recipe, current_background_id) 
                VALUES (${result[0][0]['id']}, 0)`)
                        }
                    );
                }});
    } catch (err) {
        emitter.emit('alarms', ['database', 'error while creating service table', err]);
    }

    return connection
};

