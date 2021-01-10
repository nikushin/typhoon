const buttons_list = {
  button_start: false,
  button_stop: false,
  button_prepare: false,
  button_cooler: false,
};

function discret_input_create (socket, emitter) {
  for (let button in buttons_list) {
    socket.on(button, (data) => {
      if (data !== null) {buttons_list[button] = data}
      emitter.emit(button, data);
    });
  }
}

global.emitter.on('button_prepare',(value) => {
  global.memory.operative.button_prepare = value
});

module.exports.buttons_list = buttons_list;
module.exports.discret_input_create = discret_input_create;
