const { Gpio } = require( 'onoff' );
const socket = global.socket;
const emitter = global.emitter;

module.exports = function gpioCreate () {
    const button_start = new Gpio('18', 'in', 'rising');
    const button_stop = new Gpio('23', 'in', 'falling');
    const button_alarm = new Gpio('24', 'in', 'both');
    const button_cooler = new Gpio('25', 'in', 'rising');
    const button_blades = new Gpio('7', 'in', 'rising');
    const switch_prepare = new Gpio('16', 'in', 'both');

    // const vvd = new Gpio(20, 'out'); //test
    const vds = new Gpio('11', 'out');
    const heat_starter = new Gpio('27', 'out');
    const cooler_starter = new Gpio('22', 'out');
    const blades_starter = new Gpio('5', 'out');
    //const cyclone_starter = new Gpio('5', 'out');
    const lamp_cooler = new Gpio('26', 'out');
    const lamp_blades = new Gpio('21', 'out');

    // let vvd_status = false;
    // emitter.on('test_gpio', () => {
    //     (vvd_status === 0) ? vvd_status = 1 : vvd_status = 0;
    //     vvd.write(vvd_status, err => {
	// 		if (err) {console.log('err')}
	// 	})
    // });

    //outputs
    emitter.on('blades_gpio_switch_power', (data) => {
		console.log('blades_gpio_switch_power ', data);
        blades_starter.write(data?1:0, err => {
            if (err) {console.log('err blades_starter')}
        });
        lamp_blades.write(data?1:0, err => {
            if (err) {console.log('err lamp_blades')}
        });
    });

    emitter.on('cooler_gpio_switch_power', (data) => {
		console.log('cooler_gpio_switch_power ', data);
        cooler_starter.write(data?1:0, err => {
            if (err) {console.log('err cooler_starter')}
        });
        lamp_cooler.write(data?1:0, err => {
            if (err) {console.log('err lamp_cooler')}
        });
    });

    emitter.on('vds_gpio_power', (data) => {
	    console.log('vds_gpio_power ', data);
        vds.write(data?1:0, err => {
            if (err) {console.log('err')}
        })
    });

    emitter.on('heater_gpio_switch_power', (data) => {
        vds.write(data?1:0, err => {
            if (err) {console.log('err')}
        })
    });

    heat_starter.write(1, err => {
        if (err) {console.log('err heat_starter')}
    });

    //inputs
    let button_cooler_bounce = false;
    button_cooler.watch((err, value) => {
        if (err) {console.log('button_cooler Error', err); return}
        if (value===1) {
            if (!button_cooler_bounce) {
                setTimeout (()=>{
                    button_cooler_bounce = false
                }, 300);
                button_cooler_bounce = true;
                emitter.emit('button_cooler'); console.log('button_cooler')
            }
        }
    });

    let button_blades_bounce = false;
    button_blades.watch((err, value) => {
        if (err) {console.log('button_blades Error', err); return}
        if (value===1) {
            if (!button_blades_bounce) {
                setTimeout (()=>{
                    button_blades_bounce = false
                }, 300);
                button_blades_bounce = true;
                emitter.emit('button_blades'); console.log('button_blades')
            }
        }
    });

    button_start.watch((err, value) => {
        if (err) {console.log('button_start Error', err); return}
        if (value===1) {emitter.emit('button_start'); console.log('button_start')}
    });

    button_stop.watch((err, value) => {
        if (err) {console.log('button_stop Error', err); return}
        if (value===0) {emitter.emit('button_stop'); console.log('button_stop')}
    });

    const button_alarm_body = (err, value)  => {
        if (err) {console.log('button_alarm Error', err); return}
        (value === 1) ? global.memory.operative.button_alarm = false : global.memory.operative.button_alarm = true;
        if (value===1) {emitter.emit('button_alarm', false); console.log('button_alarm ' + false)}
        if (value===0) {
            global.steps.stop.EmergencyStop();
            emitter.emit('button_alarm', true); console.log('button_alarm ' + true);
        }
    };
    button_alarm.read((err, value) => {button_alarm_body(err, value)});
    button_alarm.watch((err, value) => {button_alarm_body(err, value)});

    const switch_prepare_body = (err, value)  => {
        if (err) {console.log('switch_prepare Error', err); return}
        (value === 1) ? global.memory.operative.button_prepare = true : global.memory.operative.button_prepare = false;
        if (value===1) {emitter.emit('button_prepare', true); console.log('button_prepare ' + true)}
        if (value===0) {emitter.emit('button_prepare', false); console.log('button_prepare ' + false)}
    };
    switch_prepare.read((err, value) => {switch_prepare_body(err, value)});
    switch_prepare.watch((err, value) => {switch_prepare_body(err, value)});

 };