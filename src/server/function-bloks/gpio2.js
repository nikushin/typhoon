const pigpio = require('pigpio');
const Gpio = pigpio.Gpio;
const socket = global.socket;
const emitter = global.emitter;

module.exports = function pwmCreate () {
    pigpio.configureClock(10, pigpio.CLOCK_PCM);

    const lamp_start = new Gpio(20, {mode: Gpio.OUTPUT});
    const ssr = new Gpio(19, {mode: Gpio.OUTPUT});

    lamp_start.pwmRange(100);
    lamp_start.pwmFrequency(5);
    lamp_start.pwmWrite(0);

    ssr.pwmRange(100);
    ssr.pwmFrequency(5);
    ssr.pwmWrite(0);

    emitter.on('heater_gpio_switch_power', (value) => {
		console.log('heater_gpio_switch_power ' + value);
        ssr.pwmWrite(value);
    });

    emitter.on('lamp_start', (value) => {
		console.log('lamp_start ' + value);
        lamp_start.pwmWrite(value);
    });

    // emitter.on('test_range', (value) => {
    //     lamp_start.pwmRange(value);
    // });
    //
    // emitter.on('test_frequency', (value) => {
    //     lamp_start.pwmFrequency(value);
    // });
    //
    // emitter.on('test_value', (value) => {
    //     lamp_start.pwmWrite(value);
    // });

};
