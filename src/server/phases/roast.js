class step_roast {
  constructor() {
    global.emitter.on('button_stop', () => this.toUnloadingRoaster());
  }
  status = false;
  roast_finish_delay = false;
  roast_finish_delay_timeout = undefined;
  roastSecond = 0;

  SetStatus = (value) => {
    this.status = value;
    if (value) {
      this.roastSecond = 0;

      global.vds.switchPower(true);
      global.heater.SwitchAllow(true);
    }
    global.socket.emit("phases_status", {roast : this.status});
  };

  toUnloadingRoaster = () => {
    this.roast_finish_delay = true;
    this.roast_finish_delay_timeout = setTimeout (() => {
      this.roast_finish_delay = false;
      if (global.memory.operative.button_prepare) {
        global.steps.prepare.SetStatus(true);
      }
    }, 10000);
      this.SetStatus (false);
      global.steps.cooling.SetStatus(true);
  };

  RoastTick = () => {
    if (!this.status) {return undefined}

    if (this.roastSecond > 500) {
      this.toUnloadingRoaster();
      return undefined
    }
    let roast_power = 0;
    const arr = global.memory.recipe.data.heat_setting_arr;
    arr.forEach( (item) => {
      if (item[0] <= this.roastSecond) {roast_power = item[1]}
    });
    global.heater.SetRoastPower(roast_power);
    const data = {roast_power: roast_power, roast_second: this.roastSecond};
    this.roastSecond +=1;
    return data
  }

}

module.exports = new step_roast();
