const ModbusRTU = require("modbus-serial");
const client = new ModbusRTU();
client.setTimeout(100);
const emitter = global.emitter;

let flagReady = false;
let cycleOn = false;

const stack = [];
const conform = {ssr: 341, lamp_start: 340, vds: 342, heat_starter: 343, cooler: 344, blades: 345};

const connectTcp = async () => {
    stack.length = 0;
    flagReady = false;
    await client.close(() => {
        // console.log('close')
    });
    // await client.connectTCP("127.0.0.2", { port: 502 }).then(
    await client.connectTCP("192.168.10.98", { port: 502 }).then(
        () => {
            console.log('connection successful');
            flagReady = true;
            init();
            cycle();
        }
    ).catch(
        (e) => {
            console.log('connection fail output ' + e);
            setTimeout(connectTcp, 5000);
        }
    );
};

connectTcp();

// emitter.on('heater_gpio_switch_power', async (value) => {
//     console.log('heater_gpio_switch_power ' + value);
//     await writeTemplate(340, [value*10]);
// });

const writeTemplate = async (name, value) => {
    await client.writeRegisters (conform[name], [value*10]).then(
        () => {
            console.log('успешно');
            cycle();
        }
    )
        .catch(
        (err) => {
            if (client.isOpen) {
                console.log('какая-то ошибка ' + err.err);
                // setTimeout(() => writeTemplate(address, value), 1000);
                setTimeout(connectTcp, 1000);
            }
            else {
                console.log('соединение не установленно, пробуем подключиться');
                setTimeout(connectTcp, 1000);
            }
        }
    );
};

const addToStack = (name, value) => {
    console.log('add', name, value, cycleOn);
    let exist = false;
    stack.forEach( (item) => {
        if (item.name === name) {item.value = value; exist = true}
    });
    if (!exist) {stack.push({name, value})}
    if (stack.length > 0 && !cycleOn) {
        cycle();
    }
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

const cycle = () => {
    clearTimeout(timeOut);
    //console.log('cycle ', stack);
    if (!flagReady) {return}
    cycleOn = true;
    if (stack.length > 0) {
        writeTemplate(stack[0].name, stack[0].value);
        stack.shift();
        return;
    }
    cycleOn = false;
    timeOut = setTimeout(checkConnection,5000)
};

const checkConnection = async () => {
    await client.readHoldingRegisters(340, 1).then(
        (data) =>  {
            //console.log(data.data);
            if (!cycleOn) {cycle()}
        }
    ).catch(
        (err) => {
            setTimeout(connectTcp, 5000);
        }
    )
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

// addToStack('lamp_start', 22);
// addToStack('lamp_start', 11);
// addToStack('lamp_start', 77);
// addToStack('ssr', 55);
// addToStack('ssr', 55);
// addToStack('ssr', 55);

// setTimeout(() => addToStack('ssr', 99), 3000);
// setTimeout(() => addToStack('ssr', 33), 3000);
// setTimeout(() => addToStack('ssr', 99), 3000);
// setTimeout(() => addToStack('lamp_start', 11), 3000);
// setTimeout(() => addToStack('lamp_start', 22), 3000);
// setTimeout(() => addToStack('lamp_start', 33), 3000);

