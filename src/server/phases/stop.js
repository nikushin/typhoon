class step_stop {
  constructor() {
    global.emitter.on('button_prepare',(value) => this.toPrepare(value));
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
      global.cooler.SwitchPower(false);
      global.blades.SwitchPower(false);
      global.vds.SwitchPower(false);
      global.heater.SwitchAllow(false);
    }
    this.ManualChange(false, toPrepare);
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

}

module.exports = new step_stop();