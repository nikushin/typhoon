const ciclycalTimer = require('./ciclycalTimer');
const socket = global.socket;
const memory = global.memory;
const emitter = global.emitter;

module.exports = function emittSocket () {

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

  const TempSimulator = () => {
    if (tempBeans > 150) {vektorBeans = 'down';}
    if (tempBeans < 20) {vektorBeans = 'up';}
    if (tempAir > 150) {vektorAir = 'down';}
    if (tempAir < 20) {vektorAir = 'up';}

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

    return {tempBeans: tempBeans.toFixed(1), tempAir: tempAir.toFixed(1), ror: ror}
  };

  const EverySecondSendData = () => {

    const tempSimulatorValues = TempSimulator();
    const roastData = global.steps.roast.RoastTick();
    const coolingData = global.steps.cooling.CoolingTick();

    socket.emit("every_second_data", {
      temp: tempSimulatorValues,
      roastData: roastData,
      coolingData: coolingData,
    });
  };
  const EverySecondTimer = new ciclycalTimer(1000, EverySecondSendData);
  EverySecondTimer.start();

};



