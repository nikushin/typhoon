import socketService from "../services/socket-service";
import {get_path_arr_heat} from './graph'

export const getY = (x, arr) => {
    if (arr.length === 0) {return 0}
    let findY = undefined;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][0] > x) {return findY}
        findY = arr[i][1];
        if (i === arr.length-1) {return findY}
    }
};

const graphSettingsParameters = (state, action) => {

    const arr_change = (new_change) => {
        let end_value = undefined;
        let value = undefined;
        const arr = state.graphSettingsKeeper.arr_heat;

        if (state.graphSettingsKeeper.cursor_x === 900) {return arr}

        arr.forEach(function(item, i, arr) {
            if (item[0] <= state.graphSettingsKeeper.cursor_x + state.graphSettingsKeeper.step) {
                end_value = item[1]
            }
            if (item[0] <= state.graphSettingsKeeper.cursor_x) {
                value = item[1]
            }
            if (!end_value) {end_value = 0}
            if (!value) {value = 0}
        });

        for (let i = arr.length; i--; ) {
            if (state.graphSettingsKeeper.cursor_x <= arr[i][0] &&
              state.graphSettingsKeeper.cursor_x + state.graphSettingsKeeper.step >= arr[i][0]) {
                arr.splice(i, 1)
            }
        }

        let number_item_to_add = undefined;
        state.graphSettingsKeeper.arr_heat.forEach(function(item, i, arr) {
            if (item[0] < state.graphSettingsKeeper.cursor_x) {
                number_item_to_add = i+1;
            }
        });
        if (!number_item_to_add) {number_item_to_add = 0}

        let new_value = undefined;
        const step = state.graphSettingsKeeper.cursor_x + state.graphSettingsKeeper.step;

        new_value = new_change;
        if (new_value > 100) {new_value = 100}
        if (new_value < 0) {new_value = 0}

        if (step < 900) {
            arr.splice(number_item_to_add, 0,
              [state.graphSettingsKeeper.cursor_x, new_value],
              [step, end_value]
            );
        } else {
            arr.splice(number_item_to_add, 0,
              [state.graphSettingsKeeper.cursor_x, new_value]
            );
        }
        return arr
    };
    const arr_aline = () => {
        let value = undefined;
        const arr = state.graphSettingsKeeper.arr_heat;

        arr.forEach(function(item, i, arr) {
            if (item[0] <= state.graphSettingsKeeper.cursor_x) {
                value = item[1]
            }
            if (!value) {value = 0}
        });

        for (let i = arr.length; i--; ) {
            if (state.graphSettingsKeeper.cursor_x <= arr[i][0]) {
                arr.splice(i, 1)
            }
        }

        let number_item_to_add = undefined;
        state.graphSettingsKeeper.arr_heat.forEach(function(item, i, arr) {
            if (item[0] < state.graphSettingsKeeper.cursor_x) {
                number_item_to_add = i+1;
            }
        });
        if (!number_item_to_add) {number_item_to_add = 0}

        arr.splice(number_item_to_add, 0,
          [state.graphSettingsKeeper.cursor_x, value]
        );
        return arr
    };

    if (state === undefined) {
        return {
            cursor_x: 0,
            cursor_y: 0,
            arr_heat: [[0,0]],
            step: 60,
            steps : [1, 5, 10, 60]
        };
    }

    switch (action.type) {

        case 'CHANGE_STEP':
            socketService.SocketEmmit('memory_change', {step: action.payload});
            return {...state.graphSettingsKeeper, step: action.payload};

        case 'SETTING_CURSOR_MANUAL':
            const new_arr_manual = arr_change(action.payload);
            if (state.graphKeeper.real_time) {
                state.graphKeeper.path_arr_heat = get_path_arr_heat(new_arr_manual, 0);
            }
            socketService.SocketEmmit('memory_change', {heat_setting_arr: new_arr_manual});
            return {...state.graphSettingsKeeper,
                arr_heat: Object.assign([], new_arr_manual),
                cursor_y:getY(state.graphSettingsKeeper.cursor_x, state.graphSettingsKeeper.arr_heat)
            };

        case 'SETTING_CURSOR_UP':
            const new_arr_up = arr_change(state.graphSettingsKeeper.cursor_y + 5);
            if (state.graphKeeper.real_time) {
                state.graphKeeper.path_arr_heat = get_path_arr_heat(new_arr_up,0);
            }
            socketService.SocketEmmit('memory_change', {heat_setting_arr: new_arr_up});
            return {...state.graphSettingsKeeper,
                arr_heat: Object.assign([], new_arr_up),
                cursor_y:getY(state.graphSettingsKeeper.cursor_x, state.graphSettingsKeeper.arr_heat)
            };

        case 'SETTING_CURSOR_DOWN':
            const new_arr_down = arr_change(state.graphSettingsKeeper.cursor_y - 5);
            if (state.graphKeeper.real_time) {
                state.graphKeeper.path_arr_heat = get_path_arr_heat(new_arr_down, 0);
            }
            socketService.SocketEmmit('memory_change', {heat_setting_arr: new_arr_down});
            return {...state.graphSettingsKeeper,
                arr_heat: Object.assign([], new_arr_down),
                cursor_y:getY(state.graphSettingsKeeper.cursor_x, state.graphSettingsKeeper.arr_heat)
            };

        case 'SETTING_CURSOR_ALINE':
            const new_arr_aline = arr_aline();
            if (state.graphKeeper.real_time) {
                state.graphKeeper.path_arr_heat = get_path_arr_heat(new_arr_aline, 0);
            }
            socketService.SocketEmmit('memory_change', {heat_setting_arr: new_arr_aline});
            return {...state.graphSettingsKeeper,
                arr_heat: Object.assign([], new_arr_aline)};

        case 'SETTING_CURSOR_LEFT' :

            state.graphSettingsKeeper.cursor_x -= state.graphSettingsKeeper.step;
            if (state.graphSettingsKeeper.cursor_x < 0) {state.graphSettingsKeeper.cursor_x = 0}
            return {
                ...state.graphSettingsKeeper,
                cursor_y:getY(state.graphSettingsKeeper.cursor_x, state.graphSettingsKeeper.arr_heat)
            };

        case 'SETTING_CURSOR_RIGHT' :

            state.graphSettingsKeeper.cursor_x += state.graphSettingsKeeper.step;
            if (state.graphSettingsKeeper.cursor_x > 900) {state.graphSettingsKeeper.cursor_x = 900}
            return {
                    ...state.graphSettingsKeeper,
                    cursor_y:getY(state.graphSettingsKeeper.cursor_x, state.graphSettingsKeeper.arr_heat)
            };

        default:
            return state.graphSettingsKeeper;
    }
};

export default graphSettingsParameters;
