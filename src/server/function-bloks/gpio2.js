const Gpio = require('pigpio').Gpio;

module.exports = function pwmCreate (socket, emitter) {

    const lamp_start = new Gpio(17, {mode: Gpio.OUTPUT});
    const lamp_cooler = new Gpio(17, {mode: Gpio.OUTPUT});
    const lamp_blades = new Gpio(17, {mode: Gpio.OUTPUT});
    const ssr = new Gpio(17, {mode: Gpio.OUTPUT});

    lamp_start.pwmRange(100);
    lamp_start.pwmFrequency(1);
    lamp_start.pwmWrite(50);

};
