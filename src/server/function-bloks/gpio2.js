const pigpio = require('pigpio').Gpio;
const Gpio = pigpio.Gpio;
const socket = global.socket;
const emitter = global.emitter;

module.exports = function pwmCreate () {
	pigpio.configureClock(10, pigpio.CLOCK_PCM);
    const lamp_start = new Gpio(19, {mode: Gpio.OUTPUT});
    //const lamp_cooler = new Gpio(17, {mode: Gpio.OUTPUT});
    //const lamp_blades = new Gpio(17, {mode: Gpio.OUTPUT});
    //const ssr = new Gpio(17, {mode: Gpio.OUTPUT});
	console.log('ok')


    lamp_start.pwmRange(100);
    lamp_start.pwmFrequency(1);
    lamp_start.pwmWrite(100);
	


    emitter.on('test_range', (value) => {
        lamp_start.pwmRange(value);
    });

    emitter.on('test_frequency', (value) => {
        lamp_start.pwmFrequency(value);
    });

    emitter.on('test_value', (value) => {
        lamp_start.pwmWrite(value);
    });

    emitter.on('test_range', (value) => {
        lamp_start.pwmRange(value);
    });

    emitter.on('test_frequency', (value) => {
        lamp_start.pwmFrequency(value);
    });

    emitter.on('test_value', (value) => {
        lamp_start.pwmWrite(value);
    });

};
