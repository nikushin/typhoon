const memory = require('./function-bloks/memory');
const memory_init = require('./function-bloks/memory_init');
const sql_create = require('./mysql.js');
const io = require('socket.io')(8080, {transports: ['polling', 'websocket']} );
module.exports.socket_all = io.sockets;
const EventEmitter = new require('events').EventEmitter;
const emitter = new EventEmitter();
module.exports.emitter = emitter;

//const gpioCreate = require('./function-bloks/gpio');
//const pwmCreate = require('./function-bloks/gpio2');

const {modbusCreate} = require('./modbus/modbus');
const {ioConnect} = require ('./function-bloks/io-connect');
const {emittSocket} = require ('./function-bloks/emitt-socket');


(async function () {
  const sql = await sql_create();
  await memory_init(sql, memory);
  emittSocket(io.sockets, emitter, sql);

  modbusCreate();
  gpioCreate(io.sockets, emitter);
  pwmCreate(io.sockets, emitter,);

  io.on('connect', socket => {
    ioConnect(socket, emitter, sql, memory);
  });

})();
