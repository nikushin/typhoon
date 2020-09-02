const {emitter} = require("../server");
const ModbusRTU = require("modbus-serial");
const Modbusclient = new ModbusRTU();

module.exports.modbusCreate = function modbusCreate () {
    modbusInit();
    Modbusclient.setTimeout(1000);
    Modbusclient.setID(1);
};

const readModbus = () => {
    Modbusclient.readHoldingRegisters(0, 1, function(err, data) {
        if (err) {readModbus(); return console.log(err.message);}
        emitter.emit('temp_beans_new_value', data.data[0]);
        readModbus();
    })
};

function modbusInit () {
    Modbusclient.connectRTU('COM31', {baudRate: 9600, parity: "even", dataBits: 8, stopBits: 1 }, (err) => {
      if (err) {console.log(err); setTimeout(modbusInit, 4000); return}
      readModbus();})
}
