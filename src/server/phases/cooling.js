let start_delay = null;

module.exports = {
  status : false,
  start_delay : false,
  SetStatus : function (value, emitter) {
    this.status = value;
    emitter.emit('phase_cooling');

    if (value) {
      start_delay = setTimeout (()=>{
        this.start_delay = true;
        emitter.emit('phase_cooling_done');
        console.log("phase_cooling_done")
      }, 3000);
    } else {
      clearTimeout(start_delay);
      this.start_delay = false;
    }
  }
};
