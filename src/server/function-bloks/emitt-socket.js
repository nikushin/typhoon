const ciclycalTimer = require('./ciclycalTimer');
const socket = global.socket;
const memory = global.memory;
const emitter = global.emitter;

module.exports = function emittSocket() {

    //актуальная температура emitter to socket
    emitter.on('temp_beans_new_value', (value) => {
        socket.emit("increment", value);
    });

    let tempBeans = 20;
    let tempAir = 20;
    let vektorBeans = 'up';
    let vektorAir = 'up';
    let ror = undefined;
    const tempBeansArr = [];

    const levels = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let levels2 = 0;
    let lvl1 = 0;
    let lvl2 = 0;
    let lvl3 = 0;
    let c_time_sim = 0;

    const TempSimulator = () => {

        levels.unshift(global.heater.power);
        if (levels.length > 42) {
            levels.pop()
        }

        lvl1 = 0;

        for (let i = levels.length - 1; i > levels.length - 10; i--) {
            lvl1 += levels[i];
        }

        if (lvl1) {
            lvl1 = (lvl1 * 0.1) * 1.5;
        }

        lvl2 = 0;
        for (let i = levels.length - 1; i > levels.length - 20; i--) {
            lvl2 += levels[i];
        }
        lvl2 = (lvl2 / 20) * 1.2;

        lvl3 = 0;
        for (let i = levels.length - 1; i > levels.length - 39; i--) {
            lvl3 += levels[i];
        }
        lvl3 = (lvl3 / 35) * 1.1;

        levels2 += (lvl3);
        if (global.steps.loading_roaster.status)
            levels2 = (levels2 * 0.96);
        else
            levels2 = (levels2 * 0.997);
        tempBeans = levels2 / 50;

        tempBeansArr.push(tempBeans);
        if (tempBeansArr.length > 10) {
            ror = -(tempBeansArr[0] - tempBeansArr[9]).toFixed(1);
            tempBeansArr.shift()
        }
        global.memory.operative.temp_beans = Number(tempBeans.toFixed(3));
        global.memory.operative.temp_air = 0.0;
        c_time_sim > 65535 ? c_time_sim += (-65535 + 102) : c_time_sim += 102;

        const time = Date.now() - global.memory.history.date_start;
        const temp_beans_history = global.memory.history.temp_beans_history;

        //console.log(global.memory.operative.temp_beans , typeof (global.memory.operative.temp_beans));
        temp_beans_history.push([global.memory.operative.temp_beans, c_time_sim, time]);
        if (time > 30 * 1000 && !global.steps.roast.status) {

            while (temp_beans_history[0][2] < 10 * 1000) {
                temp_beans_history.shift();
            }

            const new_time_delta = temp_beans_history[0][2];
            for (let i = 0; i < temp_beans_history.length; i++)
                temp_beans_history[i][2] -= new_time_delta;
            global.memory.history.date_start += new_time_delta;
        }
        //console.log(temp_beans_history);

        emitter.emit('temp_beans_new_value');
        return {tempBeans: tempBeans.toFixed(1), tempAir: 0.0, ror: ror}
    };

    const TempRandom = () => {
        if (tempBeans > 150) {
            vektorBeans = 'down';
        }
        if (tempBeans < 20) {
            vektorBeans = 'up';
        }
        if (tempAir > 150) {
            vektorAir = 'down';
        }
        if (tempAir < 20) {
            vektorAir = 'up';
        }

        tempBeansArr.push(tempBeans);

        if (vektorBeans === 'up') {
            tempBeans += ((Math.random() - 0.20) * 3);
        } else {
            tempBeans -= ((Math.random() - 0.20) * 3);
        }

        if (vektorAir === 'up') {
            tempAir += ((Math.random() - 0.20) * 2);
        } else {
            tempAir -= ((Math.random() - 0.20) * 2);
        }

        if (tempBeansArr.length > 10) {
            ror = -(tempBeansArr[0] - tempBeansArr[9]).toFixed(1);
            tempBeansArr.shift()
        }

        emitter.emit('temp_beans_new_value', tempBeans);

        global.memory.operative.temp_beans = tempBeans.toFixed(1);
        global.memory.operative.temp_air = tempAir.toFixed(1);

        return {tempBeans: tempBeans.toFixed(1), tempAir: tempAir.toFixed(1), ror: ror}
    };

    const TempCalc = () => {

        if (global.memory.operative.temp_beans !== undefined) {
            tempBeansArr.push(memory.operative.temp_beans);
        }

        if (tempBeansArr.length > 10) {
            ror = -(tempBeansArr[0] - tempBeansArr[9]).toFixed(2);
            tempBeansArr.shift()
        }
        return {tempBeans: global.memory.operative.temp_beans, tempAir: global.memory.operative.temp_air, ror: ror}
    };

    const EverySecondSendData = () => {
        //const temp = TempSimulator();
        const temp = TempCalc();
        const roastData = global.steps.roast.RoastTick();
        const coolingData = global.steps.cooling.CoolingTick();

        socket.emit("every_second_data", {
            temp: temp,
            roastData: roastData,
            coolingData: coolingData,
        });
    };
    const EverySecondTimer = new ciclycalTimer(1000, EverySecondSendData);
    EverySecondTimer.start();

};



