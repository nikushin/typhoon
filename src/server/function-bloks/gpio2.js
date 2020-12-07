const Gpio = require('pigpio').Gpio;

const button_start = new Gpio(17, {mode: Gpio.OUTPUT});
button_start.pwmRange(100);
button_start.pwmFrequency(1);
button_start.pwmWrite(50);
