class universal_motor {
    constructor(name) {
        this.name = name;
        global.emitter.on(this.name + '_switch_power',(value) => this.SwitchPower(value));
    }
    power = false;
    SwitchPower = (value) => {
        this.power = value;
        global.emitter.emit(this.name + '_gpio_switch_power', this.power);
    }
}

module.exports = universal_motor;