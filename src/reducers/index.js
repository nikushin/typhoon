import KeyboardDisplay from "./keyboard-display"
import analogParameters from "./analog-parameters";
import Phases from "./phases";
import graphParameters from "./graph";
import graphSettingsParameters from "./graph-settings";
import RecipeParameters from './recipe-parameters'
import updateMain from "./main";
import Manual from "./manual";
const reducer = (state, action) => {
  return {
    mainKeeper: updateMain(state, action),
    KeyboardDisplayKeeper: KeyboardDisplay(state, action),
    analogParametersKeeper: analogParameters(state, action),
    PhasesKeeper: Phases(state, action),
    graphKeeper: graphParameters(state, action),
    graphSettingsKeeper: graphSettingsParameters(state, action),
    recipeKeeper: RecipeParameters(state, action),
    ManualKeeper: Manual(state, action),
  };
};

export default reducer;
