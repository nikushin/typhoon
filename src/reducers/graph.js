import svgPath from "../components/graph/graph/smooth"
import socketService from "../services/socket-service";
import parameters from "../components/graph/parameters";
const {Xkoef, PowerYkoef, PowerWidthWorkPlot} = parameters;
const start_point = "M 0 0";
let max_length = 600;
const cut_length = 60;
const cut_long_graph = (arr) => {
    arr.splice(0, cut_length-arr[0][0]);
    arr.forEach(function(item, i) {
        item[0] -= cut_length;
    });
};

export const get_path_arr_heat = (arr, roast_second) => {
    let buffer = undefined;
    let currentI = undefined;
    if (arr.length === 0) {
        buffer = `M ${roast_second} 0 L ${PowerWidthWorkPlot} 0`
    } else {
        for (let i = 0; i < arr.length; i++) {
            if (roast_second >= arr[i][0]) {
                currentI = i;
            }
        }
        for (let i = currentI; i < arr.length; i++) {
            if (i === currentI) {
                buffer = `M ${roast_second * Xkoef} ${-arr[i][1] * PowerYkoef}`;
            } else {
                buffer += ` L ${arr[i][0] * Xkoef} ${-arr[i-1][1] * PowerYkoef} 
          L ${arr[i][0] * Xkoef} ${-arr[i][1] * PowerYkoef}`;
            }
            if (i === arr.length-1) {
                buffer += ` L ${PowerWidthWorkPlot} ${-arr[i][1] * PowerYkoef}`
            }
        }
    }
    return buffer
};

const get_path_arr_done = (arr, roast_second) => {
    let buffer = undefined;

    if (arr.length === 0) {
        buffer = `M 0 0`
    } else {
        for (let i = 0; i < arr.length; i++) {
            if (i === 0) {
                if (arr.length === 1) {
                    buffer = `M ${arr[i][0] * Xkoef} ${-arr[i][1] * PowerYkoef}`;
                } else {
                    buffer = `M ${arr[i][0] * Xkoef} ${-arr[i][1] * PowerYkoef}`;
                }
            } else {
                buffer += ` L ${arr[i][0] * Xkoef} ${-arr[i-1][1] * PowerYkoef} 
          L ${arr[i][0] * Xkoef} ${-arr[i][1] * PowerYkoef}`;
            }
            if (i === arr.length-1) {
                buffer += ` L ${roast_second*Xkoef} ${-arr[i][1] * PowerYkoef}`
            }
        }
    }
    return buffer;
};

