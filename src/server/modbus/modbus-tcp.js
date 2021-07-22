const ModbusRTU = require("modbus-serial");
const clientOutput = new ModbusRTU();
clientOutput.setTimeout(100);
const clientInput = new ModbusRTU();
clientInput.setTimeout(100);
const emitter = global.emitter;

const outputModuleAddress = '192.168.10.98'; //127.0.0.2
const inputModuleAddress = '192.168.10.99'; //127.0.0.1

const stack = [];
const outputConform = {ssr: 341, lamp_start: 340, vds: 342, heat_starter: 343, cooler: 344, blades: 345};
const inputConform = [['button_alarm', 0, 'both'],['button_prepare', 1, 'both'],['button_start', 2, 'rising'],
    ['button_stop', 3, 'falling'],['button_blades', 4, 'rising'],['button_cooler', 5, 'rising'],];

let flagReadyTCPinput = false;
let tryConnectTCPinput = false;
const connectTCPinput = async () => {
    flagReadyTCPinput = false;
    tryConnectTCPinput = true;
    await clientInput.close(() =>
    {
        //console.log('close')
    });
    await clientInput.connectTCP(inputModuleAddress, { port: 502 }).then(
        () => {
            console.log('connection successful module input');
            flagReadyTCPinput = true;
            tryConnectTCPinput = false;
        }
    ).catch(
        (e) => {
            //console.log('connection fail module input ' + e);
            setTimeout(connectTCPinput, 5000);
        }
    );
};

const intTobit = (int) => {
    const innerInt = int.toString(2).split('').reverse();

    for (let i = 0; i <= 15; i++) {
        innerInt[i] = (innerInt[i] === "1");
    }
    // console.log(innerInt);
    return innerInt
};


const readTCPinput =  async () => {
    await clientInput.readHoldingRegisters(51, 2).then(
        (data) =>  {
            const d = intTobit(data.data[0]);
            for (let i = 0; i <= inputConform.length-1; i++) {
                const new_value = d[inputConform[i][1]];
                const old_value = inputConform[i][3];
                const func = inputConform[i][2];
                const message = inputConform[i][0];
                if (new_value !== old_value) {
                    if (func === 'rising') {
                        if (new_value === true && old_value !== undefined) {
                            emitter.emit(message);
                            console.log(message, new_value)
                        }
                    } else if (func === 'falling') {
                        if (new_value === false &&old_value !== undefined) {
                            emitter.emit(message);
                            console.log(message, new_value)
                        }
                    } else if (func === 'both') {
                        global.memory.operative[message] = new_value;
                        emitter.emit(message, new_value);
                        console.log(message, new_value)
                    }
                    inputConform[i][3] = new_value;
                }
            }
        }
    ).catch(
        (err) => {
            if (clientInput.isOpen) {
                console.log('соединение не установленно c модулем ввода, пробуем подключиться ' + err.err);
                connectTCPinput();
            }
            else {
                console.log('соединение не установленно c модулем ввода, пробуем подключиться');
                connectTCPinput();
            }
        }
    )
};

let flagReadyTCPoutput = false;
let tryConnectTCPoutput = false;
const connectTCPoutput = async () => {
    flagReadyTCPoutput = false;
    tryConnectTCPoutput = true;
    await clientOutput.close(() => {
        // console.log('close')
    });

    await clientOutput.connectTCP(outputModuleAddress, { port: 502 }).then(
        () => {
            console.log('connection successful module output');
            flagReadyTCPoutput = true;
            tryConnectTCPoutput = false;
            init();
        }
    ).catch(
        (e) => {
            //console.log('connection fail module output ' + e);
            setTimeout(connectTCPoutput, 5000);
        }
    );
};

const addToStack = (name, value) => {
    let exist = false;
    stack.forEach( (item) => {
        if (item.name === name) {item.value = value; exist = true}
    });
    if (!exist) {stack.push({name, value})}
};

const init = () => {
    addToStack('lamp_start', 0);
    addToStack('ssr', global.heater.power);
    addToStack('vds', global.vds.power ? 100 : 0);
    addToStack('heat_starter', 100);
    addToStack('cooler', global.cooler.power ? 100 : 0);
    addToStack('blades', global.blades.power ? 100 : 0);
};

let timeOut = undefined;
const checkConnection = async () => {
    await clientOutput.readHoldingRegisters(340, 1).then(
        (data) =>  {
            //console.log('Проверка модуля вывода прошла успешно');
            timeOut = setTimeout(checkConnection,5000)
        }
    ).catch(
        (err) => {
            console.log('какая-то ошибка модуля вывода ' + err.err);
            connectTCPoutput();
        }
    )
};

const writeTemplate = async (name, value) => {
    await clientOutput.writeRegisters (outputConform[name], [value*10]).then(
        () => {
            console.log(name, value*10);
        }
    )
        .catch(
            (err) => {
                if (clientOutput.isOpen) {
                    console.log('какая-то ошибка модуля вывода ' + err.err);
                    // setTimeout(() => writeTemplate(address, value), 1000);
                    connectTCPoutput();
                }
                else {
                    console.log('соединение не установленно с модулем вывода, пробуем подключиться');
                    connectTCPoutput();
                }
            }
        );
};

emitter.on('heater_gpio_switch_power', (value) => {
    console.log('heater_gpio_switch_power ' + value);
    addToStack('ssr', value);
});

emitter.on('lamp_start', (value) => {
    console.log('lamp_start ' + value);
    addToStack('lamp_start', value);
});

emitter.on('vds_gpio_power', (data) => {
    console.log('vds_gpio_power ', data);
    addToStack('vds', data ? 100 : 0);
});

emitter.on('blades_gpio_switch_power', (data) => {
    console.log('blades_gpio_switch_power ', data);
    addToStack('blades', data ? 100 : 0);
});

emitter.on('cooler_gpio_switch_power', (data) => {
    console.log('cooler_gpio_switch_power ', data);
    addToStack('cooler', data ? 100 : 0);
});

const ModbusTCPloop = async () => {
    if (!flagReadyTCPoutput && !tryConnectTCPoutput) {
        connectTCPoutput()
    }
    let writeBusy = false;
    if (stack.length !== 0 && flagReadyTCPoutput) {
        clearTimeout(timeOut);
        await writeTemplate(stack[0].name, stack[0].value);
        stack.shift();
        writeBusy = true;
        timeOut = setTimeout(checkConnection,5000)
    }


    if (!flagReadyTCPinput && !tryConnectTCPinput) {
        connectTCPinput()
    }
    if (flagReadyTCPinput && !writeBusy) {
        await readTCPinput()
    }
    if (!flagReadyTCPoutput && !flagReadyTCPinput) {
        setTimeout(() => ModbusTCPloop(), 1000);
    } else if (!flagReadyTCPinput) {
        setTimeout(() => ModbusTCPloop(), 50);
    } else {
        ModbusTCPloop()
    }
};

ModbusTCPloop();