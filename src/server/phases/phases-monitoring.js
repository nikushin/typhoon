const stop = require('./stop');
const prepare = require('./prepare');
const loading_roaster = require('./loading-roaster');
const roast = require('./roast');
const unloading_roaster = require('./unloading-roaster');
const cooling = require('./cooling');
const unloading_cooler = require('./unloading-cooler');
const {buttons_list} = require('../equipment/buttons-lamps');
const {emittsCreator} = require('../function-bloks/emitts-creator');

const emitts_model = (socket, emitter) => {
  return [
    {name: 'Phases stop to HMI',
      observe: ['phase_stop'],
      compare: function () {return true},
      do: () => {socket.emit("phases_status", {stop : stop.status})}
    },

    {name: 'Phases prepare to HMI',
      observe: ['phase_prepare'],
      compare: function () {return true},
      do: () => {socket.emit("phases_status", {prepare: prepare.status})}
    },

    {name: 'Phases prepare_start_delay to HMI',
      observe: ['phase_prepare_start_delay'],
      compare: function () {return true},
      do: () => {socket.emit("phases_status", {prepare_done: prepare.start_delay})}
    },

    {name: 'Phases loading_roaster to HMI',
      observe: ['phase_loading_roaster'],
      compare: function () {return true},
      do: () => {socket.emit("phases_status", {loading_roaster: loading_roaster.status})}
    },

    {name: 'Phases loading_roaster_start_delay to HMI',
      observe: ['phase_loading_roaster_start_delay'],
      compare: function () {return true},
      do: () => {socket.emit("phases_status", {loading_roaster_done: loading_roaster.start_delay})}
    },

    {name: 'Phases phase_roast to HMI',
      observe: ['phase_roast'],
      compare: function () {return true},
      do: () => {socket.emit("phases_status", {roast: roast.status})}
    },

    {name: 'Phases unloading_roaster to HMI',
      observe: ['phase_unloading_roaster'],
      compare: function () {return true},
      do: () => {socket.emit("phases_status", {unloading_roaster: unloading_roaster.status})}
    },

    {name: 'Phases cooling to HMI',
      observe: ['phase_cooling'],
      compare: function () {return true},
      do: () => {socket.emit("phases_status", {cooling: cooling.status})}
    },

    {name: 'Phases unloading_cooler to HMI',
      observe: ['phase_unloading_cooler'],
      compare: function () {return true},
      do: () => {socket.emit("phases_status", {unloading_cooler: unloading_cooler.status})}
    },

    {name: 'Stop to prepare monitoring',
      observe: ['button_prepare', 'phase_stop'],
      compare: function () {return buttons_list.button_prepare === true &&
        stop.status === true},
      do: () => {
        //console.log("Stop to prepare");
        stop.SetStatus(false, emitter); prepare.SetStatus(true, emitter);
      }},

    {name: 'Prepare to stop monitoring',
      observe: ['button_prepare', 'phase_prepare'],
      compare: function () {return buttons_list.button_prepare === false &&
        prepare.status === true},
      do: () => {
        //console.log("Prepare to stop");
        stop.SetStatus(true, emitter); prepare.SetStatus(false, emitter);
      }},

    {name: 'Prepare to loading-roaster monitoring',
      observe: ['button_start'],
      compare: function () {return prepare.start_delay === true},
      do: () => {
        // console.log("Prepare to loading-roaster");
        loading_roaster.SetStatus(true, emitter); prepare.SetStatus(false, emitter);
      }},

    {name: 'Loading-roaster to roast monitoring',
      observe: ['button_start'],
      compare: function () {return loading_roaster.start_delay === true},
      do: () => {
        // console.log("Loading-roaster to roast");
        loading_roaster.SetStatus(false, emitter); roast.SetStatus(true, emitter);
      }},

    {name: 'Roast to unload-roaster monitoring',
      observe: ['button_stop', 'roast_time_out'],
      compare: function () {return roast.status === true},
      do: () => {
        // console.log("Roast to unload-roaster");
        roast.SetStatus(false, emitter); unloading_roaster.SetStatus(true, emitter);
      }},

    {name: 'Unload-roaster to cooling monitoring',
      observe: ['phase_unloading_roaster_done'],
      compare: function () {return true},
      do: () => {
        // console.log("Unload-roaster to cooling");
        unloading_roaster.SetStatus(false, emitter); cooling.SetStatus(true, emitter);
      }},

    {name: 'Cooling to Unloading-cooler monitoring',
      observe: ['phase_cooling_done'],
      compare: function () {return true},
      do: () => {
        // console.log("Cooling to Unloading-cooler");
        cooling.SetStatus(false, emitter); unloading_cooler.SetStatus(true, emitter);
      }},

    {name: 'Unloading-cooler done monitoring',
      observe: ['phase_unloading_cooler_done'],
      compare: function () {return true},
      do: () => {
        unloading_cooler.SetStatus(false, emitter); stop.SetStatus(true, emitter);
      }},

  ];
};

const PhasesEmittsCreator = function (socket, emitter) {
  emittsCreator(emitter, emitts_model(socket, emitter))
};

module.exports.PhasesEmittsCreator = PhasesEmittsCreator;
