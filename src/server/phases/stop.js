class step_stop {
  constructor() {
    global.emitter.on('button_prepare',(value) => {
      if (!global.memory.operative.button_alarm) {
        this.toPrepare(value)
      }
    });

    global.emitter.on('button_alarm',(value) => {
      console.log('step stop button_alarm ' + value);
      if (!value && global.memory.operative.button_prepare) {
        this.toPrepare(value)
      }
    });

    global.emitter.on('new_manual_switch_on',() => {
      if (this.status) {this.ManualChange();}
    });

    global.emitter.on('new_manual_switch_vds',() => this.ManualVds());
    global.emitter.on('new_manual_switch_heat',() => this.ManualHeat());
    global.emitter.on('new_manual_switch_cooler',() => this.ManualCooler());
    global.emitter.on('new_manual_switch_blades',() => this.ManualBlades());
  }
  status = false;

  SetStatus = (value, toPrepare) => {
    this.status = value;
    if (this.status === true) {
      //global.cooler.SwitchPower(false);
      //global.blades.SwitchPower(false);
      global.vds.SwitchPower(false);
      global.heater.SwitchAllow(false);
    }
    if (global.memory.operative.manual.on) {
      this.ManualChange(false, toPrepare);
    }
    global.socket.emit("phases_status", {stop : this.status});
  };

  toPrepare = (value) => {
    if (this.status === true && value === true) {
      this.SetStatus (false, true);
      global.steps.prepare.SetStatus(true);
    }
  };

  ManualChange = (value, toPrepare) => {
    if (value === false) {
      global.memory.operative.manual.on = false;
    } else if (value === undefined) {
      global.memory.operative.manual.on = !global.memory.operative.manual.on;
    }
      if (!global.memory.operative.manual.on) {
        global.memory.operative.manual.on = false;
        global.memory.operative.manual.heat = false;
        global.memory.operative.manual.vds = false;
        global.memory.operative.manual.blades = false;
        global.memory.operative.manual.cooler = false;
        global.cooler.SwitchPower(false);
        global.blades.SwitchPower(false);
        if (toPrepare === true) {
          global.vds.SwitchPower(false);
          global.heater.SwitchAllow(false);
        }
    }
    global.socket.emit("memory_change", {manual:global.memory.operative.manual});
  };

  ManualVds = () => {
    if (global.memory.operative.manual.on) {
      global.memory.operative.manual.vds = !global.memory.operative.manual.vds;
      global.vds.SwitchPower(global.memory.operative.manual.vds);
      global.socket.emit("memory_change", {manual:{vds:global.memory.operative.manual.vds}});
    }
  };

  ManualHeat = () => {
    if (global.memory.operative.manual.on) {
      global.memory.operative.manual.heat = !global.memory.operative.manual.heat;
      global.heater.SwitchAllow(global.memory.operative.manual.heat);
      global.socket.emit("memory_change", {manual:{heat:global.memory.operative.manual.heat}});
    }
  };

  ManualCooler = () => {
    if (global.memory.operative.manual.on) {
      global.memory.operative.manual.cooler = !global.memory.operative.manual.cooler;
      global.cooler.SwitchPower(global.memory.operative.manual.cooler);
      global.socket.emit("memory_change", {manual:{cooler:global.memory.operative.manual.cooler}});
    }
  };

  ManualBlades = () => {
    if (global.memory.operative.manual.on) {
      global.memory.operative.manual.blades = !global.memory.operative.manual.blades;
      global.blades.SwitchPower(global.memory.operative.manual.blades);
      global.socket.emit("memory_change", {manual:{blades:global.memory.operative.manual.blades}});
    }
  };

  EmergencyStop = () => {
      global.steps.stop.status = true;
      global.steps.prepare.status = false;
      global.steps.loading_roaster.status = false;
      global.steps.roast.status = false;
      global.steps.cooling.status = false;
      global.vds.SwitchPower(false);
      global.heater.SwitchAllow(false);
      global.cooler.SwitchPower(false);
      global.blades.SwitchPower(false);

      global.socket.emit("phases_status", {stop : global.steps.stop.status,
      prepare: global.steps.prepare.status,
      prepare_done: global.steps.prepare.start_delay,
      loading_roaster: global.steps.loading_roaster.status,
      roast: global.steps.roast.status,
      cooling: global.steps.cooling.status,
      });

    global.memory.operative.manual.on = false;
    global.memory.operative.manual.heat = false;
    global.memory.operative.manual.vds = false;
    global.memory.operative.manual.blades = false;
    global.memory.operative.manual.cooler = false;
    global.socket.emit("memory_change", {manual:global.memory.operative.manual});

    clearTimeout(global.steps.prepare.start_delay_timeout);
    clearTimeout(global.steps.loading_roaster.start_delay_timeout);
    global.steps.loading_roaster.start_delay = false;
    clearTimeout(global.steps.roast.roast_finish_delay_timeout);
    global.steps.roast.roast_finish_delay = false;
  };

}

module.exports = new step_stop();