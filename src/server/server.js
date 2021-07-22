(async function () {
  const EventEmitter = new require('events').EventEmitter;
  global.emitter = new EventEmitter();
  global.socket = require('socket.io')(8080, {transports: ['polling', 'websocket']} ).sockets;
  global.memory = require('./function-bloks/memory');

  await require('./equipment/equipment_init');
  await require('./phases/steps_init');

  global.sql = await require('./mysql.js')();
  await require('./function-bloks/memory_init')();

  await require('./function-bloks/emitt-socket')();

  await require('./modbus/modbus-tcp');
  
  if (process.platform === 'linux') {
    await require('./modbus/modbus')();
  //   require('./function-bloks/gpio')();
  //   require('./function-bloks/gpio2')();
  }
  
  const {ioConnect} = require ('./function-bloks/io-connect');
  global.socket.on('connect', socket => {
    ioConnect(socket);
  });

})();