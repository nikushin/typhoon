
class step_loading_roaster {
  constructor() {
    global.emitter.on('button_start', () => this.toRoast());
  }

  status = false;
  start_delay = false;
  start_delay_timeout = undefined;

  SetStatus = (value) => {
    this.status = value;
    global.socket.emit("phases_status", {loading_roaster : this.status});

    if (value) {

      global.vds.switchPower(false);
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
  }

}

module.exports = new step_loading_roaster();
