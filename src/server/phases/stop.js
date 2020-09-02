module.exports = {
  status : true,
  SetStatus : function (value, emitter) {
    this.status = value;
    emitter.emit('phase_stop');
  }
};
