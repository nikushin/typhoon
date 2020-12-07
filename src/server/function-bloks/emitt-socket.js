const ciclycalTimer = require('./ciclycalTimer');
const {PhasesEmittsCreator} = require('../phases/phases-monitoring');
const roast = require('../phases/roast');
const memory = require('../function-bloks/memory');

function emittSocket (socket, emitter, sql) {

  PhasesEmittsCreator(socket, emitter);

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
      ror = (tempBeansArr[0] - tempBeansArr[9]).toFixed(1);
      tempBeansArr.shift()
    }

    return {tempBeans: tempBeans.toFixed(1), tempAir: tempAir.toFixed(1), ror: ror}
  };

  const SendRoastData = () => {
    if (!roast.status) {
      return undefined;
    }
    if (roast.roastSecond > 500 ) {emitter.emit('roast_time_out') }
      let roast_power = 0;
      const arr = memory.recipe.data.heat_setting_arr;
      arr.forEach(function(item, i, arr) {
        if (item[0] <= roast.roastSecond) {
          roast_power = item[1]
        }
      });
      const data = {roast_power: roast_power, roast_second: roast.roastSecond};
      roast.roastSecond += 1;
      return data
  };

  const EverySecondSendData = () => {

    const tempSimulatorValues = TempSimulator();
    const roastData = SendRoastData();

    socket.emit("every_second_data", {temp: tempSimulatorValues, roastData: roastData});
  };
  const EverySecondTimer = new ciclycalTimer(1000, EverySecondSendData);
  EverySecondTimer.start();

}

module.exports.emittSocket = emittSocket;



