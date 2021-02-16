// const arr = global.memory.recipe.data.heat_setting_arr;

class step_roast {
  constructor() {
    global.emitter.on('button_stop', () => this.toUnloadingRoaster());
    global.emitter.on('new_roast_mode', () => this.NewRoastMode());
  }
  status = false;
  roast_finish_delay = false;
  roast_finish_delay_timeout = undefined;
  roastSecond = 0;

  SetStatus = (value) => {
    this.status = value;
    if (value) {
      this.roastSecond = 0;

      global.vds.SwitchPower(true);
      global.heater.SwitchAllow(true);
    } else {
      this.NewRoastMode()
    }
    global.socket.emit("phases_status", {roast : this.status});
  };

  NewRoastMode = () => {
    const arr = global.memory.recipe.data.heat_setting_arr;
    let roast_power = 0;
    if (global.memory.retain.roast_mode_auto) {
      if (this.status) {
      arr.forEach( (item) => {if (item[0] <= this.roastSecond) {roast_power = item[1]}});
      } else {
        arr.forEach( (item) => {if (item[0] <= 0) {roast_power = item[1]}});
      }
    } else {
        if (this.status) {
        arr.forEach( (item) => {if (item[0] <= this.roastSecond) {roast_power = item[1]}});
        global.memory.retain.heat_manual_sp = roast_power;
      } else {
        roast_power = global.memory.retain.heat_manual_sp;
      }
    }
    global.socket.emit('memory_change', {heat_power_indicator: roast_power});
  };

  toUnloadingRoaster = () => {
    this.roast_finish_delay = true;
    this.roast_finish_delay_timeout = setTimeout (() => {
      this.roast_finish_delay = false;
      if (global.memory.operative.button_prepare) {
        global.steps.prepare.SetStatus(true);
      }
    }, 5000);
      this.SetStatus (false);
      global.steps.cooling.SetStatus(true);
  };

  RoastTick = () => {
    if (!this.status) {return undefined}
    if (this.roastSecond > 500) {
      this.toUnloadingRoaster();
      return undefined
    }
	const arr = global.memory.recipe.data.heat_setting_arr;
    let roast_power = 0;
    if (global.memory.retain.roast_mode_auto) {
      arr.forEach( (item) => {
        if (item[0] <= this.roastSecond) {roast_power = item[1]}
      });
    } else {
      roast_power = global.memory.retain.heat_manual_sp;
    }
    global.heater.SetRoastPower(roast_power);
    const data = {roast_power: roast_power, roast_second: this.roastSecond};
    this.roastSecond +=1;
    return data
  }

}

module.exports = new step_roast();
