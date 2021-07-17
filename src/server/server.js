(async function () {
  global.memory = require('./function-bloks/memory');
  global.sql = await require('./mysql.js')();
  await require('./function-bloks/memory_init')();
  global.socket = require('socket.io')(8080, {transports: ['polling', 'websocket']} ).sockets;
  const EventEmitter = new require('events').EventEmitter;
  global.emitter = new EventEmitter();

  await require('./equipment/equipment_init');
  await require('./phases/steps_init');
  await require('./function-bloks/emitt-socket')();

  await require('./modbus/modbus-tcp-input');
  await require('./modbus/modbus-tcp-output');

  // if (process.platform === 'linux') {
  //   await require('./modbus/modbus')();
  //   require('./function-bloks/gpio')();
  //   require('./function-bloks/gpio2')();
  // }
  const {ioConnect} = require ('./function-bloks/io-connect');
  global.socket.on('connect', socket => {
    ioConnect(socket);
  });

})();