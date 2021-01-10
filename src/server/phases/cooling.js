class step_cooling {
  Constructor() {
    global.emitter.on('new_cooling_time', (value) => this.NewCoolingTime(value));
  }
  status = false;
  coolingSecond = 0;

  SetStatus = (value) => {
    this.status = value;
    if (value) {

      global.vds.switchPower(false);
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
      this.toUnloadingCooler();
      return fullTime
    }
    return fullTime - this.coolingSecond;
  };

  toUnloadingCooler = () => {
      this.SetStatus (false);
      global.steps.unloading_cooler.SetStatus(true);
  }
}

module.exports = new step_cooling();
