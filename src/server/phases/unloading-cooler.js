class step_unloading_cooler {
  status = false;
  delay = false;
  delay_timeout = undefined;
  SetStatus = (value) => {
    this.status = value;
    if (value) {

      global.cooler.SwitchPower(false);

      this.delay_timeout = setTimeout (()=>{
        this.delay = true;
        this.Finish()
      }, 3000);
    } else {
      clearTimeout(this.delay_timeout);
      this.delay = false;
    }
    global.socket.emit("phases_status", {unloading_cooler : this.status});
  };

  Finish = () => {
    this.SetStatus (false);
    global.blades.SwitchPower(false);
    if (!global.steps.prepare.status && !global.steps.loading_roaster.status &&
        !global.steps.roast.status && !global.steps.cooling.status) {
      if (global.memory.operative.button_prepare) {
        global.steps.prepare.SetStatus(true);
      } else {
        global.steps.stop.SetStatus(true);
      }
      clearTimeout(global.steps.roast.roast_finish_delay_timeout)
    }
  }
}

module.exports = new step_unloading_cooler();