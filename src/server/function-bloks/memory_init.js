const sql = global.sql;
const memory = global.memory;
module.exports = async function memoryInit () {
// mysql to memory
  await sql.query("SELECT current_recipe FROM service;").then(
    result => {
        memory.recipe.current_id = result[0][0].current_recipe
    });

  await sql.query(`SELECT * FROM recipes WHERE id = ${memory.recipe.current_id};`).then(
    result => {
      memory.recipe.name = result[0][0].name;
      if (result[0][0].recipe_data && result[0][0].recipe_data.heat_setting_arr) {
          memory.recipe.data.heat_setting_arr = result[0][0].recipe_data.heat_setting_arr;
      }
    });

  await sql.query(`SELECT COUNT(*) AS count FROM recipes;`).then(
    result => memory.recipe.amount = result[0][0].count);

  await sql.query(`SELECT ROW_NUMBER() OVER(ORDER BY id) n, id FROM recipes;`).then(
    result => {
      result[0].forEach(function (item, i, arr) {
        if (item.id === memory.recipe.current_id) {
          memory.recipe.serial_number = item.n
        }
      });
    });

  await sql.query(`SELECT heat_manual_sp, vds_manual_sp, roast_mode_auto, step, vds_prepare_fr, 
  cooling_time, temp_prepare_sp, manual_vds, manual_heat FROM parameters;`).then(
    result => {
        memory.retain.heat_manual_sp = result[0][0].heat_manual_sp;
        memory.retain.vds_manual_sp = result[0][0].vds_manual_sp;
        memory.retain.roast_mode_auto = result[0][0].roast_mode_auto;
        memory.retain.step = result[0][0].step;
        memory.retain.vds_prepare_fr = result[0][0].vds_prepare_fr;
        memory.retain.cooling_time = result[0][0].cooling_time;
        memory.retain.temp_prepare_sp = result[0][0].temp_prepare_sp;
        memory.retain.manual.temp_sp = result[0][0].manual_heat;
        memory.retain.manual.vds_fr = result[0][0].manual_vds;
    });

  //console.log(memory)
};
