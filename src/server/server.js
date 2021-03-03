(async function () {
  global.memory = require('./function-bloks/memory');
  global.sql = await require('./mysql.js')();
  await require('./function-bloks/memory_init')();
  global.socket = require('socket.io')(8080, {transports: ['polling', 'websocket']} ).sockets;
  const EventEmitter = new require('events').EventEmitter;
  global.emitter = new EventEmitter();
  if (process.platform === 'linux') {
    await require('./modbus/modbus')();
    require('./function-bloks/gpio')();
    require('./function-bloks/gpio2')();
  }
  require('./equipment/equipment_init');
  require('./phases/steps_init');

  require ('./function-bloks/emitt-socket')();

  const {ioConnect} = require ('./function-bloks/io-connect');
  global.socket.on('connect', socket => {
    ioConnect(socket);
  });

})();
