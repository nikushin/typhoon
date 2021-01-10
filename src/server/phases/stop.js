class step_stop {
  constructor() {
    global.emitter.on('button_prepare',(value) => this.toPrepare(value));
  }
  status = false;
  SetStatus = (value) => {
    this.status = value;
    if (this.status === true) {
      global.cooler.SwitchPower(false);
      global.blades.SwitchPower(false);
      global.vds.switchPower(false);
      global.heater.SwitchAllow(false);
    }
    global.socket.emit("phases_status", {stop : this.status});
  };

  toPrepare = (value) => {
    if (this.status === true && value === true) {
      this.SetStatus (false);
      global.steps.prepare.SetStatus(true);
    }
  }

}

module.exports = new step_stop();