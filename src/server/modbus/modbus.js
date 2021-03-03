// const {emitter} = require("../server");
// const emitter = global.e
// const {vds} = require('../equipment/ATV');
const ModbusRTU = require("modbus-serial");
const Modbusclient = new ModbusRTU();
Modbusclient.setTimeout(600);
	
module.exports = function modbusCreate () {
    modbusInit();
};

// const readStack = [
//     async () => {
//        await Modbusclient.readHoldingRegisters(0, 1).then((data)=> {
//         console.log(data.data[0]);
//         global.vds.statusFeedBack(data.data[0]);
//     }).catch(err=>console.log(err.message));
//     },
//     async () => {
//         await Modbusclient.readHoldingRegisters(1, 1).then((data)=> {
//         console.log(data.data[0]);
//         global.vds.frFeedBack(data.data[0]);
//     }).catch(err=>console.log(err.message));
//     },
// ];

const readStack = [
    async () => {
        Modbusclient.setID(1);
        await Modbusclient.readHoldingRegisters(3201, 2).then((data) => { //3201
            //console.log(data.data[0], data.data[1]);
            global.vds.statusFeedBack(data.data[0]*5);
    })
	.catch(err=>{}
	//console.log(err.message)
	);
    },
    async () => {
        Modbusclient.setID(16);
        await Modbusclient.readHoldingRegisters(1, 7).then((data) => {
            global.memory.operative.temp_beans = data.data[0];
            global.memory.operative.temp_air = data.data[6];
            //console.log(data.data[0], data.data[6]);
        })
		.catch(err=>{}
		//console.log(err.message)
		);
    },
];

const writeStack = [];

let n = 0;
const readModbus = async () => {
    if (writeStack.length !== 0) {
       await writeStack[0]();
       writeStack.shift()
    } else {
        if (++n > readStack.length-1) {n=0}
        await readStack[n]();
    }
    await readModbus()
};

function modbusInit () {
    //Modbusclient.connectRTUBuffered('/dev/ttyUSB0', {baudRate: 19200, parity: "even", dataBits: 8, stopBits: 1 }, (err) => {
    //Modbusclient.connectRTUBuffered('/dev/serial0', {baudRate: 9600, parity: "even", dataBits: 8, stopBits: 1 }, (err) => {
    // Modbusclient.connectRTUBuffered('COM30', {baudRate: 19200, parity: "even", dataBits: 8, stopBits: 1 }, (err) => {
    //Modbusclient.connectRTUBuffered('COM31', {baudRate: 9600, parity: "even", dataBits: 8, stopBits: 1 }, (err) => {
	Modbusclient.connectRTUBuffered('/dev/ttyAMA1', {baudRate: 9600, parity: "even", dataBits: 8, stopBits: 1}, (err) => {
        if (err) {
            console.log(err);
            setTimeout(modbusInit, 4000);
            return
        }
      readModbus();})
}

global.emitter.on('vds_set_fr', (data) => {
    while(writeStack.length > 0) {
        writeStack.pop();
    }
    writeStack.push (
        async () => {
	    console.log('vds_set_fr ', data);
            Modbusclient.setID(1);
            await Modbusclient.writeRegisters(8502, [data]).catch(function(err) {console.log(err.message)})
    })
});