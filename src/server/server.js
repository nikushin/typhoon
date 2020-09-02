const sql = require('./mysql.js');

const io = require('socket.io')(8080, {transports: ['polling', 'websocket']} );
const EventEmitter = new require('events').EventEmitter;
const emitter = new EventEmitter();
module.exports.emitter = emitter;
const {modbusCreate} = require('./modbus/modbus');
const {ioConnect} = require ('./function-bloks/io-connect');
const {emittSocket} = require ('./function-bloks/emitt-socket');

modbusCreate();
emittSocket(io.sockets, emitter);

io.on('connect', socket => {
  ioConnect(socket, emitter, sql);
});
