let start_delay = null;

module.exports = {
  status: false,
  start_delay : false,
  SetStatus : function (value, emitter) {
    //console.log("phase_prepare " + value);
    this.status = value;
    emitter.emit('phase_prepare', value);

    if (value) {
      start_delay = setTimeout (()=>{
        this.start_delay = true;
        //console.log("phase_prepare_start_delay " + this.start_delay);
        emitter.emit('phase_prepare_start_delay');
        }, 3000);
    } else {
      clearTimeout(start_delay);
      this.start_delay = false;
      //console.log("phase_prepare_start_delay " + this.start_delay);
      emitter.emit('phase_prepare_start_delay');
    }
  }
};
