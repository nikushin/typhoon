const stop = require('../phases/stop');
const prepare = require('../phases/prepare');
const loading_roaster = require('../phases/./loading-roaster');
const roast = require('../phases/roast');
const unloading_roaster = require('../phases/unloading-roaster');
const cooling = require('../phases/cooling');
const unloading_cooler = require('../phases/unloading-cooler');
const {discret_input_create} = require('../equipment/buttons-lamps');

module.exports.ioConnect = function ioConnect (socket, emitter, sql) {
  socket.on('disconnect', socket => {
    // emitter.removeAllListeners();
  });

  discret_input_create(socket, emitter);
  console.log(discret_input_create);

  socket.on('msg', (data) => {
    sql.query(`UPDATE parameters 
    SET value = ${data[1]}
    WHERE name = '${data[0]}';`,
      function(err, results, fields) {
        if (err) return console.log('ошибка', err);
        console.log('update done');
      })
  });

  sql.query("SELECT value FROM parameters WHERE name = 'temp_set_point';",
    function(err, results, fields) {
      if (err) return console.log('ошибка', err);
      console.log(results[0]['value']);
      socket.emit("init", ["temp_set_point", results[0]['value']]);
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
