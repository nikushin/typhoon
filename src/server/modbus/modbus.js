// const {emitter} = require("../server");
// const emitter = global.e
// const {vds} = require('../equipment/ATV');
const ModbusRTU = require("modbus-serial");
const Modbusclient = new ModbusRTU();
Modbusclient.setTimeout(600);

module.exports = function modbusCreate() {
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

let old_temp_beans = undefined;
let old_temp_beans_time = undefined;

const readStack = [
/*     async () => {
        Modbusclient.setID(1);
        await Modbusclient.readHoldingRegisters(3201, 2).then((data) => { //3201
            //console.log(data.data[0], data.data[1]);
            global.vds.statusFeedBack(data.data[0] * 5);
        })
        //.catch(err=>{}
            .catch(err => {
                console.log('1 ' + err.message)
            });
    }, */
    async () => {
        Modbusclient.setID(16);
        await Modbusclient.readHoldingRegisters(1, 7).then((data) => {
            const temp_beans_time = data.data[2];
            if (old_temp_beans_time !== temp_beans_time) {
                const temp_beans = data.data[0];
                const time = Date.now() - global.memory.history.date_start;
                const temp_beans_history = global.memory.history.temp_beans_history;
                global.memory.operative.temp_beans = temp_beans;
                temp_beans_history.push([temp_beans, temp_beans_time, time]);
                if (time > 60 * 1000 && !global.steps.roast.status) {
                    while (temp_beans_history[0][1] > 30 * 1000)
                        temp_beans_history.shift();
				}
				console.log(temp_beans)
                old_temp_beans_time = temp_beans_time;
                global.emitter.emit('temp_beans_new_value');
            }
            global.memory.operative.temp_air = data.data[6];

        }).catch(err => {}
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
        if (++n > readStack.length - 1) {
            n = 0
        }
        await readStack[n]();
    }
    setTimeout(() => readModbus(), 20); //20
    //await readModbus()
};

function modbusInit() {
    //Modbusclient.connectRTUBuffered('/dev/ttyUSB0', {baudRate: 19200, parity: "even", dataBits: 8, stopBits: 1 }, (err) => {
    //Modbusclient.connectRTUBuffered('/dev/serial0', {baudRate: 9600, parity: "even", dataBits: 8, stopBits: 1 }, (err) => {
    // Modbusclient.connectRTUBuffered('COM30', {baudRate: 19200, parity: "even", dataBits: 8, stopBits: 1 }, (err) => {
    //Modbusclient.connectRTUBuffered('COM31', {baudRate: 9600, parity: "even", dataBits: 8, stopBits: 1 }, (err) => {
    //Modbusclient.connectRTUBuffered('/dev/ttyAMA1', {
	Modbusclient.connectRTUBuffered('/dev/ttyS0', {
        baudRate: 19200,
        parity: "even",
        dataBits: 8,
        stopBits: 1
    }, (err) => {
        if (err) {
            console.log(err);
            setTimeout(modbusInit, 4000);
            return
        }
        readModbus();
    })
}

global.emitter.on('vds_set_fr', (data) => {
    console.log(data);
    while (writeStack.length > 3) {
        writeStack.pop();
    }
    writeStack.push(
        async () => {
            console.log('vds_set_fr ', data);
            Modbusclient.setID(1);
            await Modbusclient.writeRegisters(8502, [data]).catch(function (err) {
                console.log(err.message)
            })
        })
});