class universal_motor {
    constructor(name) {
        this.name = name;
        global.emitter.on(this.name + '_switch_power',(value) => this.SwitchPower(value));
        global.emitter.on('button_' + this.name,() => this.ManualSwitchPower());
    }
    power = false;
    manual = false;
    SwitchPower = (value) => {
        this.power = value;
        if (this.power) {
            this.manual = false;
            global.emitter.emit(this.name + '_gpio_switch_lamp', this.manual);
            global.socket.emit('memory_change', {lamps:{[this.name + '_manual_lamp'] : this.manual}});
        }
        global.emitter.emit(this.name + '_gpio_switch_power', this.power);
        global.socket.emit('memory_change', {lamps:{[this.name + '_lamp'] : this.power}});
    };

    ManualSwitchPower = () => {
        if (!global.global.steps.cooling.status && !global.memory.operative.manual.on) {
            this.manual = !this.manual;
            global.emitter.emit(this.name + '_gpio_switch_power', this.manual);
            global.emitter.emit(this.name + '_gpio_switch_lamp', this.manual);

            global.socket.emit('memory_change', {lamps:{
                [this.name + '_lamp'] : this.manual,
                [this.name + '_manual_lamp'] : this.manual
            }});
        }
    };

}

module.exports = universal_motor;