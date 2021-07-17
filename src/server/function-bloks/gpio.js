console.log('test');
const { Gpio } = require( 'onoff' );
const socket = global.socket;
const emitter = global.emitter;

module.exports = function gpioCreate () {

    const lamp = new Gpio(7, 'out');
	

    //outputs
    //lamp.write(1, err => {
		//if (err) {console.log('err lamp')}
    //});

 };