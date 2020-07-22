import updateValue from "./change-value"
import KeyboardDisplay from "./keyboard-display"
import analogParameters from "./analog-parameters";

const reducer = (state, action) => {
  return {
    valueKeeper: updateValue(state, action),
    KeyboardDisplayKeeper: KeyboardDisplay(state, action),
    analogParametersKeeper: analogParameters(state, action)
  };
};

export default reducer;
