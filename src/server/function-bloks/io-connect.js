const stop = require('../phases/stop');
const prepare = require('../phases/prepare');
const loading_roaster = require('../phases/./loading-roaster');
const roast = require('../phases/roast');
const unloading_roaster = require('../phases/unloading-roaster');
const cooling = require('../phases/cooling');
const unloading_cooler = require('../phases/unloading-cooler');
const {discret_input_create} = require('../equipment/buttons-lamps');
const {recipeInit, recipeChange, recipeDelete} = require('./sql-utilities');


module.exports.ioConnect = async function ioConnect (socket, emitter, sql, memory) {
  socket.on('disconnect', socket => {
    // emitter.removeAllListeners();
  });
  discret_input_create(socket, emitter, sql, memory);
// console.log(memory);
  socket.emit("memory_init", memory);

  //!!!
  socket.on('msg', (data) => {
    sql.query(`UPDATE parameters 
    SET value = ${data[1]}
    WHERE name = '${data[0]}';`)
  });

    socket.on('test_gpio', () => {
        emitter.emit('test_gpio')
    });

    emitter.on('button_alarm', (value) => {
        socket.emit("test_button", value);
		console.log('bt', value)
    });

  socket.on('memory_change', (data) => {
    if (data.heat_setting_arr) {
      memory.recipe.data.heat_setting_arr = data.heat_setting_arr
    }
    if (data.roast_mode_auto !== undefined) {
      memory.retain.roast_mode_auto = data.roast_mode_auto;
      sql.query(`UPDATE parameters 
      SET roast_mode_auto = ${data.roast_mode_auto};`)
    }
    if (data.step !== undefined) {
      memory.retain.step = data.step;
      sql.query(`UPDATE parameters 
      SET step = ${data.step};`)
    }
  });

  socket.on('history_request', (offset) => {
    (async function () {
      const [result_history] = await sql.query(`SELECT id, name, date FROM saved_graphs ORDER BY id DESC LIMIT ${offset*10}, 10;`);
      const [result_count] = await sql.query(`SELECT COUNT(*) AS count  FROM saved_graphs;`);
      socket.emit("history_answer", {history: result_history, count: result_count[0].count})
    })()
  });

  socket.on('one_story_request', (id) => {
    (async function () {
    const [result] = await sql.query(`SELECT beans, air, ror, arr_done, time FROM saved_graphs WHERE id = ${id};`);
    socket.emit("one_story_answer", result)
    })()
  });

  socket.on('save_graph', (data) => {
    console.log(data);
    sql.query(`INSERT saved_graphs(name, time, date, beans, air, ror, arr_done) 
    VALUES ("${data.name}","${data.time}","${data.date}","${JSON.stringify(data.beans)}",
    "${JSON.stringify(data.air)}", "${JSON.stringify(data.ror)}","${JSON.stringify(data.heat_arr_done)}");`)
  });

  // (async function () {
  // const [result] = await sql.query("SELECT value FROM parameters WHERE name = 'temp_set_point';");
  //     socket.emit("init", ["temp_set_point", result[0]['value']]);
  // })();

  // recipe init
  (async function () {
    const [result] = await sql.query("SELECT current_recipe FROM service;");
      recipeInit(sql, socket, result[0]['current_recipe']);
  })();

  // recipe change
  socket.on('recipe_change', (id) => {
    recipeChange(sql, socket, id, recipeInit)
  });

  // recipe delete
  socket.on('recipe_delete', () => {
    recipeDelete(sql, socket, recipeInit)
  });

  // recipe new
  socket.on('recipe_add', (id) => {
    (async function () {
      const [result_new_id] = await sql.query(`INSERT INTO recipes (recipe_data)
      SELECT recipe_data FROM recipes WHERE id = ${id};`);
      const new_id = (result_new_id['insertId']);
      sql.query(`UPDATE service SET current_recipe = ${new_id};`);
      sql.query(`UPDATE recipes SET name = 'new recipe' WHERE id = '${new_id}';`);
      recipeInit(sql, socket, new_id);
    })();
  });

  // recipe save
  socket.on('recipe_save', (data) => {
    sql.query(`UPDATE recipes
    SET recipe_data = '${JSON.stringify(data.data)}', name = '${data.name}' WHERE id = ${data.id};`);
  });

  socket.emit("phases_status", {stop : stop.status,
    prepare: prepare.status,
    prepare_done: prepare.start_delay,
    loading_roaster: loading_roaster.status,
    loading_roaster_done: loading_roaster.start_delay,
    roast: roast.status,
    unloading_roaster: unloading_roaster.status,
    cooling: cooling.status,
    unloading_cooler: unloading_cooler.status,
  });

};
