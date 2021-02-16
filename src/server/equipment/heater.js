
class heater {
    constructor() {
        global.emitter.on('temp_beans_new_value', () => {
            if (global.steps.prepare.status) {this.SetPreparePower()}
            if (global.memory.operative.manual.heat) {this.SetManualPower()}
        });

        global.emitter.on('new_temp_prepare_sp', () => {
            if (global.steps.prepare.status) {this.SetPreparePower()}
        });

        global.emitter.on('new_manual_temp_sp', () => {
            if (global.memory.operative.manual.on) {this.SetManualPower()}
        });

        global.emitter.on('vds_fr_feedback',() => {
            if (this.allow === true) {this.SwitchAllow(true)}
        });
    }

    allow = false;
    on = false;
    power = 0;

    SwitchAllow = (value) => {
        this.allow = value;
        if (this.allow === true) {
            if (global.vds.fr_feedback >= global.vds.min_fr) {
                this.SwitchOn(true)
            } else if (global.vds.frFeedBack < global.vds.min_fr - 1) {
                this.SwitchOn(false)
            }
        } else {
            this.SwitchOn(false)
        }
    };

    SwitchOn = (value) => {
        this.on = value;
        if (this.on === true) {
            if (global.steps.prepare.status) {
                this.SetPreparePower(global.memory.operative.temp_beans)
            }
            if (global.steps.roast.status) {
                this.SetRoastPower(global.memory.recipe.data.heat_setting_arr[0][1])
            }
            if (global.memory.operative.manual.on) {
                this.SetManualPower(global.memory.operative.temp_beans)
            }
        } else {
            global.emitter.emit('heater_gpio_switch_power', 0);
        }
        global.socket.emit('memory_change', {heat_lamp: this.on});
    };

    SetRoastPower = (value) => {
        this.power = value;
        if (this.on) {global.emitter.emit('heater_gpio_switch_power', this.power);}
    };

    SetPreparePower = () => {
        if (global.memory.operative.temp_beans < global.memory.recipe.data.temp_prepare_sp) {
            this.power = 100;
        } else {
            this.power = 0;
        }
        if (this.on) {global.emitter.emit('heater_gpio_switch_power', this.power);}
    };

    SetManualPower = () => {
        if (global.memory.operative.temp_beans < global.memory.retain.manual.temp_sp) {
            this.power = 100;
        } else {
            this.power = 0;
        }
        if (this.on) {global.emitter.emit('heater_gpio_switch_power', this.power);}
        // console.log('temp_beans' + global.memory.operative.temp_beans);
        // console.log('temp_sp' + global.memory.retain.manual.temp_sp);
        // console.log('SetManualPower' + this.power)
    };

}

module.exports = heater;