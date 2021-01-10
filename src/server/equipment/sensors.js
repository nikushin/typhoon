// const {emitter} = require("../server");

let sensorsKeeper = {
  temp_beans: 0,
  temp_air: 0};

function sensorsKeeperReciveNewValue () {
  global.emitter.on('temp_beans_new_value', (data) => {
    sensorsKeeper.temp_beans = data;
  })
}

