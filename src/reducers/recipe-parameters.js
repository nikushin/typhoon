import socketService from "../services/socket-service";
import {getY} from "./graph-settings"
import {get_path_arr_heat} from './graph'
const RecipeParameters = (state, action) => {

    if (state === undefined) {
        return {
            id: null,
            name: "",
            test: "test1",
            current: null,
            amount: null,
        };
    }

    switch (action.type) {

        case 'RECIPE_ADD' :
            socketService.SocketEmmit('recipe_add', state.recipeKeeper.id);
            return {...state.recipeKeeper};

        case 'RECIPE_SAVE' :
            const sendData = {data:{}};
            sendData.data.test = 10;
            sendData.data.heat_setting_arr = state.graphSettingsKeeper.arr_heat;
            sendData.id = state.recipeKeeper.id;
            sendData.name = state.recipeKeeper.name;
            socketService.SocketEmmit('recipe_save', sendData);
            return {...state.recipeKeeper};

        case 'RECIPE_INIT' :
            console.log(action.payload.recipe_data);
            if (action.payload.recipe_data && action.payload.recipe_data.heat_setting_arr) {
                state.graphSettingsKeeper.arr_heat = action.payload.recipe_data.heat_setting_arr;
            } else {
                state.graphSettingsKeeper.arr_heat = [[0,0]]
            }
            state.graphKeeper.path_arr_heat = get_path_arr_heat(state.graphSettingsKeeper.arr_heat,0);
            state.graphSettingsKeeper.cursor_y =
              getY(state.graphSettingsKeeper.cursor_x, state.graphSettingsKeeper.arr_heat);
            return {...state.recipeKeeper,
                current: action.payload.current,
                amount: action.payload.amount,
                name: action.payload.name,
                id: action.payload.id};

        // case 'RECIPE_RIGHT' :
        //     return {...state.recipeKeeper};

        default:
            return state.recipeKeeper;
    }
};

export default RecipeParameters;
