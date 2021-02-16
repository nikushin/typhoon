class universal_motor {
    constructor(name) {
        this.name = name;
        global.emitter.on(this.name + '_switch_power',(value) => this.SwitchPower(value));
        global.emitter.on('button_' + this.name,() => this.ManualSwitchPower());
    }
    power = false;

    SwitchPower = (value) => {
        this.power = value;
        global.emitter.emit(this.name + '_gpio_switch_power', this.power);
        global.socket.emit('memory_change', {lamps:{[this.name + '_lamp'] : this.power}});
    };

    ManualSwitchPower = () => {
        if (!global.global.steps.cooling.status && !global.memory.operative.manual.on) {
            this.power = !this.power;
            this.SwitchPower(this.power);
        }
    };

}

module.exports = universal_motor;