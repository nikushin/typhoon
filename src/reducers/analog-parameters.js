import svgPath from "../components/graph/my_graph/smooth"
import {IncrementValue} from "../actions";

const analogParameters = (state, action) => {

    const start_point = "M 0 0";
    const DefaultWidth = 900;
    const DefaultHeight = 400;

    if (state === undefined) {
        return {
            graph_save_view_parameters: {
                width: DefaultWidth, height: DefaultHeight,
                scale : 1.0,
                globalX : -20, globalY : -380,
            },
            graph_current_y_min: 0,
            graph_current_y_max: 0,
            graph_current_line_x: 0,
            graph_start_x: 0,
            graph_path_first: start_point,
            graph_path_second: start_point,
            graph_data_first: [],
            graph_data_second: [],
            temp_set_point: 30,
            temp_alarm_value: 555,
            increment_value: 0,
            lamp_test: false
        };
    }

    switch (action.type) {

        case 'INCREMENT_VALUE' :
            return {...state.analogParametersKeeper,
                increment_value : action.payload};

        case 'GRAPH_SAVE_VIEW_PARAMETERS' :
            return {...state.analogParametersKeeper,
                graph_save_view_parameters : action.payload};

        case 'GRAPH_ADD_TEMP':

            const payload_0 = action.payload[0];
            const payload_1 = -action.payload[1];
            const payload_2 = -action.payload[2];

            state.analogParametersKeeper.graph_data_first.push([payload_0, payload_1]);
            state.analogParametersKeeper.graph_data_second.push([payload_0, payload_2]);

            const get_current_y_max = () => {
                if (payload_1 >= 0 && payload_2 >= 0) {
                    return 0
                } else if (payload_1 >= payload_2) {
                    return payload_2 - 20
                } else if (payload_1 < payload_2) {
                    return payload_1 - 20
                }
            };

            const get_current_y_min = () => {
                if (payload_1 <= 0 && payload_2 <= 0) {
                    return 0
                } else if (payload_1 >= payload_2) {
                    return payload_1 + 20
                } else if (payload_1 < payload_2) {
                    return payload_2 + 20
                }
            };

            return {
                ...state.analogParametersKeeper,
                graph_path_first : svgPath(state.analogParametersKeeper.graph_data_first),
                graph_path_second : svgPath(state.analogParametersKeeper.graph_data_second),
                graph_current_line_x : payload_0,
                graph_current_y_max : get_current_y_max (),
                graph_current_y_min : get_current_y_min ()

            };

        case 'CLEAR_GRAPH': //if disconnect
            return {
                ...state.analogParametersKeeper,
            };

        case 'VALUE_INIT':
            return {
                ...state.analogParametersKeeper,
                [action.payload[0]]: action.payload[1]
            };

        case 'BOOL_CHANGE':
            return {
                ...state.analogParametersKeeper,
                lamp_test: !state.analogParametersKeeper.lamp_test
            };

        default:
            return state.analogParametersKeeper;
    }
};

export default analogParameters;
