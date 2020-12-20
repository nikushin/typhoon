const {emitter} = require("../server");
const ModbusRTU = require("modbus-serial");
const Modbusclient = new ModbusRTU();
Modbusclient.setTimeout(1000);
Modbusclient.setID(1);
	
module.exports.modbusCreate = function modbusCreate () {
    modbusInit();
};

const readModbus = () => {
    Modbusclient.readHoldingRegisters(0, 1, function(err, data) {
        if (err) {readModbus(); return console.log(err.message);}
        emitter.emit('temp_beans_new_value', data.data[0]);
		console.log(data.data[0]);
        readModbus();
    })
};

function modbusInit () {
    Modbusclient.connectRTUBuffered('/dev/serial0', {baudRate: 9600, parity: "even", dataBits: 8, stopBits: 1 }, (err) => {
      if (err) {console.log(err); setTimeout(modbusInit, 4000); return}
      readModbus();})
}
