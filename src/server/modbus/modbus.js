const {emitter} = require("../server");
const {vds} = require('../equipment/ATV');
const ModbusRTU = require("modbus-serial");
const Modbusclient = new ModbusRTU();
Modbusclient.setTimeout(300);
Modbusclient.setID(1);

module.exports.modbusCreate = function modbusCreate () {
    modbusInit();
};

// const readModbus = async () => {
    // await Modbusclient.readHoldingRegisters(0, 1).then((data)=> {
        //console.log(data.data[0]);
        // vds.statusFeedBack(data.data[0]);
    // }).catch(err=>console.log(err.message));
    // await Modbusclient.readHoldingRegisters(1, 1).then((data)=> {
        //console.log(data.data[0]);
        // vds.frFeedBack(data.data[0]);
    // }).catch(err=>console.log(err.message));
    // setTimeout(readModbus, 1000);
// };

const readModbus = async () => {
    await Modbusclient.readHoldingRegisters(3201, 2).then((data)=> {
        // console.log(data.data[0], data.data[1]);
        vds.statusFeedBack(data.data[0]);
        vds.frFeedBack(data.data[1]);
	}).catch(err=>console.log(err.message));
    setTimeout(readModbus, 1000);
};

function modbusInit () {
	Modbusclient.connectRTUBuffered('/dev/ttyUSB0', {baudRate: 19200, parity: "even", dataBits: 8, stopBits: 1 }, (err) => {
	//Modbusclient.connectRTUBuffered('/dev/serial0', {baudRate: 19200, parity: "even", dataBits: 8, stopBits: 1 }, (err) => {
    //Modbusclient.connectRTUBuffered('/dev/serial0', {baudRate: 9600, parity: "even", dataBits: 8, stopBits: 1 }, (err) => {
    //Modbusclient.connectRTUBuffered('COM30', {baudRate: 19200, parity: "even", dataBits: 8, stopBits: 1 }, (err) => {
    //Modbusclient.connectRTUBuffered('COM30', {baudRate: 9600, parity: "even", dataBits: 8, stopBits: 1 }, (err) => {
      if (err) {
          console.log(err);
          setTimeout(modbusInit, 4000);
          return
          }
      readModbus();})
}

//let i = 0;

// emitter.on('vds_test_on_off', () => {
//     Modbusclient.writeRegisters(5, [55,++i]).catch(function(err) {
//         console.log(err);
//     });
// });

// emitter.on('vds_set_cmd', (data) => {
    // Modbusclient.writeRegisters(2, [data]).catch(function(err) {
        // console.log(err);
        // emitter.emit('vds_set_cmd', data);
    // });
// });
// emitter.on('vds_set_fr', (data) => {
    // Modbusclient.writeRegisters(3, [data]).catch(function(err) {
        // console.log(err);
        // emitter.emit('vds_set_fr', data);
    // });
// });

emitter.on('vds_set_cmd', (data) => {
    Modbusclient.writeRegisters(8501, [data]).catch(function(err) {
        console.log(err);
        emitter.emit('vds_set_cmd', data);
    });
});
emitter.on('vds_set_fr', (data) => {
    Modbusclient.writeRegisters(8502, [data]).catch(function(err) {
        console.log(err);
        emitter.emit('vds_set_fr', data);
    });
});
