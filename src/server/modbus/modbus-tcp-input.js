const ModbusRTU = require("modbus-serial");
const client = new ModbusRTU();
const clientOutput = new ModbusRTU();
const emitter = global.emitter;
client.setTimeout(100);
clientOutput.setTimeout(100);

const conform = [['button_start', 0, 'rising'],['button_stop', 1, 'falling'],['button_alarm', 2, 'both'],
    ['button_cooler', 3, 'rising'],['button_blades', 4, 'rising'],['switch_prepare', 5, 'both'],];

const intTobit = (int) => {
    const innerInt = int.toString(2).split('').reverse();

    for (let i = 0; i <= 15; i++) {
        innerInt[i] = (innerInt[i] === "1");
    }
    // console.log(innerInt);
    return innerInt
};

const connectTcp = async () => {
    await client.close(() => 
	{
		//console.log('close')
	});
    // await client.connectTCP("127.0.0.1", { port: 502 }).then(
    await client.connectTCP("192.168.1.99", { port: 502 }).then(
        () => {
            console.log('connection successful');
            readTcp1();
        }
    ).catch(
        (e) => {
            //console.log('connection fail ' + e);
            setTimeout(connectTcp, 2000);
        }
    );
};
connectTcp();

const readTcp1 =  () => {
    client.readHoldingRegisters(51, 2).then(
        (data) =>  {
            const d = intTobit(data.data[1]);

            for (let i = 0; i <= conform.length-1; i++) {
                const new_value = d[conform[i][1]];
                const old_value = conform[i][3];
                const func = conform[i][2];
                const message = conform[i][0];
                if (new_value !== old_value) {
                    if (func === 'rising') {
                        if (new_value === true) {
                            emitter.emit(message);
                            console.log(message, new_value)
                        }
                    } else if (func === 'falling') {
                        if (new_value === false) {
                            emitter.emit(message);
                            console.log(message, new_value)
                        }
                    } else if (func === 'both') {
                        emitter.emit(message, new_value);
                        console.log(message, new_value)
                    }
                    conform[i][3] = new_value;
                }
            }

            setTimeout(readTcp1, 2000);
            // readTcp1();
        }
    ).catch(
        (err) => {
            if (client.isOpen) {
                console.log('какая-то ошибка входа' + err.err);
                setTimeout(readTcp1, 1000);
            }
            else {
                console.log('соединение не установленно, пробуем подключиться');
                setTimeout(connectTcp, 1000);
            }
        }
    )
};