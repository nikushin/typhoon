const Phases = (state, action) => {

  if (state === undefined) {
    return {
      stop: false,
      prepare: false,
      prepare_done: false,
      loading_roaster: false,
      loading_roaster_done : false,
      roast: false,
      unloading_roaster: false,
      cooling: false,
      unloading_cooler: false,
    };
  }

  switch (action.type) {
    case 'CHANGE_PHASE':
      if (action.payload.stop === undefined) {action.payload.stop = state.PhasesKeeper.stop}
      if (action.payload.prepare === undefined) {action.payload.prepare = state.PhasesKeeper.prepare}
      if (action.payload.prepare_done === undefined) {action.payload.prepare_done = state.PhasesKeeper.prepare_done}
      if (action.payload.loading_roaster === undefined) {action.payload.loading_roaster = state.PhasesKeeper.loading_roaster}
      if (action.payload.loading_roaster_done === undefined) {action.payload.loading_roaster_done = state.PhasesKeeper.loading_roaster_done}
      if (action.payload.roast === undefined) {action.payload.roast = state.PhasesKeeper.roast}
      if (action.payload.unloading_roaster === undefined) {action.payload.unloading_roaster = state.PhasesKeeper.unloading_roaster}
      if (action.payload.cooling === undefined) {action.payload.cooling = state.PhasesKeeper.cooling}
      if (action.payload.unloading_cooler === undefined) {action.payload.unloading_cooler = state.PhasesKeeper.unloading_cooler}

      return {...state.PhasesKeeper,
        stop: action.payload.stop,
        prepare: action.payload.prepare,
        prepare_done: action.payload.prepare_done,
        loading_roaster: action.payload.loading_roaster,
        loading_roaster_done: action.payload.loading_roaster_done,
        roast: action.payload.roast,
        unloading_roaster: action.payload.unloading_roaster,
        cooling: action.payload.cooling,
        unloading_cooler: action.payload.unloading_cooler
      };

    case 'SOME_THING':
      return state.PhasesKeeper;

    default:
      return state.PhasesKeeper;
  }
};

export default Phases;
