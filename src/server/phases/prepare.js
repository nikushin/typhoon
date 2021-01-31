class step_prepare {
  constructor() {
    global.emitter.on('button_prepare',(value) => this.ButtonPrepare(value));
    global.emitter.on('button_start',() => this.toLoadingRoaster());
  }
  status = false;
  start_delay = false;
  start_delay_timeout = undefined;
  SetStatus = (value) => {
    this.status = value;
    if (value) {
      this.start_delay_timeout = setTimeout (()=> {
        this.start_delay = true;
        global.socket.emit("phases_status", {prepare_done : this.start_delay});
      }, 3000);

      global.vds.SwitchPower(true);
      global.heater.SwitchAllow(true);

    } else {
      clearTimeout(this.start_delay_timeout);
      this.start_delay = false;
      global.socket.emit("phases_status", {prepare_done : this.start_delay});
    }
    global.socket.emit("phases_status", {prepare : this.status});
  };

  ButtonPrepare = (value) => {
    if (this.status === true && value === false) {
      this.SetStatus (false);
      if (!global.steps.loading_roaster.status && !global.steps.roast.status &&
          !global.steps.cooling.status && !global.steps.unloading_cooler.status) {
        global.steps.stop.SetStatus(true);
      }
    }

    if (value === true && this.status === false && !global.steps.stop.status && !global.steps.loading_roaster.status &&
        !global.steps.roast.status && !global.steps.roast.roast_finish_delay) {
      this.SetStatus (true);
    }
  };

  toLoadingRoaster = () => {
    if (this.start_delay === true) {
      this.SetStatus (false);
      global.steps.loading_roaster.SetStatus(true);
    }
  }

}

module.exports = new step_prepare();

