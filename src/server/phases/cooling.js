class step_cooling {
  constructor() {
    global.emitter.on('new_cooling_time', (value) => this.NewCoolingTime(value));
    global.emitter.on('button_cooler', () => {
      if (this.status) {this.Finish()}
    })
  }
  status = false;
  coolingSecond = 0;

  SetStatus = (value) => {
    this.status = value;
    if (value) {
      global.vds.SwitchPower(false);
      global.heater.SwitchAllow(false);
      global.cooler.SwitchPower(true);
      global.blades.SwitchPower(true);
    } else {
      this.coolingSecond = 0;
    }
    global.socket.emit("phases_status", {cooling : this.status});
  };

  NewCoolingTime = (value) => {
    global.socket.emit("every_second_data", {
      coolingData: value - this.coolingSecond,
    });
  };

  CoolingTick = () => {
    const fullTime = global.memory.retain.cooling_time;
    if (!this.status) {return fullTime}
    this.coolingSecond += 1;

    if (this.coolingSecond >= fullTime) {
      this.Finish();
      return fullTime
    }
    return fullTime - this.coolingSecond;
  };

  toUnloadingCooler = () => {
      this.SetStatus (false);
      global.steps.unloading_cooler.SetStatus(true);
  };

  Finish = () => {
    console.log('Finish');
    this.SetStatus (false);
    global.cooler.SwitchPower(false);
    if (!global.steps.prepare.status && !global.steps.loading_roaster.status &&
        !global.steps.roast.status && !global.steps.cooling.status) {
      if (global.memory.operative.button_prepare) {
        global.steps.prepare.SetStatus(true);
      } else {
        global.steps.stop.SetStatus(true);
      }
    }
  }

}

module.exports = new step_cooling();
