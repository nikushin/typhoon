module.exports = {
  status : false,
  SetStatus : function (value, emitter) {
    this.status = value;
    emitter.emit('phase_roast', value);
    if (value) {
      this.timeover = setTimeout(() => emitter.emit('roast_time_out') , 100*1000)
    } else {
      clearTimeout(this.timeover)
    }
  }
};
