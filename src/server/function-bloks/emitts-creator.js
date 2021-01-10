// const {emitter} = require("../server");

module.exports.emittsCreator = function emittsCreator (emitts_models) {
  emitts_models.forEach(function(model) {
    model.observe.forEach(function(observe_arg) {
      global.emitter.on(observe_arg, () => {
        if (model.compare()) {model.do()}
      })
    });
  })
};
