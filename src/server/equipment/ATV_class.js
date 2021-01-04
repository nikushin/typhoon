const {emitter} = require("../server");
const {socket_all} = require('../server');

class atv_class {
    constructor(name, adress, min_fr) {
        this.name = name;
        this.adress = adress;
        this.min_fr = min_fr;
    }

    power = false;
    fr = 0;
    fr_feedback = 0;
    status = undefined;
    last_cmd = undefined;
    loop_busy = false;

    switchPower = (data) => {
        this.power = data;
        emitter.emit(this.name + '_gpio_power', this.power);
        if (!this.loop_busy) {
            this.loop_busy = true;
            this.switchPowerLoop()
        }
    };
    switchPowerLoop = () => {
        if  (this.power === true) { //пуск
            console.log('status ',this.status);
            if (this.status === 8 && this.last_cmd !== 128) { //если неисправность, сбросим её
                this.last_cmd = 128;
                emitter.emit(this.name + '_set_cmd', this.last_cmd);
            }
            if ((this.status === 64 || this.status === 80) && this.last_cmd !== 6) { //если включение заблокировано
                this.last_cmd = 6;
                emitter.emit(this.name + '_set_cmd', this.last_cmd);
            }
            if ((this.status === 33 || this.status === 49) && this.last_cmd !== 7) { //если готов к включению
                this.last_cmd = 7;
                emitter.emit(this.name + '_set_cmd', this.last_cmd);
            }
            if ((this.status === 35 || this.status === 39) && this.last_cmd !== 15) { //если включен и готов
                this.last_cmd = 15;
                emitter.emit(this.name + '_set_cmd', 15);
            }
            if (this.status !== 7) {
                setTimeout(this.switchPowerLoop, 500);
            } else {
                this.last_cmd = undefined;
                this.loop_busy = false;
            }
        } else { //остановка
            console.log('status ',this.status);
            if (this.status === 39 && this.last_cmd !== 4111) { // ?????
                this.last_cmd = 4111;
                emitter.emit(this.name + '_set_cmd', this.last_cmd);
            }
            if (this.status === 7 && this.last_cmd !== 0) { //если активирована остановка
                this.last_cmd = 0;
                emitter.emit(this.name + '_set_cmd', 0);
            }
            if (this.status !== 35) {
                setTimeout(this.switchPowerLoop, 500);
            } else {
                this.last_cmd = undefined;
                this.loop_busy = false;
            }
        }
    };

    setFr = (value) => {

        if (value >= this.min_fr) {
            this.fr = value;
        } else {
            this.fr = this.min_fr;
        }
        emitter.emit(this.name + '_set_fr', this.fr);
    };

    statusFeedBack = (data) => {
        this.status = data & 111;
        socket_all.emit(this.name + "_status_feedback", data);
    };

    frFeedBack = (data) => {
        this.fr_feedback = data;
        socket_all.emit(this.name + "_fr_feedback", data);
    }
}

module.exports = atv_class;