const buttons_list = {
  button_start: false,
  button_stop: false,
  button_prepare: false,
  button_cooler: false,
  button_blades: false,
  button_alarm: false,
};

function discret_input_create (socket, emitter) {
  for (let button in buttons_list) {
    socket.on(button, (data) => {
      if (data !== null) {buttons_list[button] = data}
      emitter.emit(button, data);
    });
  }
}

global.emitter.on('button_prepare', (value) => {
  global.memory.operative.button_prepare = value
});

global.emitter.on('button_alarm', (value) => {
  console.log('button button_alarm ' + value);
  global.memory.operative.button_alarm = value;
  if (value === true) {
    global.steps.stop.status = true;
    global.steps.prepare.status = false;
    global.steps.loading_roaster.status = false;
    global.steps.roast.status = false;
    global.steps.cooling.status = false;
    global.vds.SwitchPower(false);
    global.heater.SwitchAllow(false);
    global.cooler.SwitchPower(false);
    global.blades.SwitchPower(false);

    global.socket.emit("phases_status", {stop : global.steps.stop.status,
      prepare: global.steps.prepare.status,
      prepare_done: global.steps.prepare.start_delay,
      loading_roaster: global.steps.loading_roaster.status,
      roast: global.steps.roast.status,
      cooling: global.steps.cooling.status,
    });

    global.memory.operative.manual.on = false;
    global.memory.operative.manual.heat = false;
    global.memory.operative.manual.vds = false;
    global.memory.operative.manual.blades = false;
    global.memory.operative.manual.cooler = false;
    global.socket.emit("memory_change", {manual:global.memory.operative.manual});

    clearTimeout(global.steps.prepare.start_delay_timeout);
    clearTimeout(global.steps.loading_roaster.start_delay_timeout);
    global.steps.loading_roaster.start_delay = false;
    clearTimeout(global.steps.roast.roast_finish_delay_timeout);
    global.steps.roast.roast_finish_delay = false;
  }
});

module.exports.buttons_list = buttons_list;
module.exports.discret_input_create = discret_input_create;