const graphParameters = (state, action) => {

    if (state === undefined) {
        return {

            graph_save_view_parameters: {
                width: undefined,
                height: undefined,
                scale : undefined,
                globalX : undefined, globalY : undefined,
            },
            graph_start_x: 0,

            path_beans: start_point,
            path_air: start_point,
            path_ror: start_point,
            path_arr_done: start_point,
            path_arr_heat: start_point,

            path_beans_bg: start_point,
            path_ror_bg: start_point,

            data_beans: [],
            data_air: [],
            data_ror: [],
            data_arr_done: [],

            data_beans_last_roast: [],
            data_air_last_roast: [],
            data_ror_last_roast: [],
            data_arr_done_last_roast: [],
            roast_time_last_roast: 0,

            roast_second: 0,
            roast_power: 0,

            is_last_roast_saved: false,
            graph_time: 0,
            graph_start_time: 1,
            graph_save_request: false,
            date_start_roast: '',
            history_display: true,
            history_loading_spinner: false,
            history: {history:[], count: 0},
            history_chosen_id: 0,
            history_bg_id: 0,
            history_bg_show: false,
            history_delete_mode: false,
            history_request_offset :0,
            real_time: true,
            roast_mode: 'manual',
        };
    }

    switch (action.type) {

        case 'GRAPH_SAVE_VIEW_PARAMETERS' :
            return {...state.graphKeeper,
                graph_save_view_parameters : action.payload};

        case 'GRAPH_ADD_TEMP':

            if (state.graphKeeper.graph_time > max_length && !state.PhasesKeeper.roast) {
                cut_long_graph(state.graphKeeper.data_beans);
                cut_long_graph(state.graphKeeper.data_air);
                cut_long_graph(state.graphKeeper.data_ror);
                state.graphKeeper.graph_time -= cut_length;
            }

            ++state.graphKeeper.graph_time;

            state.analogParametersKeeper.tempBeans = action.payload.tempBeans;
            state.analogParametersKeeper.tempAir = action.payload.tempAir;
            state.analogParametersKeeper.ror = action.payload.ror;

            const tempBeans = -action.payload.tempBeans;
            const tempAir = -action.payload.tempAir;
            //const ror = -action.payload.ror;

            state.graphKeeper.data_beans.push([state.graphKeeper.graph_time, tempBeans]);
            state.graphKeeper.data_air.push([state.graphKeeper.graph_time, tempAir]);
            if (action.payload.ror !== undefined) {state.graphKeeper.data_ror.push([state.graphKeeper.graph_time, -action.payload.ror*10]);}

            if (state.graphKeeper.real_time) {
                return {
                    ...state.graphKeeper,
                    path_beans : svgPath(state.graphKeeper.data_beans),
                    path_air : svgPath(state.graphKeeper.data_air),
                    path_ror : svgPath(state.graphKeeper.data_ror),
                };
            } else {
                return {...state.graphKeeper}
            }

        case 'ROAST_REAL_TIME_PARAMETERS':

            if (state.graphKeeper.real_time) {
                const arr = state.graphKeeper.data_arr_done;
                if (arr.length === 0) {
                    arr.push([action.payload.roast_second, action.payload.roast_power]);
                } else {
                    if (arr[arr.length-1][1] !== action.payload.roast_power) {
                        arr.push([action.payload.roast_second, action.payload.roast_power]);
                    }
                }
                state.analogParametersKeeper.heat_power_indicator = Object.assign([], [action.payload.roast_power]);
            return {...state.graphKeeper,
                roast_second: action.payload.roast_second,
                roast_power: action.payload.roast_power,
                path_arr_done: get_path_arr_done(arr, action.payload.roast_second),
                path_arr_heat: get_path_arr_heat(state.graphSettingsKeeper.arr_heat, action.payload.roast_second),
            }} else {
                return {...state.graphKeeper}
            }

        case 'GRAPH_ROAST_START':

            state.graphKeeper.date_start_roast = new Date().toISOString().slice(0, 19).replace('T', ' ')

            state.graphKeeper.data_beans.forEach(function(item, i) {
                state.graphKeeper.data_beans[i][0] = item[0]-state.graphKeeper.graph_time;
            });

            state.graphKeeper.data_air.forEach(function(item, i) {
                state.graphKeeper.data_air[i][0] = item[0]-state.graphKeeper.graph_time;
            });

            state.graphKeeper.data_ror.forEach(function(item, i) {
                state.graphKeeper.data_ror[i][0] = item[0]-state.graphKeeper.graph_time;
            });

            state.graphKeeper.graph_start_time = -state.graphKeeper.graph_time+1;

            socketService.SocketEmmit('save_graph');
            return {
                ...state.graphKeeper,
                real_time: true,
                graph_time : 0,
                path_beans : svgPath(state.graphKeeper.data_beans),
                path_air : svgPath(state.graphKeeper.data_air),
                path_ror : svgPath(state.graphKeeper.data_ror),
                path_arr_done: start_point,
                graph_save_request: false,
            };

        case 'GRAPH_ROAST_FINISH':
            console.log('GRAPH_ROAST_FINISH');
            return {
                ...state.graphKeeper,
                data_beans_last_roast: state.graphKeeper.data_beans.slice(),
                data_air_last_roast: state.graphKeeper.data_air.slice(),
                data_ror_last_roast: state.graphKeeper.data_ror.slice(),
                data_arr_done_last_roast: state.graphKeeper.data_arr_done.slice(),

                roast_time_last_roast: state.graphKeeper.roast_second,
                //roast_second: 0,
                data_arr_done: [],
                graph_save_request: true
            };

        case 'GRAPH_SAVE_ANSWER':

            if (action.payload === true) {
                // console.log(state.graphKeeper.data_arr_done_last_roast);
                socketService.SocketEmmit('save_graph', {
                    name: "test",
                    date: state.graphKeeper.date_start_roast,
                    time: state.graphKeeper.roast_time_last_roast,
                    beans: state.graphKeeper.data_beans_last_roast,
                    air: state.graphKeeper.data_air_last_roast,
                    ror: state.graphKeeper.data_ror_last_roast,
                    heat_arr_done: state.graphKeeper.data_arr_done_last_roast,
                })
            } else {
                socketService.SocketEmmit('save_graph')
            }

            return {
                ...state.graphKeeper,
                graph_save_request: false
            };

        case 'HISTORY_DISPLAY':
            return {
                ...state.graphKeeper,
                history_display: !state.graphKeeper.history_display
            };

        case 'HISTORY_REQUEST':
            if (action.payload < 0 || action.payload > Math.ceil(state.graphKeeper.history.count/10)-1) {
                return {...state.graphKeeper};
            } else {
                if (action.payload !== undefined) {state.graphKeeper.history_request_offset = action.payload}
                socketService.SocketEmmit('history_request', state.graphKeeper.history_request_offset);
                return {...state.graphKeeper};
            }

        case 'HISTORY_ANSWER':
            console.log(action.payload);
            if (action.payload.offset !== undefined) {
                state.graphKeeper.history_request_offset = action.payload.offset
            }
            return {
                ...state.graphKeeper,
                history_loading_spinner: false,
                history : action.payload
            };

        case 'ONE_STORY_REQUEST':
            socketService.SocketEmmit('one_story_request', action.payload);
            return {
                ...state.graphKeeper
            };

        case 'ONE_STORY_ANSWER':
            state.graphSettingsKeeper.heat_arr_done_history = action.payload.arr_done;
            state.graphSettingsKeeper.roast_time_history = action.payload.arr_done;
            return {
                ...state.graphKeeper,
                graph_start_time: action.payload.beans[0][0],
                real_time: false,
                path_beans: svgPath(action.payload.beans),
                path_air : svgPath(action.payload.air),
                path_ror : svgPath(action.payload.ror),
                path_arr_done: get_path_arr_done(action.payload.arr_done, action.payload.time),
                path_arr_heat: start_point,
            };

        case 'DISPLAY_LAST_ROAST':
            if (state.graphKeeper.data_beans_last_roast.length === 0) {
                return {...state.graphKeeper} } else {
            return {
                ...state.graphKeeper,
                graph_start_time: state.graphKeeper.data_beans_last_roast[0][0],
                real_time: false,
                path_beans : svgPath(state.graphKeeper.data_beans_last_roast),
                path_air : svgPath(state.graphKeeper.data_air_last_roast),
                path_ror : svgPath(state.graphKeeper.data_ror_last_roast),
                path_arr_done: get_path_arr_done(state.graphKeeper.data_arr_done_last_roast, state.graphKeeper.roast_time_last_roast),
                path_arr_heat: start_point,
            }}

        case 'REAL_TIME_ON':
            // console.log(state.graphKeeper.data_arr_done, state.graphKeeper.roast_second);
            if (state.graphKeeper.data_beans.length === 0) {
                return {...state.graphKeeper}
            } else if (!state.graphKeeper.real_time) {
                return {
                    ...state.graphKeeper,
                    roast_second: 0,
                    graph_start_time: state.graphKeeper.data_beans[0][0],
                    real_time: true,
                    path_beans: svgPath(state.graphKeeper.data_beans),
                    path_air: svgPath(state.graphKeeper.data_air),
                    path_ror: svgPath(state.graphKeeper.data_ror),
                    path_arr_heat: get_path_arr_heat(state.graphSettingsKeeper.arr_heat, 0),
                    path_arr_done: get_path_arr_done(state.graphKeeper.data_arr_done, 0),
                };
            } else {
                return {...state.graphKeeper}
            }

        case 'CHANGE_ROAST_MODE':
            let new_roast_mode = undefined;
            if (state.graphKeeper.roast_mode === 'manual') {
                new_roast_mode = 'auto'
            } else if (state.graphKeeper.roast_mode === 'auto') {
                if (state.graphKeeper.history_bg_id !== 0) new_roast_mode = 'background';
                else new_roast_mode = 'manual'
            } else if (state.graphKeeper.roast_mode === 'background') {
                new_roast_mode = 'manual'
            }
            socketService.SocketEmmit('memory_change', {roast_mode: new_roast_mode});
            return {
                ...state.graphKeeper,
                roast_mode: new_roast_mode,
            };

        case 'CLEAR_GRAPH':
            state.graphSettingsKeeper.heat_arr_done = [];
            return {
                ...state.graphKeeper,
                data_beans: [],
                data_air: [],
                data_ror: [],
                graph_time: 0,
            };

        case 'HISTORY_CHOOSE_STORY':

            return {
                ...state.graphKeeper,
                history_chosen_id: action.payload,
                history_bg_show: false
            };

        case 'HISTORY_DELETE_MODE':
            return {
                ...state.graphKeeper,
                history_delete_mode: !state.graphKeeper.history_delete_mode
            };

        case 'HISTORY_SET_BACKGROUND':
            if ((state.graphKeeper.history_chosen_id === 0 && state.graphKeeper.history_bg_id !==0) ||
                (state.graphKeeper.history_chosen_id === state.graphKeeper.history_bg_id)) {
                state.graphKeeper.history_bg_id = 0;
                if (state.graphKeeper.roast_mode === 'background') state.graphKeeper.roast_mode = 'manual';
                state.graphKeeper.path_beans_bg = start_point;
                state.graphKeeper.path_ror_bg = start_point;
                socketService.SocketEmmit('memory_change', {roast_mode: 'manual'});
            } else {
                state.graphKeeper.history_bg_id = state.graphKeeper.history_chosen_id;
                state.graphKeeper.path_beans_bg = state.graphKeeper.path_beans;
                state.graphKeeper.path_ror_bg = state.graphKeeper.path_ror;
            }
            socketService.SocketEmmit('history_set_background', state.graphKeeper.history_bg_id);
            return {
                ...state.graphKeeper,
            };

        case 'HISTORY_BACKGROUND_SHOW':
            return {
                ...state.graphKeeper,
                history_bg_show: action.payload
            };

        default:
            return state.graphKeeper;
    }
};

export default graphParameters;
