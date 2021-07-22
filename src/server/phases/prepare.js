class step_prepare {
  constructor() {
    global.emitter.on('button_prepare',(value) => this.ButtonPrepare(value));
    global.emitter.on('button_start',() => this.toLoadingRoaster());
  }
  status = false;
  SetStatus = (value) => {
	  console.log('Подготовка ', value);
    this.status = value;
    if (value) {
      global.vds.SwitchPower(true);
      global.heater.SwitchAllow(true);
    }
    global.socket.emit("phases_status", {prepare : this.status});
  };

  ButtonPrepare = (value) => {
    if (this.status === true && value === false) {
      this.SetStatus (false);
      if (!global.steps.loading_roaster.status && !global.steps.roast.status &&
          !global.steps.cooling.status) {
        global.steps.stop.SetStatus(true);
      }
    }

    if (value === true && this.status === false && !global.steps.stop.status && !global.steps.loading_roaster.status &&
        !global.steps.roast.status && !global.steps.roast.roast_finish_delay) {
      this.SetStatus (true);
    }
  };

  toLoadingRoaster = () => {
      this.SetStatus (false);
      global.steps.loading_roaster.SetStatus(true);
  }

}

module.exports = new step_prepare();

