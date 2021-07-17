
class step_loading_roaster {
  constructor() {
    global.emitter.on('button_start', () => this.toRoast());
    global.emitter.on('temp_beans_new_value', () => {if (this.status) this.autoStartCheck()});
  }

  status = false;
  start_delay = false;
  start_delay_timeout = undefined;

  SetStatus = (value) => {
    this.status = value;
    global.socket.emit("phases_status", {loading_roaster : this.status});

    if (value) {

      global.vds.SwitchPower(false);
      global.heater.SwitchAllow(false);

      this.start_delay_timeout = setTimeout (()=>{
        this.start_delay = true;
        global.socket.emit("loading_roaster_done", {loading_roaster : this.start_delay});
      }, 3000);
    } else {
      clearTimeout(this.start_delay_timeout);
      this.start_delay = false;
      global.socket.emit("loading_roaster_done", {loading_roaster : this.start_delay});
    }
  };

  toRoast = () => {
    if (this.start_delay === true) {
      this.SetStatus (false);
      global.steps.roast.SetStatus(true);
    }
  };

  autoStartCheck = () => {
    const now_history = global.memory.history.temp_beans_history;
    const last_index = now_history.length - 1;
    const getNowSpeed = (index) =>
        (now_history[index][0] - now_history[index - 1][0]) /
        (now_history[index][1] / 100);
    const now_temp = now_history[last_index][0];
    const now_speed = getNowSpeed(last_index);
    if (now_temp < 150 && now_speed < 0.5)
      this.toRoast()
  };

}

module.exports = new step_loading_roaster();
