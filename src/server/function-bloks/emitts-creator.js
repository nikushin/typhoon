module.exports.emittsCreator = function emittsCreator (emitter, emitts_models) {
  emitts_models.forEach(function(model) {
    model.observe.forEach(function(observe_arg) {
      emitter.on(observe_arg, () => {
        if (model.compare()) {model.do()}
      })
    });
  })
};
