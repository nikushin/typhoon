const roast = {
  status : false,
  roastSecond: 0,
  SetStatus : function (value, emitter) {
    this.status = value;
    emitter.emit('phase_roast', value);
    if (value) {this.roastSecond = 0}
  },
};

module.exports = roast;

