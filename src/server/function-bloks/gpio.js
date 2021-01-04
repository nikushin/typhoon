const { Gpio } = require( 'onoff' );

module.exports = function gpioCreate (socket, emitter) {
    //const button_start = new Gpio('4', 'in', 'rising');
    //const button_stop = new Gpio('5', 'in', 'falling');
    const button_alarm = new Gpio(12, 'in', 'both');
    //const button_cooler = new Gpio('7', 'in', 'rising');
    //const button_blades = new Gpio('8', 'in', 'rising');
    //const switch_prepare = new Gpio('9', 'in', 'both');

    const vvd = new Gpio(20, 'out');
    const vds = new Gpio(13, 'out');
    //const heat_starter = new Gpio('9', 'out');
    //const cooler_starter = new Gpio('9', 'out');
    //const blades_starter = new Gpio('9', 'out');

    let vvd_status = false;
    emitter.on('test_gpio', () => {
        (vvd_status === 0) ? vvd_status = 1 : vvd_status = 0;
        vvd.write(vvd_status, err => {
			if (err) {console.log('err')}
		})
		
    });

    emitter.on('vds_gpio_power', (data) => {
		console.log(data);
        vds.write(data?1:0, err => {
            if (err) {console.log('err')}
        })
    });

    // button_start.watch((err, value) => {
        // if (err) {console.log('button_start Error', err);}
        // if (value===1) {emitter.emit('button_start');}
    // });

    // button_stop.watch((err, value) => {
        // if (err) {console.log('button_stop Error', err);}
        // if (value===0) {emitter.emit('button_stop');}
    // });

    button_alarm.watch((err, value) => {
        if (err) {console.log('button_alarm Error', err);}
        if (value===1) {emitter.emit('button_alarm', true);}
        if (value===0) {emitter.emit('button_alarm', false);}
    });

    // button_cooler.watch((err, value) => {
        // if (err) {console.log('button_cooler Error', err);}
        // if (value===1) {emitter.emit('button_cooler', true);}
    // });

    // button_blades.watch((err, value) => {
        // if (err) {console.log('button_blades Error', err);}
        // if (value===1) {emitter.emit('button_blades', true);}
    // });

    // switch_prepare.watch((err, value) => {
        // if (err) {console.log('switch_prepare Error', err);}
        // if (value===1) {emitter.emit('switch_prepare', true);}
        // if (value===0) {emitter.emit('switch_prepare', false);}
    // });
 };