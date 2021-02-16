class atv_class {
    constructor(name, address, min_fr) {
        this.name = name;
        this.address = address;
        this.min_fr = min_fr;
        global.emitter.on( this.name + '_new_prepare_fr', ( ) => {
            if (global.steps.prepare.status) {this.setFr(global.memory.retain.vds_prepare_fr)}
        });
        global.emitter.on('new_manual_vds_fr', () => {
            if (global.memory.operative.manual.vds) {this.setFr(global.memory.retain.manual.vds_fr)}
        });
        global.emitter.on('vds_new_manual_sp', () => {
            if (global.steps.roast.status) {this.setFr(global.memory.retain.vds_manual_sp)}
        });
    }

    power = false;
    fr = 0;
    fr_feedback = 0;
    status = undefined;

    SwitchPower = (value) => {
        this.power = value;
        global.emitter.emit(this.name + '_gpio_power', this.power);
        global.socket.emit('memory_change', {lamps:{[this.name + '_lamp'] : this.power}});
        if (global.steps.prepare.status) {this.setFr(global.memory.retain.vds_prepare_fr)}
        if (global.memory.operative.manual.vds) {this.setFr(global.memory.retain.manual.vds_fr)}
        if (global.steps.roast.status) {this.setFr(global.memory.retain.vds_manual_sp)}
    };

    setFr = (value) => {
        if (value >= this.min_fr) {
            this.fr = value;
        } else {
            this.fr = this.min_fr;
        }
        global.emitter.emit(this.name + '_set_fr', this.fr);
    };

    statusFeedBack = (data) => {
        this.status = data & 111;
        global.socket.emit(this.name + "_status_feedback", data);
    };

    frFeedBack = (data) => {
        this.fr_feedback = data;
        global.emitter.emit(this.name + "_fr_feedback", data);
        global.socket.emit(this.name + "_fr_feedback", data);
    }
}

module.exports = atv_class;