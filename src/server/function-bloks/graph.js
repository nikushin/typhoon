const ciclycalTimer = require('./ciclycalTimer');

module.exports.graph = function graph (socket, emitter) {

  let graphTemp = 20;
  let graphTemp2 = 20;

  const sendData = () => {
    graphTemp += ((Math.random() - 0.10) * 3);
    graphTemp2 += ((Math.random() - 0.10) * 2);
    socket.emit("graph", [tempGraphTimer.summTime / 1000, graphTemp.toFixed(1), graphTemp2.toFixed(1)]);
  };
  const tempGraphTimer = new ciclycalTimer(1000, sendData);


  emitter.on('phase_roast', (value) => {
    if (value) {tempGraphTimer.start();
    } else {
      tempGraphTimer.stop()
    }});

};
