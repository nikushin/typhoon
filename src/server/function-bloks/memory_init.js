const sql = global.sql;
const memory = global.memory;
module.exports = async function memoryInit () {
// mysql to memory
  await sql.query("SELECT current_recipe, current_background_id FROM service;").then(
    result => {
        memory.recipe.current_id = result[0][0].current_recipe;
        const background_id = result[0][0].current_background_id;

        if (background_id !== 0) {
            (async function () {
                const [result2] = await sql.query(`SELECT beans, air, ror, arr_done, time, history FROM saved_graphs WHERE id = ${background_id};`);
                memory.history.background.temp_beans = JSON.parse(result2[0].beans);
                memory.history.background.arr_done = JSON.parse(result2[0].arr_done);
                memory.history.background.history = JSON.parse(result2[0].history);
            })();
        }
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

  await sql.query(`SELECT heat_manual_sp, vds_manual_sp, roast_mode, step, vds_prepare_fr, 
  cooling_time, temp_prepare_sp, manual_vds, manual_heat, koef_t, koef_v, koef_a FROM parameters;`).then(
    result => {
        memory.retain.heat_manual_sp = result[0][0].heat_manual_sp;
        memory.retain.vds_manual_sp = result[0][0].vds_manual_sp;
        memory.retain.roast_mode = result[0][0].roast_mode;
        memory.retain.step = result[0][0].step;
        memory.retain.vds_prepare_fr = result[0][0].vds_prepare_fr;
        memory.retain.cooling_time = result[0][0].cooling_time;
        memory.retain.temp_prepare_sp = result[0][0].temp_prepare_sp;
        memory.retain.manual.temp_sp = result[0][0].manual_heat;
        memory.retain.manual.vds_fr = result[0][0].manual_vds;
        memory.retain.background_coefficients.t = result[0][0].koef_t;
        memory.retain.background_coefficients.v = result[0][0].koef_v;
        memory.retain.background_coefficients.a = result[0][0].koef_a;

    });

  //console.log(memory)
};
